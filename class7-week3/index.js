const Express = require('express')
const bodyParser = require('body-parser')

const app = Express()

app.use(bodyParser.json())

const {list, create, update, remove, reset, markAsDone, markAsNotDone} = require('./actions')

app.get('/todos', list)
app.post('/todos', create)
app.put('/todos/:id/done',markAsDone)
app.put('/todos/:id', update)
app.delete('/todos/:id', remove)
app.delete('/todos', reset)
app.delete('/todos/:id/done',markAsNotDone)

app.listen(3000)
console.log('Listening on API ' + 3000)