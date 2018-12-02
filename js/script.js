(function() {
	const btn = document.querySelectorAll('.collapser-btn'),
	content = function(el){
		const contentList = el.parentNode.children;
		for (var i = 0; i < contentList.length; i++) {
			if(contentList[i].classList.contains('collapser-content')){
				return contentList[i];
			}				
		}
	},
	displayed = function(el) {
		if (el){ return el.classList.contains('show') }
	},
	collapser = function(element, height, meth){
		const t = function(element){
			const st = window.getComputedStyle(element, null);
			return parseFloat(st.getPropertyValue('transition-duration')) * 1000;
		};
		element.classList.add('collapsing')
		setTimeout(function(){
			element.style.height = height + 'px';
		}, 0)
		setTimeout(function(){
			element.classList.remove('collapsing')
			element.classList[meth]('show')
			element.style.height = ''
		}, t(element))
	},
	toggle = function(){
		let
		tBtn = this,
		tContent = content(this);

		// When 'mouseleave' event appears before transition is completed
		// collapser-content is countinuing transition.
		// My next step is to make it able to stop transition
		// and collapse content when above is happen.

		if (!displayed(tContent)) {
			tContent.classList.add('before-collapsing');
			let contentH = tContent.offsetHeight;
			tContent.classList.remove('before-collapsing');
								
			collapser(tContent, contentH, 'add')
		}
		else{
			let contentH = tContent.offsetHeight
			tContent.style.height = contentH + 'px';

			collapser(tContent, 0, 'remove')
			}
	},
	initialize = function(){
		for (let i = 0; i < btn.length; i++) {
			['mouseenter', 'mouseleave', 'touchstart'].forEach( evt => 
			    btn[i].addEventListener(evt, toggle)
			);
		}
	};
	initialize();
})()