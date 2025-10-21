// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const navContainer = document.getElementById("navlink-container");

    if (hamburger && navContainer) {
        hamburger.addEventListener("click", () => {
            navContainer.classList.toggle("show");
        });
    }
}

// Initialize
setActiveNavLink();
initMobileMenu();
