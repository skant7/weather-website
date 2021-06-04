const request = require('postman-request')

const forecast = (lat,lon,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=f59b8a9f00b1697b13fef7a05ab61229&query=${lon},${lat}&units=f`
    
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Connection failed!',undefined)
        } else if(body.error){
            
            callback('Unable to find location!',undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.cloudcover + '% chance of rain.' + ' Humidity is ' + body.current.humidity + '%.')
        }
    })

}

module.exports = forecast