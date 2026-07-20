function updateClock(){

    const now = new Date();


    let jam = now.getHours()
    .toString()
    .padStart(2,"0");


    let menit = now.getMinutes()
    .toString()
    .padStart(2,"0");


    let detik = now.getSeconds()
    .toString()
    .padStart(2,"0");


    document.getElementById("time")
    .innerHTML =
    `${jam}:${menit}:${detik}`;


    document.getElementById("date")
    .innerHTML =
    now.toLocaleDateString("id-ID",
    {
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"
    });

}


setInterval(updateClock,1000);

updateClock();