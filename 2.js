let currentSong = new Audio();

let songs=[];
let currfolder;
let cardcontainer=document.querySelector(".cardcontainer");
function secondsToMinutes(seconds){
    if(isNaN(seconds) || !isFinite(seconds) || seconds < 0){
        return "00:00";
    }
    const min=Math.floor(seconds/60);
    const remainingsecond=Math.floor(seconds%60);
                                /* length, charactertobeadded*/
    const formattedmin=String(min).padStart(2,'0');
    const formattedremain=String(remainingsecond).padStart(2,'0');

    return `${formattedmin}:${formattedremain}`;

}

/* get song in array same song */
/* async function getsongs(folder){
    currfolder=folder;
    let a=await fetch(`/${currfolder}/`);
    let response=await a.text();
    console.log(response);
    let div=document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    songs=[];
    for(let index=0;index<as.length;index++){
        const element=as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/${currfolder}/`)[1]);
        }
    }
    
let songul=document.querySelector(".songlist").getElementsByTagName("ul")[0]
songul.innerHTML="";
for(const song of songs){
    let songName = song.replace(/-\d+\.mp3$/, "");

    if (songName.length>19) {
        songName = songName.slice(0, 19) + "...";
    }
    songul.innerHTML=songul.innerHTML + `<li data-song="${song}">
     <img src="music.svg" alt="" class="invert same" >
                        <div class="info">
                            <div>${songName.replace(/-\d+\.mp3$/, "")}</div>
                            <div>Song Artist</div>
                        </div>
                        <div class="playnow">
                            <span>Play Now</span>
                            <img src="play-circle.svg" alt="" class="invert same">
    
     </li>`
}
//attach  an event listner of each object
//ATTACK EVENT LISTNER TO EACH SONG WHEN CLICK PLAY
Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    /* we are taking music one by one then e.eventlistner 
    li1.addEventListener("click", () => {
    playMusic("A.mp3");
}); */
    /*e.addEventListener("click",element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML);
        playMusic(e.dataset.song);
    })
    
})
} */

async function getsongs(folder) {

    currfolder = folder;

    const repo = "Kanchan-Phulera/spotify";

    let res = await fetch(
        `https://api.github.com/repos/${repo}/contents/${folder}`
    );

    if (!res.ok) {
        console.log("Cannot load folder:", res.status);
        return;
    }

    let files = await res.json();

    songs = [];

    // Find MP3 files
    for (const file of files) {

        if (file.type === "file" && file.name.endsWith(".mp3")) {
            songs.push(file.name);
        }

    }

    console.log("Songs:", songs);

    let songul = document
        .querySelector(".songlist")
        .getElementsByTagName("ul")[0];

    songul.innerHTML = "";

    for (const song of songs) {

        let songName = song.replace(/-\d+\.mp3$/, "");

        if (songName.length > 19) {
            songName = songName.slice(0, 19) + "...";
        }

        songul.innerHTML += `
            <li data-song="${song}">
                
                <img src="music.svg" class="invert same">

                <div class="info">
                    <div>${songName}</div>
                    <div>Song Artist</div>
                </div>

                <div class="playnow">
                    <span>Play Now</span>
                    <img src="play-circle.svg" class="invert same">
                </div>

            </li>
        `;
    }

    // Add click event to each song
    Array.from(
        document.querySelector(".songlist").getElementsByTagName("li")
    ).forEach(e => {

        e.addEventListener("click", () => {

            console.log("Playing:", e.dataset.song);

            playMusic(e.dataset.song);

        });

    });
}

//playMusic fucntion
/*  playmusic function */
const playMusic = (track) => {

    const url = `./${currfolder}/${encodeURIComponent(track)}`;

    console.log("currfolder:", currfolder);
    console.log("track:", track);
    console.log("URL:", url);
    currentSong.src = url;
    currentSong.play();
    document.getElementById("play").src = "pause-circle.svg";
    document.querySelector(".songinfo").innerHTML = decodeURIComponent(track);
    document.querySelector(".songtime").innerHTML = "00:00/00:00";
};

