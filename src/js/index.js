import { mediaNavbar } from "./blocks/mediaNavbar";

const languagesGroup = document.querySelectorAll("#lang"),
    activeLang = document.getElementById("active__lang"),
    mediaActiveLang = document.getElementById("media-active__lang");

languagesGroup.forEach(lang => {
    lang.addEventListener("click", () => {
        activeLang.childNodes[1].src = lang.childNodes[1].src;
        mediaActiveLang.childNodes[1].src = lang.childNodes[1].src;
        activeLang.childNodes[3].childNodes[1].textContent = lang.childNodes[3].childNodes[1].textContent;
    })
})

mediaNavbar();

const swiper = new Swiper(".main-swiper", {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 5000,
    }
});

const newsSwiper = new Swiper('.newsSwiper', {
    loop: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    scrollbar: {
        el: '.swiper-scrollbar',
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        850: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

const partersSwiper = new Swiper(".partersSwiper", {
    slidesPerView: 4,
    grid: {
        rows: 2,
    },
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        400: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 40
        },
        992: {
            slidesPerView: 4,
            spaceBetween: 40
        }
    }
});