/*
	Carousel.
*/

class Carousel {
  constructor(div_id = "slideshow", dot_id = "dot", switchTimeout = 5000) {
    this.slideIndex = 1;
    this.timeout = null;
    this.div_id = div_id;
    this.dot_id = dot_id;

    this.switchTimeout = switchTimeout;
  }

// Next/previous controls
  plusSlides(n) {
    clearTimeout(this.timeout);
    this.slideIndex += n;
    this.carousel(this.slideIndex);
  }

  // Thumbnail image controls
  currentSlide(n) {
  	clearTimeout(this.timeout);
  	this.slideIndex = n;
    this.carousel(this.slideIndex);
  }

  carousel(n) {
    var i;
    var x = document.getElementsByClassName(this.div_id);
    var dots = document.getElementsByClassName(this.dot_id);
    if (x.length === 0) {
    	return;
    }

    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    this.slideIndex = n;
    if (this.slideIndex > x.length) { this.slideIndex = 1; }
    if (this.slideIndex < 1) { this.slideIndex = x.length; }

    x[this.slideIndex-1].style.display = "block";
    dots[this.slideIndex-1].className += " active";

    this.timeout = setTimeout(() => this.carousel(this.slideIndex + 1), this.switchTimeout); // Change image every 5 seconds
  }
}
