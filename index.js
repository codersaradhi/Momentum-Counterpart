
// const master = prompt("Give your name")

///////////background wallpaper

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })

//crypto updates api
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => console.error(err))

// time update
function getCurrentTime() {
    const date = new Date()
    getCurrentHour()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-US", { timeStyle: "medium", hour12: false });
}

setInterval(getCurrentTime, 1000)

function getCurrentHour(){
    const date = new Date()
    const hour = date.getHours()
    const master = "Chaitanya"
    let greeting_msg = ""
    if(hour > 3 && hour < 11  ){
        greeting_msg = `Good morning, ${master}.`
    }else if(hour > 11 && hour < 15){
        greeting_msg = `Good afternoon, ${master}.`
    }else if(hour > 15 && hour < 18 ){
        greeting_msg = `Good evening, ${master}.`
    }else if(hour > 19 && hour < 23){
        greeting_msg = `Good night, ${master}.`
    }
    document.getElementById('greeting').textContent = greeting_msg;
}

// weather api
navigator.geolocation.getCurrentPosition(async position => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid={API_key}`)
    console.log(res)
    if (!res.ok) {
        throw Error("Weather data not available")
    }
    const data = await res.json()
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.getElementById("weather").innerHTML = `
        <img src=${iconUrl} />
        <p class="weather-temp">${Math.round(data.main.temp)}º</p>
        <p class="weather-city">${data.name}</p>
    `
        // .catch(err => console.error(err))
});
