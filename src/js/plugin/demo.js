function loadDemoEvents() {
  var $carousel = $('#sep_carousel'),
    itemCount = 1,
    itemPerPage = 1,
    options = {viewItem: itemPerPage},
    billboardTemplate = ''+
    '<li>' +
      '<img src="images/billboard.jpg"/>' +
    '</li>',
    productTemplate = ''+
    '<li>' +
      '<img src="images/product.jpg"/>' +
      '<a>' +
        '<div>' +
          '<span class="brand">Alpha-H</span>' +
          '<span>Micro Cleanse Super Scrub 100ml</span>' +
          '<span class="price">S$50.00</span>' +
        '</div>' +
      '</a>' +
    '</li>',
    template = productTemplate;
    
  function setItems(count) {
    var $ul = $('<ul>');
    $('#sep_carousel').html('');
    
    for(var i=0; i< count; i++) {
      $ul.append(template);
    }
    
    $carousel.append($ul);
  }
  
  setItems(itemCount);

  function updateCarousel() {
    $carousel.removeClass('custom focus');
    setItems(itemCount);
    console.log(options);
    setTimeout(function() {
      $carousel.sepCarousel(options);
    }, 330);
  }
  
  $('#mainViewWidth').on('change', function() {
    var width = parseInt($(this).val());
    $('#mainView').width(width);
    if(options.type) {
      updateCarousel();
    }  
  });
  
  $('#itemCount').on('change', function() {
    itemCount = parseInt($(this).val());
    setItems(itemCount);
    if(options.type) {
      updateCarousel();
    }  
  });
  
  $('#itemPerPage').on('change', function() {
    itemPerPage = parseInt($(this).val());
    
    options.viewItem = itemPerPage;
    if(options.type) {
      updateCarousel();
    }  
  });
  
  $('#carouselType').on('change', function() {
    var carouselType = $(this).val();
    options.type = carouselType;
    if (carouselType == 'billboard') {
      template = billboardTemplate;
      options.viewItem = 1;
    } else {
      options.viewItem = itemPerPage;
      template = productTemplate;
    }
    updateCarousel();  
  });
  
  $('#autoRun').on('change', function() {
    var autoRun = $(this).val();
    options.autoRun = !!autoRun;
    updateCarousel();  
  });
  
  $('#navDots').on('change', function() {
    var navDots = $(this).val();
    options.navDots = !!navDots;
    updateCarousel();  
  });
}

var carouselView = `
<div class='demo-controls'>
    <span>carousel Width</span>
    <select id="mainViewWidth">
      <option value="200">200</option>
      <option value="300">300</option>
      <option value="400">400</option>
      <option value="600">600</option>
      <option value="800">800</option>
      <option value="900">900</option>
      <option value="1000">1000</option>
      <option value="1125">1125</option>
      <option value="100%">100%</option>
    </select>
    <span>Item Count</span>
    <select id="itemCount">
      <option value="1">01</option>
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="12">12</option>
      <option value="15">15</option>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
    <span>Item Per Page</span>
    <select id="itemPerPage">
      <option value="1">01</option>
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="6">10</option>
      <option value="10">12</option>
    </select>
    <span>carousel Type</span>
    <select id="carouselType">
      <option value="none">None</option>
      <option value="default">Default</option>
      <option value="continue">Continue</option>
      <option value="billboard">Billboard</option>
      <option value="focus">Focus</option>
    </select>
    <span>Auto Run</span>
    <select id="autoRun">
      <option value="">no</option>
      <option value="yes">Yes</option>
    </select>
    <span>Nav Dots</span>
    <select id="navDots">
      <option value="">no</option>
      <option value="yes">Yes</option>
    </select>
  </div>
  <div id="mainView">
    <div class='container'>
      <div id="sep_carousel" class='sep-carousel'>
      </div>
    </div>
  </div>
`
export { loadDemoEvents, carouselView }
