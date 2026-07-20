const SERVER_URL = window.location.origin;

/* ==========================
   ABIZARD WIDGETS DEV
   Navigation System
========================== */

function showPage(pageId){

    // Simpan halaman terakhir
    localStorage.setItem("lastPage", pageId);

    // Sembunyikan semua halaman
    document.querySelectorAll(".page").forEach(page=>{
        page.classList.remove("active");
    });

    // Tampilkan halaman
    const target = document.getElementById(pageId);

    if(target){
        target.classList.add("active");
    }

    // Scroll ke atas
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

/* ==========================
   LOAD LAST PAGE
========================== */

document.addEventListener("DOMContentLoaded",()=>{

    const lastPage = localStorage.getItem("lastPage") || "home";

    showPage(lastPage);

});

/* ==========================
   BACKGROUND PARTICLES
========================== */

const particles = document.getElementById("particles");

if(particles){

    for(let i=0;i<60;i++){

        const dot=document.createElement("span");

        dot.style.position="absolute";
        dot.style.width="3px";
        dot.style.height="3px";
        dot.style.background="#00e5ff";
        dot.style.borderRadius="50%";

        dot.style.left=Math.random()*100+"%";
        dot.style.top=Math.random()*100+"%";
        dot.style.opacity=Math.random();

        const speed=5+Math.random()*10;

        dot.style.animation=`float ${speed}s linear infinite`;

        particles.appendChild(dot);

    }

}

const style=document.createElement("style");

style.innerHTML=`

@keyframes float{

0%{
transform:translateY(0);
}

50%{
transform:translateY(-40px);
}

100%{
transform:translateY(0);
}

}

`;

document.head.appendChild(style);

/* ==========================
   OPEN WIDGET
========================== */

function openWidget(url){
    window.location.href = url;
}

/* ==========================
   COPY URL
========================== */

function copyURL(path){

    navigator.clipboard.writeText(SERVER_URL + "/" + path)
    .then(()=>{
        alert("URL berhasil dicopy!");
    })
    .catch(()=>{
        alert("Gagal copy URL");
    });

}