/* async function displayAlbums() {

    let a = await fetch("/songs/");
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let anchors = div.getElementsByTagName("a");

    for (const e of anchors) {
        if (
            e.href.includes("/songs/") &&
            !e.href.endsWith(".mp3") &&
            !e.href.endsWith(".jpg") &&
            !e.href.endsWith(".json")
        ) {

            // Get folder name
            let parts = e.href.split("/").filter(x => x);
            let folder = parts[parts.length - 1];

            console.log("Folder:", folder);

            let res = await fetch(`/songs/${folder}/info.json`);

            if (!res.ok) {
                console.log(`Cannot find /songs/${folder}/info.json`);
                continue;
            }

            let response = await res.json();

            cardcontainer.innerHTML += `
            <div class="card" data-folder="${folder}">
                <div class="play">
                    <img src="play.svg" alt="playbutton">
                </div>

                <img src="/songs/${folder}/cover.jpg">

                <h2>${response.title}</h2>
                <p>${response.description}</p>
            </div>`;
        }
    }

    // Add click event after cards are created
    Array.from(document.getElementsByClassName("card")).forEach(card => {
        card.addEventListener("click", async (item) => {
            await getsongs(`songs/${item.currentTarget.dataset.folder}`);
            playMusic(songs[0]);
        });
    });
    return songs;
} */

    async function displayAlbums() {

    const repo = "Kanchan-Phulera/spotify";

    let res = await fetch(
        `https://api.github.com/repos/${repo}/contents/songs`
    );

    if (!res.ok) {
        console.log("GitHub API error:", res.status);
        return;
    }

    let folders = await res.json();

    console.log("Folders:", folders);

    for (const item of folders) {

        // Only take folders
        if (item.type !== "dir") {
            continue;
        }

        let folder = item.name;

        console.log("Folder:", folder);

        let infoRes = await fetch(
            `./songs/${encodeURIComponent(folder)}/info.json`
        );

        if (!infoRes.ok) {
            console.log(`Cannot find info.json for ${folder}`);
            continue;
        }

        let info = await infoRes.json();

        cardcontainer.innerHTML += `
            <div class="card" data-folder="${folder}">

                <div class="play">
                    <img src="play.svg" alt="playbutton">
                </div>

                <img src="./songs/${encodeURIComponent(folder)}/cover.jpg">

                <h2>${info.title}</h2>
                <p>${info.description}</p>

            </div>
        `;
    }

    // Add click event to cards
    Array.from(document.getElementsByClassName("card")).forEach(card => {

        card.addEventListener("click", async (item) => {

            await getsongs(
                `songs/${item.currentTarget.dataset.folder}`
            );

            if (songs.length > 0) {
                playMusic(songs[0]);
            }

        });

    });
}
async function main(){
    //let the list of all the songs from getsongs fucntion
    await getsongs("songs");
    await displayAlbums();

//DISPLAY ALL THE ALBUM ON THE SCREEN


//ATTACH EVENT LISTNER TO PLAY
//THEN NEXT
//THEN PREV
//SO THAT WE CAN GIVE THE FUNCTIONALITY TO THIS BUTTOM WHEN CLICK
//IT WILL WORK ACCORDING TO IT
const play=document.getElementById("play");

play.addEventListener("click",()=>{ //play actionlistner
    if(currentSong.paused){
        currentSong.play();
        play.src="pause-circle.svg";  //play->pause
    }else{
        currentSong.pause();
        play.src="play.svg"  //pause->play icon show
    }
})

//listen for timeupdate event 
currentSong.addEventListener("timeupdate",()=>{
    /* currentsong time update */
    /* console.log(currentSong.currentTime,currentSong.duration); */
    
    /* songtime innerhtml change */
    document.querySelector(".songtime").innerHTML=`${secondsToMinutes(currentSong.currentTime)}/
    ${secondsToMinutes(currentSong.duration)}`;

    /* seekbar chnage as time is going forward*/
    document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 + "%";
})
//add an event listner to seekbar
document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
    document.querySelector(".circle").style.left=percent +"%";
    /* seekbar forwrd kar diya then also we have to change the song time duration also so that song also so forward or where ever we want it to go */

    currentSong.currentTime=((currentSong.duration)*percent)/100;
})

// add an event listner for hamburger 
document.querySelector(".hamburger").addEventListener("click",()=>{
    /* when click then left side will show  */
    /* left side open */
    document.querySelector(".left").style.left ="0";
     })

    /* close event listner add when click on close then left part should we not visible */
    document.querySelector(".close").addEventListener("click",()=>{
        /* left show 0-(-100px) */
        document.querySelector(".left").style.left="-370%";
    })


    /* add an event listner to previous and next */
    /* when previous  click it should play previous song*/
    let previous=document.getElementById("previous");
    previous.addEventListener("click",()=>{
        console.log("previous clicked");
        console.log(currentSong.src);
        let find = decodeURIComponent(
            currentSong.src.split("/").slice(-1)[0]
        )
        let index = songs.indexOf(find);
        if(index >0){
            playMusic(songs[index-1]);
        }
    })


    /* for next  */
    /* when next click it should play next song of */
    /* song */
    /* song access */
    let next=document.getElementById("forward");
    next.addEventListener("click",()=>{
        console.log("next clicked");
        /* split then last songs name */
        let find = decodeURIComponent(
            currentSong.src.split("/").slice(-1)[0]
        )
        let index = songs.indexOf(find);
        if(index+1 <songs.length){
            playMusic(songs[index+1]);
        }
    })

    //ADD na event to volume
    document.querySelector(".range input").addEventListener("input",(e)=>{
        currentSong.volume=parseInt(e.target.value)/100;
    })

    
        
}



main();