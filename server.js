import {createApp, serveStatic} from 'https://servestjs.org/@v1.0.0/mod.ts'
import {init, MongoClient} from 'https://deno.land/x/mongo@v0.6.0/mod.ts'
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import 'https://deno.land/x/dotenv/load.ts'

await init()
var client = new MongoClient()
client.connectWithUri(Deno.env.get('MONGO'))

const responder = obj => ({
  headers: new Headers({"content-type": "text/plain"}),
  status: 200, body: JSON.stringify(obj)
}),

app = createApp()
app.use(serveStatic('./public'))
app.post('/dbCall', async req => {
  var text = await req.text(), obj = JSON.parse(text),
  db = client.database('medicare'),
  coll = db.collection(obj.collection),
  data = await ({
    find: async () => await coll.find(obj.projection, obj.options),
    findOne: async () => await coll.findOne({_id: obj._id}),
    insertOne: async () => await coll.insertOne(obj.document),
    insertMany: async () => await obj.documents.map(doc => coll.insertOne(doc)),
    updateOne: async () => await coll.updateOne({_id: obj._id},{$set: obj.document}),
    deleteOne: async () => await coll.deleteOne({_id: obj._id}),
    getDifference: async () => await coll.find({$or: [
      {_id: {$not: {$in: obj.clientColl.map(i => i._id)}}},
      {updated: {$gt: obj.clientColl.reduce(
        (res, inc) => inc.updated > res ? inc.updated : res
      , 0)}}
    ]})
  })[obj.method]()
  req.respond(responder({data}))
})
app.post('/bcrypt', async req => {
  var text = await req.text(), obj = JSON.parse(text),
  data = await ({
    encrypt: async () => await bcrypt.hash(obj.text),
    compare: async () => await bcrypt.compare(obj.text, obj.hash)
  })[obj.type]()
  req.respond(responder({data}))
})
app.post('/login', async req => {
  var text = await req.text(), obj = JSON.parse(text),
  db = client.database('medicare'), coll = db.collection('users'),
  user = await coll.findOne({gmail: obj.username}),
  data = await bcrypt.compare(obj.password, user.password)
  req.respond(responder({data}))
})

app.listen({port: 3100})
