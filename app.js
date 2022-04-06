// controls btn
let player = document.querySelector('.player');
let playBtn = document.querySelector('.btn-play');
let nextBtn = document.querySelector('.btn-next');
let prevBtn = document.querySelector('.btn-prev');
let documentShuffle = document.querySelector('.btn-shuffle');
let replayBtn = document.querySelector('.btn-repeat')
//info music
let nameAudio = document.querySelector('.name-audio');
let infoMusician = document.querySelector('.info-musician');
let previewImg = document.querySelector('.preview-img');
let audio = document.querySelector('.audio');
// progress bar
let progressContainer = document.querySelector('.progress__container');
let progress = document.querySelector('.progress');
//pause
let imgScr = document.querySelector('.img__src');


let NextTime = document.querySelector('.currentTime');
let endTime = document.querySelector('.endTime');


//информация о песнях
let info = {
    nameSong: ['Fata-Morgana','Грязь','25','Дико,например','Эминем'],
    nameMusicians: ['Oxxxymiron&Markul','Oxxxymiron','Markul','Pharaon','Oxxxymiron'],
};
//название песни по умолчанию
let songIndex = 0;
//имя музыканта по умолчанию
let musicianIndex = 0;
//инициализация
function init(song,musician) {
    nameAudio.innerHTML = song; //название песни
    infoMusician.innerHTML = musician; // имя артиста
    audio.src = `audio/${song}.mp3`; // пусть к аудиофайлу
    previewImg.src = `img/preview/title${songIndex + 1}.jpg`; //путь к картинке
}
init(info.nameSong[songIndex],info.nameMusicians[musicianIndex]);

//PLAY
function playSong(){
    player.classList.add('play');   //добавляем класс при клике
    previewImg.classList.add('preview-img-active');
    imgScr.src = `img/pause.png` //при клике меняем иконку
    audio.play();
};
//PAUSE
function pauseSong() {
    player.classList.remove('play');    //удаляем класс при клике
    previewImg.classList.remove('preview-img-active');
    imgScr.src = `img/play.png` //при клике меняем иконку
    audio.pause();
};

//При клике на play
playBtn.addEventListener('click', function () {
    const isPlaying = player.classList.contains('play'); //проверяет какой класс в данный момент у player
    //если isPlaying = play, то ставиться на паузу
    if (isPlaying){
        pauseSong();
    //если isPlaying = false, то песня запускается
    }else {
        playSong()
    }
});

//NEXT PLAY
function nextSong() {
    songIndex++
    musicianIndex++

    if (songIndex > info.nameSong.length - 1) songIndex = 0;
    if (musicianIndex > info.nameMusicians.length - 1) musicianIndex = 0;

    init(info.nameSong[songIndex],info.nameMusicians[musicianIndex]);
    playSong()
}
nextBtn.addEventListener('click',nextSong);

//PREV PLAY
function prevSong() {
    songIndex--
    musicianIndex--

    if (songIndex < 0) songIndex = info.nameSong.length - 1;
    if (musicianIndex < 0) musicianIndex = info.nameMusicians.length - 1;

    init(info.nameSong[songIndex],info.nameMusicians[musicianIndex]);
    playSong()
}
prevBtn.addEventListener('click',prevSong);

//PROGRESS BAR
function upProgress(event) {
    let {duration, currentTime} = event.srcElement;
    let progressPercent = (currentTime /duration) * 100
    progress.style.width = `${progressPercent}%`

    //НАХОДИМ ТЕКУЩЕЕ ВРЕМЯ ПЕСНИ И КОНВЕРТИРУЕМ ЕГО
    let hr  = Math.floor(currentTime / 3600);
    let min = Math.floor((currentTime - (hr * 3600))/60);
    let sec = Math.floor(currentTime - (hr * 3600) -  (min * 60));

    if (min < 10){
        min = "0" + min;
    }
    if (sec < 10){
        sec  = "0" + sec;
    }
    NextTime.innerHTML = min + ':' + sec;
}
audio.addEventListener('timeupdate',upProgress);

//click progress bar
function setProgress(event){
    let width = this.clientWidth;
    let clickX = event.offsetX
    let duration = audio.duration

    audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);
//следующая песня
audio.addEventListener('ended',nextSong);


//АНИМАЦИЯ КНОПКИ ЛАЙКА
document.querySelectorAll('.button').forEach(button => {

    button.addEventListener('click', e => {
        button.classList.toggle('liked');
        if (button.classList.contains('liked')) {
            gsap.fromTo(button, {
                '--hand-rotate': 8
            }, {
                ease: 'none',
                keyframes: [{
                    '--hand-rotate': -45,
                    duration: .16,
                    ease: 'none'
                }, {
                    '--hand-rotate': 15,
                    duration: .12,
                    ease: 'none'
                }, {
                    '--hand-rotate': 0,
                    duration: .2,
                    ease: 'none',
                    clearProps: true
                }]
            });
        }
    })

});



