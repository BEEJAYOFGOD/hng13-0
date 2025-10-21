const hamburger = document.getElementById("hamburger");
const navContainer = document.getElementById("navlink-container");

hamburger.addEventListener("click", () => {
    navContainer.classList.toggle("show");
});
