const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Path for express config 
const publicDirectoriPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directori to serve 
app.use(express.static(publicDirectoriPath))

app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather App', 
        name: 'Iqbal'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me!',
        name: 'M.Iqbal'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page!',
        name: 'M.iqbal',
        text: 'some text to helpful'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'M.iqbal',
        errorMessage: 'articel not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        errorMessage: 'page Not Found',
        name: 'M.Iqbal',
        title: '404'
    })
})

app.listen(port, ()=>{
    console.log('server running om port' + port)
})

 