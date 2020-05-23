/*global _ m comp makePdf ands selects insertBoth db startOfTheDay*/

_.assign(comp, {
  queue: () => m('.content',
    m('table.is-fullwidth', m('tr',
      {oncreate: () => db.queue.toArray(
        array => localStorage.setItem('regQueue', array.filter(
          i => i.timestamp > startOfTheDay(Date.now())
        ).length)
      )},
      m('th', m('h1', 'Antrian Pendaftaran')),
      m('th', m('h1', 'R'+(localStorage.regQueue || 0)))
    )),
    m('.buttons',
      m('.button', {
        onclick: () => ands([
          insertBoth('queue', {timestamp: Date.now(), num: +localStorage.regQueue+1}),
          makePdf.regQueue(+localStorage.regQueue),
          localStorage.setItem('regQueue', +localStorage.regQueue+1)
        ])
      }, 'Cetak antrian'),
      m('.button', {
        onclick: () => localStorage.setItem('regQueue', 0)
      }, 'Reset Antrian')
    ),
    Array(3).map(i => m('br')),
    m('h1', 'Antrian Poliklinik'),
    m('table.is-fullwidth.is-striped',
      selects('klinik')().map(i => m('tr',
        m('td', m('h2', i.label))
      ))
    )
  )
})