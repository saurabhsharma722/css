import { mainView } from './js/index';
//import './js/views/scss/view.scss';

//import { sepCarousel } from './js/plugin/carousel';
//import { loadDemoEvents, carouselView } from './js/plugin/demo';

// jQuery.fn.extend({
//   sepCarousel: sepCarousel
// });

(function() {
  $('body').html(mainView);
  
  $('.card').on('click', function(e) {
    e.preventDefault();
    $('.card').removeClass('selected').hide();
    $(this).addClass('selected').show();
  });
  
  $('.close-btn').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.card').removeClass('selected').show();
  });
  
  //loadDemoEvents();
})();
