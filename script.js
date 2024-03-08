$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

//宣告預設表單內容為空 （你想要的話也可以加東西）
var initSubject='',initBody='';
 
//按下傳送按鈕後執行
function submitHandler(){
    var to = "ab0218w2004@gmail.com";//寫死的傳送對象 就是公司的信箱 不會顯示在網頁上
    var name = nameText.value;//讀取ID為 nameTextuser 物件中的值
    var email = emailText.value;
    var tel = telText.value;
    var subject = subText.value;
//把user填的資料都塞到 mail body 中
    var body = ""+bodyText.value+'%0A%0A%0A';//%0A是換行 換了三行
        body += "From："+nameText.value+'%0A';
        body += "Email："+emailText.value+'%0A';
        body += "Tel："+telText.value;
//傳送的主要程式碼
    mailTo.href="mailto:"+to+"?subject="+subject+"&body="+body;
    mailTo.click();
}
//在body onload
function init(){
    subText.value=initSubject;
    toText.value=initTo;
    bodyText.value=initBody;
}

// alert() 
function a() {
  alert('這是彈跳警告視窗');
}

// confirm() 
function c() {
  m = confirm('這是彈跳確認視窗');
  // 可透過真假值去做不同的變化
  if(m == true)
    alert("按下確定");
}
// prompt () 
function p() {
  prompt('這是輸入訊息視窗');
  console.log(a);
}


