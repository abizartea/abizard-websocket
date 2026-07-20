const socket = new WebSocket("ws://127.0.0.1:8081");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const disk = document.querySelector(".disk img");
const timer = document.getElementById("timer");
socket.onmessage = (event)=>{

    const song = JSON.parse(event.data);
console.log(song);
    title.textContent = song.title || "Belum Ada Lagu";

    artist.textContent = song.channel || "ABIZARD MUSIC";

    if(song.cover){

        disk.src = song.cover;

    }
timer.textContent = song.timer || "00:00 / 00:00";
};
