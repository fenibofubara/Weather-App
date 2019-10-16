const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

 const app = express() // express library contains just one particular function and no object

 // set up directory path for Express Config
const publicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Set up handle bar engine and view location
 app.set('view engine','hbs')
 app.set('views',viewsPath)
 hbs.registerPartials(partialsPath)

 // This code alone can help to set up static web page serving(index.html to be contained in thart public directory)
 app.use(express.static(publicDirectorypath))
 app.get('',(req,res)=>{
     res.render('index',{
         title:'Weather App',
         author:'Fenibo Fubara',
         
     })
 })

 app.get('/a',(req,res)=>{
    res.render('about',{
        title:'About Page',
        author:'Fenibo Fubara',
        
    })
})


app.get('/h',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        author:'Fenibo',
        
    })
})


 
 app.get('/weather',(req,res)=>{
     // an endpoint for collecting weather data
     if(!req.query.address){
      return   res.send({
             error:'Address term must be provided accuratly'
         })
     }
     geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
         if(error){
          return  res.send({
                 error:error
             })
         }
    
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({
                
                error:error
            })
        }
       
        res.send({
            
            forecast:forecastData,
            address:req.query.address,
            location:place

        })

    })
      

     })

     
    //  res.send({
    //      forecast:'Cloudy',
    //      address:req.query.address
    //  })
 })

 app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'Pls provide a Search Term'
        })

    }
   console.log(req.query.search) 
    res.send({
        products:[]
    })
})

 app.get('/h/*',(req,res)=>{
     res.render('404',{
         alert:'Help Article not found',
         author:'Fenibo',
         title:'No Article 404 Page'
     })
     // This is a  more specific messge for help pages
 })
 app.get('*',(req,res)=>{
     res.render('404',{
         alert:'Page not found',
         author:'Fenibo',
         title:'404 Page'
     })
 })

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})
