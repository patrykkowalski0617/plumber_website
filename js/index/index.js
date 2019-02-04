(function() {
	// Parallax effect
	const parallax = {
		scrollPosition: function(){
			return window.pageYOffset;
		},
		transform: function(speed){
			return this.scrollPosition() / speed;
		},
		transformCss: function(speed){return 'translateY(' + this.transform(speed) + 'px)'},
		create: function(speed, element){
			window.addEventListener('scroll', function(){
				element.style.transform = parallax.transformCss(speed);
			})
		}
	};
	parallax.create(2, document.querySelector('#welcome-section'));
})()