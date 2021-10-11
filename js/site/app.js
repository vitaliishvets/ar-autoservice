(function($, window) {
  "use strict";

  var Site = function() {
    this._init();
  };

  Site.prototype = {
    _init: function() {
      this
        ._initFoundation()
        ._initFixedSticky()
        ._initNavigation()
        // ._initSearch()
        ._initSlider()
        ._initBackToTop()
        ._initExternalLinks();

      return this;
    },

    _initFoundation: function() {
      $(document).foundation({

        // Accordion settings
        accordion: {
          // allow multiple accordion panels to be active at the same time
          multi_expand: false,

          // Make sure the active accordion is visible
          callback: function($accordion) {
            var panelOffset = $accordion.offset().top;

            if (panelOffset < $(window).scrollTop()) {
              utilities.smoothScroll(panelOffset - 70);
            }
          }
        },

        // Equalizer settings
        equalizer: {
          equalize_on_stack: true
        },

        // Interchange media queries
        interchange: {
          named_queries: {
            xsmall: "only screen and (max-width: 24.9375em)",
            xsmall2x: "only screen and (max-width: 24.9375em) and (-webkit-min-device-pixel-ratio: 2)," +
              "only screen and (max-width: 24.9375em) and (min--moz-device-pixel-ratio: 2)," +
              "only screen and (max-width: 24.9375em) and (-o-min-device-pixel-ratio: 2/1)," +
              "only screen and (max-width: 24.9375em) and (min-device-pixel-ratio: 2)," +
              "only screen and (max-width: 24.9375em) and (min-resolution: 192dpi)," +
              "only screen and (max-width: 24.9375em) and (min-resolution: 2dppx)",
            small: "only screen and (min-width: 25em) and (max-width: 47.9375em)",
            small2x: "only screen and (min-width: 25em) and (max-width: 47.9375em) and (-webkit-min-device-pixel-ratio: 2)," +
              "only screen and (min-width: 25em) and (max-width: 47.9375em) and (min--moz-device-pixel-ratio: 2)," +
              "only screen and (min-width: 25em) and (max-width: 47.9375em) and (-o-min-device-pixel-ratio: 2/1)," +
              "only screen and (min-width: 25em) and (max-width: 47.9375em) and (min-device-pixel-ratio: 2)," +
              "only screen and (min-width: 25em) and (max-width: 47.9375em) and (min-resolution: 192dpi)," +
              "only screen and (min-width: 25em) and (max-width: 47.9375em) and (min-resolution: 2dppx)",
            medium: "only screen and (min-width: 48em) and (max-width: 63.9375em)",
            medium2x: "only screen and (min-width: 48em) and (max-width: 63.9375em) and (-webkit-min-device-pixel-ratio: 2)," +
              "only screen and (min-width: 48em) and (max-width: 63.9375em) and (min--moz-device-pixel-ratio: 2)," +
              "only screen and (min-width: 48em) and (max-width: 63.9375em) and (-o-min-device-pixel-ratio: 2/1)," +
              "only screen and (min-width: 48em) and (max-width: 63.9375em) and (min-device-pixel-ratio: 2)," +
              "only screen and (min-width: 48em) and (max-width: 63.9375em) and (min-resolution: 192dpi)," +
              "only screen and (min-width: 48em) and (max-width: 63.9375em) and (min-resolution: 2dppx)",
            large: "only screen and (min-width: 64em) and (max-width: 89.9375em)",
            large2x: "only screen and (min-width: 64em) and (max-width: 89.9375em) and (-webkit-min-device-pixel-ratio: 2)," +
              "only screen and (min-width: 64em) and (max-width: 89.9375em) and (min--moz-device-pixel-ratio: 2)," +
              "only screen and (min-width: 64em) and (max-width: 89.9375em) and (-o-min-device-pixel-ratio: 2/1)," +
              "only screen and (min-width: 64em) and (max-width: 89.9375em) and (min-device-pixel-ratio: 2)," +
              "only screen and (min-width: 64em) and (max-width: 89.9375em) and (min-resolution: 192dpi)," +
              "only screen and (min-width: 64em) and (max-width: 89.9375em) and (min-resolution: 2dppx)",
            xlarge: "only screen and (min-width: 90em)",
            xlarge2x: "only screen and (min-width: 90em) and (-webkit-min-device-pixel-ratio: 2)," +
              "only screen and (min-width: 64em) and (min--moz-device-pixel-ratio: 2)," +
              "only screen and (min-width: 64em) and (-o-min-device-pixel-ratio: 2/1)," +
              "only screen and (min-width: 64em) and (min-device-pixel-ratio: 2)," +
              "only screen and (min-width: 64em) and (min-resolution: 192dpi)," +
              "only screen and (min-width: 64em) and (min-resolution: 2dppx)",
          }
        }
      });

      return this;
    },

    _initFixedSticky: function() {
      var $elements = $('.fixedsticky'),
        setWidth = function() {
          $elements.each(function() {
            $(this).width($(this).parent().width());
          })
        };

      setWidth();
      $(window).on('resize', setWidth);

      $elements.fixedsticky();

      return this;
    },

    _initNavigation: function () {
        var $mobileNavigation = $('.navigation-mobile');

        // Navigation mobile basic functions
        $mobileNavigation.on('click', '.has-dropdown > a', function (event) {
            var $link = $(this),
                $listElement = $link.parent(),
                subMenuOffset, windowScrollTop;

            if ($listElement.hasClass('active')) {
                $listElement.removeClass('active');
            } else {
                $link.parent().parent().find('.active').removeClass('active');
                $link.parent().addClass('active');

                subMenuOffset = $link.next().offset().top;
                windowScrollTop = $(window).scrollTop();

                // Make sure the opened dropdown is visible and not beyond the fold
                if (subMenuOffset > (windowScrollTop + $(window).height()) * 0.9) {
                    utilities.smoothScroll(windowScrollTop + 100);
                } else if (subMenuOffset < windowScrollTop) {
                    utilities.smoothScroll(subMenuOffset - 50);
                }
            }

            event.preventDefault();
        });

        $('.hamburger').click(function (event) {
            var $icon = $(this),
                $nav = $('#navArea');
        
            event.preventDefault();
        
            $icon.toggleClass('clicked');
            $nav.toggleClass('opened');
        
            if ($nav.hasClass('opened')) {
                $('.page-wrapper').on('click.navigation', function (event) {
                    if (0 == $('.head').find(event.target).length) {
                        $icon.removeClass('clicked');
                        $nav.removeClass('opened');
                        $('.page-wrapper').off('click.navigation');
                    }
                });
            }
        });
        
        return this;
        },

    /*_initSearch: function() {
      $('.meta-navigation').each(function() {
        var $this = $(this),
          $toggle = $this.find('.icon-search'),
          $container = $this.find('.searchbox'),
          $searchField = $container.find('.search-input');

        // Navigation searchbox (open)
        $toggle.click(function() {
          $toggle.addClass('hide');
          $container.removeClass('hide');
          $container.find(".search-input").focus();
        });

        // Navigation searchbox (close)
        $searchField.on('focusout', function() {
          window.setTimeout(function() {
            $searchField.val('');
            $toggle.removeClass('hide');
            $container.addClass('hide');
          }, 100);
        });

        // Prevent empty queries
        $container.on('submit', 'form', function(event) {
          if ('' == $searchField.val()) {
            event.preventDefault();
          }
        });

        $searchField.autocomplete({
          source: $searchField.data('autocompleteUrl'),
          position: {
            my: "left top+5",
            at: "left bottom"
          },
          select: function(event, ui) {
            $searchField.val(ui.item.value);
            $container.find('form').submit();
          },
          appendTo: $container
        });
      });

      return this;
    },*/

    _initSlider: function() {
      // Slick slider settings
      $('.slider').each(function() {
        var $this = $(this),
          autoplayAttr = $this.data('autoplay') || false,
          autoplay = false,
          autoplaySpeed;

        if (autoplayAttr) {
          autoplaySpeed = parseInt(autoplayAttr) || false;
          if (0 < autoplaySpeed) {
            autoplay = true;
          }
        }

        $this.slick({
          slide: '.slideContent',
          arrows: false,
          dots: true,
          dotsClass: 'slick-dots dotstyle dotstyle-tooltip',
          customPaging: function(slider, i) {
            return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + slider.$slides.eq(i).data('title') + '</button>';
          },
          fade: true,
          cssEase: 'linear',
          autoplay: autoplay,
          autoplaySpeed: autoplaySpeed
        });
      });

      return this;
    },

    _initBackToTop: function() {
      $('.toTop').on('click', 'a', function(event) {
        event.preventDefault();

        utilities.smoothScroll(0);
      });

      return this;
    },

    _initExternalLinks: function() {
      $('a').each(function() {
        var $link = $(this);

        if (!$link.attr('target') && utilities.isExternalUrl($link.prop('href'))) {
          $link.attr('target', '_blank');
        }
      });

      return this;
    }
  };

  var utilities = {
    isExternalUrl: function(url) {
      return (
        url &&
        /^https?:\/\//.test(url) &&
        0 > url.indexOf(window.location.protocol + '//' + window.location.host)
      );
    },

    smoothScroll: function(offset) {
      $('html,body').animate({
        scrollTop: offset
      }, 1000);
    }
  };

  $(function() {
    window.arservice = window.arservice || {};
    window.arservice.site = new Site();
    window.arservice.utilities = utilities;
  });
})(jQuery, window);