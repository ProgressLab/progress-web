/*
	Carousel.
*/

class Carousel {
  constructor(div_id = "slideshow", dot_id = "slideshow-selector", switchTimeout = 5000) {
    this.slideIndex = 1;
    this.timeout = null;
    this.div_id = div_id;
    this.dot_id = dot_id;

    this.switchTimeout = switchTimeout;

    var $imgs = $('#' + this.div_id + ' .slide');

    // Add dots for selection.
    $imgs.each((index) => {
      var $span = $('<span>');
      $span.addClass('dot')
      if(index === 0) { $span.addClass('active'); }
      $span.click(() => {
        clearTimeout(this.timeout);
        this.updateCarousel(index);
      });
      $('#' + this.dot_id).append($span);
    });

    // Add the arrows.
    var $prev = $('<a>').text('<');  // U+0276E
    $prev.addClass('prev');
    $prev.click(() => {
      this.plusSlides(-1);
    });
    $('#' + this.div_id).append($prev);

    var $next = $('<a>').text('>');  // &#10095;
    $next.addClass('next');
    $next.click(() => {
      this.plusSlides(1);
    });
    $('#' + this.div_id).append($next);
  }

  start() {
    this.updateCarousel(0);
  }

  // Next/previous controls
  plusSlides(n) {
    clearTimeout(this.timeout);
    this.slideIndex += n;
    this.updateCarousel(this.slideIndex);
  }

  updateCarousel(n) {
    var $imgs = $('#' + this.div_id + ' .slide');
    var $dots = $('#' + this.dot_id + ' .dot');
    if ($imgs.length === 0) {
    	return;
    }

    this.slideIndex = n;
    if (this.slideIndex >= $imgs.length) { this.slideIndex = 0; }
    if (this.slideIndex < 0) { this.slideIndex = $imgs.length - 1; }

    $imgs.removeClass('active');
    $dots.removeClass('active');
    $imgs.eq(this.slideIndex).addClass('active');
    $dots.eq(this.slideIndex).addClass('active');

    this.timeout = setTimeout(() => this.updateCarousel(this.slideIndex + 1), this.switchTimeout); // Change image every 5 seconds
  }
}
