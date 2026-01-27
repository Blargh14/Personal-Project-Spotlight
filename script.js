const spotlight = document.querySelector("#cursor");
const background = document.querySelector("#background");

document.addEventListener("mousemove", e => {
    spotlight.style.left = (e.clientX - spotlight.width / 2) + "px";
    spotlight.style.top = (e.clientY - spotlight.height / 2) + "px";
});

let active = false;

for (let i = 0; i < 10; i++) {
    addSpotlightEvent();
}

function addSpotlightEvent() {
    let reveal = document.createElement("img")
    reveal.src = "redsquare.jpg";
    reveal.style.position = "absolute";
    reveal.style.left = Math.random() * window.innerWidth + "px";
    reveal.style.top = Math.random() * window.innerWidth + "px";
    background.appendChild(reveal)
}