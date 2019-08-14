import 'bootstrap';
import 'mdbootstrap/js/mdb';
import 'slick-carousel';
import 'slick-lightbox/dist/slick-lightbox';
import 'jquery-mask-plugin';




import '../scss/index.scss';
window.$ = window.jQuery = require("jquery");

// Your jQuery code
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

$(document).ready(
    function() {

        const body = $('body')[0];
        const resize_map = function() {
            //ширина и высота карты
            const map = $('#map');
            const container = $('.content__contact-col').width();

            map.width(container * (container > 991 ? 0.5 : 0.95));
            //map.height(container * (container > 991 ? 0.28375 : 0.5));
            //map.height(form.height());

            //28.375
        }
        const ymaps_init = function() {

            const taganrog_map = new ymaps.Map('map',
                //Объект параметров карты
                {
                    //Координаты центра отображения
                    //Координаты Таганрога
                    center: [47.207431065786814, 38.92684255046906],
                    //Масштаб карты
                    zoom: 16,
                    //тип покрытия карты
                    type: 'yandex#map',
                    controls: []
                },
                //Объект параметров карты
                {
                    // Свойство ограничивающее карту на Таганроге
                    restrictMapArea: [
                        [47.18079500197959, 38.80592122093851],
                        [47.29793808190484, 38.96649420434565]
                    ]
                }
            );
            var zoomControl = new ymaps.control.ZoomControl({
                options: {
                    position: {
                        left: 5,
                        top: 5
                    }
                }
            });
            taganrog_map.controls.add(zoomControl);
            const mark = new ymaps.Placemark([47.20739633728726, 38.926858643723136], {
                balloonContent: 'Лечебно-диагностический кабинет'
            }, {
                preset: 'islands#greenDotIconWithCaption',
                iconColor: '#F06182'
            });
            taganrog_map.geoObjects.add(mark);
        }


        const carousel = function(carousel, next, prev, imageItem, settings, slideToResponse, initialSlideResponse, speed) {
            const container = $('.' + carousel);
            const n_arrow = $('.' + next);
            const p_arrow = $('.' + prev);

            container.slick({
                slidesToShow: slideToResponse.slideShow_default,
                slidesToScroll: settings.slideScroll,
                centerMode: settings.centerMode,
                variableWidth: settings.variableWidth,
                arrows: false,
                infinite: true,
                initialSlide: initialSlideResponse.slide_default,
                rows: 0,
                pauseOnHover: true,
                autoplay: true,
                autoplaySpeed: speed,
                //adaptiveHeight: true,
                responsive: [{
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: slideToResponse.slideShow_lg,
                            initialSlide: initialSlideResponse.slide_lg
                        }
                    }, {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: slideToResponse.slideShow_md,
                            initialSlide: initialSlideResponse.slide_md
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: slideToResponse.slideShow_sm,
                            initialSlide: initialSlideResponse.slide_sm
                        }
                    }, {
                        breakpoint: 540,
                        settings: {
                            slidesToShow: slideToResponse.slideShow_xs,
                            initialSlide: initialSlideResponse.slide_xs
                        }
                    }
                    // }, {
                    //     breakpoint: 300,
                    //     settings: "unslick"
                    // }]
                ]
            });


            n_arrow.click(function(e) {
                e.preventDefault();
                container.slick('slickNext');
            });

            p_arrow.click(function(e) {
                e.preventDefault();
                container.slick('slickPrev');
            });


            if (imageItem !== '') {

                $('.' + carousel).slickLightbox({
                    src: 'src',
                    itemSelector: imageItem,
                    arrows: false
                }).on({
                    'show.slickLightbox': () => { body.style.overflow = "hidden"; },
                    'hide.slickLightbox': () => { body.style.overflow = "auto"; }
                });
            }
        };



        $(window).resize(function() {
            resize_map();
        });
        resize_map();

        $('#feedbackPhone').mask("+7 (000) 000-00-00");
        $('#feedback_popup_Phone').mask("+7 (999) 999-99-99");
        $('.show__feedback').each((i, e) => {
            e.addEventListener('click', () => {
                popupForm[0].style.display = "flex";
                body.style.overflow = "hidden";
            });
        });



        const popupForm = $('.feedback__popup');

        $('.feedback__popup--form--close')[0].addEventListener('click', () => {
            popupForm.hide();
            body.style.overflow = "auto";
        });
        $(popupForm).click(function(e) {
            if (e.target == popupForm[0] || e.target == $(".feedback__popup > div.wrapper_col")[0]) {
                $(popupForm).hide();
                body.style.overflow = "auto";
            }
        });









        ymaps.ready(ymaps_init);
        //карусели
        carousel('content__qa--slider-carousel', 'content__qa--slider-next', 'content__qa--slider-prev', '', {
            centerMode: false,
            variableWidth: false,
            slideScroll: 1
        }, {
            slideShow_default: 2,
            slideShow_lg: 2,
            slideShow_md: 1,
            slideShow_sm: 1,
            slideShow_xs: 1,
        }, {
            slide_default: 0,
            slide_lg: 0,
            slide_md: 0,
            slide_sm: 0,
            slide_xs: 0,
        }, 5000);
        carousel('content__office--slider-carousel', 'content__office--slider-next', 'content__office--slider-prev', '.content__office--slider-slide .content__office--slider-slide--container img', {
            centerMode: false,
            variableWidth: false,
            slideScroll: 1
        }, {
            slideShow_default: 3,
            slideShow_lg: 2,
            slideShow_md: 1,
            slideShow_sm: 1,
            slideShow_xs: 1,
        }, {
            slide_default: 0,
            slide_lg: 0,
            slide_md: 0,
            slide_sm: 0,
            slide_xs: 0,
        }, 3000);
        carousel('content__licenses--slider-carousel', 'content__licenses--slider-next', 'content__licenses--slider-prev', '.content__licenses--slider-slide .content__licenses--slider-slide-container img', {
            centerMode: true,
            variableWidth: true,
            slideScroll: 1
        }, {
            slideShow_default: 3,
            slideShow_lg: 3,
            slideShow_md: 1,
            slideShow_sm: 1,
            slideShow_xs: 1,
        }, {
            slide_default: 2,
            slide_lg: 2,
            slide_md: -1,
            slide_sm: -1,
            slide_xs: -1,
        }, 4000);

    })