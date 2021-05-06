var BrowserMap = [
  {
    regex: /opr/i,
    matched: 'Opera'
  },
  {
    regex: /compatible/i,
    matched: 'IE'
  },
  {
    regex: /msie/i,
    matched: 'IE'
  },
  {
    regex: /edge/i,
    matched: 'Edge'
  },
  {
    regex: /ucbrowser/i,
    matched: 'UC'
  },
  {
    regex: /firefox/i,
    matched: 'Firefox'
  },
  {
    regex: /micromessenger/i,
    matched: 'Wechat'
  },
  {
    regex: /qqbrowser/i,
    matched: 'QQbrowser'
  },
  {
    regex: /chrome/i,
    matched: 'Chrome'
  },
  {
    regex: /safari/i,
    matched: 'Safari'
  },
];
function browser() {
  var userAgent = navigator.userAgent.toLowerCase();
  var name = "";
  for(var i in BrowserMap){
    if(name == "" && userAgent.match(BrowserMap[i].regex)){
      name = BrowserMap[i].matched;
    }
  }
  switch (name) {
    case "IE":
      if (!window.XMLHttpRequest) {
        name = "IE6";
      }else if (!window.document.querySelector){
        name = "IE7";
      }else if (!window.document.addEventListener) {
        name = "IE8";
      }else if (!window.atob) {
        name = "IE9";
      } else if (!document.createElement ("input").dataset) {
        name = "IE10";
      }
      break;
    case "":
      if(!!window.ActiveXObject || "ActiveXObject" in window)
        name = "IE11";
      else
        name = "unkonwn";
      break;
  }
  return {
    name: name
  }
}

$(document).ready(function() {
  /* TRIGGERS (FOR MENUS, MODALS...) */
  var triggers = document.querySelectorAll('.trigger');

  for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener('click', function(event) {
      var target = document.getElementById(this.getAttribute('rel'));
      target.classList.add('active');
      // give it ability to controll other DOM element(e.g. change style)
      // according to panel/overlays 's active/inactive state
      document.body.classList.add('rel-' + target.id);
      return false;
    });
  }

  // Close overlays & dialogs with escape key
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      var overlays = document.querySelectorAll('.overlay');
      var panels = document.querySelectorAll('.panel');

      for (var i = 0; i < overlays.length; i++) {
        overlays[i].classList.remove('active');
        document.body.classList.remove('rel-' + overlays[i].id);
      }
      for (var i = 0; i < panels.length; i++) {
        panels[i].classList.remove('active');
        document.body.classList.remove('rel-' + panels[i].id);
      }
    }
  };

  // Close buttons
  var closes = document.querySelectorAll('.close');

  for (var i = 0; i < closes.length; i++) {
    closes[i].addEventListener('click', function(event) {
      var target = document.getElementById(this.getAttribute('rel'));
      target.classList.remove('active');
      document.body.classList.remove('rel-' + target.id);
      return false;
    });
  }

  /* CARDS */
  var cards = document.getElementsByClassName('card');

  window.onscroll = function(e) { animations(e); }

  function animations(e) {
    // Animated cards
    var index;
    var newIndex = 0;
    for (index = 0; index < cards.length; ++index) {
      var offsetCard = offset(cards[index]);
      if ((offsetCard.top <= window.pageYOffset + window.innerHeight) && !cards[index].classList.contains('revealed')) {
        cards[index].setAttribute('style', 'transition-delay: '+ 0.1*newIndex +'s');
        cards[index].classList.add('revealed');
        newIndex++;
      }
    }
  }

  function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  animations();

  $('body').addClass(browser().name.toLowerCase() + '-browser'); //set a browser tag to the body

  // for city filter
  $('#city-toggle').on('click', function() {
    $('ul.cities').toggle();
  });
  $('.city-filter ul a').on('click', function(event) {
    $('#city-toggle span').html(event.target.innerHTML);
    $('ul.cities').toggle();
    var city = event.target.id;
    console.log(event);
    if (city === 'all') {
      $('ul.stores .card').removeClass('hidden');
    }
    else {
      $('ul.stores .card').addClass('hidden');
      $('ul.stores .card[data-city='+ city +']').removeClass('hidden');
    }
    window.onscroll();
  });

  // swiper settings
  var store_gallery_dom = document.getElementsByClassName('store-gallery');
  if (store_gallery_dom.length !== 0) {
    var storeSwiper = new Swiper('.store-gallery', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      keyboard: true,
      loop: true
    });
  }
  var inspiration_gallery_dom = document.getElementsByClassName('inspiration-gallery');
  if (inspiration_gallery_dom.length !== 0) {
    if (typeof INITIAL_SLIDE !== 'undefined') {
      // Inspiration details
      var storeSwiper = new Swiper('.inspiration-gallery', {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        initialSlide: INITIAL_SLIDE,
        keyboard: true,
        // loop: true
      });
    }
  }

  var inspiration_gallery_top_dom =  document.getElementsByClassName('gallery-top');
  var inspiration_gallery_thumbs_dom =  document.getElementsByClassName('gallery-thumbs');
  if (inspiration_gallery_top_dom.length !== 0 && inspiration_gallery_thumbs_dom.length !== 0) {
    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      initialSlide: INITIAL_SLIDE
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      centeredSlides: true,
      slideToClickedSlide: true,
      slidesPerView: 4,
      initialSlide: INITIAL_SLIDE,
      // loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;
  }

  var inspiration_gallery_left_dom =  document.getElementsByClassName('gallery-left');
  var inspiration_gallery_right_thumbs_dom =  document.getElementsByClassName('gallery-right-thumbs');
  if (inspiration_gallery_left_dom.length !== 0 && inspiration_gallery_right_thumbs_dom.length !== 0) {
    var galleryLeft = new Swiper('.gallery-left', {
      spaceBetween: 10,
      initialSlide: INITIAL_SLIDE,
      // loop: true
    });
    var galleryRightThumbs = new Swiper('.gallery-right-thumbs', {
      spaceBetween: 10,
      centeredSlides: true,
      slideToClickedSlide: true,
      slidesPerView: 'auto',
      initialSlide: INITIAL_SLIDE,
      direction: 'vertical',
      // loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
    galleryLeft.controller.control = galleryRightThumbs;
    galleryRightThumbs.controller.control = galleryLeft;
  }
})
