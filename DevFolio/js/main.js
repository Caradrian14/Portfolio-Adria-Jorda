(function($) {
    "use strict";
    var nav = $('nav');
    var navHeight = nav.outerHeight();

    $('.navbar-toggler').on('click', function() {
        if (!$('#mainNav').hasClass('navbar-reduce')) {
            $('#mainNav').addClass('navbar-reduce');
        }
    })

    // Preloader
    $(window).on('load', function() {
        if ($('#preloader').length) {
            $('#preloader').delay(100).fadeOut('slow', function() {
                $(this).remove();
            });
        }
    });

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    /*--/ Star ScrollTop /--*/
    $('.scrolltop-mf').on("click", function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    /*--/ Star Counter /--*/
    $('.counter').counterUp({
        delay: 15,
        time: 2000
    });

    /*--/ Star Scrolling nav /--*/
    $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - navHeight + 5)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll').on("click", function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: navHeight
    });
    /*--/ End Scrolling nav /--*/

    /*--/ Navbar Menu Reduce /--*/
    $(window).trigger('scroll');
    $(window).on('scroll', function() {
        var pixels = 50;
        var top = 1200;
        if ($(window).scrollTop() > pixels) {
            $('.navbar-expand-md').addClass('navbar-reduce');
            $('.navbar-expand-md').removeClass('navbar-trans');
        } else {
            $('.navbar-expand-md').addClass('navbar-trans');
            $('.navbar-expand-md').removeClass('navbar-reduce');
        }
        if ($(window).scrollTop() > top) {
            $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
        } else {
            $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
        }
    });

    /*--/ Star Typed /--*/
    if ($('.text-slider').length == 1) {
        var typed_strings = $('.text-slider-items').text();
        var typed = new Typed('.text-slider', {
            strings: typed_strings.split(','),
            typeSpeed: 80,
            loop: true,
            backDelay: 1100,
            backSpeed: 30
        });
    }

    /*--/ Testimonials owl /--*/
    $('#testimonial-mf').owlCarousel({
        margin: 20,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            }
        }
    });
    // Mostrar el pop-up-front al hacer clic en el botón
    $('.show-skills-btn-languaje').on('click', function() {
        $('#skills-popup-languaje').show();
        $('body').addClass('no-scroll');
    });

    // Mostrar el pop-up-back al hacer clic en el botón
    $('.show-skills-ide').on('click', function() {
        $('#skills-popup-ide').show();
        $('body').addClass('no-scroll');
    });

    // Mostrar el pop-up-other al hacer clic en el botón
    $('.show-skills-btn-frameworks').on('click', function() {
        $('#skills-popup-frameworks').show();
        $('body').addClass('no-scroll');
    });

    // Mostrar el pop-up-other al hacer clic en el botón
    $('.show-skills-btn-other').on('click', function() {
        $('#skills-popup-other').show();
        $('body').addClass('no-scroll');
    });

    // Ocultar el pop-up al hacer clic en el botón de cerrar o fuera del contenido
    $('.close-btn-languaje, .popup').on('click', function(event) {
        if (event.target === this || $(event.target).hasClass('close-btn')) {
            $('#skills-popup-languaje').hide();
            $('body').removeClass('no-scroll');
        } 
    });
    $('.close-btn-ide, .popup').on('click', function(event) {
        if (event.target === this || $(event.target).hasClass('close-btn')) {
            $('#skills-popup-ide').hide();
            $('body').removeClass('no-scroll');
        }
    });
    $('.close-btn-frameworks, .popup').on('click', function(event) {
        if (event.target === this || $(event.target).hasClass('close-btn')) {
            $('#skills-popup-frameworks').hide();
            $('body').removeClass('no-scroll');
        }
    });
    $('.close-btn-other, .popup').on('click', function(event) {
        if (event.target === this || $(event.target).hasClass('close-btn')) {
            $('#skills-popup-other').hide();
            $('body').removeClass('no-scroll');
        }
    });
    // Descargar CV en ventana nueva 
    // $('#download-cv-btn').on('click', function() {
    //     window.open('cv.pdf', '_blank');
    // });

    // Traductor
    function loadTranslations(language) {
        $.getJSON(`translation/${language}.json`, function(data) {
          translations[language] = data;
          updateContent();
        });
    }
    let translations = {};
    
    let currentLanguage = 'en';
    function updateContent() {
        // Iterar sobre las claves del objeto de traducciones
        for (const key in translations[currentLanguage]) {
            if (translations[currentLanguage].hasOwnProperty(key)) {
                // Asignar el texto al elemento con el ID correspondiente
                $(`#${key}`).text(translations[currentLanguage][key]);
            }
        }
      // Actualizar el texto del botón de cambio de idioma
      $('#language-toggle').text(currentLanguage === 'en' ? 'Cambiar a Castellano' : 'Change to English');
    }
    
    $('#language-toggle').click(function() {
        currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
        if (!translations[currentLanguage]) {
          loadTranslations(currentLanguage);
        } else {
          updateContent();
        }
    });
    // Cargar el idioma inicial
    loadTranslations(currentLanguage);
    updateContent();
})(jQuery);