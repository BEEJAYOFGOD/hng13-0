const currentPage = window.location.pathname.split("/").pop();

console.log(currentPage);

let navLinks = document.querySelectorAll("#navlink-container li a");

navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    } else if (currentPage === "index.html") {
        navLinks[0].classList.add("active");
    }
});

const hamburger = document.getElementById("hamburger");
const navContainer = document.getElementById("navlink-container");

hamburger.addEventListener("click", () => {
    navContainer.classList.toggle("show");
});
