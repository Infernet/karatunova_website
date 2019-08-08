ymaps.ready(function() {

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
            controls: ['zoomControl', 'fullscreenControl']
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
    mark = new ymaps.Placemark([47.20739633728726, 38.926858643723136], {
        balloonContent: 'Лечебно-диагностический кабинет'
    }, {
        preset: 'islands#greenDotIconWithCaption',
        iconColor: '#F06182'
    });
    taganrog_map.geoObjects.add(mark);
});


$(document).ready(function() {
    // $('.content__office--slider-carousel').slick({
    //     infinite: true,
    //     slidesToShow: 3,
    //     slidesToScroll: 1
    // });


    carousel('content__qa--slider-carousel', 'content__qa--slider-next', 'content__qa--slider-prev', 2, 1);
    carousel('content__office--slider-carousel', 'content__office--slider-next', 'content__office--slider-prev', 3, 1);
    carousel('content__licenses--slider-carousel', 'content__licenses--slider-next', 'content__licenses--slider-prev', 3, 2);
});

const carousel = function(carousel, next, prev, slider, md_slider) {
    const container = $('.' + carousel);
    const n_arrow = $('.' + next);
    const p_arrow = $('.' + prev);

    console.log(container);

    container.slick({
        slidesToShow: slider,
        slidesToScroll: 1,
        centerMode: false,
        variableWidth: false,
        arrows: false,
        infinite: true,
        //autoplay: true,
        //autoplaySpeed: 3000,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: md_slider,
                //centerMode: true,
            }
        }, {
            breakpoint: 960,
            settings: {
                slidesToShow: md_slider,
            }
        }, {
            breakpoint: 300,
            settings: "unslick"
        }]
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