//=========================
// ABIZARD MUSIC PLAYER PRO
//=========================

let API_KEY = localStorage.getItem("youtubeKey") || "";

const apiKeyInput = document.getElementById("apiKey");
const saveKeyBtn = document.getElementById("saveKey");


if(apiKeyInput){
    apiKeyInput.value = API_KEY;
}


if(saveKeyBtn){

saveKeyBtn.onclick = ()=>{

    let key = apiKeyInput.value;

    localStorage.setItem(
        "youtubeKey",
        key
    );

    API_KEY = key;

    alert("API Key tersimpan");

};

}



let player;
let songs=[];
let current=-1;
let playing=false;
let timer;
// =========================
// WEBSOCKET
// =========================

const socket = new WebSocket("ws://127.0.0.1:8159");

socket.onopen = () => {

    console.log("WebSocket Terhubung");

};

socket.onerror = (e) => {

    console.log("WebSocket Error", e);

};



function savePlayer(){

    localStorage.setItem(
        "playlist",
        JSON.stringify(songs)
    );


    localStorage.setItem(
        "currentSong",
        current
    );

}



// LOAD PLAYLIST

const savedPlaylist = localStorage.getItem("playlist");


if(savedPlaylist){

    songs = JSON.parse(savedPlaylist);

}



// LOAD YOUTUBE API

const tag=document.createElement("script");

tag.src="https://www.youtube.com/iframe_api";

document.body.appendChild(tag);



//=========================
// YOUTUBE PLAYER
//=========================


function onYouTubeIframeAPIReady(){


player = new YT.Player("youtube",{

    height:"1",

    width:"1",

    playerVars:{
        autoplay:1,
        controls:0
    },


    events:{
        onStateChange:onPlayerStateChange
    }


});



renderPlaylist();



const savedCurrent =
localStorage.getItem("currentSong");



if(songs.length > 0){


    if(
    savedCurrent !== null &&
    songs[Number(savedCurrent)]
    ){

        playSong(Number(savedCurrent));


    }else{


        playSong(0);


    }


}


}




//=========================
// SEARCH
//=========================


async function searchSong(){


const q =
document.getElementById("query")
.value.trim();



if(!q)return;



const url =
`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(q)}&key=${API_KEY}`;



const res =
await fetch(url);



const data =
await res.json();



const box =
document.getElementById("search-result");



box.innerHTML="";



if(!data.items)return;



data.items.forEach(v=>{


const song={

id:v.id.videoId,

title:v.snippet.title,

channel:v.snippet.channelTitle,

cover:v.snippet.thumbnails.medium.url

};



box.innerHTML += `

<div class="search-item">

<img src="${song.cover}">

<span>${song.title}</span>


<button onclick='addSong(${JSON.stringify(song)})'>

+

</button>


</div>

`;


});


}
//=========================
// PLAYLIST
//=========================


function addSong(song){


songs.push(song);

savePlayer();

renderPlaylist();


document.getElementById("search-result").innerHTML="";



if(current === -1){

    playSong(0);

}


}



function removeSong(i){


songs.splice(i,1);


savePlayer();


if(current >= songs.length){

    current = songs.length - 1;

}


renderPlaylist();


}




function renderPlaylist(){


const list =
document.getElementById("list");



if(!list)return;



list.innerHTML="";



songs.forEach((s,i)=>{


list.innerHTML += `


<div class="song">


<img src="${s.cover}">



<div 
class="song-name"
onclick="playSong(${i})">

${i+1}. ${s.title}

</div>



<button 
class="deleteBtn"
onclick="removeSong(${i})">

🗑️

</button>



</div>


`;

});


}




//=========================
// PLAYER
//=========================



function playSong(i){


if(!songs[i])return;



current=i;


savePlayer();



const s=songs[i];



player.loadVideoById(s.id);
player.playVideo();


document.getElementById("title").textContent=s.title;


document.getElementById("channel").textContent=s.channel;
// KIRIM DATA KE OVERLAY
localStorage.setItem(
    "nowPlaying",
    JSON.stringify({

        title: s.title,

        channel: s.channel,

        cover: s.cover

    })
);
if(socket.readyState===1){

    socket.send(JSON.stringify(s));

}


const disk =
document.getElementById("disk");



disk.style.backgroundImage =
`url(${s.cover})`;



disk.classList.add("play");



playing=true;



document.getElementById("play").textContent =
"⏸ Pause";



startTimer();


}




