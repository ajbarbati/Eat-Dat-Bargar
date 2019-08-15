const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./controllers/burgers_controller.js')

app.use(express.static(process.cwd() + '/public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use('/', routes)

app.listen(port)