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
    var $prev = $('<a>').text('\u2770');
    $prev.addClass('prev');
    $prev.click(() => {
      this.plusSlides(-1);  // Decrease the slide count on click.
    });
    $('#' + this.div_id).append($prev);

    var $next = $('<a>').text('\u2771');
    $next.addClass('next');
    $next.click(() => {
      this.plusSlides(1);  // Increase the slide count on click.
    });
    $('#' + this.div_id).append($next);
  }

  start() {
    this.updateCarousel(0);
  }

  // Add the desired quantity to the index.
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

    if (this.switchTimeout > 0) {
      // Change image every switchTimeout seconds
      this.timeout = setTimeout(() => this.updateCarousel(this.slideIndex + 1), this.switchTimeout);
    }
  }
}
