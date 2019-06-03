const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibXVoYW1tYWRpcWJhbDE5OTUiLCJhIjoiY2p3ZDBvMzR6MDM5ZDQ4cGI4eGh1NzgwdyJ9.iNKwO81Tc7vb89LVqIVOGQ'

    request({ url, json: true}, (error, {body}) =>{
        if(error){
            callback('unable to connect to location services', undefined)
        }else if(body.features.length === 0){
            callback('unable to connect location. try another location', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode