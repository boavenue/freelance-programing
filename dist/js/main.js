"use strict";

$.main = {
  /*------------------------------------------------------------
      0.1. Dropdown header
     ------------------------------------------------------------*/
  dropDownLangue: function dropDownLangue() {
    $(".fvn-header__menu-item.language").on("click", function () {
      $(this).toggleClass("open");
      $(".language-list").toggleClass("open");
    });
  },

  /*------------------------------------------------------------
      0.2. Scrollspy
     ------------------------------------------------------------*/
  scrollSpy: function scrollSpy() {
    $(window).on("scroll", function () {
      var eachSection = $(".fvn-section");
      var navigation = $(".fvn-header__menu");
      var navigationHeight = $(".fvn-header").outerHeight();
      var curPostionScroll = $(this).scrollTop();
      eachSection.each(function () {
        var topCurScroll = $(this).offset().top - navigationHeight;
        var bottomCurScroll = topCurScroll + $(this).outerHeight();

        if (curPostionScroll >= topCurScroll && curPostionScroll <= bottomCurScroll) {
          navigation.find(".fvn-header__menu-item a").removeClass("active");
          navigation.find('.fvn-header__menu-item a[href="#' + $(this).attr("id") + '"]').addClass("active");
        }
      });
    });
    var widthBrow = $(window).width();
    $(".fvn-header__menu-item:not('.language, .hotline') a").on("click", function (event) {
      event.preventDefault();
      var curSection = $(this).attr("href");
      var headerHeight = $(".nheader").height();
      var hamburgerEle = $(".fvn-header__mobile");
      var headerRightMenu = $(".fvn-header__menu-mobile");
      hamburgerEle.removeClass("change");
      headerRightMenu.removeClass("open");

      if ($(curSection).length) {}

      setTimeout(function () {
        $("html, body").animate({
          // scrollTop: $(curSection).offset().top - headerHeight + 2
          scrollTop: $(curSection).offset().top - 50
        }, 1200);
      }, 100);
    });
  },

  /*------------------------------------------------------------
      0.3 Affix header
     ------------------------------------------------------------*/
  affixHeader: function affixHeader() {
    $(window).on("scroll", function () {
      var headerElement = $(".fvn-header__wrap"),
          heightHeader = headerElement.height(),
          scrollTop = $(window).scrollTop();

      if (scrollTop >= heightHeader + 10) {
        $(headerElement).addClass("affix");
      } else {
        $(headerElement).removeClass("affix");
      }
    });
  },

  /*------------------------------------------------------------
      0.4 Menu mobile
     ------------------------------------------------------------*/
  menuMobile: function menuMobile() {
    var hamburgerEle = $(".fvn-header__mobile");
    var headerRightMenu = $(".fvn-header__menu-mobile");
    hamburgerEle.on("click", function () {
      $(this).toggleClass("change");
      headerRightMenu.toggleClass("open");
    });
  },

  /*------------------------------------------------------------
      0.5 Slider
     ------------------------------------------------------------*/
  initSlider: function initSlider() {
    var initOptions = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      prevArrow: "<div class='slick-prev pull-left'><img src='../images/arrow-prev.png' class='fvn-img'></div>",
      nextArrow: "<div class='slick-next pull-right'><img src='../images/arrow-prev.png' class='fvn-img'></div>",
      responsive: [{
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }]
    };
    var sliderElement = $(".fvn-brand-slider ul");
    sliderElement.slick(initOptions);
  },

  /*------------------------------------------------------------
      0.5 Readmore
     ------------------------------------------------------------*/
  readMore: function readMore(readMoreElement, readMoreContent) {
    var readMoreElement = $(readMoreElement);
    var customReadMore = $(readMoreContent);
    readMoreElement.on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("toggle");
      customReadMore.toggleClass("toggle");
      var toggleTextShow = $(this).attr("data-toggle-show");
      var toggleTextOff = $(this).attr("data-toggle-off");
      var changeTitle = $(this).find(".read-more__title");

      if (customReadMore.hasClass("toggle")) {
        changeTitle.text(toggleTextShow);
      } else {
        changeTitle.text(toggleTextOff);
      }
    });
  },

  /*------------------------------------------------------------
      0.6 Detail image product
     ------------------------------------------------------------*/
  setImageCurrent: function setImageCurrent() {
    var $detailProductCurrentOnMobile = $(".fvn-product-current-detail");
    var currentLinkDesktop = $detailProductCurrentOnMobile.attr("data-bg-product-desktop");
    var currentLinkMobile = $detailProductCurrentOnMobile.attr("data-bg-product-mobile");
    var detailProductBody = $("body#sanpham-chitiet");

    var setCurrentLinkBackGround = function setCurrentLinkBackGround(element, link) {
      element.css("background-image", "url(".concat(link, ")"));
    };

    if (detailProductBody) {
      $(window).on("resize", function () {
        var timer = 0;
        window.clearTimeout(timer);
        timer = setTimeout(function () {
          var windowWidth = $(window).width();
          windowWidth < 576 ? setCurrentLinkBackGround($detailProductCurrentOnMobile, currentLinkMobile) : setCurrentLinkBackGround($detailProductCurrentOnMobile, currentLinkDesktop);
        }, 0);
      });
      $(window).trigger("resize");
    }
  }
};
$(function () {
  $.main.dropDownLangue();
  $.main.scrollSpy(); //   $.main.affixHeader();

  $.main.menuMobile();
  $.main.initSlider();
  $.main.readMore(".fvn-misson__certification .read-more", ".fvn-misson__certification .custom-readmore");
  $.main.readMore(".fvn-product-current .read-more", ".fvn-product-current .custom-readmore");
  $.main.readMore(".fvn-detail-product__introduce  .read-more", ".fvn-detail-product__introduce-readmore");
  $.main.setImageCurrent();
});