window.addEventListener('load', function(){
	'use strict'

	function loadXMLDoc(targetElementId, fileName) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById(targetElementId).innerHTML = this.responseText;
			};
		};
		xhr.open('GET', fileName, true);
		xhr.send();
	}

	loadXMLDoc('header', 'header.html')
	loadXMLDoc('footer', 'footer.html')
})