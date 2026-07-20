const cover = document.querySelector(".disk img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const timer = document.getElementById("timer");

// WebSocket
const socket = new WebSocket("ws://127.0.0.1:8159");

socket.onopen = () => {
    console.log("Overlay Connected");
};

socket.onmessage = (event) => {

    const data = JSON.parse(event.data);

    if(data.cover){
        cover.src = data.cover;
    }

    if(data.title){
        title.textContent = data.title;
    }

    if(data.channel){
        artist.textContent = data.channel;
    }

    if(data.timer){
        timer.textContent = data.timer;
    }

};

// Cadangan jika WebSocket belum aktif
setInterval(() => {

    const now = JSON.parse(localStorage.getItem("nowPlaying"));

    if(!now) return;

    cover.src = now.cover;
    title.textContent = now.title;
    artist.textContent = now.channel;

}, 1000);