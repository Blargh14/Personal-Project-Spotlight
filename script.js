test = document.querySelector("#cursor");

document.addEventListener("mousemove", (e) => {
    test.style.left = (e.clientX - test.width / 2) + "px";
    test.style.top = (e.clientY - test.height / 2) + "px";
});