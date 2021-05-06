$(document).ready(function() {
  function setUpHomePageAnimation(storeImageWidth, inspirationImageWidth) {
    var home_gallery_swiper = new mySwiper('#home-store-gallery-container',{
      childWidth: storeImageWidth
    });
    var $home_left_button = $(".store-container #left");
    var $home_right_button = $(".store-container #right");
    var $home_store_gallery_container = $("#home-store-gallery-container");
    $home_left_button
      .hover(function(){
        $(this).children('div').addClass('show');
        home_gallery_swiper.fastLTR(2000);
        home_gallery_swiper.params.speed = 2000;
      }, function(){
        $(this).children('div').removeClass('show');
        home_gallery_swiper.params.speed = 15000;
        home_gallery_swiper.resetWrapperTranslation();
      });

    $home_right_button
      .hover(function(){
        $(this).children('div').addClass('show');
        home_gallery_swiper.fastRTL(2000);
        home_gallery_swiper.params.speed = 2000;
      }, function(){
        $(this).children('div').removeClass('show');
        home_gallery_swiper.params.speed = 15000;
        home_gallery_swiper.resetWrapperTranslation();
      });
    $home_store_gallery_container
      .hover(function(){
        $(this).children('div').addClass('show');
        home_gallery_swiper.fastRTL(50* 1000);
        home_gallery_swiper.params.speed = 50* 1000;
      }, function(){
        $(this).children('div').removeClass('show');
        home_gallery_swiper.params.speed = 15000;
        home_gallery_swiper.resetWrapperTranslation();
      });

    var $home_store_gallery_container = $("#home-store-gallery-container");
    $home_store_gallery_container
      .hover(function(){
        $(this).children('div').addClass('show');
        home_gallery_swiper.fastRTL(50 * 1000);
        home_gallery_swiper.params.speed = 50 * 1000;
      }, function(){
        $(this).children('div').removeClass('show');
        home_gallery_swiper.params.speed = 15000;
        home_gallery_swiper.resetWrapperTranslation();
      });

    var inspiration_gallery_swiper = new mySwiper('#inspiration-gallery-container', {
      childWidth: inspirationImageWidth,
      direction: 'ltr',
      margin: 0
    });
    var $inspiration_left_button  = $(".inspiration-container #left");
    var $inspiration_right_button  = $(".inspiration-container #right");
    var $inspiration_gallery_container = $("#inspiration-gallery-container");
    $inspiration_left_button
      .hover(function(){
        $(this).children('div').addClass('show');
        inspiration_gallery_swiper.fastLTR(2000);
        inspiration_gallery_swiper.params.speed = 2000;
      }, function(){
        $(this).children('div').removeClass('show');
        inspiration_gallery_swiper.params.speed = 15000;
        inspiration_gallery_swiper.resetWrapperTranslation();
      });
    $inspiration_right_button
      .hover(function(){
        $(this).children('div').addClass('show');
        inspiration_gallery_swiper.fastRTL(2000);
        inspiration_gallery_swiper.params.speed = 2000;
      }, function(){
        $(this).children('div').removeClass('show');
        inspiration_gallery_swiper.params.speed = 15000;
        inspiration_gallery_swiper.resetWrapperTranslation();
      });
    $inspiration_gallery_container
      .hover(function(){
        $(this).children('div').addClass('show');
        inspiration_gallery_swiper.fastLTR(50 * 1000);
        inspiration_gallery_swiper.params.speed = 50 * 1000;
      }, function(){
        $(this).children('div').removeClass('show');
        inspiration_gallery_swiper.params.speed = 15000;
        inspiration_gallery_swiper.resetWrapperTranslation();
      });
  }

  function initHomePageAnimation() {
    var width = $(window).width();
    var height = $(window).height();
    height = height - 92 - 72; // minus the header's height and footer's height
    var storeImageHeight = height * 0.65;
    var inpirationImageHeight = height* 0.25
    if (width > 640) {

      $(".home").height(height);
      $(".store-container").height();
      $(".store-container ").css('margin-bottom', height * 0.05);
      $(".store-container #home-store-gallery-container").height(storeImageHeight)
      $(".store-container .holder").height(storeImageHeight);
      $(".store-container .holder").css('margin-top', -storeImageHeight);
      $(".store-container #left div").height(storeImageHeight);
      $(".store-container #right div").height(storeImageHeight);
      $(".store-container .image").width(width * 0.4);
      $(".store-container .image").height(storeImageHeight);

      $(".inspiration-container").height(inpirationImageHeight);
      $(".inspiration-container ").css('margin-bottom', height * 0.05);
      $(".inspiration-container #inspiration-gallery-container").height(inpirationImageHeight)
      $(".inspiration-container .holder").height(inpirationImageHeight);
      $(".inspiration-container .holder").css('margin-top', -inpirationImageHeight);
      $(".inspiration-container #left div").height(inpirationImageHeight);
      $(".inspiration-container #right div").height(inpirationImageHeight);
      $(".inspiration-container .image").width(inpirationImageHeight);
      $(".inspiration-container .image").height(inpirationImageHeight);

      setUpHomePageAnimation(width * 0.4, inpirationImageHeight);
    }
  }
  initHomePageAnimation();
  initHomePageAnimation.debounce = function(wait, immediate) {
    var timeout,
      func = this;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  $(window).resize(initHomePageAnimation.debounce(500));

  new Swiper('#mobile-home-store-gallery-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: true,
    loop: true,
    speed: 300,
    autoplay: {
      delay: 2800,
    }
  });

  new Swiper('#mobile-inspiration-gallery-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 3,
    spaceBetween: 0,
    keyboard: true,
    loop: true,
    speed: 300,
    autoplay: {
      delay: 2800,
    },
    breakpoints: {
      620: {
        slidesPerView: 5,
        spaceBetween: 0
      },
      520: {
        slidesPerView: 4,
        spaceBetween: 0
      },
      420: {
        slidesPerView: 3,
        spaceBetween: 0
      }
    }
    });
});
