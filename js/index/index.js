(function() {
	// Parallax effect
	const parallax = {
		scrollPosition: function(){
			return window.pageYOffset;
		},
		transform: function(speed){
			return this.scrollPosition() / speed;
		},
		transformCss: function(speed, element){
			const css = function(){return 'translateY(' + parallax.transform(speed) + 'px)'}
			element.style.transform = css(speed);
		},
		create: function(speed, element){
			parallax.transformCss(speed, element);
			window.addEventListener('scroll', function(){
				parallax.transformCss(speed, element);
			})
		}
	};
	parallax.create(2, document.querySelector('#welcome-section'));
})()