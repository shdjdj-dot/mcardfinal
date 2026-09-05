const splash=document.getElementById("splash"),app=document.getElementById("app");
setTimeout(()=>{splash.classList.add("hidden");app.classList.remove("hidden")},1800);

document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
 document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
 btn.classList.add("active"); document.getElementById(btn.dataset.screen).classList.add("active");
}));

const modal=document.getElementById("ticketModal");
document.getElementById("openTicket").onclick=()=>{
 const loader=document.getElementById("loadingTicketsOverlay");
 loader.classList.remove("hidden");
 clearTimeout(window.__openTicketLoaderTimer);
 window.__openTicketLoaderTimer=setTimeout(()=>{
   loader.classList.add("hidden");
   modal.classList.remove("hidden");
   updateClock();
   startCurrentTimeAnimation();
 },1200);
};
document.getElementById("closeTicket").onclick=()=>{modal.classList.add("hidden"); clearInterval(window.currentTimePhaseTimer); document.getElementById("wallet").classList.add("active")};
modal.addEventListener("click",e=>{if(e.target===modal){modal.classList.add("hidden"); clearInterval(window.currentTimePhaseTimer)}});

document.getElementById("refreshBtn").onclick=()=>{
 const box=document.getElementById("refreshLoader");
 box.classList.remove("hidden");
 clearTimeout(window.__refreshLoaderTimer);
 window.__refreshLoaderTimer=setTimeout(()=>box.classList.add("hidden"),1200);
};

document.getElementById("buyBtn").onclick=()=>{
 alert("This demo purchase flow is ready to connect to a real ticketing API.");
};

function updateClock(){
 const now=new Date();
 const timeValue=document.querySelector("#currentTime .time-value");
 timeValue.textContent=now.toLocaleTimeString("en-GB",{hour12:false});
 const expiry=new Date("2027-07-31T23:59:59");
 let ms=Math.max(0,expiry-now);
 const days=Math.floor(ms/86400000); ms%=86400000;
 const hours=Math.floor(ms/3600000); ms%=3600000;
 const mins=Math.floor(ms/60000);
 document.getElementById("days").textContent=String(days).padStart(3,"0");
 document.getElementById("hours").textContent=String(hours).padStart(2,"0");
 document.getElementById("minutes").textContent=String(mins).padStart(2,"0");
}

function startCurrentTimeAnimation(){
 const clock=document.getElementById("currentTime");
 clearInterval(window.currentTimePhaseTimer);
 clock.classList.remove("show-time");
 window.currentTimePhaseTimer=setInterval(()=>{
   clock.classList.toggle("show-time");
 },2600);
}

setInterval(()=>{if(!modal.classList.contains("hidden"))updateClock()},1000);
updateClock();

if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
