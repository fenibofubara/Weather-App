
const request = require('request')
const geocode = function(address,callback){
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZmVuaWJvIiwiYSI6ImNrMHNxZHY3czA1MHUzb3A2ODR4MHcwbmoifQ.uv9nis0WMmya_UmtTEKAog&limit=1'

    request({url:url,json:true},(error,{body}={})=>{
        if(error){
            callback('Check Internet connection',undefined)
        }
        else if(body.features.length===0){
            callback('Unknown Address',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                place:body.features[0].place_name
            })
         
        }
    })

}



module.exports = geocode
