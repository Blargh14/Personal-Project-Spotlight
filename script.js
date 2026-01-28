const spotlight = document.querySelector("#cursor");
const background = document.querySelector("#background");
const deleteThis = document.querySelector("#delete");

let eventLinks = false;

deleteThis.addEventListener("change", e => {
    let externalHTMLLinks = e.currentTarget.files[0];
    
    // Mozilla error prevention code
    if (!externalHTMLLinks) {
        return;
    }
    if (!externalHTMLLinks.type.startsWith("text")) {
        return;
    }

    let stopRemoval = false;

    const reader = new FileReader();

    reader.onload = () => {
        eventLinks = reader.result;
        eventLinks = JSON.parse(eventLinks);
        eventLinks = eventLinks["list"];
    };

    reader.onerror = () => {
        console.log("Uhoh happened at reader.onerror");
        stopRemoval = true;
    }

    reader.readAsText(externalHTMLLinks);

    if (stopRemoval) {
        return;
    }
    
    e.currentTarget.remove();
});

let active = false;
let lastX = 0;
let lastY = 0;


document.addEventListener("mousemove", e => {
    // When going too slow mousemove will fire based on touched pixels messing with the math
    const tooSlow = [-2,-1,0,1,2]

    if (tooSlow.includes(e.clientY - lastY) && tooSlow.includes(e.clientX - lastX)) {
        return; // This will prevent the spotlight update too, change if you want it snappier later
    }
    
    lastX = e.clientX;
    lastY = e.clientY;

    spotlight.style.left = (e.clientX - spotlight.width / 2) + "px";
    spotlight.style.top = (e.clientY - spotlight.height / 2) + "px";

    if (!active) {
        spawn = Math.floor(Math.random() * 10) === 9; // mousemove works faster in dev tools, something to keep in mind.

        if (spawn) {
            active = true;
            addSpotlightEvent();
        }
    }
});

function addSpotlightEvent() {
    if (!eventLinks) {
        active = false;
        return;
    }

    let pick = Math.floor(Math.random() * eventLinks.length);
    const reveal = document.createElement("img");
    reveal.src = eventLinks[pick];
    reveal.style.position = "absolute";
    reveal.style.left = Math.random() * (window.innerWidth - 100) + "px";
    reveal.style.top = Math.random() * (window.innerHeight - 100) + "px";
    background.appendChild(reveal);

    reveal.addEventListener("mouseout", (e) => {
        e.currentTarget.remove();
        active = false;
    });
}

function pointFind(x, y) {
    let pitch = y < lastY ? "upper" : "lower";
    let yaw = x < lastX ? "left" : "right";

    let direction = pitch + yaw;

    switch (direction) {
        case "upperleft":
            console.log(direction);
            break;
        case "upperright":
            console.log(direction);
            break;
        case "lowerleft":
            console.log(direction);
            break;
        case "lowerright":
            console.log(direction);
    }
}