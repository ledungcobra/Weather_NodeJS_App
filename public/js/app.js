
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMsg = document.querySelector('#message-1')
const forecastMsg = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    if(location === '') return 
    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((response)=>{
        if(response.error){
           errorMsg.textContent = response.data.error
        }else{


        forecastMsg.textContent = 'The average temp is '+ response.data.temp+' cloud: '
        +response.data.cloud+' place name: '+ response.data.place_name
        
        }
    })
})

})