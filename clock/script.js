function jam(){

    setInterval(()=>{

const namaBulan=[
"JAN","FEB","MAR","APR","MEI","JUN",
"JUL","AGS","SEP","OKT","NOV","DES"
];

setInterval(()=>{

let d=new Date();

// Jam
jam.innerHTML=`
<span>${String(d.getHours()).padStart(2,"0")}</span>
<span>${String(d.getMinutes()).padStart(2,"0")}</span>
<span>${String(d.getSeconds()).padStart(2,"0")}</span>`;

// Tanggal
tgl.textContent=String(d.getDate()).padStart(2,"0");
bln.textContent=namaBulan[d.getMonth()];
thn.textContent=d.getFullYear();

},1000);
async function loadWeather() {
    navigator.geolocation.getCurrentPosition(async (pos)=>{

        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;

        const data = await fetch(url).then(r=>r.json());

        document.getElementById("temperature").textContent =
            data.current.temperature_2m + "°C";

        const geo = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`);
        const place = await geo.json();

        document.getElementById("location").textContent =
            place.address.city ||
            place.address.town ||
            place.address.village;

        let code = data.current.weather_code;
        let icon = "☀️";

        if(code>=1 && code<=3) icon="⛅";
        if(code>=45 && code<=48) icon="🌫️";
        if(code>=51 && code<=67) icon="🌦️";
        if(code>=71 && code<=86) icon="❄️";
        if(code>=95) icon="⛈️";

        document.getElementById("weatherIcon").src =
        "https://openweathermap.org/img/wn/02d@2x.png";

    });

}

loadWeather();

jam();
function copyURL(widget){
    let url = window.location.origin + "/" + widget + "/";

    navigator.clipboard.writeText(url);

    alert("URL Digital Clock berhasil dicopy");
}