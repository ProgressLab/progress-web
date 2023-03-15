(function($) {

	var $body = $('body'),
		$header = $('#header'),
		$titleBar = null,
		$nav = $('#nav');

	// Header Panel.

		// Nav.
			var $nav_a = $nav.find('a');

			$nav_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$nav_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '5vh',
							bottom: '-5vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {
								var timeout;

								// Activate section.
								$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

								// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked')) {
									// Add a timeout to stop other classes from activating before scroll is settled.
									clearTimeout(timeout);
									timeout = setTimeout(function() {
										$this.removeClass('active-locked');
									}, 1000);
								}




							}
						});

				});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {
				// Add offset to the top of links equal to the height of the fixed header.
				return $header.outerHeight();
			}
		});

})(jQuery);
