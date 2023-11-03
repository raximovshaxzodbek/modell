const mediaNavbar = () => {
    const bars = document.getElementById("bars"),
        menu = document.getElementById("menu"),
        xmark = document.getElementById("xmark"),
        menuLink = document.querySelectorAll("#menu ul li");

    bars.addEventListener("click", () => {
        menu.style.right = 0;
    })

    xmark.addEventListener("click", () => {
        menu.style.right = "-100%";
    })

    menuLink.forEach(link => {
        link.addEventListener("click", () => {
            menu.style.right = "-100%";
        })
    })
}

export { mediaNavbar };