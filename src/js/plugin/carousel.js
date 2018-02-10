var luxola = {
  isPortrait: false,
  isMobile: false,
  isTablet: false
}

var utilities = {
  setImgElementHeight: function($parent, $child, exheight) {
    exheight = exheight? exheight : 0;
    $child = $child ? $child : $parent.first().find('img');
    var newHeight = $child.height();

    if (newHeight > 30) {
      $parent.height(newHeight + exheight);
    }

    $child.on('load', function() {
      newHeight = $child.height();
      if (newHeight > 30) {
        $parent.height(newHeight + exheight);
      }
    });
  }
}

function sepCarousel(input) {
  var $carousel = $(this).hasClass('sep-carousel') ?  $(this) : $(this).find('.sep-carousel'),
    data = {};
    
  $carousel.each(function() {
    var $self = $(this),
      portrait = $self.data('portrait'),
      type = $self.data('type'),
      viewItem = $self.data('viewitem');
    data = input ? input : {type: type,
            viewItem: viewItem,
            autoRun: $self.data('autorun'),
            navDots: $self.data('navdots'),
            arrowOut: $self.data('arrowout'),
            tnc: $self.data('tnc'),
            mobile: $self.data('mobile')
          };
    data.portrait = data.portrait ? data.portrait : portrait;
    data.landscape = data.viewItem;
    data.viewItem = (function() {
        if (type === 'billboard' || type === 'singleitem') {
          data.portrait = 1;
          data.landscape = 1;
          return 1;
        }
        return (luxola.isPortrait && data.portrait) ? data.portrait : data.viewItem;
      })();
    if($self.hasClass('custom')) return;
    if(luxola.isMobile && data.mobile=='no') return;
    initCarousel($self, data);
  });
  
  function initCarousel($carousel, data) {
    var $carouselScroll = $carousel.find('ul'),
      $items = $carouselScroll.find('li'),
      $tnc = $carouselScroll.find('.billboard_terms_and_conditions_button'),
      carouselHeight = $carousel.height(),
      carouselWidth = $carousel.width() > parseInt($carousel.css('minWidth')) ? $carousel.width() : parseInt($carousel.css('minWidth')),
      itemWidth = $items.first().width(),
      properties = {},
      carousel = {},
      $nav = null,
      isEnable = true,
      itemIncrement = 1;
    if ($items.length < data.viewItem && !luxola.isMobile) {
      $carousel.addClass('custom');
      return;
    }
    var itemStyle = {
      marginLeft: 0,
      marginRight: 0
    };

    var config = {
      mobile: {
        viewItem: (function() {
          return data.viewItem? data.viewItem : 3;
        })(),
        
        type: (data.type && (data.type === 'billboard' || data.type === 'singleitem'))? data.type : 'half'
      },
      tablet: {
        viewItem: (function() {
          return data.viewItem? data.viewItem : 5;
        })(),
        
        type: data.type? data.type : 'default',
        portrait: data.portrait,
        landscape: data.landscape
      },
      desktop: {
        viewItem: (function(){
          return data.viewItem? data.viewItem : 5;
        })(),
        
        type: data.type? data.type : 'default'
      }
    };

    function _enableNavDots() {
      carousel.navDots = (properties.viewItem < carousel.itemCount) ? data.navDots : false; 

      if(properties.viewItem > 1 && data.type !== 'focus') {
        carousel.navDots = false;
      }
    }

    function _setEnable(prop) {
      carousel[prop] = !!data[prop] && (properties.viewItem < carousel.itemCount);
    }

    function _updateDeviceProperty() {
      carousel.autoRun = !!data.autoRun && (properties.viewItem < carousel.itemCount);
      _enableNavDots();
    }

    function _getDevice() {
      if(luxola.isMobile) {return 'mobile';}
      if(luxola.isTablet) {return 'tablet';}
      return 'desktop';
    }

    function _defaultConfig () {
      carousel = {
        carouselHeight: carouselHeight,
        carouselWidth: carouselWidth,
        itemWidth: $items.width(),
        itemOuterWidth: $items.outerWidth(true) > $items.outerWidth() ? $items.outerWidth(true) : $items.outerWidth(),
        itemCount: $items.length,

        itemIndex: 0,
        device: properties.type,
        isMobile: luxola.isMobile,
        isDevice: luxola.isMobile || luxola.isTablet,
        isTablet: luxola.isTablet,
        isPortrait: luxola.isPortrait,
        timeInterval: 500,

        type: properties.type
      }
    }

    function _updateEvents() {
      var events = {
        default: {
          moveLeft: function() {
            carousel.itemIndex = carousel.itemIndex - itemIncrement;
            _move(carousel.itemIndex);
          },

          moveRight: function() {
            carousel.itemIndex = carousel.itemIndex + itemIncrement;
            _move(carousel.itemIndex);
          }
        },
        
        half: {},

        continue: {
          moveLeft: function() {
            carousel.itemIndex = carousel.itemIndex - itemIncrement;
            _swappingItems(true);
          },

          moveRight: function() {
            carousel.itemIndex = carousel.itemIndex + itemIncrement;
            _swappingItems(false);
          },

          activateItem: function (status) {}
        },

        billboard: {
          moveLeft: function() {
            carousel.itemIndex = carousel.itemIndex - itemIncrement;
            moveBillboard('right');
          },

          moveRight: function() {
            carousel.itemIndex = carousel.itemIndex - itemIncrement;
            moveBillboard('left');
          },

          activateItem: function (status) {}
        }
      }

      events.focus = events.continue;

      events.batch = events.continue;

      events.singleitem = events.billboard;
      
      events.focus = events.continue;

      return events[carousel.type] ? events[carousel.type] : events['default'];
    }

    function _updateFunctionality () {
      var functionalities = {
        default: function() {
          _itemPerView();
        },

        continue: function() {
          _itemPerView();
          _setUpContinue();
        },

        billboard: function() {
          $carousel.addClass('billboard');
          $items.first().addClass('active');
          $items.each(function() { 
            loadImg($(this).find('img'));
          });

          if(!carousel.isMobile) {
            $carousel.on('mouseenter', showArrow).on('mouseleave', hideArrow);
          }
          _options();
        },

        singleitem: function() {
          $carousel.addClass('singleitem');
          $items.first().addClass('active');

          if(!carousel.isMobile) {
            $carousel.on('mouseenter', showArrow).on('mouseleave', hideArrow);
          }
          _options();
        },

        focus: function() {
          functionalities.continue();
          focus();
        },
        
        batch: function() {
          if(carousel.itemCount >= properties.viewItem * 3) {
            itemIncrement = properties.viewItem;
          }

          functionalities.continue();
        }
      }
      return functionalities[carousel.type] ? functionalities[carousel.type] : functionalities['default'];
    }

    function _setUPconfig() {
      _updateDeviceProperty();

      carousel.events = _updateEvents();
      carousel.init = _updateFunctionality();
    }
    
    function _setWrapper() {
      var $wrapper = null;
      $carousel.append('<div class="wrapper"></div>');
      $wrapper = $carousel.find('.wrapper');
      $wrapper.append($carouselScroll);
      carousel.carouselWidth = carousel.carouselWidth - 80;
    }

    function _bindCarousel () {
      properties = config[_getDevice()];

      _defaultConfig();

      if(data.arrowOut && !luxola.isMobile) {
        _setWrapper();
      }

      if (properties.type === 'half') {
        $items.width((carousel.carouselWidth /2.5) - 10);
        $items.css({marginLeft: '10px'});
      } else {
        $carousel.addClass('custom');
        _setUpCarousel();
        _bindCarouselEvents();
      }

      refreshCarouselSizes();
    }

    function _bindNavEvents() {
      $nav.on('click',function (e) {
        e.preventDefault();
        var targetItemIndex = $nav.index(this);

        if (targetItemIndex === carousel.itemIndex) return;

        var $targetItem = $items.eq(targetItemIndex);

        if(targetItemIndex > carousel.itemIndex) {
          carousel.itemIndex = targetItemIndex;
          moveBillboard('left', $targetItem);
        } else {
          carousel.itemIndex = targetItemIndex;
          moveBillboard('right', $targetItem);
        }
      });
    }

    function moveToIndexItem(count, isLeft) {
      count = Math.abs(count);

      carousel.timeInterval = carousel.timeInterval/count;
      if (count) {
        count--;
        if(isLeft) {
          carousel.events.moveRight();
        } else {
          carousel.events.moveLeft();
        }

        setTimeout(function() {
          moveToIndexItem(count, isLeft);
        }, carousel.timeInterval);
      }

      setTimeout(function(){carousel.timeInterval = 500}, carousel.timeInterval * count);
    }

    function moveBillboard(direction, $tragetItem) {
      var action = direction === 'right' ? 'prev' : 'next';
      var newItemIndex = direction === 'right' ? 'last' : 'first';
      var $currentItem = $carouselScroll.find('li.active');

      if (!$tragetItem) {
        $tragetItem = $currentItem[action]().length ? $currentItem[action]() : $items[newItemIndex]();
        carousel.itemIndex = $items.index($tragetItem);
      }
      
      if ($tragetItem.find('img').attr('src') === '') {
        loadImg($tragetItem.find('img'));
      }

      homepageBillboardPushToGA(carousel.itemIndex, 'arrow-left');

      _move();
      $tragetItem.addClass(action);

      setTimeout(function() {
        $currentItem.addClass(direction);
        $tragetItem.addClass(direction);
      });

      setTimeout(function(){
        $currentItem.removeClass( direction + ' active');
        $tragetItem.removeClass(direction + ' ' + action);
        $tragetItem.addClass('active');

      }, 500);
    }

    function _move() {
      if($nav) {
        $nav.removeClass('active');
        $nav.eq(carousel.itemIndex).addClass('active');
      }
    }

    function _setUpNavDot() {
      var $navElement = $('<nav class="' + carousel.navDots + '">');
        $navElement.append('<a data-index="0" class="active"><span></span></a>');
      for( var i=1; i < carousel.itemCount; i++) {
        $navElement.append('<a data-index=' + i + '><span></span></a>');
      }
      $navElement.children('a:first-child').addClass('active');
      $carousel.append($navElement);
      $nav = $carousel.find('nav a');
      carousel.carouselHeight = $carousel.height() - $nav.outerHeight(true);

      if(!carousel.isDevice) {
        _bindNavEvents();
      }
    }

    function _enableAutoRun() {
      var initAutoRun = setInterval(autoRun, 4000);
      if(!carousel.isDevice) {
        $carousel.mouseenter(function() {
          clearInterval(initAutoRun);
        }).mouseleave(function(){
          initAutoRun = setInterval(autoRun, 4000);
        });
      }
    }

    function setBillBoardHeight($img) {
      var extraHeight = 0;

      if (luxola.isMobile && $tnc.length && data.tnc === 'out') {
        $tnc.addClass('out');
        extraHeight = $tnc.height();
        $carousel.find('nav').addClass('tc');
      }

      utilities.setImgElementHeight($items, $img, extraHeight);
    }

    function refreshCarouselSizes() {
      var $firstItem = $items.first();
        $img = $firstItem.find('img');

      if($img.length) {
        if(carousel.type === 'billboard') {
          setBillBoardHeight($img);
        } else if (carousel.type === 'singleitem') {
          $img.on('load', function() {
            $carouselScroll.css({minHeight: $(this).height() + 'px'});
          });
        } else {
          $img.on('load', function() {
            $carousel.css({minHeight: $(this).height() + 'px'});
          });
        }
      }
    }
    
    function _getWidth(isPortrait, isFullView) {
      var newWidth = $carousel.find('.wrapper').width() || $carousel.width();
      if (isFullView) return newWidth;
      if (isPortrait) {
        newWidth = (carousel.carouselWidth < (newWidth * 2)) ? newWidth : carousel.carouselWidth * 0.75;
      } else {
        newWidth = (carousel.carouselWidth < newWidth) ? newWidth : (carousel.carouselWidth / 0.75);
      }
      return newWidth;
    }
    
    function isBatch() {
      return carousel.itemCount >= properties.viewItem * 3 && data.type === 'batch';
    }
    
    function reset() {
      var isPortrait = (window.innerHeight > window.innerWidth);
      if(carousel.isPortrait !== isPortrait) {
        carousel.isPortrait = isPortrait;
        carousel.carouselWidth = _getWidth(isPortrait, properties.portrait > properties.landscape);
        if (carousel.type === 'billboard') {
          setBillBoardHeight();
        } else if(luxola.isTablet) {
          properties.viewItem = isPortrait ? properties.portrait : properties.landscape;
          var margin = (carousel.carouselWidth - ($items.width() * properties.viewItem))/(2*properties.viewItem);
            margin = margin > 0 ? margin + 'px' : 0;
          if(carousel.itemCount >= properties.viewItem * 3) {
            itemIncrement = properties.viewItem;
          } else {
            itemIncrement = 1;
          }
          
          $items.css({marginLeft: margin, marginRight: margin});
          $carouselScroll.width($items.outerWidth(true) * $items.length);
          if(carousel.carouselWidth < $items.width()) {
            $items.width(carousel.carouselWidth);
          }
          
          if (carousel.itemCount !== properties.viewItem)
            $carouselScroll.css({marginLeft: ($items.outerWidth(true) * -1 ) + 'px'});
          
          if(isBatch()) {
            $carouselScroll.css({marginLeft: (($items.outerWidth(true) * properties.viewItem * -1 )) + 'px'});
          }
          
          if(carousel.itemCount > properties.viewItem) {
            showArrow();
          } else {
            $carouselScroll.css({marginLeft: 0});
            hideArrow();
          }
        }
      }
    }

    function autoRun () {
      carousel.events.moveRight();
    }
    
    function showArrow() {
      $carousel.find('.arrow').fadeIn();
    }
    
    function hideArrow() {
      $carousel.find('.arrow').fadeOut();
    }
    
    function showLeftArrow() {
      $carousel.find('right.arrow').fadeIn();
    }
    
    function showRightArrow() {
      $carousel.find('left.arrow').fadeIn();
    }
    
    function hideLeftArrow() {
      $carousel.find('right.arrow').fadeOut();
    }
    
    function hideRightArrow() {
      $carousel.find('left.arrow').fadeOut();
    }

    function refreshItems() {
      $items = $carouselScroll.find('li');
    }

    function homepageBillboardPushToGA (focusIndex, reason) {
      if (carousel.type !== 'billboard') return;
      var slideTrigger = 'manual';
      
      if ($('.home.index').length > 0 && focusIndex !== -1 && slideTrigger !== '') {
        gtmData.homepageBillboardDataLayerPush(focusIndex, slideTrigger, reason);
      }
    }

    function _swappingItems(isleft) {
      var $preItem = $carousel.find('.preItem');
      
      if (isleft) {
        var $lastItems = $items.slice(itemIncrement * -1);
          itemNum = $lastItems.length;
        
        function _moveRight() {
          refreshItems();
          if($preItem.length) {
            $items.first().html($items.last().prev().html());
          }
          carousel.focusIndex--;
          carousel.events.activateItem()
        }
        
        $lastItems.detach();
        $carouselScroll.prepend($lastItems.hide());

        if(itemNum > 1) {
          $lastItems.show(carousel.timeInterval, _moveRight);
        } else {
          homepageBillboardPushToGA(carousel.focusIndex, 'arrow-left');
          $lastItems.show(carousel.timeInterval, _moveRight);
        }
      } else {
        var $firstItems = $items.slice(0, itemIncrement),
          itemNum = $firstItems.length;
        
        function _moveLeft() {
          $carouselScroll.append($firstItems);
          $firstItems.show();
          refreshItems();
          if($preItem.length) {
            $items.last().html($items.first().next().html());
          }
          carousel.focusIndex++;
          carousel.events.activateItem();
        }
          
        if (itemNum > 1) {
          $firstItems.hide(carousel.timeInterval, _moveLeft);
        } else {
          homepageBillboardPushToGA(carousel.focusIndex, 'arrow-right');
          $firstItems.hide(carousel.timeInterval, _moveLeft);
        }
      }
    }

    function _setUpContinue() {
      var addPrePostItems = luxola.isTablet ? (carousel.itemCount !== 1) && (carousel.itemCount < (properties.portrait + 2)) : (carousel.itemCount !== properties.viewItem) && (carousel.itemCount < (properties.viewItem + 2));
      if(addPrePostItems) {
        var $initItem = $items.first(),
          $preItem = $('<li class="preItem">'),
          $postItem = $('<li class="postItem">');

        if($initItem.length > 0) {
          $initItem.css({marginLeft: 0});
          $preItem.addClass($initItem.attr('class')).data($initItem.data()).html($items.last().html());
          $postItem.addClass($initItem.attr('class')).data($initItem.data()).html($items.first().html());

          $carouselScroll.prepend($preItem);
          $carouselScroll.append($postItem);

          refreshItems();
          carousel.itemCount = $items.length;
          $carouselScroll.width(carousel.itemCount * carousel.itemOuterWidth);
        }
      } 

      if(carousel.itemCount !== properties.viewItem) {
        $items.css(itemStyle);
        $carouselScroll.css({marginLeft: ((carousel.itemOuterWidth) * -1 ) + 'px'});
        
        if(isBatch() || carousel.type == 'billboard') {
          var $lastItems = $items.slice(properties.viewItem * -1);
          $lastItems.detach();
          $carouselScroll.prepend($lastItems);
          refreshItems();
          $carouselScroll.css({marginLeft: ((carousel.carouselWidth) * -1 ) + 'px'});
        }
      }
    }
    
    function loadImg($img) {
      var imgUrl = $img.data('image-url');
      $img.attr('src', imgUrl);
    }

    function _adjustMargin () {}

    function _adjustWidth () {}

    function _itemPerView() {
      var outerWidthPerItem = carousel.carouselWidth/properties.viewItem,
        margins = (outerWidthPerItem - carousel.itemWidth);
      if (carousel.isMobile) {
        itemWidth = outerWidthPerItem - 10
        $items.width(itemWidth);
        margins = 5;
      }

      if(properties.viewItem == -1) {
        margins = 0;
        itemWidth = carousel.carouselWidth;
        $items.width(itemWidth);
      }

      if (carousel.type == 'billboard') {
        itemStyle.marginLeft = 0;
        itemStyle.marginRight = 0;
      } else if (margins > 0) {
        itemStyle.marginLeft = (margins/2) + 'px';
        itemStyle.marginRight = (margins/2) + 'px';
        $items.css({marginLeft: itemStyle.marginLeft});
        $items.css({marginRight: itemStyle.marginRight});
      } else {
        margins = 6;
        itemWidth = outerWidthPerItem - margins;
        itemStyle.marginLeft = (margins/2) + 'px';
        itemStyle.marginRight = (margins/2) + 'px';
        itemStyle.width = itemWidth;
        $items.css({marginRight: itemStyle.marginRight + 'px'});
        $items.width(itemWidth);
      }

      carousel.itemOuterWidth = outerWidthPerItem;
      $carouselScroll.width(carousel.itemCount * outerWidthPerItem);
      _options();
    }
    
    function blockEvent() {
      isEnable = false;
      setTimeout(function() {
        isEnable = true;
      }, 500);
    }
    
    function enableMoveEvent(move) {
      if(isEnable) {
        carousel.events[move]();
        blockEvent();
      }
    }

    function _bindArrows() {
      var arrows = '<a class="arrow" href="javascript:void(0)"></a>',
        $arrowLeft = $(arrows).addClass('left'),
        $arrowRight = $(arrows).addClass('right');
      
      $carousel.prepend($arrowLeft);
      $carousel.prepend($arrowRight);

      $arrowLeft.on('click touchend', function(e) {
        e.preventDefault();
        console.log('moveLeft');
        enableMoveEvent('moveLeft');
      });

      $arrowRight.on('click touchend', function(e) {
        e.preventDefault();
        enableMoveEvent('moveRight');
        console.log('moveRight');
      });
    }

    $(window).bind('orientationchange', function() {
      setTimeout(reset, 200);
    });

    function _options() {
      if(carousel.autoRun) _enableAutoRun();

      if(carousel.navDots) _setUpNavDot();
    }

    function _setUpCarousel() {
      _setUPconfig();
      carousel.init();
    }

    function _bindCarouselEvents() {
      carousel.carouselHeight = $carousel.height();

      var isEventEnable = luxola.isTablet ? (carousel.itemCount > properties.portrait) : (carousel.itemCount > properties.viewItem);

      if(isEventEnable) {
        _bindArrows();

        if(carousel.itemCount <= properties.viewItem ) {
          hideArrow();
        }
        
        $carousel.swipe({
          swipeLeft: function() {
            enableMoveEvent('moveRight');
          },
          swipeRight: function() {
            enableMoveEvent('moveLeft');
          }
        });
      }
    }

    _bindCarousel();
  }
}

export { sepCarousel }
