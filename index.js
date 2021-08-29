const search = document.querySelector("#search");
const notification = document.querySelector("#notification");
const locationIcon = document.querySelector("#locationicon");
const weathericon = document.querySelector("#weathericon");
const tempval = document.querySelector("#tempval");
const tempdesc = document.querySelector("#tempdesc");
const locat = document.querySelector("#location");
const nameofcity=document.querySelector("#nameofcity");
const feelslike=document.querySelector("#feelslike");

let city = "";
let latitude = 0.0;
let longitude = 0.0;

search.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();

        city = search.value;
        getSearchWeather(city);
        console.log(city);
    }
})

const key = "abf2b724c89f1c52eb432c04fe346761";
const weather = {};

// weather.temperature={
//     unit:"celcius"
// };

// const kelvin=273;

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition);
}
else {
    notification.getElementsByClassName.display = 'block';
    notification.innerHTML = '<p> Browser doesnt support geolocation </p>';
}

function setPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}
// locationIcon.addEventListener('onlcick',(e)=>{
//     console.log('hey');
//     getWeather(latitude,longitude);
// })

function getSearchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { coord, main, sys, name, weather } = data;
            const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
            const img=document.createElement('img');
            img.src=icon;
            img.alt="";
            weathericon.innerHTML="";
            img.id="tempimg";
            weathericon.appendChild(img);
            nameofcity.innerHTML=name;
            tempval.innerHTML=`${Math.ceil(main.temp)}<span style="font-size:25px;">°C</span>`;
            feelslike.innerHTML=`Feels like: ${Math.ceil(main.feels_like)}°C`;
            console.log(coord);
            console.log(main);
            console.log(sys);
            console.log(name);
            console.log(weather);
        })
}

function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { coord, main, sys, name, weather } = data;
            console.log(coord);
            console.log(main);
            console.log(sys);
            console.log(name);
            console.log(weather);
        })
}