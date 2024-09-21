const audio = document.querySelector(".audio");
const rotate_img = document.querySelector(".rotate_img img");
//<i class="fa-solid fa-pause"></i>
const pre_btn = document.querySelector(".previous_btn");
const nxt_btn = document.querySelector(".next_btn");
const pause_btn = document.querySelector(".pause_btn");
const progress_bar = document.querySelector("#progress_bar");
let total_duration = document.querySelector(".song_duration_total");
let rem_duration = document.querySelector(".song_duration_rem");


const partyColors = [
    "#FF0066",  // Electric Pink
    "#39FF14",  // Neon Green
    "#FF4500",  // Hot Orange
    "#00FFFF",  // Vivid Cyan
    "#DFFF00",  // Lime Yellow
    "#007BFF",  // Electric Blue
    "#8A2BE2",  // Neon Purple
    "#FF0000",  // Bright Red
    "#FF00FF",  // Fluorescent Magenta
    "#FFD700",  // Sunshine Yellow
    "#FF5E78",  // Coral Pink
    "#40E0D0",  // Turquoise Blue
    "#FF5733",  // Vivid Orange
    "#FFFF66",  // Laser Lemon
    "#EE82EE"   // Bright Violet
  ];
let scene = document.querySelector(".scene");
function stars(){
    const mediaQuery = window.matchMedia("max-width:480px");
    if(mediaQuery.matches){
        var count = 200;
    }else{
        var count = 400;
    }
    
    
    let i = 0;
    while(i < count){
        let stars = document.createElement("i");
        
        let x = Math.floor(Math.random() * window.innerWidth);
        let y = Math.floor(Math.random() * window.innerHeight);
        let duration = Math.random() * 10;
        let size = Math.random() * 2;
        let color_no = Math.floor(Math.random() * 16);
        stars.style.left = x + 'px';
        stars.style.top = y + 'px';
        stars.style.width = 1 + size*5 + 'px';
        stars.style.height = 1 + size*5 + 'px';
        stars.style.animationDuration =  5 + duration + 's';
        stars.style.animationDelay = duration + 's';
        stars.style.background = partyColors[color_no];
        scene.appendChild(stars);
        i++;
    }
    
}
stars();

pause_btn.addEventListener("click", ()=> {
    if(audio.paused){
        audio.play();
        console.log(audio.duration);
        document.querySelector(".change_btn").classList.remove("fa-play");
        document.querySelector(".change_btn").classList.add("fa-pause");

    }else{
        audio.pause();
        document.querySelector(".change_btn").classList.remove("fa-pause");
        document.querySelector(".change_btn").classList.add("fa-play");
    }
    
})
nxt_btn.addEventListener("click", ()=> {
    audio.currentTime += 10;
})
pre_btn.addEventListener("click", ()=> {
    audio.currentTime -= 10;
})

audio.addEventListener("play", ()=> {
    rotate_img.setAttribute("class", "rotating_img");
    let time_min = Math.floor(audio.duration /60);
    let time_sec = Math.floor(audio.duration) %60
    total_duration.innerHTML =`${time_min}:${time_sec}`;
})

audio.addEventListener("pause", ()=> {
    rotate_img.classList.add("paused_ani");
   
})
//Update Progress_Bar:
audio.addEventListener("timeupdate", ()=>{
    const progress = (audio.currentTime / audio.duration) * 100;
    progress_bar.value = progress;
    let time_min = Math.floor(audio.currentTime /60);
    let time_sec = Math.floor(audio.currentTime) %60
    rem_duration.innerHTML =`${time_min}:${time_sec}`;
    
})

progress_bar.addEventListener("input", ()=> {
    audio.currentTime = (progress_bar.value /100) * audio.duration;
});
