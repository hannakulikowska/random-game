let progress = document.getElementById("progress");
const song = document.getElementById("song-audio");
const songImg = document.querySelector(".song-img");
const songName = document.querySelector(".song-name");
const singer = document.querySelector(".singer");
let playButton = document.getElementById("play");
let pauseButton = document.getElementById("pause");
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");
let currentTimeDisplay = document.getElementById("current-time");
let totalTimeDisplay = document.getElementById("total-time");

let currentTrackIndex = 0;
const audioFiles = [
  {
    audioSrc: "assets/audio/michael-jackson_-_this-is-it.mp3",
    imgSrc: "assets/img/this-is-it.jpg",
    songName: "This Is It",
    singer: "Michael Jackson"
  },
  {
    audioSrc: "assets/audio/michael-jackson_-_beat-it.mp3",
    imgSrc: "assets/img/beat-it.jpg",
    songName: "Beat It",
    singer: "Michael Jackson"
  },
  {
    audioSrc: "assets/audio/michael-jackson_-_give-in-to-me.mp3",
    imgSrc: "assets/img/give-in-to-me.jpg",
    songName: "Give In to Me",
    singer: "Michael Jackson"
  },
  {
    audioSrc: "assets/audio/freddie-mercury_-_who-wants-to-live-forever.mp3",
    imgSrc: "assets/img/who-wants-to-live-forever.jpg",
    songName: "Who Wants to Live Forever",
    singer: "Queen"
  },
  {
    audioSrc: "assets/audio/queen_-_living-on-my-own.mp3",
    imgSrc: "assets/img/living-on-my-own.jpg",
    songName: "Living on My Own",
    singer: "Freddie Mercury"
  }
];

function updateTrack() {
  const track = audioFiles[currentTrackIndex];
  songImg.src = track.imgSrc;
  songImg.alt = track.songName;
  songName.textContent = track.songName;
  singer.textContent = track.singer;
  song.src = track.audioSrc;
}

function updateTimeDisplay(currentTime, totalTime) {
  currentTimeDisplay.textContent = formatTime(currentTime);
  totalTimeDisplay.textContent = formatTime(totalTime);
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = 0; // Initial progress value
  updateTimeDisplay(0, song.duration); // Updating time display
}

function hiddenPlayButton() {
  playButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
}

function hiddenPauseButton() {
  playButton.classList.remove("hidden");
  pauseButton.classList.add("hidden");
}

function togglePlayPauseButtons() {
  playButton.classList.toggle("hidden");
  pauseButton.classList.toggle("hidden");
}

function playPause() {
  if (pauseButton.classList.contains("hidden")) {
    song.play();
    togglePlayPauseButtons();
  }
  else {
    song.pause();
    togglePlayPauseButtons();
  }
}

setInterval(() => {
  progress.value = song.currentTime;
  updateTimeDisplay(song.currentTime, song.duration); // Updating time display during playback
}, 500);

progress.onclick = function() {
  song.play();
  song.currentTime = progress.value;
  hiddenPlayButton();
}

// Go forward
song.onended = function () {
  // Checking if there is a next track in the array
  if (currentTrackIndex < audioFiles.length - 1) {
    currentTrackIndex++;
  } else {
    // If this is the last track, stop playback
    song.pause();
    hiddenPauseButton();
  }
};

// Go back onclick
prevButton.onclick = function () {
  if (currentTrackIndex > 0) {
    currentTrackIndex--;
  } else {
    // If this is the first track, go to the last track
    currentTrackIndex = audioFiles.length - 1;
  }
  updateTrack();
  // updateButtonsStyles();
  hiddenPauseButton();
  playPause();
}

// Go forward onclick
nextButton.onclick = function () {
  if (currentTrackIndex < audioFiles.length - 1) {
    currentTrackIndex++;
  } else {
    // If this is the last track, go to the first track
    currentTrackIndex = 0;
  }
  updateTrack();
  // updateButtonsStyles();
  hiddenPauseButton();
  playPause();
}

// function updateButtonsStyles() {
//   if (currentTrackIndex === 0) {
//     prev.disabled = true;
//     prev.style.opacity = 0.5;
//     next.disabled = false;
//     next.style.opacity = 1;
//   } else if (currentTrackIndex === audioFiles.length - 1) {
//     prev.disabled = false;
//     prev.style.opacity = 1;
//     next.disabled = true;
//     next.style.opacity = 0.5;
//   } else {
//     prev.disabled = false;
//     prev.style.opacity = 1;
//     next.disabled = false;
//     next.style.opacity = 1;
//   }
// }
