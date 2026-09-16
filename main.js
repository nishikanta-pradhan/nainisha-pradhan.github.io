/* =====================================================
   MOBILE MENU
===================================================== */

const navToggle =
    document.getElementById('nav-toggle');

const navMenu =
    document.getElementById('nav-menu');


if (navToggle && navMenu) {

    navToggle.addEventListener('click', () => {

        navMenu.classList.toggle('show');

    });

}



/* =====================================================
   SLIDER
===================================================== */

const slides =
    document.querySelectorAll('.home_slide');

const sliderDots =
    document.getElementById('sliderDots');

const sliderPrev =
    document.getElementById('sliderPrev');

const sliderNext =
    document.getElementById('sliderNext');

const sliderCurrent =
    document.getElementById('sliderCurrent');


let currentSlide = 0;

let sliderTimer;



/* =====================================================
   CREATE DOTS
===================================================== */

slides.forEach((slide, index) => {

    const dot =
        document.createElement('button');

    dot.classList.add('slider_dot');

    dot.setAttribute(
        'aria-label',
        `Go to slide ${index + 1}`
    );


    if (index === 0) {

        dot.classList.add('active');

    }


    dot.addEventListener('click', () => {

        goToSlide(index);

        restartSlider();

    });


    sliderDots.appendChild(dot);

});


const dots =
    document.querySelectorAll('.slider_dot');



/* =====================================================
   GO TO SLIDE
===================================================== */

function goToSlide(index) {

    if (slides.length === 0) {

        return;

    }


    slides[currentSlide]
        .classList.remove('active');

    dots[currentSlide]
        .classList.remove('active');


    currentSlide = index;


    if (currentSlide < 0) {

        currentSlide =
            slides.length - 1;

    }


    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }


    slides[currentSlide]
        .classList.add('active');

    dots[currentSlide]
        .classList.add('active');


    if (sliderCurrent) {

        sliderCurrent.textContent =
            String(currentSlide + 1)
                .padStart(2, '0');

    }

}



/* =====================================================
   NEXT
===================================================== */

function nextSlide() {

    goToSlide(currentSlide + 1);

}



/* =====================================================
   PREVIOUS
===================================================== */

function previousSlide() {

    goToSlide(currentSlide - 1);

}



/* =====================================================
   BUTTONS
===================================================== */

if (sliderNext) {

    sliderNext.addEventListener(
        'click',
        () => {

            nextSlide();

            restartSlider();

        }
    );

}


if (sliderPrev) {

    sliderPrev.addEventListener(
        'click',
        () => {

            previousSlide();

            restartSlider();

        }
    );

}



/* =====================================================
   AUTO SLIDESHOW
===================================================== */

function startSlider() {

    sliderTimer =
        setInterval(() => {

            nextSlide();

        }, 5000);

}


function restartSlider() {

    clearInterval(sliderTimer);

    startSlider();

}


startSlider();



/* =====================================================
   PAUSE WHEN MOUSE IS OVER SLIDER
===================================================== */

const homeSlider =
    document.querySelector('.home_slider');


if (homeSlider) {


    homeSlider.addEventListener(
        'mouseenter',
        () => {

            clearInterval(sliderTimer);

        }
    );


    homeSlider.addEventListener(
        'mouseleave',
        () => {

            startSlider();

        }
    );

}



/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
    'keydown',
    (event) => {

        if (event.key === 'ArrowRight') {

            nextSlide();

            restartSlider();

        }


        if (event.key === 'ArrowLeft') {

            previousSlide();

            restartSlider();

        }

    }
);



/* =====================================================
   TOUCH / SWIPE
===================================================== */

let touchStartX = 0;

let touchEndX = 0;


if (homeSlider) {


    homeSlider.addEventListener(
        'touchstart',
        (event) => {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        { passive: true }
    );


    homeSlider.addEventListener(
        'touchend',
        (event) => {

            touchEndX =
                event.changedTouches[0]
                    .screenX;

            handleSwipe();

        },
        { passive: true }
    );

}



function handleSwipe() {

    const distance =
        touchEndX - touchStartX;


    if (Math.abs(distance) < 50) {

        return;

    }


    if (distance < 0) {

        nextSlide();

    } else {

        previousSlide();

    }


    restartSlider();

}



/* =====================================================
   NAVIGATION
===================================================== */

const navLinks =
    document.querySelectorAll('.nav_link');


function setActiveNav(index) {

    navLinks.forEach(link => {

        link.classList.remove('active');

    });


    if (navLinks[index]) {

        navLinks[index]
            .classList.add('active');

    }

}



navLinks.forEach((link, index) => {

    link.addEventListener('click', () => {

        setActiveNav(index);


        if (navMenu) {

            navMenu.classList.remove('show');

        }

    });

});



/* =====================================================
   SCROLL NAVIGATION
===================================================== */

const sections = [

    document.getElementById('home'),

    document.getElementById('about'),

    document.getElementById('hobbies'),

    document.getElementById('gallery'),

    document.getElementById('contact')

];


window.addEventListener(
    'scroll',
    () => {

        const scrollPosition =
            window.scrollY + 150;


        sections.forEach(
            (section, index) => {

                if (!section) {

                    return;

                }


                const top =
                    section.offsetTop;

                const height =
                    section.offsetHeight;


                if (
                    scrollPosition >= top &&
                    scrollPosition < top + height
                ) {

                    setActiveNav(index);

                }

            }
        );

    }
);



/* =====================================================
   SCROLL REVEAL
===================================================== */

if (typeof ScrollReveal !== 'undefined') {

    const sr =
        ScrollReveal({

            origin: 'top',

            distance: '60px',

            duration: 1200,

            reset: false

        });


    sr.reveal(
        '.about_img',
        {}
    );


    sr.reveal(
        '.about_content',
        {
            delay: 200
        }
    );


    sr.reveal(
        '.info_card',
        {
            interval: 150
        }
    );


    sr.reveal(
        '.hobby_card',
        {
            interval: 150
        }
    );


    sr.reveal(
        '.journey_card',
        {
            interval: 150
        }
    );


    sr.reveal(
        '.gallery_item',
        {
            interval: 120
        }
    );


    sr.reveal(
        '.contact_subtitle',
        {
            delay: 200
        }
    );

}
