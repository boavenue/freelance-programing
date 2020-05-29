$.main = {
	/*------------------------------------------------------------
	    0.1. Dropdown header
    ------------------------------------------------------------*/
	dropDownLangue: function () {
		$(".fvn-header__menu-item.language").on("click", function () {
			$(this).toggleClass("open");
			$(".language-list").toggleClass("open");
		});
	},
	/*------------------------------------------------------------
	    0.2. Scrollspy
    ------------------------------------------------------------*/
	scrollSpy: function () {
		$(window).on("scroll", function () {
			var eachSection = $(".fvn-section");
			var navigation = $(".fvn-header__menu");
			var navigationHeight = $(".fvn-header").outerHeight();
			var curPostionScroll = $(this).scrollTop();
			eachSection.each(function () {
				var topCurScroll = $(this).offset().top - navigationHeight;
				var bottomCurScroll = topCurScroll + $(this).outerHeight();
				if (
					curPostionScroll >= topCurScroll &&
					curPostionScroll <= bottomCurScroll
				) {
					navigation
						.find(".fvn-header__menu-item a")
						.removeClass("active");
					navigation
						.find(
							'.fvn-header__menu-item a[href="#' +
								$(this).attr("id") +
								'"]'
						)
						.addClass("active");
				}
			});
		});
		var widthBrow = $(window).width();
		$(".fvn-header__menu-item:not('.language, .hotline') a").on(
			"click",
			function (event) {
				event.preventDefault();
				var curSection = $(this).attr("href");
				var headerHeight = $(".nheader").height();
				var hamburgerEle = $(".fvn-header__mobile");
				var headerRightMenu = $(".fvn-header__menu-mobile");
				hamburgerEle.removeClass("change");
				headerRightMenu.removeClass("open");
				if ($(curSection).length) {
				}
				setTimeout(() => {
					$("html, body").animate(
						{
							// scrollTop: $(curSection).offset().top - headerHeight + 2
							scrollTop: $(curSection).offset().top - 50,
						},
						1200
					);
				}, 100);
			}
		);
	},
	/*------------------------------------------------------------
	    0.3 Affix header
    ------------------------------------------------------------*/
	affixHeader: function () {
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
	menuMobile: function () {
		var hamburgerEle = $(".hambuger-menu");
		var headerRightMenu = $("#freelance-nav");
		var backgroundOverlay = $(".bg-overlay");
		hamburgerEle.on("click", function () {
			$(this).toggleClass("change");
			backgroundOverlay.toggleClass("open");
			headerRightMenu.toggleClass("open");
		});
		backgroundOverlay.on("click", function () {
			$(this).removeClass("open");
			hamburgerEle.removeClass("change");
			headerRightMenu.removeClass("open");
		});
	},

	sliderBanner: function () {
		var sliderElement = $(".slider-banner");
		var initOptions = {
			dots: false,
			arrows: false,
			infinite: true,
			autoplay: true,
			speed: 900,
			fade: true,
			pauseOnHover: false,
			slidesToShow: 1,
		};

		sliderElement.on("init", function (event, slick, direction) {
			let totalItem = slick.$slides.length;
			$(".slider-banner-total").text(totalItem);
		});

		sliderElement.slick(initOptions);

		sliderElement.on("swipe", function (
			event,
			slick,
			direction,
			currentSlide,
			nextSlide
		) {
			if (direction === "right") {
				$(".slider-banner-arrow__next").click();
			}
			if (direction === "left") {
				$(".slider-banner-arrow__prev").click();
			}
		});

		sliderElement.on("afterChange", function (
			event,
			slick,
			currentSlide,
			nextSlide
		) {
			let currentItem = (currentSlide ? currentSlide : 0) + 1;
			$(".slider-banner-current").text(currentItem);
		});

		$(".slider-banner-arrow__prev").on("click", function () {
			$(".slider-banner").slick("slickPrev");
			let currentIndex = $(".slick-current").attr("data-slick-index");
			currentIndex++;
			$(".slider-banner-current").text(currentIndex);
		});

		$(".slider-banner-arrow__next").on("click", function () {
			$(".slider-banner").slick("slickNext");
			let currentIndex = $(".slick-current").attr("data-slick-index");
			currentIndex++;
			$(".slider-banner-current").text(currentIndex);
		});
	},

	postSticky: function () {
		let postStickyWrap = $(".post-sticky-wrap"),
			socialSticky = $(".post-sticky");
		$(window).on("load scroll", function (e) {
			if (postStickyWrap.length) {
				let heightPostStickyWrap = postStickyWrap.height();
				let offsetPostStickyWrap = postStickyWrap.offset().top;
				let heightSocialSticky = socialSticky.height();
				let offsetStickyValue =
					($(window).height() - heightSocialSticky) / 2;
				let maxOffsetWrapper =
					heightPostStickyWrap +
					offsetPostStickyWrap -
					heightSocialSticky -
					offsetStickyValue;
				let scrollTop = $(window).scrollTop();
				if (
					scrollTop >= offsetPostStickyWrap &&
					scrollTop <= maxOffsetWrapper
				) {
					let transitionSticky = scrollTop - offsetPostStickyWrap;
					socialSticky.addClass("active");
					socialSticky.css({
						transform: "translateY(" + transitionSticky + "px)",
						"margin-top": "50px",
					});
				}

				if (scrollTop <= offsetPostStickyWrap) {
					socialSticky.removeClass("active");
					socialSticky.css({
						transform: "none",
						"margin-top": "0",
					});
				}
			}
		});
	},
};
$(function () {
	// $.main.dropDownLangue();
	// $.main.scrollSpy();
	//   $.main.affixHeader();
	$.main.menuMobile();
	$.main.sliderBanner();
	$.main.postSticky();
});
