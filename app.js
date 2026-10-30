(function(){
"use strict";
var $=function(id){return document.getElementById(id)};
var stops=[
 {badge:"QUEST 1 • MEMORY LANE",title:"Camelot",clue:"Where friends and memories call home, where so many familiar faces roam. Your birthday adventure starts right here!",mission:"🏠 Go to Camelot and take a selfie with at least two people."},
 {badge:"QUEST 2 • TREASURE HUNT",title:"Goodwill",clue:"One person's treasure is another person's delight. Find something funny, weird or completely ridiculous!",mission:"🛍️ Find the funniest thing you can. Take a selfie with it. You don't even have to buy it! 😂"},
 {badge:"QUEST 3 • BIRTHDAY MEAL",title:"Twisted Lobster",clue:"You've laughed, you've hunted, and you've made it this far. Now it's time to sit down, relax and enjoy.",mission:"🥂 Have a birthday toast together. Have the waitress take a picture to celebrate 75 years of Bonnie!"},
 {badge:"QUEST 4 • SWEET FINISH",title:"Your Final Stop",clue:"You've earned something SWEET. Your choice of what and where you get dessert.",mission:"🍦 Go to your final dessert destination, choose something delicious, and take one last birthday selfie!"}
];
var hashes=["e6e3b4796d13f4542bca9178a5929a9b3a1225275e693da89fa98ff7adc8fb00","84e209e71a576fc461726216c94f0d0539fbf2c0063d0953c29148db30d75fba","32ed370f80e11ab2a49ce16c112c3ddedc3de5ec6f9daebb611cf80c6ceb462f","cc32b3b096fb97b18e65c873f8b04d94eb8776cdb95a3d8c373c7ebc51249918"];
var KEY="bonnieQuest.v1",st={q:0,done:false};
try{var s=JSON.parse(localStorage.getItem(KEY));if(s&&typeof s.q==="number")st=s}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}}
function render(){
  var last=false;
  $("unlock").classList.toggle("hidden",last);
  var fin=st.q>=stops.length;
  $("quest").classList.toggle("hidden",fin);$("final").classList.toggle("hidden",!fin);
  if(fin)return;
  var s=stops[st.q],n=st.q+1;
  $("badge").textContent=s.badge;$("title").textContent=s.title;$("clue").textContent=s.clue;$("mission").textContent=s.mission;
  $("bar").style.width=(n/stops.length*100)+"%";
  $("complete").classList.toggle("hidden",st.done);$("after").classList.toggle("hidden",!st.done);
  $("finish").classList.toggle("hidden",!last);
  var msg=encodeURIComponent("Bonnie finished Quest "+n+"!");
  $("sms").href="sms:+14438670601?&body="+msg;
  $("mail").href="mailto:?subject="+msg+"&body="+msg;
  $("err").textContent="";$("code").value="";
}
async function sha(t){var b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t));return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,"0")}).join("")}
$("complete").addEventListener("click",function(){st.done=true;save();render()});
$("finish").addEventListener("click",function(){st.q=stops.length;st.done=false;save();render();window.scrollTo(0,0)});
async function unlock(){
  var v=$("code").value.toUpperCase().replace(/[^A-Z0-9]/g,"");
  if(!v){$("err").textContent="Type the code first 🙂";return}
  if(!(window.crypto&&crypto.subtle)){$("err").textContent="This browser can't check codes here.";return}
  if(await sha(v)===hashes[st.q]){st.q++;st.done=false;save();render();window.scrollTo(0,0)}
  else $("err").textContent="Hmm, that's not it. Try again! 🎃";
}
$("go").addEventListener("click",unlock);
$("code").addEventListener("keydown",function(e){if(e.key==="Enter")unlock()});
$("reset").addEventListener("click",function(){if(confirm("Start the quest over from Quest 1?")){st={q:0,done:false};save();render()}});
render();
var sky=$("sky");if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
var c=["#f28c28","#ffd166","#e0457b","#c77dff","#7bd389","#4cc9f0"];
for(var i=0;i<9;i++){var b=document.createElement("div");b.className="balloon";b.style.left=(i*11+Math.random()*6)+"%";b.style.background=c[i%6];b.style.animationDuration=(14+Math.random()*10)+"s";b.style.animationDelay=(-Math.random()*20)+"s";sky.appendChild(b)}
for(var j=0;j<40;j++){var f=document.createElement("div");f.className="confetti";f.style.left=Math.random()*100+"%";f.style.background=c[j%6];f.style.animationDuration=(6+Math.random()*7)+"s";f.style.animationDelay=(-Math.random()*12)+"s";if(j%3===0)f.style.borderRadius="50%";sky.appendChild(f)}}
})();
