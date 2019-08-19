import 'bootstrap';
import 'mdbootstrap/js/mdb';
import 'slick-carousel';
import 'slick-lightbox/dist/slick-lightbox';
import 'jquery-mask-plugin';




import '../scss/index.scss';
window.$ = window.jQuery = require("jquery");



$(document).ready(
    function() {

        //часто используемые элементы
        const body = $('body')[0];
        const map = $('#map');
        const container = $('.content__contact-col').width();
        const popup = $('.feedback__popup');
        const sendResult = $('.feedback__popup--result');
        const popupContent = $('.feedback__popup--result')[0].children[1].children[0];
        const formPopup = $('#popupForm');
        const resultContainer = $('.result-row-text');

        function checkInput(input, result) {
            if (result) {
                if (input.hasClass('is-invalid')) {
                    input.toggleClass('is-invalid is-valid');
                    return true;
                } else {
                    if (!input.hasClass('is-valid'))
                        input.addClass('is-valid');
                    return true;
                }
            } else {
                if (input.hasClass('is-valid')) {
                    input.toggleClass('is-valid is-invalid');
                    return false;
                } else {
                    if (!input.hasClass('is-invalid'))
                        input.addClass('is-invalid');
                    return false;
                }
            }
        };


        function handlerForm(form, name, phone, childAge) {
            const phoneReg = /\+7-\(\d{3}\)-\d{3}-\d{2}-\d{2}/;
            const nameReg = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/;
            const childAgeReg = /^([1][0-7]|[0]?[1-9])$/;

            name.on('change', (e) => { checkInput($(e.currentTarget), e.currentTarget.value.match(nameReg)); });
            phone.on('change', (e) => { checkInput($(e.currentTarget), e.currentTarget.value.match(phoneReg)); });
            childAge.on('change', (e) => { checkInput($(e.currentTarget), e.currentTarget.value.match(childAgeReg)); });

            form.on('submit', function(event) {
                event.preventDefault();
                if (
                    checkInput(phone, phone.val().match(phoneReg)) &
                    checkInput(name, name.val().match(nameReg)) &
                    checkInput(childAge, childAge.val().match(childAgeReg))
                ) {
                    $.ajax({
                        type: "POST",
                        url: "../src/formHandler.php",
                        data: form.serialize(),
                        success: function(response) {
                            //обработка ответа
                            var result = JSON.parse(response);
                            showPopupResult(result['sendToEmailStatus'], 5000);
                        }
                    });
                }
            });
        }



        handlerForm($('#contactForm'), $('#feedbackName'), $('#feedbackPhone'), $('#feedbackChildAge'));
        handlerForm($('#popupForm'), $('#feedback_popup_Name'), $('#feedback_popup_Phone'), $('#feedback_popup_ChildAge'));



        function showPopupResult(result, timer = 5000) {
            sendResult[0].style.backgroundColor = "#f8f8f8";
            resultContainer[0].style.justifyContent = "center";
            sendResult[0].style.backgroundImage = "url(../public/images/form-bg.png)";
            popup[0].style.display = "flex";
            body.style.overflow = "hidden";
            formPopup[0].style.display = "none";
            popupContent.className = "";
            if (result) {
                $(popupContent).addClass('result_success');
                popupContent.textContent = "Ваша заявка успешно отправлена.";
            } else {
                $(popupContent).addClass('result_failed');
                popupContent.textContent = "Упс, что-то пошло не так. Проверьте правильность введенных данных или повторите попытку позже.";
            }
            sendResult[0].style.display = "flex";

            setTimeout(() => {
                if (sendResult[0].style.display != "none") {
                    popup.hide();
                    body.style.overflow = "auto";
                    formPopup[0].style.display = "flex";
                    sendResult[0].style.display = "none";
                }
            }, timer);
        }


        //ширина и высота карты
        const resize_map = function() {
                map.width(container * (container > 991 ? 0.5 : 0.95));
            }
            //ymaps api
        const ymaps_init = function() {
            const taganrog_map = new ymaps.Map('map', {
                center: [47.207431065786814, 38.92684255046906],
                zoom: 16,
                type: 'yandex#map',
                controls: []
            }, {
                // Свойство ограничивающее карту на Таганроге
                restrictMapArea: [
                    [47.18079500197959, 38.80592122093851],
                    [47.29793808190484, 38.96649420434565]
                ]
            });
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

        //карусель
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
                autoplay: (speed > 0 ? true : false),
                autoplaySpeed: speed,
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



        //адаптация размеров карты
        $(window).resize(function() {
            resize_map();
        });
        resize_map();
        ymaps.ready(ymaps_init);
        //маска на поля ввода телефона
        $('#feedbackPhone').mask("+7-(000)-000-00-00");
        $('#feedback_popup_Phone').mask("+7-(000)-000-00-00");
        //открытие popup
        $('.show__feedback').each((i, e) => {
            e.addEventListener('click', () => {
                popup[0].style.display = "flex";
                body.style.overflow = "hidden";
                formPopup[0].style.display = "flex";
                sendResult[0].style.display = "none";
            });
        });

        //закрытие popup
        $('.feedback__popup--form--close').each((i, e) => {
            e.addEventListener('click', () => {
                popup.hide();
                resultContainer.find('img').remove();
                body.style.overflow = "auto";
            });
        });
        $(popup).click(function(e) {
            if (e.target == popup[0] || e.target == $(".feedback__popup > div.wrapper_col")[0]) {
                $(popup).hide();
                resultContainer.find('img').remove();
                body.style.overflow = "auto";
            }
        });

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

        carousel('content__psychological-test--slider-carousel', 'content__psychological-test--slider-next', 'content__psychological-test--slider-prev', '', {
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
            slide_md: 0,
            slide_sm: 0,
            slide_xs: 0,
        }, 4000);



        //показ сообщения
        let slides = $('.content__psychological-test--slider-slide--container img');
        slides.on('click', (e) => {
            let text = e.target.attributes['result-test-data'].value;
            let imgClone = $(e.target).clone()[0];
            imgClone.className = "result_img";
            resultContainer.prepend(imgClone);
            resultContainer[0].style.justifyContent = "space-evenly";
            sendResult[0].style.backgroundColor = "#F7FAFF";
            sendResult[0].style.backgroundImage = "none";
            popup[0].style.display = "flex";
            body.style.overflow = "hidden";
            formPopup[0].style.display = "none";
            popupContent.className = "";
            $(popupContent).addClass('result_test');
            popupContent.textContent = text;
            sendResult[0].style.display = "flex";



        });



    });