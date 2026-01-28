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
        console.log(eventLinks);
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