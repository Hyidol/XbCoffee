(function() {
  var base_url = "https://www.starbucks.com.cn/design-studio";
  window.store = {
    
    
      "北京坊旗舰店": {
        "name": "北京坊旗舰店",
        "image": "/images/BJFUN_FACADE.jpg",
        "keywords": "北京坊旗舰店",
        "url": "/stores/BJFUN/"
      }
      ,
    
      "深圳海岸城店": {
        "name": "深圳海岸城店",
        "image": "/images/SZCC_FACADE.JPG",
        "keywords": "深圳海岸城店",
        "url": "/stores/SZ/"
      }
      ,
    
      "天津大悦城店": {
        "name": "天津大悦城店",
        "image": "/images/TJJOYCITY_FACADE.jpg",
        "keywords": "天津大悦城",
        "url": "/stores/TJDYC/"
      }
      ,
    
      "长沙ifs店": {
        "name": "长沙IFS店",
        "image": "/images/IMG_5856.jpg",
        "keywords": "长沙IFS店",
        "url": "/stores/changshaifs/"
      }
      ,
    
      "深圳万象天地店": {
        "name": "深圳万象天地店",
        "image": "/images/18-shenzhenMixCityWorld/NI3A8507.jpg",
        "keywords": "深圳, wanxiang, wanxiangtiandi, tiandi, shenzhen, 万象天地, 万象",
        "url": "/stores/Shenzhen/"
      }
      ,
    
      "苏州中心旗舰店": {
        "name": "苏州中心旗舰店",
        "image": "/images/17-suzhouFlagShip/RED0068.jpg",
        "keywords": "苏州",
        "url": "/stores/Suzhouflagship/"
      }
      ,
    
      "北京798店": {
        "name": "北京798店",
        "image": "/images/02-BJ798/small/7.jpg",
        "keywords": "北京798店, beijing, 798, store",
        "url": "/stores/bj-798/"
      }
      ,
    
      "北京机场十一店": {
        "name": "北京机场十一店",
        "image": "/images/05-BJAirport/small/3.jpg",
        "keywords": "北京机场十一店, beijing, airport, 11, store",
        "url": "/stores/bj-airport/"
      }
      ,
    
      "北京嘉里中心店": {
        "name": "北京嘉里中心店",
        "image": "/images/13-BJKerry/small/2.jpg",
        "keywords": "北京嘉里中心店, beijing, kerry, center, store",
        "url": "/stores/bj-kerry/"
      }
      ,
    
      "北京太古里店": {
        "name": "北京太古里店",
        "image": "/images/14-BJTKL/small/1.jpg",
        "keywords": "北京太古里店, beijing, tai koo li, store",
        "url": "/stores/bj-tkl/"
      }
      ,
    
      "成都太古里店": {
        "name": "成都太古里店",
        "image": "/images/09-ChengduTKL/small/1.jpg",
        "keywords": "成都太古里店, chengdu, tai koo li, store",
        "url": "/stores/chengdu-tkl/"
      }
      ,
    
      "上海企业天地店": {
        "name": "上海企业天地店",
        "image": "/images/12-CorporateAve/small/3.jpg",
        "keywords": "上海企业天地店, shanghai, corporateave, store",
        "url": "/stores/corporateave/"
      }
      ,
    
      "广州锦绣香江店": {
        "name": "广州锦绣香江店",
        "image": "/images/16-GuangzhouJXXJ/small/1.jpg",
        "keywords": "广州锦绣香江店, guangzhou, residential, store",
        "url": "/stores/guangzhou-jxxj/"
      }
      ,
    
      "广州中山三路店": {
        "name": "广州中山三路店",
        "image": "/images/03-GZZhongshan/small/2.jpg",
        "keywords": "广州中山三路店, guangzhou, zhongshan, store",
        "url": "/stores/guangzhou-zhongshan/"
      }
      ,
    
      "杭州国大店": {
        "name": "杭州国大店",
        "image": "/images/15-HangzhouGDA/small/2.jpg",
        "keywords": "杭州国大店, hangzhou, gda, store",
        "url": "/stores/hangzhou-gda/"
      }
      ,
    
      "上海迪士尼小镇店": {
        "name": "上海迪士尼小镇店",
        "image": "/images/01-ShanghaiDisney/small/1.jpg",
        "keywords": "上海, 迪士尼小镇店, 上海迪士尼小镇店, shanghai, disney, town, store",
        "url": "/stores/shanghai-disney/"
      }
      ,
    
      "上海思南公馆店": {
        "name": "上海思南公馆店",
        "image": "/images/08-Sinan/small/5.jpg",
        "keywords": "上海思南公馆店, shanghai, sinan, mansions, store",
        "url": "/stores/sinan/"
      }
      ,
    
      "武汉天地店": {
        "name": "武汉天地店",
        "image": "/images/04-WuhanTiandi/small/1.jpg",
        "keywords": "武汉天地店, wuhan, tiandi, store",
        "url": "/stores/wuhan-tiandi/"
      }
      
    
  };


  function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', base_url + '/assets/search/index-cn.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }

  function initSearch(lunr) {
    document.getElementById('search-input-design-studio').addEventListener('keyup', function () {
      if (this.value) {
        var results = lunr.search(this.value); // Get lunr to perform a search
        displaySearchResults(results, window.store); // We'll write this in the next section 
      }
      else {
        document.getElementById('search-results').innerHTML = '';
      }
    });
  }
  // Initalize lunr with the fields it will be searching on. I've given title
  // a boost of 10 to indicate matches on this field are more important.
  var idx = lunr(function () {
    this.field('id');
    this.field('name');
    this.field('keywords', { boost: 10 });
  });

  for (var key in window.store) { // Add the data to lunr
    idx.add({
      'id': key,
      'name': window.store[key].name,
      'keywords': window.store[key].keywords
    });
  }

  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');
    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<li>';
        appendString += '  <a href="' + SITE_URL_PREFIX + item.url + '" class="cover" style="background-image: url(' + base_url + item.image + ');">';
        appendString += '    <h2>' + item.name + '</h2>';
        appendString += '  </a>';
        appendString += '</li>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li><p class="empty">未找到结果</p></li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  if (document.getElementById('search-input-design-studio')) {
    loadJSON(function (response) {
      var tokenizedSearchIndex = JSON.parse(response);
      var chineseLunr = lunr.init(tokenizedSearchIndex);
      initSearch(chineseLunr);
    });
  }

})();