function togglePlay(){


if(!player)return;



const disk =
document.getElementById("disk");



if(playing){


player.pauseVideo();


playing=false;


disk.classList.remove("play");


document.getElementById("play").textContent =
"▶ Play";



}else{


player.playVideo();


playing=true;


disk.classList.add("play");


document.getElementById("play").textContent =
"⏸ Pause";


}


}




function nextSong(){


if(!songs.length)return;



current++;



if(current >= songs.length){

current=0;

}



playSong(current);


}




//=========================
// TIMER
//=========================



function startTimer(){


clearInterval(timer);



timer=setInterval(()=>{


if(!player)return;

if(player.getDuration() === 0)return;

const now =
player.getCurrentTime();



const dur =
player.getDuration();



document.getElementById("timer").textContent =

format(now)+" / "+format(dur);



if(dur){


document.getElementById("bar").style.width =

(now/dur*100)+"%";


}

if(socket.readyState === 1){
console.log(format(now), format(dur));
    socket.send(JSON.stringify({

        title: songs[current].title,

        channel: songs[current].channel,

        cover: songs[current].cover,

        timer: format(now) + " / " + format(dur)

    }));

}

},1000);



}



function format(sec){


if(isNaN(sec))
return "00:00";



const m =
Math.floor(sec/60);



let s =
Math.floor(sec%60);



if(s<10)s="0"+s;



return m+":"+s;


}



function onPlayerStateChange(e){


if(e.data === YT.PlayerState.ENDED){

    nextSong();

}


}





//=========================
// BUTTON EVENTS
//=========================


document
.getElementById("searchBtn")
.onclick = searchSong;



document
.getElementById("play")
.onclick = togglePlay;



document
.getElementById("next")
.onclick = nextSong;



document
.getElementById("query")
.addEventListener("keypress",e=>{


if(e.key==="Enter"){

searchSong();

}


});




//=========================
// SETTINGS BACKGROUND
//=========================


const settingsBtn =
document.getElementById("settingsBtn");


const settingsPanel =
document.getElementById("settingsPanel");


const bgUpload =
document.getElementById("bgUpload");


const overlay =
document.querySelector(".overlay");



if(settingsBtn){


settingsBtn.onclick=function(e){


e.stopPropagation();


settingsPanel.classList.toggle("show");


};


}




// LOAD BACKGROUND


const savedBg =
localStorage.getItem("playerBackground");



if(savedBg){


overlay.style.background =

`linear-gradient(
rgba(0,0,0,.45),
rgba(0,0,0,.45)
),url(${savedBg})`;



overlay.style.backgroundSize="cover";

overlay.style.backgroundPosition="center";


}





// UPLOAD BACKGROUND


if(bgUpload){


bgUpload.addEventListener("change",function(){


const file=this.files[0];


if(!file)return;



const reader=new FileReader();



reader.onload=function(e){


const image=e.target.result;



overlay.style.background =

`linear-gradient(
rgba(0,0,0,.45),
rgba(0,0,0,.45)
),url(${image})`;



overlay.style.backgroundSize="cover";

overlay.style.backgroundPosition="center";



localStorage.setItem(
"playerBackground",
image
);



};



reader.readAsDataURL(file);



});


}




// RESET BACKGROUND


const resetBg =
document.getElementById("resetBg");



if(resetBg){


resetBg.onclick=()=>{


localStorage.removeItem(
"playerBackground"
);



overlay.style.background =

`linear-gradient(
rgba(0,0,0,.45),
rgba(0,0,0,.45)
),url("bg.jpg")`;



overlay.style.backgroundSize="cover";

overlay.style.backgroundPosition="center";



};


}




// CLOSE SETTINGS


document.addEventListener("click",function(e){


if(
settingsPanel &&
!settingsPanel.contains(e.target) &&
e.target !== settingsBtn
){


settingsPanel.classList.remove("show");


}


});