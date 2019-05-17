window.addEventListener('load', function () {
	'use strict'

	// smooth scroll
	const smoothScroll = function (buttonsClassName, duration, fixedHeader /* optional */) {
		function scroll(button, fixedHeader, duration) {
			let startTime = null;

			const fixedHeaderHeight = function () {
				if (fixedHeader) { return fixedHeader.clientHeight }
				else { return 0 }
			},
				target = document.querySelector(button.hash),
				targetPosition = target.getBoundingClientRect().top + window.pageYOffset - fixedHeaderHeight(),
				startPosition = window.pageYOffset,
				distance = targetPosition - startPosition,
				easing = function (t, b, c, d) {
					t /= d / 2;
					if (t < 1) { return c / 2 * t * t + b };
					t--;
					return -c / 2 * (t * (t - 2) - 1) + b;
				},
				animation = function (currentTime) {
					if (startTime === null) { startTime = currentTime }

					const timeElapsed = currentTime - startTime,
						run = easing(timeElapsed, startPosition, distance, duration);

					window.scrollTo(0, run)

					if (timeElapsed < duration) { requestAnimationFrame(animation) }
				};

			requestAnimationFrame(animation);
		};

		(function (el) {
			for (var i = 0; i < el.length; i++) {
				el[i].addEventListener('click', function (e) {
					e.preventDefault()
					scroll(this, fixedHeader, duration)
				});
			}
		})(document.querySelectorAll('.' + buttonsClassName));
	};
	smoothScroll('smooth-scroll', 1000, document.querySelector('#header'))
})