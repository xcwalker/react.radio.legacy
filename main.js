function func_load() {
    
}

function update(apiURL, station) {
    fetch(apiURL)
        .then(async (data) => {
            data.json().then(res => {
                let title = "";
                let artists = "";

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

                document.title = title + " - " + artists + " | " + station + " | ReactRadio [LEGACY]";

                if (res?.now_playing?.art) {
                    document.querySelector("img#player-art").src = res?.now_playing?.art
                } else if (res.art.large) {
                    document.querySelector("img#player-art").src = res?.art.large
                } else {
                    document.querySelector("img#player-art").src = ""
                }

                if (res?.djs?.now?.displayname) {
                    document.querySelector("#dj-name").textContent = res.djs.now.displayname
                } else {
                    document.querySelector("#dj-name").textContent = ""
                }

                if (res?.djs?.now?.avatar) {
                    document.querySelector("img#dj-avatar").src = res.djs.now.avatar
                } else {
                    document.querySelector("#dj-avatar").src = ""
                }

                if (res?.djs?.now?.details) {
                    document.querySelector("#dj-details").textContent = res.djs.now.details
                } else {
                    document.querySelector("#dj-details").textContent = ""
                }
            })
        })
        .catch((error) => {
            console.error(error)
        })
}