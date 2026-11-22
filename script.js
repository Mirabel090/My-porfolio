document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".nav");
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const menuLinks = document.querySelectorAll(".menu a");
    const sections = document.querySelectorAll("main section[id]");

    if (!nav || !menuToggle || !menu) return;

    // Open or close the mobile menu
    const setMenu = (open) => {
        menu.classList.toggle("active", open);
        menuToggle.classList.toggle("open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
    };

    menuToggle.addEventListener("click", () => {
        setMenu(!menu.classList.contains("active"));
    });

    // Close the menu when a link is clicked
    menuLinks.forEach((link) => {
        link.addEventListener("click", () => setMenu(false));
    });

    // Close the menu when clicking outside it
    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target)) setMenu(false);
    });

    // Close the menu with the Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMenu(false);
    });

    // Reset the menu if the screen becomes wide again
    window.matchMedia("(min-width: 769px)").addEventListener("change", (e) => {
        if (e.matches) setMenu(false);
    });

    // Add a shadow to the navbar after scrolling
    window.addEventListener(
        "scroll",
        () => nav.classList.toggle("scrolled", window.scrollY > 10),
        { passive: true }
    );

    // Highlight the menu link of the section you are viewing
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    menuLinks.forEach((link) => {
                        link.classList.toggle(
                            "current",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                }
            });
        },
        { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
});