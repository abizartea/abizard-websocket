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


    h1.innerHTML=jam[0];
    h2.innerHTML=jam[1];

    m1.innerHTML=menit[0];
    m2.innerHTML=menit[1];

    s1.innerHTML=detik[0];
    s2.innerHTML=detik[1];

}


setInterval(updateClock,1000);

updateClock();