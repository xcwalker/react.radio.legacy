var api = "https://apiv2.simulatorradio.com/metadata/combined"
var stream = "https://simulatorradio.stream/320"

window.onload = func_load();

function func_load() {
    var interval = setInterval(function () {
        update(api, "Simulator Radio", "initial")
    }, 3000);
}

function update(apiURL, station, state) {
    fetch(apiURL)
        .then(async (data) => {
            data.json().then(res => {
                let title = "";
                let artists = "";
                let artwork = "";

                if (res?.now_playing?.title) {
                    document.querySelector("#player-title").textContent = res?.now_playing?.title;
                    title = res?.now_playing?.title;
                } else if (res.title) {
                    document.querySelector("#player-title").textContent = res?.title;
                    title = res?.title;
                } else {
                    document.querySelector("#player-title").textContent = "";
                }

                if (res?.now_playing?.artists) {
                    document.querySelector("#player-artists").textContent = res?.now_playing?.artists;
                    artists = res?.now_playing?.artists;
                } else if (res.artist) {
                    document.querySelector("#player-artists").textContent = res?.artist;
                    artists = res?.artists;
                } else {
                    document.querySelector("#player-artists").textContent = "";
                }

                if (document.body.classList.contains("state-playing")) {
                    document.title = title + " - " + artists + " | " + station + " | ReactRadio [LEGACY]";
                } else {
                    document.title = "ReactRadio [LEGACY]"
                }

                if (res?.now_playing?.art) {
                    document.querySelector("img#player-art").src = res?.now_playing?.art
                    document.querySelector("img#player-background").src = res?.now_playing?.art
                    artwork = res?.now_playing?.art;
                } else if (res.art.large) {
                    document.querySelector("img#player-art").src = res?.art.large
                    document.querySelector("img#player-background").src = res?.art.large
                    artwork = res?.art.large;
                } else {
                    document.querySelector("img#player-art").src = ""
                }

                if (res?.djs?.now?.displayname) {
                    document.querySelector("#dj-name").textContent = res.djs.now.displayname
                } else {
                    document.querySelector("#dj-name").textContent = ""
                }

                if (res?.djs?.now?.avatar) {
                    document.querySelector("img#dj-avatar").src = "https://simulatorradio.com/processor/avatar?size=256&name=" + res.djs.now.avatar
                } else {
                    document.querySelector("#dj-avatar").src = ""
                }

                if (res?.djs?.now?.details) {
                    document.querySelector("#dj-details").textContent = res.djs.now.details
                } else {
                    document.querySelector("#dj-details").textContent = ""
                }

                if ('mediaSession' in navigator) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: title,
                        artist: artists,
                        album: "ReactRadio [LEGACY]",
                        artwork: [{ src: artwork }],
                    });
        
                    navigator.mediaSession.setActionHandler('play', func_play);        
                    navigator.mediaSession.setActionHandler('pause', func_pause);  
                    navigator.mediaSession.setActionHandler('stop', func_stop);
                }
            })
        })
        .catch((error) => {
            console.error(error)
        })
}

async function func_playPause() {
    if (document.body.classList.contains("state-paused")) {
        document.body.classList.remove("state-paused")
        document.body.classList.add("state-playing")

        update(api, "Simulator Radio");
        document.querySelector("audio#player").src = stream;
        document.querySelector("audio#player").play();
    } else if (document.body.classList.contains("state-playing")) {
        document.body.classList.remove("state-playing")
        document.body.classList.add("state-paused")

        update(api, "Simulator Radio");
        document.querySelector("audio#player").src = stream;
        document.querySelector("audio#player").pause();
    }
}

async function func_play() {
    if (document.body.classList.contains("state-paused")) {
        document.body.classList.remove("state-paused")
    }
    document.body.classList.add("state-playing")

    update(api, "Simulator Radio");
    document.querySelector("audio#player").src = stream;
    document.querySelector("audio#player").play();
}

async function func_pause() {
    if (document.body.classList.contains("state-playing")) {
        document.body.classList.remove("state-playing")
    }
    document.body.classList.add("state-paused")

    update(api, "Simulator Radio");
    document.querySelector("audio#player").src = stream;
    document.querySelector("audio#player").pause();
}

async function func_stop() {
    if (document.body.classList.contains("state-playing")) {
        document.body.classList.remove("state-playing")
    }
    document.body.classList.add("state-paused")

    update(api, "Simulator Radio");
    document.querySelector("audio#player").pause();
    document.querySelector("audio#player").src = "";
}

async function func_live() {
    if (document.body.classList.contains("state-paused")) {
        document.body.classList.remove("state-paused")
    }
    document.body.classList.add("state-playing")

    update(api, "Simulator Radio");
    document.querySelector("audio#player").src = stream;
    await document.querySelector("audio#player").load();
    document.querySelector("audio#player").play();
}

function func_volume() {
    document.querySelector("audio#player").volume = document.querySelector("#player-volume").value / 100;
}