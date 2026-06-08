let globalsongs;
let currentsong = 0 
let max 
var audio 


async function makesongbars(songslist) {
  max = songslist.length
  songslist.forEach((element,index) => {
    let div = document.getElementsByClassName("songsbar")[0];
    console.log(div);
    let songname = element.split("/Songs/")[1];
    songname = songname.replaceAll("%20", " ");

    div.insertAdjacentHTML(
      "beforeend",
      `
              <div class="songdiv">
              <img src="music.svg" alt="music" />
              <p>${songname}</p>
              <img class='songsbarimg' data-audio-url="${element}" data-index=${index} src="play.svg" alt="play" />
            </div>
            `
    );
  });
  
}
async function getsongs() {
  let response = await fetch("http://127.0.0.1:5500/Songs/");
  let songshtml = await response.text();

  console.log("Yes I am running");

  let div = document.createElement("div");
  div.innerHTML = songshtml;
  let atags = div.getElementsByTagName("a");
  console.log(atags);
  let songs = [];
  for (const element of atags) {
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
      console.log(element.href);
    }
  }
  return songs;
}
async function main() {
   
  let s = await getsongs();
  globalsongs = s;
  audio = new Audio(s[0])
  setname(s[0])
  console.log(s[1]);
  await makesongbars(s);
  console.log('Audio jorea shwa')
  // let currentsong = globalsongs[0]
  
  playenable(audio)
  playpause(audio)
  prev();
  next();
  settime(audio);
  seekbarenable();
//   audio.play()
}

// function formatTime(seconds) {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;

//     const formattedMins = mins.toString().padStart(2, '0');
//     const formattedSecs = secs.toString().padStart(2, '0');

//     return `${formattedMins}:${formattedSecs}`;
// }





function playenable(audio) {
  let songsbarimg = document.getElementsByClassName('songsbarimg')
  Array.from(songsbarimg).forEach((element,index) => {
    element.addEventListener("click",(e)=>{
      // audio.src = e.target.getAttribute("data-audio-url")
      console.log('Current song is ',currentsong )
      playaudio(e.target.getAttribute("data-audio-url"))
      currentsong = parseInt(e.target.getAttribute("data-index"))
      
      console.log(typeof(currentsong),'type is pata')
      
    })
    
  });
  }
  
function playpause(audio)
{
  let button = document.getElementById("playbutton")
  button.addEventListener('click',()=>{
      if(audio.paused)
        {
          audio.play()
          button.src = 'pause.svg'
        }
        else
        {
          audio.pause()
          button.src='play.svg'
        }
      })
      
    }
    
    function prev()
    {
      let button = document.getElementById("prevbutton")
      button.addEventListener("click",()=>{
        if((currentsong) == 0)
          {
        currentsong = max -1
      }
      else{
        currentsong = currentsong - 1
      }
      playaudio(globalsongs[currentsong])
    })
  }
  
  function next()
  {
    
    let button = document.getElementById("nextbutton")
    button.addEventListener("click",()=>{
      if((currentsong) == max-1)
        {
          currentsong = 0
          console.log("Current song if",currentsong)
        }
        else{
          currentsong = currentsong + 1;
          console.log("Current song else", currentsong)
        }
        
        playaudio(globalsongs[currentsong])
      })
    }
// function seekbarenable(){
//   let bar = document.querySelector('.seekbar')
//   bar.addEventListener('click',(e)=>{
    
//     let width = e.target.offsetWidth;
//     let offset = e.offsetX   
//     let circle = document.querySelector('.circle')
//     circle.style.left = ((offset / width) * 100) + '%';
//     audio.currentTime= audio.duration*(offset / width)
//   })
// }
function seekbarenable() {
  let bar = document.querySelector('.seekbar');
  let circle = document.querySelector('.circle');

  // Seek on click
  bar.addEventListener('click', (e) => {
    let width = bar.offsetWidth;
    let offset = e.offsetX;

    let percentage = (offset / width) * 100;
    circle.style.left = percentage + '%';

    if (!isNaN(audio.duration)) {
      audio.currentTime = audio.duration * (offset / width);
    }
  });

  // Enable dragging
  let isDragging = false;

  circle.addEventListener('mousedown', (e) => {
    isDragging = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      let barRect = bar.getBoundingClientRect();
      let offsetX = e.clientX - barRect.left;

      // Clamp offset between 0 and bar width
      offsetX = Math.max(0, Math.min(offsetX, bar.offsetWidth));
      let percentage = (offsetX / bar.offsetWidth) * 100;

      circle.style.left = percentage + '%';

      if (!isNaN(audio.duration)) {
        audio.currentTime = audio.duration * (offsetX / bar.offsetWidth);
      }
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

    function settime(audio)
    {
      audio.addEventListener("timeupdate",()=>{
        
        let curtime = formatTime(audio.currentTime)
        let duration = formatTime(audio.duration)
        let durationbox = document.getElementById("duration")
        let circle = document.querySelector('.circle')
        if(!Number.isNaN(curtime) && !Number.isNaN(duration))
          {
        durationbox.innerHTML=`${curtime}/${duration}`
        circle.style.left = ((audio.currentTime / audio.duration) * 100) + '%';
        
      }
      else{
        durationbox.innerHTML="00:00/00:00"
        circle.style.left = 0 + '%'
      }
    })
  }
  
  function playaudio(url)
  {
    audio.src=url
    audio.play()
    let playbutton=document.getElementById("playbutton")
    playbutton.src='pause.svg'
    setname(url)
  }
  function UrltoName(url){
    let songname = url.split("/Songs/")[1];
  songname = songname.replaceAll("%20", " ");
  return songname;
}

function setname(url)
{
  let songnamediv = document.getElementById("songname")
  songnamediv.innerHTML= UrltoName(url)
}

function formatTime(secondsFloat) {
    // Ignore the decimal part, use whole seconds only
    const totalSeconds = Math.floor(secondsFloat);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format parts
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    if(Number.isNaN(secondsFloat))
    {
      return NaN
    }
    else if (hours > 0) {
        // Show H:MM:SS
        return `${hours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
        // Show MM:SS (no hours)
        return `${minutes}:${formattedSeconds}`;
    }
}






// let songsbarimg = document.getElementById('songsbarimg')
//     songsbarimg.addEventListener("click",(e)=>{
  //         audio.src = target.audio-url
  //         audio.play()
  //     })
  main();
