// APlayer
const aplayer = document.getElementById('aplayer');
if(aplayer) {

    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);
    

    let dataSinger = aplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: aplayer,
        audio: [
        {
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar
        }
        ],
        autoplay: true
    });
    
    const avatar = document.querySelector(".singer-detail .inner-avatar");
    const avatar2 = document.querySelector(".aplayer .aplayer-pic");

    ap.on('play', function () {
        avatar.style.animationPlayState = "running";
        avatar2.style.animationPlayState = "running";
    });

    ap.on('pause', function () {
        avatar.style.animationPlayState = "paused";
        avatar2.style.animationPlayState = "paused";
    });

}
// End APlayer


//LIKE
const buttonLike = document.querySelector("[button-like]");
if(buttonLike) {
  buttonLike.addEventListener("click", () => {
    const id = buttonLike.getAttribute("button-like");
    const data = {
        id: id
    };

    if(buttonLike.classList.contains("active")) {
        buttonLike.classList.remove("active");
        data.type = "dislike";
    } else {
        buttonLike.classList.add("active");
        data.type = "like";
    }
    
    fetch("/songs/like", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            if(data.code == 200) {
                const innerNumber = buttonLike.querySelector(".inner-number");
                innerNumber.innerHTML = data.updateLike;
            }
        })
  })
}
//End LIKE