"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FlipDown = function () {
  function FlipDown(uts) {
    var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "flipdown";
    var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, FlipDown);

    if (typeof uts !== "number") {
      throw new Error("FlipDown: Constructor expected unix timestamp, got ".concat(_typeof(uts), " instead."));
    }

    if (_typeof(el) === "object") {
      opt = el;
      el = "flipdown";
    }

    this.version = "0.3.2";
    this.initialised = false;
    this.now = this._getTime();
    this.epoch = uts;
    this.countdownEnded = false;
    this.hasEndedCallback = null;
    this.element = document.getElementById(el);
    this.rotors = [];
    this.rotorLeafFront = [];
    this.rotorLeafRear = [];
    this.rotorTops = [];
    this.rotorBottoms = [];
    this.countdown = null;
    this.daysRemaining = 0;
    this.clockValues = {};
    this.clockStrings = {};
    this.clockValuesAsString = [];
    this.prevClockValuesAsString = [];
    this.opts = this._parseOptions(opt);

    this._setOptions();

    console.log("FlipDown ".concat(this.version, " (Theme: ").concat(this.opts.theme, ")"));
  }

  _createClass(FlipDown, [{
    key: "start",
    value: function start() {
      if (!this.initialised) this._init();
      this.countdown = setInterval(this._tick.bind(this), 1000);
      return this;
    }
  }, {
    key: "ifEnded",
    value: function ifEnded(cb) {
      this.hasEndedCallback = function () {
        cb();
        this.hasEndedCallback = null;
      };

      return this;
    }
  }, {
    key: "_getTime",
    value: function _getTime() {
      return new Date().getTime() / 1000;
    }
  }, {
    key: "_hasCountdownEnded",
    value: function _hasCountdownEnded() {
      if (this.epoch - this.now < 0) {
        this.countdownEnded = true;

        if (this.hasEndedCallback != null) {
          this.hasEndedCallback();
          this.hasEndedCallback = null;
        }

        return true;
      } else {
        this.countdownEnded = false;
        return false;
      }
    }
  }, {
    key: "_parseOptions",
    value: function _parseOptions(opt) {
      var headings = ["Days", "Hours", "Minutes", "Seconds"];

      if (opt.headings && opt.headings.length === 4) {
        headings = opt.headings;
      }

      return {
        theme: opt.hasOwnProperty("theme") ? opt.theme : "dark",
        headings: headings
      };
    }
  }, {
    key: "_setOptions",
    value: function _setOptions() {
      this.element.classList.add("flipdown__theme-".concat(this.opts.theme));
    }
  }, {
    key: "_init",
    value: function _init() {
      this.initialised = true;

      if (this._hasCountdownEnded()) {
        this.daysremaining = 0;
      } else {
        this.daysremaining = Math.floor((this.epoch - this.now) / 86400).toString().length;
      }

      var dayRotorCount = this.daysremaining <= 2 ? 2 : this.daysremaining;

      for (var i = 0; i < dayRotorCount + 6; i++) {
        this.rotors.push(this._createRotor(0));
      }

      var dayRotors = [];

      for (var i = 0; i < dayRotorCount; i++) {
        dayRotors.push(this.rotors[i]);
      }

      this.element.appendChild(this._createRotorGroup(dayRotors, 0));
      var count = dayRotorCount;

      for (var i = 0; i < 3; i++) {
        var otherRotors = [];

        for (var j = 0; j < 2; j++) {
          otherRotors.push(this.rotors[count]);
          count++;
        }

        this.element.appendChild(this._createRotorGroup(otherRotors, i + 1));
      }

      this.rotorLeafFront = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-leaf-front"));
      this.rotorLeafRear = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-leaf-rear"));
      this.rotorTop = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-top"));
      this.rotorBottom = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-bottom"));

      this._tick();

      this._updateClockValues(true);

      return this;
    }
  }, {
    key: "_createRotorGroup",
    value: function _createRotorGroup(rotors, rotorIndex) {
      var rotorGroup = document.createElement("div");
      rotorGroup.className = "rotor-group";
      var dayRotorGroupHeading = document.createElement("div");
      dayRotorGroupHeading.className = "rotor-group-heading";
      dayRotorGroupHeading.setAttribute("data-before", this.opts.headings[rotorIndex]);
      rotorGroup.appendChild(dayRotorGroupHeading);
      appendChildren(rotorGroup, rotors);
      return rotorGroup;
    }
  }, {
    key: "_createRotor",
    value: function _createRotor() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var rotor = document.createElement("div");
      var rotorLeaf = document.createElement("div");
      var rotorLeafRear = document.createElement("figure");
      var rotorLeafFront = document.createElement("figure");
      var rotorTop = document.createElement("div");
      var rotorBottom = document.createElement("div");
      rotor.className = "rotor";
      rotorLeaf.className = "rotor-leaf";
      rotorLeafRear.className = "rotor-leaf-rear";
      rotorLeafFront.className = "rotor-leaf-front";
      rotorTop.className = "rotor-top";
      rotorBottom.className = "rotor-bottom";
      rotorLeafRear.textContent = v;
      rotorTop.textContent = v;
      rotorBottom.textContent = v;
      appendChildren(rotor, [rotorLeaf, rotorTop, rotorBottom]);
      appendChildren(rotorLeaf, [rotorLeafRear, rotorLeafFront]);
      return rotor;
    }
  }, {
    key: "_tick",
    value: function _tick() {
      this.now = this._getTime();
      var diff = this.epoch - this.now <= 0 ? 0 : this.epoch - this.now;
      this.clockValues.d = Math.floor(diff / 86400);
      diff -= this.clockValues.d * 86400;
      this.clockValues.h = Math.floor(diff / 3600);
      diff -= this.clockValues.h * 3600;
      this.clockValues.m = Math.floor(diff / 60);
      diff -= this.clockValues.m * 60;
      this.clockValues.s = Math.floor(diff);

      this._updateClockValues();

      this._hasCountdownEnded();
    }
  }, {
    key: "_updateClockValues",
    value: function _updateClockValues() {
      var _this = this;

      var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.clockStrings.d = pad(this.clockValues.d, 2);
      this.clockStrings.h = pad(this.clockValues.h, 2);
      this.clockStrings.m = pad(this.clockValues.m, 2);
      this.clockStrings.s = pad(this.clockValues.s, 2);
      this.clockValuesAsString = (this.clockStrings.d + this.clockStrings.h + this.clockStrings.m + this.clockStrings.s).split("");
      this.rotorLeafFront.forEach(function (el, i) {
        el.textContent = _this.prevClockValuesAsString[i];
      });
      this.rotorBottom.forEach(function (el, i) {
        el.textContent = _this.prevClockValuesAsString[i];
      });

      function rotorTopFlip() {
        var _this2 = this;

        this.rotorTop.forEach(function (el, i) {
          if (el.textContent != _this2.clockValuesAsString[i]) {
            el.textContent = _this2.clockValuesAsString[i];
          }
        });
      }

      function rotorLeafRearFlip() {
        var _this3 = this;

        this.rotorLeafRear.forEach(function (el, i) {
          if (el.textContent != _this3.clockValuesAsString[i]) {
            el.textContent = _this3.clockValuesAsString[i];
            el.parentElement.classList.add("flipped");
            var flip = setInterval(function () {
              el.parentElement.classList.remove("flipped");
              clearInterval(flip);
            }.bind(_this3), 500);
          }
        });
      }

      if (!init) {
        setTimeout(rotorTopFlip.bind(this), 500);
        setTimeout(rotorLeafRearFlip.bind(this), 500);
      } else {
        rotorTopFlip.call(this);
        rotorLeafRearFlip.call(this);
      }

      this.prevClockValuesAsString = this.clockValuesAsString;
    }
  }]);

  return FlipDown;
}();

