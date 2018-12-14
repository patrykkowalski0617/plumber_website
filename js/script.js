class CollapserMaster{
	constructor(btn, content){
		const tt = this;

		tt.qA = function(selector, origin = document){ return origin.querySelectorAll(selector) };
		tt.q = function(selector, origin = document){ return origin.querySelector(selector) };
		tt.btn = tt.qA(btn);
		tt.content = content;
		tt.findContent = function(sibling){
			return tt.q(content, sibling.parentNode)
		};
		tt.findWrapper = function(children){
			let wrappers = []
			for (var i = 0; i < children.length; i++) {
				wrappers.push(children[i].parentNode)
			}
			return wrappers;
		};
		tt.addListener = function(el, eventType, f){
			for (var i = 0; i < el.length; i++) {
				el[i].addEventListener(eventType, f)
			}
		};
		tt.getElProperty = {
			height(el, elIsHidden = true){
				if (elIsHidden) { el.classList.add('before-collapsing'); }
				const elementHeight = el.offsetHeight;
				if (elIsHidden) { el.classList.remove('before-collapsing'); }
				return elementHeight;
			},
			transitionTime(el){
				const st = window.getComputedStyle(el, null);
				return parseFloat(st.getPropertyValue('transition-duration')) * 1000;
			}
		},
		tt.collapsing = {
			timeout1: null,
			timeout2: null,
			step2(el, method){
				const time = tt.getElProperty.transitionTime(el);
				this.timeout2 = setTimeout(function(){
					el.classList.remove('collapsing')
					el.classList[method]('displayed')
					el.style.height = ''
				}, time);
			},
			step1and2(el, height, method){
				el.classList.add('collapsing')
				this.timeout1 = setTimeout(function(){
					el.style.height = height + 'px';
				}, 0);
				
				this.step2(el, method)
			}
		};
		tt.elConstHeight = [];
	}
}

class Collapser extends CollapserMaster{
	constructor(btn, content){
		super(btn, content);

		const tt = this;

		tt.display = function(t){
			const content = tt.findContent(t);
			if(!content.classList.contains('displayed')){
				if (!content.classList.contains('collapsing')) {
					tt.elConstHeight = []
					tt.elConstHeight.push(tt.getElProperty.height(content));
					tt.collapsing.step1and2(content, tt.elConstHeight[0], 'add');
				}
				else{
					clearTimeout(tt.collapsing.timeout2)
					tt.collapsing.step1and2(content, tt.elConstHeight[0], 'add');
				}
			}
		};
		tt.findDisplayedNastedConted = function(t){
			return tt.q('.coll-nasted .displayed', t.parentNode)
		};
		tt.contentIsDisplayed = function(t){
			return t.querySelector('.displayed')
		}
		tt.hide = function(t, content, toggle = false){
			const height = tt.getElProperty.height(content, false);

			if (!tt.contentIsDisplayed(t) && !toggle) {
				clearTimeout(tt.collapsing.timeout2);
			}
			
			content.style.height = height + 'px';
			tt.collapsing.step1and2(content, 0, 'remove');
		};
		tt.toggle = function(t){
			const content = tt.findContent(t);
			if(!content.classList.contains('displayed') && !content.classList.contains('collapsing')) {
				tt.display(t)
			}
			else if(!content.classList.contains('collapsing')){
				
				const contentIsDisplayed = tt.findDisplayedNastedConted(t);

				if(contentIsDisplayed){
					tt.hide(t, contentIsDisplayed, true)
				}
				
				setTimeout(function(){
					tt.hide(t, tt.findContent(t), true)
				}, 0)
			}
		};
	}
}

class Navigation extends Collapser{
	constructor(btn, content){
		super(btn, content);

		const tt = this,
		pageWidth = function(){return window.innerWidth},
		breakPoint = 1024;

		tt.addListener(tt.btn, 'mouseenter', function(){
			if(pageWidth() >= breakPoint){
				tt.display(this);
			}
		});
		tt.addListener(tt.findWrapper(tt.btn), 'mouseleave', function(){
			if(pageWidth() >= breakPoint){
				tt.hide(this, tt.findContent(this));
			}
		});
		tt.addListener(tt.btn, 'click', function(e){
			e.preventDefault() // it prevents fire mouseenter
			if(pageWidth() < breakPoint){
				tt.toggle(this);
			}
		});
	}
}

class CollapserHover extends Collapser{
	constructor(btn, content){
		super(btn, content);

		const tt = this,
		pageWidth = function(){return window.innerWidth},
		breakPoint = 1024;

		tt.addListener(tt.btn, 'mouseenter', function(){
				tt.display(this);
		});
		tt.addListener(tt.findWrapper(tt.btn), 'mouseleave', function(){
				tt.hide(this, tt.findContent(this));
		});
		tt.addListener(tt.btn, 'touch', function(e){
			e.preventDefault() // it prevents fire mouseenter
				tt.toggle(this);
		});
	}
}

class CollapserClick extends Collapser{
	constructor(btn, content){
		super(btn, content);
		
		const tt = this;

		tt.addListener(tt.btn, 'click', function(){
			tt.toggle(this);
		});
	}
}

class AccordionHover extends CollapserMaster{
	constructor(btn, content){
		super(btn, content)
	}
}

class AccordionClick extends CollapserMaster{
	constructor(btn, content){
		super(btn, content)
	}
}

const navigation = new Navigation('.nav-btn', '.nav-content');
const collapserHover = new CollapserHover('.coll-btn-hover', '.coll-content-hover');
const collapserClick = new CollapserClick('.coll-btn-click', '.coll-content-click');
const accordionHover = new AccordionHover('.coll-btn-hover', '.coll-content-hover');
const accordionClick = new AccordionClick('.coll-btn-click', '.coll-content-click');