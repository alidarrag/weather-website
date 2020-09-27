const request = require('request')
const forecast = (address, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=3fa66db53c90afdaeb51c7b7ab11a1ea&query=' + encodeURIComponent(address) 
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('unable to connect',undefined)
        } else if (response.body.error) {
            callback('unable to fine the location',undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                location: response.body.request.query
            })
        }
    })
}

module.exports = forecast