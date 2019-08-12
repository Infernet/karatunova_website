$(document).ready(function() {
    //const form = $(".content__contact-col--feedback");
    const resize_map = function() {
        //ширина и высота карты
        var map = $('#map');
        var container = $('.content__contact-col').width();

        map.width(container * (container > 991 ? 0.5 : 0.95));
        //map.height(container * (container > 991 ? 0.28375 : 0.5));
        //map.height(form.height());

        //28.375
    }
    const ymaps_init = function() {

        taganrog_map = new ymaps.Map('map',
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
        mark = new ymaps.Placemark([47.20739633728726, 38.926858643723136], {
            balloonContent: 'Лечебно-диагностический кабинет'
        }, {
            preset: 'islands#greenDotIconWithCaption',
            iconColor: '#F06182'
        });
        taganrog_map.geoObjects.add(mark);
    }
    const carousel = function(carousel, next, prev, settings, slideToResponse, initialSlideResponse) {
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
            //autoplay: true,
            //autoplaySpeed: 3000,
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
    };



    $(window).resize(function() {
        resize_map();
    });



    ymaps.ready(ymaps_init);
    //карусели
    carousel('content__qa--slider-carousel', 'content__qa--slider-next', 'content__qa--slider-prev', {
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
    });
    carousel('content__office--slider-carousel', 'content__office--slider-next', 'content__office--slider-prev', {
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
    });
    carousel('content__licenses--slider-carousel', 'content__licenses--slider-next', 'content__licenses--slider-prev', {
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
        slide_default: 0,
        slide_lg: 0,
        slide_md: -1,
        slide_sm: -1,
        slide_xs: -1,
    });

















});