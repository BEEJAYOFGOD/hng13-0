const currentPage = window.location.pathname.split("/").pop();

console.log(currentPage);
document.querySelectorAll("#navlink-container li a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

const hamburger = document.getElementById("hamburger");
const navContainer = document.getElementById("navlink-container");

hamburger.addEventListener("click", () => {
    navContainer.classList.toggle("show");
});
