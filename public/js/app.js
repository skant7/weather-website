console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')

const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchLocation.value
    
    msgOne.textContent = 'Loading....'
    msgTwo.textContent = ''
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    
    
    
    response.json().then((data)=>{
        if(data.error)
          msgOne.textContent = data.error
        else{
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecastData
        }
    })
})
searchLocation.value = ''
})

