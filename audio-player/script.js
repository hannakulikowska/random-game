let progress = document.getElementById("progress");
let song = document.getElementById("song");
let play = document.getElementById("play");
let pause = document.getElementById("pause");

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
}

function playPause() {
  if (pause.classList.contains("hidden")) {
    song.play();
    play.classList.toggle("hidden");
    pause.classList.toggle("hidden");
  }
  else {
    song.pause();
    play.classList.toggle("hidden");
    pause.classList.toggle("hidden");
  }
}

if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  },500);
}

progress.onchange = function() {
  song.play();
  song.currentTime = progress.value;
  play.classList.add("hidden");
  pause.classList.remove("hidden");
}