function pad(n, len) {
  n = n.toString();
  return n.length < len ? pad("0" + n, len) : n;
}

function appendChildren(parent, children) {
  children.forEach(function (el) {
    parent.appendChild(el);
  });
}

//Vue
var bookDatas = [
    {
      name:
        "惡搞也能出頭天：Action！網路短劇天團這群人TGOP的幕後奇想、技藝、創作實驗室",
      author: "這群人TGOP",
      publish_house: "尖端",
      img:
        "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/072/88/0010728840.jpg&v=57cfec46&w=348&h=348",
      price: 360,
      is_discount: true,
      discount: 0.79,
      link_book: "https://www.books.com.tw/products/0010728840?loc=P_003_001",
      link_author:
        "https://search.books.com.tw/exep/prod_search.php?key=%E9%80%99%E7%BE%A4%E4%BA%BATGOP&f=author",
      date: "2016/09/23"
    },
    {
      name:
        "寫字的力量限量超值套組：《寫字的力量》+《美字基本功》(加贈日本原裝Preppy本格鋼筆+專屬炫彩墨水2入)",
      author: "侯信永",
      publish_house: "遠流",
      img:
        "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/070/99/0010709943_b_01.jpg&v=56eaa353&w=348&h=348",
      price: 540,
      is_discount: true,
      discount: 0.75,
      link_book: "https://www.books.com.tw/products/0010709943?loc=P_003_002",
      link_author:
        "https://search.books.com.tw/exep/prod_search.php?key=%E4%BE%AF%E4%BF%A1%E6%B0%B8&f=author",
      date: "2016/03/30"
    },
    {
      name: "好音樂的科學：破解基礎樂理和美妙旋律的音階秘密",
      author: "約翰‧包威爾",
      publish_house: "大寫出版 ",
      img:
        "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/071/87/0010718777.jpg&v=5756a26b&w=348&h=348",
      price: 350,
      is_discount: false,
      discount: 0.79,
      link_book: "https://www.books.com.tw/products/0010718777?loc=P_003_003",
      link_author:
        "https://search.books.com.tw/exep/prod_search.php?key=%E7%B4%84%E7%BF%B0%E2%80%A7%E5%8C%85%E5%A8%81%E7%88%BE&f=author",
      date: "2016/06/21"
    },
    {
      name:
        "Design by wangzhihong.com：A Selection of Book Designs, 2001-2016(王志弘作品選2001-2016)",
      author: "王志弘",
      publish_house: "臉譜",
      img:
        "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/072/55/0010725522.jpg&v=57b6fbcb&w=348&h=348",
      price: 3000,
      is_discount: true,
      discount: 0.79,
      link_book: "https://www.books.com.tw/products/0010725522?loc=P_003_004",
      link_author:
        "https://search.books.com.tw/exep/prod_search.php?key=%E7%8E%8B%E5%BF%97%E5%BC%98&f=author",
      date: "2016/09/01"
    },
    {
      name:
        "手寫英文書法聖經：從握筆、筆順到數字、符號，全方位掌握藝術美字書寫技法。",
      author: "Julien Chazal",
      publish_house: "野人",
      img:
        "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/071/98/0010719843.jpg&v=57c7bcda&w=348&h=348",
      price: 665,
      is_discount: true,
      discount: 0.75,
      link_book: "https://www.books.com.tw/products/0010719843?loc=P_003_005",
      link_author:
        "https://search.books.com.tw/exep/prod_search.php?key=Julien+Chazal&f=author",
      date: "2016/09/07"
    },
    {
      name:
        "手寫美「行」：鋼筆字冠軍的日常行書超值套組《手寫美「行」》+《美「行」小練習》【博客來獨家德國e+m原木筆桿&日本NIKKO沾水筆尖&鋼筆紙箋（Conifer／珠友文化隨機出貨）】",
      author: "葉曄",
      publish_house: "遠流",
      img:
        "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/072/35/0010723527_b_01.jpg&v=579b5a78&w=348&h=348",
      price: 520,
      is_discount: false,
      discount: 0.75,
      link_book: "https://www.books.com.tw/products/0010723527?loc=P_003_006",
      link_author:
        "https://search.books.com.tw/exep/prod_search.php?key=%E8%91%89%E6%9B%84&f=author",
      date: "2016/08/05"
    },
    {
      name: "Typography 字誌：Issue 02 來做LOGO吧！",
      author: "Graphic社編輯部",
      publish_house: "臉譜",
      img:
        "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/072/92/0010729204.jpg&v=57e27d49&w=348&h=348",
      price: 420,
      is_discount: true,
      discount: 0.79,
      link_book: "https://www.books.com.tw/products/0010729204?loc=P_003_007",
      link_author:
        "https://search.books.com.tw/exep/prod_search.php?key=Graphic%E7%A4%BE%E7%B7%A8%E8%BC%AF%E9%83%A8&f=author",
      date: "2016/10/06"
    }
  ];
  var vm = new Vue({
    el: "#app",
    data: {
      name: "Vue.js",
      skills: ["HTML", "CSS", "Javascript"],
      infos: [
        { name: "HTML", version: "5" },
        { name: "CSS", version: "3" },
        { name: "Javascript", version: "-ES6" }
      ],
      infos2: [
        { name: "HTML", version: "5", whatever: ["a", "b", "c"] },
        { name: "CSS", version: "3", whatever: ["e", "f", "g"] },
        { name: "Javascript", version: "-ES6", whatever: ["h", "i", "j"] }
      ],
      details: {
        name: "Eric",
        message: "Hello!",
        color: "blue",
        habbits: ["reading", "biking", "sleeping"]
      },
      books: bookDatas,
      mode_detail: false,
      mode_size: "small",
      fruits: ["pen", "pineapple", "apple", "pen"],
      status: ""
    },
    methods: {
      remove: function (id, fname) {
        this.fruits.splice(id, 1);
        this.status = "第" + (id + 1) + "項 - " + fname + "已經被移除了";
      },
      add: function (fname) {
        this.fruits.push(fname);
      }
    },
    computed: {
      totals: function () {
        var total = {
          pen: 0,
          pineapple: 0,
          apple: 0
        };
        for (var i = 0; i < this.fruits.length; i++) {
          total[this.fruits[i]] += 1;
        }
        return total;
      }
    }
  });
  