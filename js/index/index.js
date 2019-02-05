(function() {
	// Parallax effect
	const parallax = {
		scrollPosition: function(){
			return window.pageYOffset;
		},
		transformCss: function(speed, element){
			const transformValue = function(){
				return parallax.scrollPosition() / speed;
			},
			setCss = function(){
				return 'translateY(' + transformValue(speed) + 'px)'
			};

			element.style.transform = setCss(speed);
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