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
    const tooSlow = 2

    if (Math.abs(e.clientY - lastY) <= tooSlow && Math.abs(e.clientX - lastX) <= tooSlow) {
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
            let startPoint = pointFind(e.clientX, e.clientY);
            addSpotlightEvent(startPoint);
        }
    }
});

function addSpotlightEvent(startPoint) {
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

// Returns an object with keys x,y that an event needs to be placed in based on movement angle.
// Points to double relative smaller x or y and adds an offset to give the element space.
function pointFind(x, y) {
    let pitch = y < lastY ? "upper" : "lower";
    let yaw = x < lastX ? "left" : "right";
    let xOffset = Math.abs(x - lastX);
    let yOffset = Math.abs(y - lastY);
    let spotlightOffset = spotlight.height / 12; // About the radius of the view area.
    let position = {x: 0, y: 0};

    let direction = pitch + yaw;

    switch (direction) {
        case "upperleft":
            if (x === 0) {
                position.x = x - spotlightOffset;
                position.y = y - spotlightOffset * 3; // Size of the event will be same as the spotlight, so 3 * radius moves it out of the way and gives it space
                return position;
            } else if (y === 0) {
                position.x = x - spotlightOffset * 3;
                position.y = y - spotlightOffset;
                return position;
            } else if (x > y) {
                position.x = x - spotlightOffset * 3;
                position.y = y - (yOffset / xOffset * spotlightOffset * 2 + spotlightOffset); // Scale up the smaller distance based on the larger distance
                return position;
            } else if (x < y) {
                position.x = x - (xOffset / yOffset * spotlightOffset * 2 + spotlightOffset);
                position.y = y - spotlightOffset * 3;
                return position;
            } else {
                position.x = x - spotlightOffset * 3; // Should be equal in this case, so max for both.
                position.y = y - spotlightOffset * 3;
                return position;
            }
            break;
        case "upperright":
            if (x === 0) {
                position.x = x - spotlightOffset;
                position.y = y - spotlightOffset * 3;
                return position;
            } else if (y === 0) {
                position.x = x + spotlightOffset;
                position.y = y - spotlightOffset;
                return position;
            } else if (x > y) {
                position.x = x + spotlightOffset;
                position.y = y - (yOffset / xOffset * spotlightOffset * 2 + spotlightOffset);
                return position;
            } else if (x < y) {
                position.x = x - spotlightOffset + (xOffset / yOffset * spotlightOffset * 2 + spotlightOffset);
                position.y = y - spotlightOffset * 3;
                return position;
            } else {
                position.x = x + spotlightOffset;
                position.y = y - spotlightOffset * 3;
                return position;
            }
            break;
        case "lowerleft":
            if (x === 0) {
                position.x = x - spotlightOffset;
                position.y = y + spotlightOffset; 
            } else if (y === 0) {
                position.x = x - spotlightOffset * 3;
                position.y = y - spotlightOffset;
                return position;
            } else if (x > y) {
                position.x = x - spotlightOffset * 3;
                position.y = y - spotlightOffset + (yOffset / xOffset * spotlightOffset * 2 + spotlightOffset);
            } else if (x < y) {
                position.x = x - (xOffset / yOffset * spotlightOffset * 2 + spotlightOffset);
                position.y = y + spotlightOffset;
                return position;
            } else {
                position.x = x - spotlightOffset * 3;
                position.y = y + spotlightOffset;
                return position;
            }
            break;
        case "lowerright":
            if (x === 0) {
                position.x = x - spotlightOffset;
                position.y = y + spotlightOffset; 
            } else if (y === 0) {
                position.x = x + spotlightOffset;
                position.y = y - spotlightOffset;
                return position;
            } else if (x > y) {
                position.x = x + spotlightOffset;
                position.y = y - spotlightOffset + (yOffset / xOffset * spotlightOffset * 2);
            } else if (x < y) {
                position.x = x - spotlightOffset + (xOffset / yOffset * spotlightOffset * 2);
                position.y = y + spotlightOffset;
                return position;
            } else {
                position.x = x + spotlightOffset;
                position.y = y + spotlightOffset;
                return position;
            }
    }
}