const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../utils/forecast.js')
const geocode =  require('../utils/geocode.js')
const getForecast = (address,callback)=>{
    if(address === undefined){
        callback({error:'Please provide address'})
    }else{
        geocode(address,(error, {lat,long,place_name} = {})=>{
            if(error){
                return callback(error)
            }
            forecast(lat,long,place_name,(error,data)=>{
                if(error){
                    return callback(error)
                }

                callback(undefined,{data,place_name})
            })

        })
    }
}
const app = express()
const port = process.env.PORT ||3000

//Define path for express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath =  path.join(__dirname,'../templates/partials')
//Set up handlebars engine and view location
app.use(express.static(publicPath))
app.set(
    'view engine',
    'hbs'
)


app.set('views',viewsPath)

hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
   res.render('index',{
       title:'Weather app',
       name:'Dung Le'
   })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
       name:"Dung Le"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide the location'
        })
    }
    getForecast(req.query.address,(error,data)=>{
        if(error){
            return res.send(error)
        }
        res.send(data)
    })

})
app.get('/help',(req,res)=>{

    res.render('help',{
        title:'Help page'
        ,helpText:'This is some helpful text',
        name:'Dung Le'
    })

})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'Dung Le',
        title:'Help 404 error',
        errorMessage:'Your help search is not available!!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        name:"Dung Le",
        title:'404 Error',
        errorMessage:'Can\'t find this page'
    })
})
app.listen(port,()=>{
    console.log('Server is running on port '+port)
})
