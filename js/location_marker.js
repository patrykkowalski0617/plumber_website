window.addEventListener('load', function(){
	'use strict'
	
	const locationMarker = function(){
		const location = window.location;
		const fileName = function(el){
			const href = el.href;
			const index = href.lastIndexOf('/') + 1;
			return href.substr(index);
		};
		const searchedFileName = fileName(location);
		const linksLevel1 = document.querySelectorAll('#header nav ol > li > a');
		const linksLevel2 = document.querySelectorAll('#header nav ul > li > a');

		for (var i = 0; i < linksLevel1.length; i++) {
			if (fileName(linksLevel1[i]) == searchedFileName) {
				linksLevel1[i].classList.add('active')
			}
		}
	};

	locationMarker()
})