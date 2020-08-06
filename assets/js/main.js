/*
	Multiverse by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// $(window).load(function(){
// 	 // set duration in brackets    
// });



var appScripts = (function () {

	return {

		init: function () {
			$('.preloader').fadeOut(1000);

			// this.loginOpener();
			this.footerOpener();
		},
		loginOpener: function () {

			$('.menu-container').each(function (index) {
				$(this).find('button.login').attr('menu-link', index);
				$(this).find('.login-layout').clone().appendTo('body').attr('menu-link', index);
			});

			$('button.login').click(function () {
				$('body').addClass('login-open');
				var linkedVideo = $('section').closest('body').find('.login-layout[menu-link="' + $(this).attr('menu-link') + '"]');
				linkedVideo.toggleClass('reveal-modal');

			});

			$('section').closest('body').find('.close-iframe').click(function () {
				$('body').removeClass('login-open');
				$(this).closest('.login-layout').toggleClass('reveal-modal');
			});

		},

		quoteRotator: function () {
			/*
			  - how to call the plugin:
			  $( selector ).cbpQTRotator( [options] );
			  - options:
			  {
				  // default transition speed (ms)
				  speed : 700,
				  // default transition easing
				  easing : 'ease',
				  // rotator interval (ms)
				  interval : 8000
			  }
			  - destroy:
			  $( selector ).cbpQTRotator( 'destroy' );
			  */

			$('#cbp-qtrotator').cbpQTRotator({
				// rotator interval (ms)
				interval : 15000
			});
		},

		tabsInitialiser: function () {
			new CBPFWTabs(document.getElementById('tabs'));
		},

		footerOpener: function () {
			var $window = $(window),
				$body = $('body')
			// Hack: Enable IE workarounds.
			if (browser.name == 'ie')
				$body.addClass('ie');

			// Touch?
			if (browser.mobile)
				$body.addClass('touch');

			// Transitions supported?
			if (browser.canUse('transition')) {


				// Prevent transitions/animations on resize.
				var resizeTimeout;

				$window.on('resize', function () {

					window.clearTimeout(resizeTimeout);

					$body.addClass('is-resizing');

					resizeTimeout = window.setTimeout(function () {
						$body.removeClass('is-resizing');
					}, 100);

				});

			}

			// Scroll back to top.
			$window.scrollTop(0);

			// Panels.
			var $panels = $('.panel');

			$panels.each(function () {

				var $this = $(this),
					$toggles = $('[href="#' + $this.attr('id') + '"]'),
					$closer = $('<div class="closer" />').appendTo($this);

				// Closer.
				$closer
					.on('click', function (event) {
						$this.trigger('---hide');
					});

				// Events.
				$this
					.on('click', function (event) {
						event.stopPropagation();
					})
					.on('---toggle', function () {

						if ($this.hasClass('active'))
							$this.triggerHandler('---hide');
						else
							$this.triggerHandler('---show');

					})
					.on('---show', function () {

						// Hide other content.
						if ($body.hasClass('content-active'))
							$panels.trigger('---hide');

						// Activate content, toggles.
						$this.addClass('active');
						$toggles.addClass('active');

						// Activate body.
						$body.addClass('content-active');

					})
					.on('---hide', function () {

						// Deactivate content, toggles.
						$this.removeClass('active');
						$toggles.removeClass('active');

						// Deactivate body.
						$body.removeClass('content-active');

					});

				// Toggles.
				$toggles
					.removeAttr('href')
					.css('cursor', 'pointer')
					.on('click', function (event) {
						event.preventDefault();
						event.stopPropagation();

						$this.trigger('---toggle');

					});

			});

			// Global events.
			$body
				.on('click', function (event) {

					if ($body.hasClass('content-active')) {

						event.preventDefault();
						event.stopPropagation();

						$panels.trigger('---hide');

					}

				});

			$window
				.on('keyup', function (event) {

					if (event.keyCode == 27
						&& $body.hasClass('content-active')) {

						event.preventDefault();
						event.stopPropagation();

						$panels.trigger('---hide');

					}

				});

			// Header.
			var $header = $('#footer');

			// Links.
			$header.find('a').each(function () {

				var $this = $(this),
					href = $this.attr('href');

				// Internal link? Skip.
				if (!href
					|| href.charAt(0) == '#')
					return;

				// Redirect on click.
				$this
					.removeAttr('href')
					.css('cursor', 'pointer')
					.on('click', function (event) {

						event.preventDefault();
						event.stopPropagation();

						window.location.href = href;

					});

			});
		}
	}
})(appScripts || {})