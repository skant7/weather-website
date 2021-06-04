const request = require('postman-request')

const geocode = (address,callback) =>{
    const enc_address = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${enc_address}.json?access_token=pk.eyJ1Ijoic3VyeWE3OTkiLCJhIjoiY2twZDBheDJ1MWhxbjJ5b2dobnd2aW1vYiJ9.Dl_mIJvO5iH6zCMBdcaYpA&limit=1`
    request({url,json: true},(error,{body})=>{
        if(error){
            callback('Connection failed!',undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location!',undefined)
        } else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports  = geocode