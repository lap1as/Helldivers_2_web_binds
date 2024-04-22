function pressKey(key) {
    fetch('/press_key/' + key);
}

function toggleStroke(element) {
    element.classList.toggle('clicked');
}


function toggleFullscreen() {
    var button = document.getElementById("fullscreenButton");
    var icon = document.getElementById("fullscreenIcon");

    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // If currently not in fullscreen mode
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        icon.src = "/static/fullscreenOff.png";
    } else {
        // If currently in fullscreen mode
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        icon.src = "/static/fullscreenOn.png";
    }
}

// Event listener for fullscreen change
document.addEventListener("fullscreenchange", function () {
    var icon = document.getElementById("fullscreenIcon");
    if (document.fullscreenElement || document.mozFullScreenElement ||
        document.webkitFullscreenElement || document.msFullscreenElement) {
        // Switch icon to fullscreen off when entering fullscreen
        icon.src = "/static/fullscreenOff.png";
    } else {
        // Switch icon to fullscreen on when exiting fullscreen
        icon.src = "/static/fullscreenOn.png";
    }
});
