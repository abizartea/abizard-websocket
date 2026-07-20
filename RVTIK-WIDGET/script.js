function updateWidget(){

    const now = new Date();


    const days = [
        "MINGGU",
        "SENIN",
        "SELASA",
        "RABU",
        "KAMIS",
        "JUMAT",
        "SABTU"
    ];


    const months = [
        "JANUARI",
        "FEBRUARI",
        "MARET",
        "APRIL",
        "MEI",
        "JUNI",
        "JULI",
        "AGUSTUS",
        "SEPTEMBER",
        "OKTOBER",
        "NOVEMBER",
        "DESEMBER"
    ];



    document.getElementById("day").innerText =
    days[now.getDay()];


    document.getElementById("date").innerText =
    now.getDate();



    document.getElementById("month").innerText =
    months[now.getMonth()];



    let jam = String(now.getHours()).padStart(2,"0");

    let menit = String(now.getMinutes()).padStart(2,"0");

    let detik = String(now.getSeconds()).padStart(2,"0");



    document.getElementById("clock").innerText =
    `${jam}:${menit}:${detik}`;

}



setInterval(updateWidget,1000);

updateWidget();





// =================
// LOKASI OTOMATIS
// =================


function getLocation(){


    const locationBox =
    document.getElementById("location");



    if(navigator.geolocation){


        navigator.geolocation.getCurrentPosition(

        async function(position){


            let lat =
            position.coords.latitude;


            let lon =
            position.coords.longitude;



            try{


                let res =
                await fetch(

                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`

                );



                let data =
                await res.json();



let province =

data.address.state ||

data.address.region ||

"UNKNOWN";


locationBox.innerText =
"📍 " + province.toUpperCase();


            }catch{


                locationBox.innerText =
                "📍 LOCATION ERROR";

            }



        },

        function(){


            locationBox.innerText =
            "📍 GPS OFF";


        });



    }


}



getLocation();
// =================
// CUACA OTOMATIS
// =================

async function getWeather(lat, lon){

    try{

        let response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );


        let data = await response.json();


        let temp = Math.round(
            data.current_weather.temperature
        );


        let code =
        data.current_weather.weathercode;



        document.getElementById("temperature").innerText =
        temp + "°C";



        let icon = "☁️";
        let status = "BERAWAN";



        if(code === 0){

            icon="☀️";
            status="CERAH";

        }

        else if(code <= 3){

            icon="🌤️";
            status="CERAH BERAWAN";

        }

        else if(code >=51 && code <=67){

            icon="🌧️";
            status="HUJAN";

        }

        else if(code >=80){

            icon="⛈️";
            status="BADAI";

        }



        document.getElementById("weatherIcon").innerText =
        icon;


        document.querySelector(".weather-status").innerText =
        status;



    }catch(error){

        console.log("Cuaca gagal:",error);

    }

}