window.addEventListener('load', function () {
	'use strict'

	// Parallax effect
	const parallax = function (elementClassName, speed, fixedHeader /* optional */) {
		const fixedHeaderHeight = function () {
			if (fixedHeader) { return fixedHeader.clientHeight }
			else { return 0 }
		},
			elements = document.querySelectorAll('.' + elementClassName),
			visibleElement = function (el) {
				const winH = window.innerHeight,
					elementCurrentPosition = function (el) {
						const rect = el.getBoundingClientRect();
						return { top: rect.top, bottom: rect.bottom }
					};
				for (var i = 0; i < el.length; i++) {
					const pos = elementCurrentPosition(el[i])
					if (pos.top >= fixedHeaderHeight() && pos.top <= winH
						|| pos.bottom >= fixedHeaderHeight() && pos.bottom <= winH) {
						return el[i]
					}
				}
			},
			translate = function (el) {
				if (el) {
					const translateValue = (window.pageYOffset / speed) + fixedHeaderHeight();
					el.style.backgroundPositionY = '' + translateValue + 'px';
				}
			};

		window.addEventListener('scroll', function () {
			translate(visibleElement(elements))
		});
		window.addEventListener('resize', function () {
			translate(visibleElement(elements))
		});
		translate(visibleElement(elements))
	};
	parallax('parallax', 2, document.querySelector('#header'));
})