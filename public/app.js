/*global _ comp m state menus look collNames db gapi dbCall withThis io autoForm schemas*/

_.assign(comp, {
  navbar: () => m('nav.navbar.is-primary',
    m('.navbar-brand', m('a.navbar-item', {
      onclick: () => state.route = 'dashboard'
    }, 'RS Medicare')),
    m('.navbar-menu',
      m('.navbar-start', _.map(menus, (val, key) =>
        m('a.navbar-item',
          {
            class: val.children && 'has-dropdown is-hoverable',
            onclick: () => state.route = key
          },
          val.children ? [
            m('a.navbar-link', _.startCase(val.full)),
            m('.navbar-dropdown', _.map(val.children, (i, j) =>
              m('a.navbar-item', {onclick: (e) =>
                [e.stopPropagation(), state.route = j]
              }, i.full)
            ))
          ] : _.startCase(val.full)
        )
      )),
      m('.navbar-end', m('.navbar-item.has-dropdown.is-hoverable',
        m('a.navbar-link', {
          onclick: () => [state.route = 'profile', m.redraw()]
        }, _.get(state.login, 'gmail')),
        m('.navbar-dropdown',
          m('a.navbar-item',
            'Peranan: '+ look('peranan', _.get(state.login, 'peranan'))
          ),
          m('a.navbar-item',
            'Bidang: '+look('bidang', _.get(state.login, 'bidang'))
          ),
          m('a.navbar-item',
            'Poliklinik: '+
            look('klinik', _.get(state.login, 'poliklinik'))
          ),
          m('a.navbar-item', {onclick: () => [
            state.login = null,
            m.redraw()
          ]},'Logout')
        )
      ))
    ),
  ),

  dashboard: () => m('.content',
    {oncreate: () => [
      collNames.map(name =>
        db[name].toArray(array => poster('dbCll', {
            method: 'getDifference', collection: name,
            clientColl: array.map(i => _.pick(i, ['_id', 'updated']))
          }, res => res && [db[name].bulkPut(res.data), m.redraw()])
        )
      ),
      db.users.toArray(array => state.userList = array)
    ]},
    m('h1', 'Dashboard'),
    _.chunk(_.values(menus), 3).map(i =>
      m('.columns', i.map(j => m('.column',
        m('.box', m('article.media',
          m('.media-left', m('span.icon.has-text-primary',
            m('i.fas.fa-2x.fa-'+j.icon))
          ),
          m('.media-content', m('.content',m('h3', j.full)))
        ))
      )))
    )
  ),
  login: () => m('.content',
    m(autoForm({
      id: 'login', schema: schemas.login,
      submit: {value: 'Login'},
      action: (doc) => [
        state.loading = true,
        poster('login', {
          username: doc.gmail, password: doc.password
        }, res => res && [
          _.assign(state, {gmail: doc.username, route: 'dashboard'}),
          db.users.filter(i => i.gmail === state.gmail)
          .toArray(i => [state.login = i[0], m.redraw()]),
          m.redraw()
        ])
      ]
    }))
  )
})

m.mount(document.body, {view: () => m('div',
  comp.navbar(), m('.container', state.gmail ? comp[state.route]() : comp.login())
)})
