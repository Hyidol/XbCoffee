(function() {
  'use strict';

  var mySwiper = function (container, params) {
    if (!(this instanceof mySwiper)) return new mySwiper(container, params);

    /* property */
    var s = this;
    s.params = {
      currentIndex: 0,
      translateX: 0,
      translateY: 0,
      container: container? $(container) : "",
      childNum: 0,
      childWidth: 640,
      slidesPerView: 0,
      wrapperClass: 'swiper-wrapper',
      slideClass: 'swiper-slide',
      slideDuplicateClass: 'swiper-slide-duplicate',
      margin: 0,
      direction: 'rtl',
      autoplay: true,
      speed: 15000
    }
    for (var param in s.params) {
      if (typeof params[param] != 'undefined') {
        s.params[param] = params[param];
      }
    }
    s.wrapper = s.params.container.children('.' + s.params.wrapperClass);
    var gridPosition = [];   // each slide's position
    var centerPosition;
    var actionnow = false ;
    function init(){
      initEvent();
      createloop();
      createSlideShow();
      if(s.params.autoplay) setTimeout(autoPlayStart,200);
    }

    var initEvent = function(){
      var transitionEndEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
        for (var i = 0; i < transitionEndEvents.length; i++) {
            s.addEvent(s.params.container, transitionEndEvents[i], transitionDurationEndFn);
        }
    };

    /* useful action for this swiper */

    /* init slides */
    var createloop = function () {
      s.params.container.attr('dir',"");
      s.params.slidesPerView = Math.ceil(window.innerWidth / s.params.childWidth);
      centerPosition = window.innerWidth / 2 ;
      var slides = s.wrapper.children('.' + s.params.slideClass);
      s.params.childNum = slides.length;
      s.loopedSlides = s.params.slidesPerView;
      s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
      if (s.loopedSlides > s.params.childNum) {
          s.loopedSlides = s.params.childNum;
      }
      var prependSlides = [], appendSlides = [], i;
      slides.each(function (index, el) {
          var slide = $(this);
          if (index < s.loopedSlides) appendSlides.push(el);
          if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
          slide.attr('data-swiper-slide-index', index);
      });
      for (i = 0; i < appendSlides.length; i++) {
          s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
      }
      for (i = prependSlides.length - 1; i >= 0; i--) {
          s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
      }
    };

    var createSlideShow = function () {
      s.slides = s.wrapper.children('.' + s.params.slideClass);

      // add margin and save each origin slide's position
      var position = centerPosition;
      for (var i = 0 ; i < s.slides.length; i++) {
        var slide = s.slides.eq(i);
        slide.css({'margin-right' : s.params.margin + "px"});
        if(i >= s.loopedSlides && i < s.slides.length - s.loopedSlides) gridPosition.push(position);
        position = position - s.params.childWidth - s.params.margin;
      }
      s.params.direction === "rtl"?setWrapperTranslation(gridPosition[0], 0, 0, 0) : setWrapperTranslation(gridPosition[s.params.childNum - 1]  - s.params.childWidth - s.params.margin, 0, 0, 0) ;
      // add hover action
      // var translateTo = s.params.translateX;
      // var remainTranslateTime = 0;
      // var hoverAction;
      // var actionDone = false;
      // s.wrapper.hover(function(){
      //   hoverAction = setTimeout(function() {
      //     translateTo = s.params.translateX;
      //     var curTranslate = getTranslate(s.wrapper[0]);
      //     var translated = s.params.direction === "rtl"? curTranslate - translateTo : translateTo - curTranslate;
      //     var translatedRate = translated / (s.params.childWidth + s.params.margin);
      //     remainTranslateTime =  translatedRate * s.params.speed;
      //     s.params.autoplay = false;
      //     setWrapperTranslation(curTranslate, 0, 0, 0);
      //     actionDone = true;
      //   }, 30);
      // }, function(){
      //   clearTimeout(hoverAction);
      //   if(actionDone){
      //     s.params.autoplay = true
      //     setWrapperTranslation(translateTo, 0, 0, remainTranslateTime);
      //     actionDone = false;
      //   }
      // });
    }

    /* slide scroll */
    var autoPlayStart = function(){
      if(s.params.direction === "rtl"){
        var index = s.params.currentIndex + 1;
        if(index === s.params.childNum){
          index = 0;
          setWrapperTranslation(gridPosition[0] + s.params.childWidth + s.params.margin , 0, 0, 0);
          setTimeout(function(){slideTo(index , s.params.speed);},20);
        }
        else if(s.params.autoplay) slideTo(index , s.params.speed);
      }
      else if (s.params.direction === "ltr"){
        var index = s.params.currentIndex - 1;
        if(index < 0){
          index = s.params.childNum - 1;
          setWrapperTranslation(gridPosition[index] - s.params.childWidth - s.params.margin, 0, 0, 0);
          setTimeout(function(){slideTo(index , s.params.speed);},20);
        }
        else if(s.params.autoplay) slideTo(index , s.params.speed);
      }

    };

    var slideTo = function(index , speed){
      if(index > s.params.childNum && index < 0) return;
      s.params.currentIndex = index;
      s.params.translateX = gridPosition[index];
      setWrapperTranslation(s.params.translateX, 0, 0, speed);
    };

    var currentTranslate = 0;
    var getTranslateTo = function(){
      currentTranslate = getTranslate(s.wrapper[0]);
      var translateTo = 0;
      if(s.params.direction === "rtl"){
        if(s.params.translateX >= currentTranslate){
          if(s.params.currentIndex < s.params.childNum - 1){
            translateTo = s.params.translateX - s.params.childWidth - s.params.margin;
            s.params.currentIndex = s.params.currentIndex + 1;
          } else {
            currentTranslate = gridPosition[0] + s.params.childWidth + s.params.margin - (gridPosition[s.params.childNum-1] - currentTranslate);
            translateTo = gridPosition[0];
            s.params.currentIndex = 0;
          }
        }
        else
          translateTo = s.params.translateX;
      }
      else if (s.params.direction === "ltr"){
        if(currentTranslate >= s.params.translateX){
          if(s.params.currentIndex > 0){
            s.params.currentIndex = s.params.currentIndex - 1;
            translateTo = gridPosition[s.params.currentIndex];
          } else {
            var lastIndex = s.params.childNum - 1;
            s.params.currentIndex = lastIndex;
            currentTranslate = gridPosition[lastIndex] - s.params.childWidth - s.params.margin + (currentTranslate - gridPosition[0]);
            translateTo = gridPosition[s.params.currentIndex];
          }
        }
        else
          translateTo = s.params.translateX;
      }
      s.params.translateX =  translateTo;
      return translateTo;
    }

    var directionChange = false;

    s.fastRTL = function(speed){
      if(s.params.direction === "ltr") directionChange = true;
      s.params.direction = "rtl";
      var translateTo = getTranslateTo();
      var translatedRate = (currentTranslate - translateTo) / (s.params.childWidth + s.params.margin);
      var remainTranslateTime =  translatedRate * speed;
      setWrapperTranslation(currentTranslate, 0, 0, 0); // clear prevous translation
      setTimeout(function(){setWrapperTranslation(translateTo, 0, 0, remainTranslateTime);}, 20);
    }

    s.fastLTR = function(speed){
      if(s.params.direction === "rtl") directionChange = true;
      s.params.direction = "ltr";
      var translateTo = getTranslateTo();
      var translatedRate = (translateTo - currentTranslate) / (s.params.childWidth + s.params.margin);
      var remainTranslateTime =  translatedRate * speed;
      setWrapperTranslation(currentTranslate, 0, 0, 0); // clear prevous translation
      setTimeout(function(){setWrapperTranslation(translateTo, 0, 0, remainTranslateTime);}, 20);
    }

    s.resetWrapperTranslation = function(){
      if(directionChange){
        s.params.direction = s.params.direction === "rtl" ? "ltr" : "rtl" ;
        directionChange = false;
      }
      var translateTo = 0, translated = 0;
      translateTo = getTranslateTo();
      translated = s.params.direction === "rtl"? currentTranslate - translateTo : translateTo - currentTranslate;
      var translatedRate = translated / (s.params.childWidth + s.params.margin);
      var remainTranslateTime =  translatedRate * s.params.speed;
      setWrapperTranslation(currentTranslate, 0, 0, 0); // clear prevous translation
      setTimeout(function(){setWrapperTranslation(translateTo, 0, 0, remainTranslateTime);}, 20);
    }


    /* Base function */
    var setWrapperTranslation = function(x, y, z, time){
      setTranslate(s.wrapper[0], x, y, z);
      setDurationTime(s.wrapper[0], time);
    };

    var getTranslate = function(el){
      var matrix, curTransform, curStyle, transformMatrix;
            // automatic axis detection
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a){
                        return a.replace(',','.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
            //Latest Chrome and webkits Fix
            if (window.WebKitCSSMatrix)
                curTransform = transformMatrix.m41;
            //Crazy IE10 Matrix
            else if (matrix.length === 16)
                curTransform = parseFloat(matrix[12]);
            //Normal Browsers
            else
                curTransform = parseFloat(matrix[4]);

             return curTransform || 0;
    }

    var setTranslate = function(ele, x, y, z){
      if (s.support.transforms3d){
        transform(ele, 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
      } else {
        transform(ele, 'translate(' + x + 'px, ' + y + 'px)');
      }
    };

    var setDurationTime = function(ele,time){
      var elStyle = ele.style;
      elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = time + 'ms';
    };

    var transform = function(ele, transform){
      var elStyle = ele.style;
      elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
    };


    /* callbacks function */
    var transitionDurationEndFn = function(event){
        if(event.target.className == "swiper-wrapper")
          if(s.params.autoplay) autoPlayStart(s.params);
    };

    init();
}

  mySwiper.prototype = {
    addEvent: function(target, type, fn){
      target.bind(type, fn);
    },
    support: {
      transforms3d : (function () {
              var div = document.createElement('div').style;
              return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
          })(),
      transition : (function () {
          var div = document.createElement('div').style;
          return ('webkitTransition' in div || 'MozTransition' in div || 'OTransition' in div || 'MsTransition' in div || 'transition' in div);
      })()
    }
  };

  window.mySwiper = mySwiper;
})();
