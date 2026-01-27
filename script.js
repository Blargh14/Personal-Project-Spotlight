spotlight = document.querySelector("#cursor");

document.addEventListener("mousemove", e => {
    spotlight.style.left = (e.clientX - spotlight.width / 2) + "px";
    spotlight.style.top = (e.clientY - spotlight.height / 2) + "px";
});

test = document.querySelector(".test");

test.addEventListener("mousedown", e => {
    console.log("hello");
});