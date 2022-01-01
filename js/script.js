let menuIcon = document.querySelector('.menuIcon');
let nav = document.querySelector('.overlay-menu');

menuIcon.addEventListener('click', () => {
    if (nav.style.transform != 'translateX(0%)') {
        nav.style.transform = 'translateX(0%)';
        nav.style.transition = 'transform 0.2s ease-out';
    } else {
        nav.style.transform = 'translateX(-100%)';
        nav.style.transition = 'transform 0.2s ease-out';
    }
});


// Toggle Menu Icon ========================================
let toggleIcon = document.querySelector('.menuIcon');

toggleIcon.addEventListener('click', () => {
    if (toggleIcon.className != 'menuIcon toggle') {
        toggleIcon.className += ' toggle';
    } else {
        toggleIcon.className = 'menuIcon';
    }
});

$(function () {
    window.addEventListener('scroll', () => {
        console.log(document.querySelector('#header').getBoundingClientRect().bottom - document.querySelector('#header').scrollTop)
        if (document.querySelector('#header').getBoundingClientRect().bottom - document.querySelector('#header').scrollTop <= 0) {
            $("#navbar").addClass('navbarScrolled');
        } else {
            $("#navbar").removeClass('navbarScrolled');
        }
    })

    $('#menu li a').click(() => {
        $(".menuIcon.toggle").click()
    })

    $('.buy').click(function () {
        $(this).parent().parent().addClass("clicked");
    });

    $('.remove').click(function () {
        $(this).parent().parent().parent().removeClass("clicked");
    });
});