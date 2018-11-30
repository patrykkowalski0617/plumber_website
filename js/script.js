class Collapser {
	constructor(){
		const
		btn = document.querySelectorAll('.collapse-btn'),
		content = function(el){
			const contentList = el.parentNode.children
			for (var i = 0; i < contentList.length; i++) {
				if(contentList[i].classList.contains('collapse')){
					return contentList[i]
				}				
			}
		},
		displayed = function(el) {
			if (el){ return el.classList.contains('show') }
		},
		collapse = function(){
			const
			tBtn = this,
			tContent = content(this);
			console.log(tBtn)
			console.log(tContent)
			console.log(displayed(tContent))
		},
		initialize = function(){
			for (let i = 0; i < btn.length; i++) {
				btn[i].addEventListener('click', collapse)
			}
		};
		initialize();
	}
}
const subMenuCollapser = new Collapser();