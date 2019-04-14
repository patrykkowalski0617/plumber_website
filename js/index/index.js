window.onload = function(){
	'use strict'

	// Parallax effect
	const parallax = function(elementClassName, speed, fixedHeader /* optional */){
		const 	fixedHeaderHeight = function(){
					if (fixedHeader) { return fixedHeader.clientHeight }
					else { return 0 }
				},
				elements = document.querySelectorAll('.' + elementClassName),
				visibleElement = function(el) {
					const 	winH = window.innerHeight,
							elementCurrentPosition = function(el){
								const rect = el.getBoundingClientRect();
								return {top: rect.top, bottom: rect.bottom}
							};
					for (var i = 0; i < el.length; i++) {
						const pos = elementCurrentPosition(el[i])
						if (pos.top >= fixedHeaderHeight() && pos.top <= winH
							|| pos.bottom >= fixedHeaderHeight() && pos.bottom <= winH) {
							return el[i]
						}
					}
				},
				translate = function(el) {
					if(el) {
						const 	translateValue = window.pageYOffset * -speed + fixedHeaderHeight();
						
						el.style.backgroundPositionY = translateValue + 'px';
						el.style.backgroundAttachment = 'fixed';
					}
				};

				window.addEventListener('scroll', function(){
					translate(visibleElement(elements))
				});
				translate(visibleElement(elements))
	};
	parallax('parallax', 0.6, document.querySelector('#header'));

	// smooth scroll
	const smoothScroll = function(buttonsClassName, duration, fixedHeader /* optional */){
		function scroll(button, fixedHeader, duration){
			let startTime = null;

			const 	fixedHeaderHeight = function(){
						if (fixedHeader) { return fixedHeader.clientHeight }
						else{ return 0 }
					},
					target = document.querySelector(button.hash),
					targetPosition = target.getBoundingClientRect().top + window.pageYOffset - fixedHeaderHeight(),
					startPosition = window.pageYOffset,
					distance = targetPosition - startPosition,
					easing = function(t, b, c, d){
						t /= d /2;
						if (t < 1) { return c / 2 * t * t + b };
						t--;
						return -c / 2 * (t * (t - 2) - 1) + b;
					},
					animation = function(currentTime){
						if (startTime === null) { startTime = currentTime }

						const 	timeElapsed = currentTime - startTime,
								run = easing(timeElapsed, startPosition, distance, duration);

						window.scrollTo(0, run)

						if (timeElapsed < duration) { requestAnimationFrame(animation) }
					};

			requestAnimationFrame(animation);
		};
		
		(function(el){
			for (var i = 0; i < el.length; i++) {
				el[i].addEventListener('click', function(e){
					e.preventDefault()
					scroll(this, fixedHeader, duration)
				});
			}
		})(document.querySelectorAll('.' + buttonsClassName));
	};
	smoothScroll('smooth-scroll', 1000, document.querySelector('#header'))
}