"use strict";

(function (document) {
    document.addEventListener("DOMContentLoaded", function () {

        Carousel.init({
            obj: document.getElementById("carousel"),
            $prev: document.getElementById("prev"),
            $next: document.getElementById("next"),
            pager: document.getElementById("pager"),
            numberOfSlides: document.getElementsByClassName("carousel-item").length / 3,
            onMove: function onMove(step) {
                console.log(step);
            }
        });
    });
})(document);

var Carousel = function () {
    var Carousel = {};
    Carousel.move = function (step) {
        Carousel.step = step;

        Carousel.activeSlide(step);
        Carousel.activeBullet(step);
        Carousel.activeArrow(step);

        Carousel.onMove(step);
    };
    Carousel.activeSlide = function (step) {
        var posX = -step * 100;
        Carousel.obj.style.transition = "all 1.2s";
        Carousel.obj.style.left = posX + "%";
    };
    Carousel.activeArrow = function (step) {

        if (step + 1 < Carousel.numberOfSlides) {
            Carousel.$prev.classList.add("is-active");
            Carousel.$next.classList.add("is-active");
        }
        if (step === Carousel.numberOfSlides - 1) {
            Carousel.$prev.classList.add("is-active");
            Carousel.$next.classList.remove("is-active");
        }
        if (step === 0) {
            Carousel.$next.classList.add("is-active");
            Carousel.$prev.classList.remove("is-active");
        }
    };
    Carousel.activeBullet = function (step) {
        var dots = document.getElementsByClassName("bullet");
        Carousel.removeClass(dots);
        dots[step].classList.add("is-active");
    };
    Carousel.next = function () {
        var step = parseInt(Carousel.step, 10) + 1;
        if (step < Carousel.numberOfSlides) {
            Carousel.move(step);
        } else if (step == Carousel.numberOfSlides) {
            Carousel.move(0);
        }
    };
    Carousel.prev = function () {
        var step = parseInt(Carousel.step, 10) - 1;

        if (step >= 0) {
            Carousel.move(step);
        } else if (step < 0) {
            Carousel.move(Carousel.numberOfSlides - 1);
        }
    };
    Carousel.bullet = function (e) {
        var bullet = e.target;
        var er = new RegExp(Carousel.bulletsClass);
        var step = void 0;

        if (bullet.className.match(er)) {
            step = parseInt(bullet.getAttribute("data-step"), 10);
            Carousel.move(step);
        }
    };
    Carousel.removeClass = function ($els) {
        var i = Carousel.numberOfSlides;

        while (i--) {
            $els[i].classList.remove("is-active");
        }
    };
    Carousel.createBullets = function () {
        var max = Carousel.numberOfSlides;
        var bullet = void 0;
        var i = 0;
        var circleBlock = document.createElement("div");
        circleBlock.className = "circle";
        Carousel.pager.appendChild(circleBlock);
        while (i < max) {
            bullet = document.createElement("span");
            bullet.setAttribute("data-step", i);
            bullet.setAttribute("class", "bullet fleft");
            circleBlock.appendChild(bullet);
            i++;
        }

        Carousel.pager.getElementsByClassName("bullet")[0].classList.add("is-active");
    };
    Carousel.events = function () {
        Carousel.$next.addEventListener("click", Carousel.next);
        Carousel.$prev.addEventListener("click", Carousel.prev);
        Carousel.pager.addEventListener("click", Carousel.bullet);
    };
    Carousel.config = function (config) {
        Carousel.obj = config.obj || document.getElementById("carousel");
        Carousel.$prev = config.$prev || document.getElementById("prev");
        Carousel.$next = config.$next || document.getElementById("next");
        Carousel.pager = config.pager || document.getElementById("pager");
        Carousel.onMove = config.onMove || function () {};
        Carousel.numberOfSlides = config.numberOfSlides;
        Carousel.bulletsClass = config.bulletsClass || "bullet";
    };
    Carousel.init = function (config) {
        var classCarousel = "carousel-" + config.numberOfSlides + "-items";
        document.getElementById("carousel-inner").style.width = config.numberOfSlides * 100 + "%";
        Carousel.config(config);

        Carousel.dots = Carousel.pager.getElementsByClassName(Carousel.bulletsClass);
        Carousel.pager.classList.add(classCarousel);
        Carousel.obj.classList.add(classCarousel);
        Carousel.obj.style.left = "0px";
        Carousel.createBullets();
        Carousel.step = 0;
        Carousel.events();
    };

    return {
        init: Carousel.init
    };
}();