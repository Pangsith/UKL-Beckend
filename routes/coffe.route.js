const express = require(`express`)
const coffeController = require(`../controllers/coffe.controller`)
const auth = require('../controllers/auth.controller')
const app = express()
app.use(express.json())

app.get('/getall', coffeController.getAll)
app.get('/:key', coffeController.findcoffe)
app.post('/',  coffeController.addcoffe)
app.put('/:id', auth.authorize, coffeController.updatecoffe)
app.delete('/:id', auth.authorize, coffeController.deletecoffe)

module.exports = app