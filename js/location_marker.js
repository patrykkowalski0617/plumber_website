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

	// create locationMarker for dynamicly added header content
	const targetNode = document.getElementById('header');

	const config = {childList: true};

	// Callback function to execute when mutations are observed
	const callback = function(mutationsList, observer) {
		for(const mutation of mutationsList) {
			if (mutation.type == 'childList') {
				locationMarker()
				observer.disconnect();
			}
		}
	};

	const observer = new MutationObserver(callback);

	observer.observe(targetNode, config);	
})