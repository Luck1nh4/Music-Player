// Seleção de Elementos do DOM
const btnPlay = document.querySelector("#btn-play");
const btnPause = document.querySelector('.btnPause');
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const musicName = document.querySelector("#music-name");
const musicAutor = document.querySelector("#music-autor");
const playerCurrentTime = document.querySelector("#player-current-time");
const playerDuration = document.querySelector("#player-duration");
const playerProgress = document.querySelector("#player-progress");
const audioPlayer = document.querySelector("#audio-player");

// Variáveis e Constantes
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
        path: "./music/ColdPlay - Sky Full Of Stars.mp3"
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
    }
];

// Event Listeners
btnPlay.addEventListener("click", () => togglePlayMusic());
btnPrev.addEventListener("click", () => changeMusic(false));
btnNext.addEventListener("click", () => changeMusic(true));
btnPause.addEventListener('click', ()=>  pauseMusic());
audioPlayer.addEventListener("timeupdate", () => timeUpdate());
audioPlayer.addEventListener("ended", () => { // Adicionando event listener para o fim da música
    changeMusic(true); // Avançar para a próxima música quando a música atual terminar
});

// Funções de Toggle e Controle de Reprodução
const togglePlayMusic = () => {
    if (audioPlayer.paused){
        audioPlayer.play();
        btnPause.style.display = 'block';
        btnPlay.style.display = 'none';
    } else {
        audioPlayer.pause();
        btnPause.style.display = 'none';
        btnPlay.style.display = 'block';
    }
};

const pauseMusic = () => {
    audioPlayer.pause();
    btnPause.style.display = 'none';
    btnPlay.style.display = 'block';
};

const changeMusic = (next) => {
    if (next && currentMusic < musics.length - 1){
        currentMusic++;
    } else if (!next && currentMusic > 0){
        currentMusic--;
    } else if (next && currentMusic === musics.length - 1) { // Se estiver na última música e avançar
        currentMusic = 0; // Volta para a primeira música
    }
    updatePlayer();
    togglePlayMusic(); // Adicionando a função para tocar a música diretamente após a mudança
};

const updatePlayer = () => {
    const music = musics[currentMusic];
    musicName.innerHTML = music.name;
    musicAutor.innerHTML = music.author;
    audioPlayer.src = music.path;
};

const timeUpdate = () => {
    const {currentTime, duration} = audioPlayer;
    if(isNaN(duration)) return;
    playerDuration.innerHTML = formatSecondsToMinutes(duration);
    playerCurrentTime.innerHTML = formatSecondsToMinutes(currentTime);
    playerProgress.max = duration;
    playerProgress.value = currentTime;
};

const formatSecondsToMinutes = (seconds) => {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
};

window.onload = () => {
    updatePlayer();
};

// Função para aumentar o volume
const increaseVolume = () => {
    if (audioPlayer.volume < 1) {
        audioPlayer.volume += 0.1; // Aumenta o volume em 10%
    }
};

// Função para diminuir o volume
const decreaseVolume = () => {
    if (audioPlayer.volume > 0) {
        audioPlayer.volume -= 0.1; // Diminui o volume em 10%
    }
};

// Event Listeners para os botões de controle de volume
document.querySelector("#btn-volume-up").addEventListener("click", increaseVolume);
document.querySelector("#btn-volume-down").addEventListener("click", decreaseVolume);
