const btnPlay = document.querySelector("#btn-play")
const btnPause = document.querySelector('.btnPause')
const btnPrev = document.querySelector("#btn-prev")
const btnNext = document.querySelector("#btn-next")
const musicName = document.querySelector("#music-name")
const musicAutor = document.querySelector("#music-autor")
const playerCurrentTime = document.querySelector("#player-current-time")
const playerDuration = document.querySelector("#player-duration")
const playerProgress = document.querySelector("#player-progress")
const audioPlayer = document.querySelector("#audio-player")

let currentMusic = 0;

const musics = [
    {
    name: "Dance",
    author: "PlanetShakers",
    path: "./music/PlanetShakers - Dance.mp3",
},
{
    name: "Phenomena",
    author: "Hillsong Young and Free",
    path: "./music/Hillsong Young And Free - Phenomena.mp3",
},
{
    name: "Sky Full Of Stars",
    author: "ColdPlay",
    path: "./music/ColdPlay - Sky Full of Stars.mp3"
},
{
    name: "Echo",
    author: "Elevation Worship (feat Tauren)",
    path: "./music/Elevation Worship - Echo.mp3",
},
{
    name: "Wake",
    author: "Hillsong Young And Free",
    path:"./music/Hillsong Young And Free - Wake.3gpp"
},
{
    name: "Grande é o Senhor",
    author: "Adhemar de Campos",
    path: "./music/Adhemar de Campos - Grande é o Senhor.mp3"
}]

btnPlay.addEventListener("click", () => togglePlayMusic())
btnPrev.addEventListener("click", () => changeMusic(false))
btnNext.addEventListener("click", () => changeMusic())
btnPause.addEventListener('click', ()=>  pauseMusic())
audioPlayer.addEventListener("timeupdate", () => timeUpdate())

const togglePlayMusic = () => {
    if (audioPlayer.paused){
        audioPlayer.play()
        
        btnPause.style.display = 'block'
        btnPlay.style.display = 'none'
    } 
}

const pauseMusic = () => {
        audioPlayer.pause()
        
        btnPause.style.display = 'none'
        btnPlay.style.display = 'block'
    }

const changeMusic = (next = true) => {
    if (next && currentMusic < musics.length - 1){
        currentMusic++
    } else if (!next && currentMusic > 0){
        currentMusic--
    }else {
        return
    }

    updatePlayer()
    togglePlayMusic()
}

const updatePlayer = () => {
    const music = musics[currentMusic]

    musicName.innerHTML = music.name
    musicAutor.innerHTML = music.author
    audioPlayer.src = music.path
}

const timeUpdate = () => {
    const {currentTime, duration} = audioPlayer

    if(isNaN(duration)) return

    playerDuration.innerHTML = formatSecondsToMinutes(duration)
    playerCurrentTime.innerHTML = formatSecondsToMinutes(currentTime)
    playerProgress.max = duration
    playerProgress.value = currentTime
}

const formatSecondsToMinutes = (seconds) => {
    return new Date(seconds * 1000).toISOString().slice(14, 19)
}

window.onload = () => {
    updatePlayer()
}