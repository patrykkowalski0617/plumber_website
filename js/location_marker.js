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
		const parentWithClass = function(element, classname) {
		    if (element && element.className && element.className.split(' ').indexOf(classname)>=0) return element;
		    return element.parentNode && parentWithClass(element.parentNode, classname);
		}
		const linksLevel1 = document.querySelectorAll('#header nav ol > li > a');
		const linksLevel2 = document.querySelectorAll('#header nav ul > li > a');

		const mark = function(links){
			for (var i = 0; i < links.length; i++) {
				if (fileName(links[i]) == searchedFileName) {
					links[i].classList.add('active')
					const parentLink = parentWithClass(links[i], 'coll-nasted');
					if(parentLink && parentLink.classList.contains('coll-nasted')){
						parentLink.querySelector('a').classList.add('active')
					}
				}
			}
		}
		mark(linksLevel1)
		mark(linksLevel2)
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