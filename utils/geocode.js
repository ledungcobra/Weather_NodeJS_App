const request = require("request");
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibGVkdW5nY29icmEiLCJhIjoiY2tjMzljMHgyMDIxaTJycGNvcmhvZngyMCJ9.mArUzc6lw6P5Bcw4haYvLg'
    request({
         url,
         json:true
    },(error,{body})=>{
         if(error){
              callback('Unable to connect to the services')
         }else if(body.error){
               callback('Error')
         } else if(body.features.length === 0){
              callback('Can\'t find this location')
         }else{
              callback(undefined,{
                   place_name:body.features[0].place_name,
                   lat:body.features[0].center[1],
                   long:body.features[0].center[0]
              })
         } 
    })
}
module.exports = geocode