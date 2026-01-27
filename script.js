const spotlight = document.querySelector("#cursor");
const background = document.querySelector("#background");
const deleteThis = document.querySelector("#delete");

deleteThis.addEventListener("click", e => {
    e.currentTarget.remove();
});

document.addEventListener("mousemove", e => {
    spotlight.style.left = (e.clientX - spotlight.width / 2) + "px";
    spotlight.style.top = (e.clientY - spotlight.height / 2) + "px";
});

let active = false;



// function addSpotlightEvent() {
//     let reveal = document.createElement("img")
//     reveal.src = "redsquare.jpg";
//     reveal.style.position = "absolute";
//     reveal.style.left = Math.random() * window.innerWidth + "px";
//     reveal.style.top = Math.random() * window.innerWidth + "px";
//     background.appendChild(reveal)
// }