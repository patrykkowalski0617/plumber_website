window.addEventListener('load', function(){
	'use strict'
	
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
})