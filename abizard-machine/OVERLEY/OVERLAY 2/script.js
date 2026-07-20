const socket = new WebSocket("ws://127.0.0.1:8081");


const title = document.getElementById("title");
const artist = document.getElementById("artist");
const timer = document.getElementById("timer");
const progress = document.querySelector(".progress-fill");
const logo = document.querySelector(".logo img");



socket.onmessage = (event)=>{


    const song = JSON.parse(event.data);



    title.textContent =
    song.title || "Belum Ada Lagu";


    artist.textContent =
    song.channel || "ABIZARD MUSIC";



    timer.textContent =
    song.timer || "00:00 / 00:00";
    const waktu = song.timer.split("/");
    const sekarang = waktu[0].trim();
const total = waktu[1].trim();

const menitSekarang = parseInt(sekarang.split(":")[0]);
const detikSekarang = parseInt(sekarang.split(":")[1]);
const waktuSekarang = (menitSekarang * 60) + detikSekarang;
const menitTotal = parseInt(total.split(":")[0]);
const detikTotal = parseInt(total.split(":")[1]);
const waktuTotal = (menitTotal * 60) + detikTotal;
const persen = (waktuSekarang / waktuTotal) * 100;
progress.style.width = persen + "%";

if(song.cover){

    logo.src = song.cover;

    document.querySelector(".player-box")
    .style.setProperty(
        "--cover",
        `url(${song.cover})`
    );

}


};
function updateCover(image){

    document.getElementById("cover").src = image;

    document.querySelector(".player-box")
    .style.setProperty(
        "--cover",
        `url(${image})`
    );

}
