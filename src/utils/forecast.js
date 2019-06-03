const request = require('request')


const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/63203cc692d15ac97238087982a0076e/'+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude) +'' 

    request({url, json:true}, (error, {body})=>{
        if (error){
            callback('unable to weather services !', undefined)
        }else if(body.error){
            callback('unable to find location. try another search', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' it is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + ' chance of rain')
        }
    })
}

module.exports = forecast