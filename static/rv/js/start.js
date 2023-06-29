/**
 * Website start here
 */
$(window).load(function () {

});
$(document).ready(function ($) {
  var swiper = new Swiper(".mySwiper", {
    grabCursor: true,
    effect: "creative",
    speed: 1500,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    creativeEffect: {
      prev: {
        origin: "left center",
        translate: ["0%", 0, 0],
        rotate: [0, -100, 0],
      },
      next: {
        origin: "right center",
        translate: ["0%", 0, 0],
        rotate: [0, 0, 0],
      },
    },
  });

  $('[data-toggle="datepicker"]').datepicker();
  $('img[usemap]').rwdImageMaps();

 
});


