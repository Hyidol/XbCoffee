document.addEventListener('DOMContentLoaded', function() {
  /* WECHAT SHARING */
  var hostname = location.origin;
  var appId = /www.starbucks.com.cn$/i.test(hostname) ? 'wxaf48360fec8b1f0c' : 'wx186c10fc6a4ff63c';
  $.ajax({
    url: hostname + '/api/external/wechat/thirdParty/jssdkSignature',
    method: 'POST',
    data: {
      data: {
        url: location.href.split('#')[0],
        appId: appId
      }
    }
  }).done(function(resData) {
    console.log(resData);
    var signature = resData.signature;
    var nonceStr = resData.nonceStr;
    var timestamp = resData.timestamp;
    if (signature && nonceStr && timestamp && wx) {
      wx.config({    
        debug: false,    
        appId: appId,    
        timestamp: timestamp,    
        nonceStr: nonceStr,    
        signature: signature,    
        jsApiList: [    
          'checkJsApi',    
          'onMenuShareTimeline',    
          'onMenuShareAppMessage'    
        ]
      });
      wx.ready(function() {
        var pageShareData = {
          title: WECHAT_TITLE,
          desc: WECHAT_DESC,
          link: location.href + '?utm_source=design%20studio&utm_medium=wechat',
          imgUrl: WECHAT_IMAGE,
          success: function(res) {
            console.log('This page shared:', location.href);
          },
          cancel: function(res) {
            console.log('Cancelled page sharing for:', location.href);
          }
        };
        wx.onMenuShareTimeline(pageShareData);
        wx.onMenuShareAppMessage(pageShareData);
      });
      wx.error(function(res) {
        console.log('wechat jssdk error: ', res.errMsg);
      });
    }
  }).fail(function(jqXHR, textStatus) {
    console.log('Request to share api failed: ', textStatus);
  });

  if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)) {
    // Mobile
    $('body').addClass('mbrowser');
    $('.wechat-dialog-url').text(location.href);
    if (navigator.userAgent.match(/MicroMessenger/i)) {
      var $wOverlay = $('#wechat-overlay');
      $wOverlay
      .addClass('in-wechat')
      .on('click', function() {
        $wOverlay.removeClass('active');
      });
    }
  } else {
    var storeName = window.location.href;
    $('.wechat-qr').qrcode({width:110,height:110,text:storeName});
    $('.wechat-share').on('click', function () {
      $('.wechat-qr').toggle(5);
    });
  }
})
