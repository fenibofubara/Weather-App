//dkdkdkdkdkd
const request = require('request')


const forecast = (latitude,longitude,callback)=>{

    url = 'https://api.darksky.net/forecast/7466f610181619624f083aa7cf3ca569/'+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        
        if(error){
            callback('No internet access',undefined)
        }
        else if(body.error){
            callback('Poorly formatted location',undefined)
        }
        else{
          
            callback(undefined, { 
                temprature:body.currently.temperature,
                probability:body.currently.precipProbability,
                location: body.timezone,
                summary:body.currently.summary,
               
            })

        }

    })
}

module.exports = forecast