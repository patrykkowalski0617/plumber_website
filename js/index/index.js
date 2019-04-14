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

	// fire animation when element is in viewport
	const animationOnScroll = function(elementClassName, animationCSSClass, animationStartPoint, onloadFire = true){
		let scrollThrottle;
		const 	elements = document.getElementsByClassName(elementClassName),
				fire = function(){
					const 	body = document.body, html = document.documentElement,
							docH = Math.max(body.scrollHeight, body.offsetHeight, html.scrollHeight, html.offsetHeight),
							docTop = window.pageYOffset,
							docNearBottom = 50,
							win = window,
							winH = window.innerHeight,
							elOffsetTop = function(el){
								return el.getBoundingClientRect().top + docTop;
							};

					for (let i = 0; i < elements.length; i++) {
						if (elOffsetTop(elements[i]) <= docTop + (winH * animationStartPoint)
							|| docH - docTop < winH + docNearBottom) {
							elements[i].classList.add(animationCSSClass);
						};
					};
				};
		
		window.addEventListener('scroll', function(){
			clearTimeout(scrollThrottle)
			scrollThrottle = setTimeout(function(){
				fire()
			}, 20);
		});

		if(onloadFire){ fire() };
	};

	animationOnScroll('animation', 'anim', 0.6)
	animationOnScroll('animation1', 'anim', 0.6)
}