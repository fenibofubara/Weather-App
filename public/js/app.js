//console.log('Client Side Javascript run currently')



const formObject = document.querySelector('form')
const where = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

formObject.addEventListener('submit',(e)=>{
    e.preventDefault()
    //console.log('Just submitted a form')
    const locate = where.value
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch('/weather?address='+locate).then((response)=>{
    
    response.json().then((data)=>{
        if(data.error){
            message1.textContent = data.error
        }
        else{
           
            //console.log(data)
            //console.log(data.location)
             message1.textContent = data.location
             message2.textContent = data.summary+'.It is '+data.temprature+' decree celcius.There is a '+data.probability+' percent chance to rain'
        }
        
        
    })
})
  
})

