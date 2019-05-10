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
				const parentLink = parentWithClass(links[i], 'coll-nasted');

				if (fileName(links[i]) != '' && fileName(links[i]) == searchedFileName) {
					links[i].classList.add('active')
					if(parentLink && parentLink.classList.contains('coll-nasted')){
						parentLink.querySelector('a').classList.add('active')
					}
				}
			}
			if(!parentWithClass(links[0], 'coll-nasted') && searchedFileName == ''){
				links[0].classList.add('active')
			}
		}
		mark(linksLevel1)
		mark(linksLevel2)
	};

	// create locationMarker for dynamicly added header content
	const targetNode = document.getElementById('header');

	const config = {childList: true};

	const observer = new MutationObserver(function(mutationsList, observer) {
		locationMarker()
		observer.disconnect();
	});

	observer.observe(targetNode, config);	
})