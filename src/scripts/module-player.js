const playerContainer = $('.player');
const player = $('.player__elem')[0];

let eventsInit = () => {
    $('.player__start').on('click', e => {
        e.preventDefault();

        if (playerContainer.hasClass('paused')) {
            player.pause();
        } else {
            player.play();
        }
    })

    $('.player__playback').on('click', e => {
        const playbackBar = $(e.currentTarget);
        const playbackBarClickedPosition = e.originalEvent.layerX;
        const newButtonPositionPercent = (playbackBarClickedPosition / playbackBar.width()) * 100;
        const newPlaybackPositionSec = (player.duration / 100) * newButtonPositionPercent;

        $('.player__playback-button').css({
            left: `${newButtonPositionPercent}%`
        });

        player.currentTime = newPlaybackPositionSec;
    })

    $('.player__volume').on('click', e => {
        const volumeBar = $(e.currentTarget);
        const volumeBarclickedPosition = e.originalEvent.layerX;
        let newVolumePositionPercent = (volumeBarclickedPosition / volumeBar.width()) * 100;

        if (newVolumePositionPercent < 0) newVolumePositionPercent = 0;

        $('.player__volume-button').css({
            left: `${newVolumePositionPercent}%`
        });

        player.volume = newVolumePositionPercent / 100;
    })

    let playerVolumeNow = player.volume;
    $('.player__speaker-btn').on('click', e => {
        if (player.volume != 0) {
            player.volume = 0;
            $('.player__volume-button').css({
                left: '0%'
            });
        } else {
            player.volume = playerVolumeNow;
            $('.player__volume-button').css({
                left: `${playerVolumeNow*100}%`
            });
        }
    })

    $('.player__splash').on('click', e => {
        player.play();
    })

    $('.player__elem').on('click', e => {
        player.pause();
    })
}

player.onpause = () => {
    playerContainer.removeClass('active');
    playerContainer.removeClass('paused');
}

player.onplay = () => {
    playerContainer.addClass('active');
    playerContainer.addClass('paused')
}

eventsInit();


// ================= YOUTUBE API ========================

// let player;
// const playerContainer = $('.player');

// let eventsInit = () => {
//     $('.player__start').on('click', e => {
//         e.preventDefault();

//         if (playerContainer.hasClass('paused')){
//             player.pauseVideo();
//         } else {
//             player.playVideo();
//         }
//     })

//     $('.player__playback').on('click', e => {
//         const bar = $(e.currentTarget);
//         const clickedPosition = e.originalEvent.layerX;
//         const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
//         const newPlabackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

//         $('.player__playback-button').css({
//             left: `${newButtonPositionPercent}%`
//         });

//         player.seekTo(newPlabackPositionSec);
//     })

//     $('.player__splash').on('click', e => {
//         player.playVideo();
//     })
// }

// const formatTime = timeSec => {
//     const roundTime = Math.round(timeSec);

//     const minutes = addZero(Math.floor(roundTime / 60));
//     const seconds = addZero(roundTime - minutes * 60);

//     function addZero(num) {
//         return num < 10 ? `0${num}` : num;
//     }

//     return `${minutes}:${seconds}`;
// }

// const onPlayerReady = () => {
//     let interval;
//     const durationSec = player.getDuration();

//     $('.player__duraction-estimate').text(formatTime(durationSec));

//     if (typeof interval !== 'undefined') {
//         clearInterval(interval);
//     }

//     interval = setInterval(() => {
//         const completedSec = player.getCurrentTime();
//         const completedPercent = (completedSec / durationSec) * 100;

//         $('.player__playback-button').css({
//             left: `${completedPercent}%`
//         })
//         $('.player__duraction-completed').text(formatTime(completedSec))
//     }, 1000);
// }

// const onPlayerStateChange = e => {
//     /*
//         -1 – воспроизведение видео не началось
//         0 – воспроизведение видео завершено
//         1 – воспроизведение
//         2 – пауза
//         3 – буферизация
//         5 – видео находится в очереди
//     */
//     switch (e.data) {
//         case 1:
//             playerContainer.addClass('active');
//             playerContainer.addClass('paused');
//             break;

//         case 2:
//             playerContainer.removeClass('active');
//             playerContainer.removeClass('paused');
//             break;
//     }
// }

// function onYouTubeIframeAPIReady() {
// player = new YT.Player('yt-player', {
//     height: '405',
//     width: '660',
//     videoId: 'JsW8h4zmlS4',
//     events: {
//         'onReady': onPlayerReady,
//         'onStateChange': onPlayerStateChange
//     },
//     playerVars: {
//         controls: 0,
//         disablekb: 0,
//         showinfo: 0,
//         rel: 0,
//         autoplay: 0,
//         modestbranding: 0
//     }
// });
// }

// eventsInit();