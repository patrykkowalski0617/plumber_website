window.addEventListener('load', function(){
	'use strict'

	function loadXMLDoc() {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("header").innerHTML = this.responseText;
			};
		};
		xhr.open("GET", "header.html", true);
		xhr.send();
	}

	loadXMLDoc()
})