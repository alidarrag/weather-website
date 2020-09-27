const path = require('path')
const express = require('express')
const { static } = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const { error } = require('console')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ali Darrag'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address) {
        return res.send({
            error: 'You should enter the address'
        })
    }
    
    forecast(req.query.address, (error, {temperature,location }= {}) =>{
        if(error) {
           return res.send({error}) 
        }
        res.send({
            temperature,location
        })
    })
    
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ali Darrag'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ali Darrag'
    })
})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Ali Darrag',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Ali Darrag',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+port)
})