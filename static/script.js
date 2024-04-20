function pressKey(key) {
    fetch('/press_key/' + key);
}

function releaseKey(key) {
    fetch('/release_key/' + key);
}
