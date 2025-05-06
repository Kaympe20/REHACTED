import '@fontsource/special-elite';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
window.L = L;
const stickynotetext = document.getElementById('sticky-note-time');
const countDownDate = new Date("May 24, 2025 12:00:00").getTime();

let x = setInterval(function() {

    let now = new Date().getTime();

    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    stickynotetext.innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        stickynotetext.innerHTML = "NOW!";
    }
}, 1000);