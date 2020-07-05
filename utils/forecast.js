const request = require('request')
const forecast = (lat,long,place_name,callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=cdcc349d30a74d01ea0c8c7a22576816&units=metric'
    request({url,json:true},(error,{body})=>{

         if(error){
              callback('Unable to connect to weather service!!')
         }else if(body.error){
             callback('Unable to find location')
         }
         else{
            try{
                callback(undefined,{
                    temp:body.main.temp,
                    cloud:body.clouds.all,
                    place_name
                })
            }catch(e){
                callback('Your coordinates is bad')
            }
        }
         
    })

}
module.exports = forecast