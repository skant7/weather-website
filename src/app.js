const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const port = process.env.PORT||3000
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewPath);
app.use(express.static(publicDirectoryPath))

hbs.registerPartials(partialPath)



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Surya Kant'
    })
})



app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is some helpful text.',
        name: 'Surya Kant'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide an address!"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            return res.send({
                address: req.query.address,
                location,
                forecastData: forecastData
            })
        })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage: 'Help article not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'Page not found!'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})