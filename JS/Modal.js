var back;
var objToShow;
var btn
var contentWidth;
var contentHeight;
var objClose;
var evt;

function closeModal() {
	evt = evt || window.event;
	evt = evt.target || evt.srcElement;
	if ((evt.className == "modal-content") || (evt.className == "closeCont")) {
		//kliknuto dovnitř obsahu, neskrývám modal
	}
	else {
		//kliknuto do modal pozadí, skrývám modal
		var thisObj = document.getElementById(objClose);
		thisObj.style.visibility = "hidden";
		thisObj.style.display = "none";
		//mažu closeButton
		var delCloseCont = document.getElementById("closeCont");
		removeElement(delCloseCont);
		//delCloseCont.remove();
		//mažu modal curtain
		var delModalCurtain = document.getElementById("modalCurtain");
		removeElement(delModalCurtain);
		//delModalCurtain.remove();
		//nuluji proměnné
		contentWidth = null;
		contentHeight = null;
	}
}

function removeElement(element) {
    //fix pro IE
    element && element.parentNode && element.parentNode.removeChild(element);
    //element.removeElement();
}

function loadStyles() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerText = "";
    var css = "";
    css += ".modalCont {";
    css +="display: none;";
    css +="position: fixed;";
    css +="z-index: 11000;";
    css +="left: 0;";
    css +="top: 0;";
    css +="margin: 0;";
    css +="width: 100%;";
    css +="height: 100%;";
    css +="overflow: auto;";
    css +="background-color: rgba(0,0,0,0.4);";
    css +="visibility: visible;";
    css +="display: block;";
    css +="}";

    css +=".modal-content {";
    css +="min-width: 250px;";
    css +="height: auto;";
    css +="min-height: 80px !important;";
    css +="background-color: #fefefe;";
    css +="margin: 0 auto;";
    css +="padding: 45px 20px 20px 20px;";
    css +="border: 1px solid #888;";
    css +="z-index: 11001;";
    css +="position: fixed;";
    css +="text-align: left;";
    css +="}";

    css +=".close {";
    css +="color: #aaa;";
    css +="float: right;";
    css +="font-size: 28px;";
    css +="font-weight: bold;";
    css +="cursor: pointer;";
    css +="}";

    css +=".close:hover,";
    css +=".close:focus {";
    css +="color: black;";
    css +="text-decoration: none;";
    css +="cursor: pointer;";
    css +="}";


    css +=".closeCont {";
    css +="min-width: 240px;";
    css +="padding-right: 10px;";
    css +="text-align: right;";
    css +="position: absolute;";
    css +="z-index: 10003;";
    css +="display: block;";
    css +="left: 0;";
    css +="top: 0;";
    css +="}";

    style.innerText = css;

    document.getElementsByTagName('head')[0].appendChild(style);
}


function ShowModal(divName, optionalZIndex) {

    

    if (typeof optionalZIndex === 'undefined') { optionalZIndex = 11000;}
	//zobrazovaný prvek
	objToShow = document.getElementById(divName);
	//odstraňuji in-line visible a display, přiřazuji CSS
	objToShow.className = "modal-content";
	objToShow.style.visibility = "visible";
	objToShow.style.display = "block";
	//zjišťuji velikost zobrazovaného prvku
	contentWidth = objToShow.offsetWidth;
	contentHeight = objToShow.offsetHeight;
	//zjišťuji velikost okna
	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
	//určuji pozici contentu vertikálně
	var contentTopPosition = ((y - contentHeight) / 2);
	if (contentTopPosition < 0) {
	    contentTopPosition = 0;
	}
	objToShow.style.top = contentTopPosition + "px";
	//určuji pozici contentu horizontálně
	var contentLeftPosition = ((x - contentWidth) / 2) + "px";
	objToShow.style.left = contentLeftPosition;
    objToShow.style.zIndex = optionalZIndex+1;
	//delame close button
	btnCont = document.createElement('DIV');
	btnCont.className = "closeCont";
	btnCont.id = "closeCont";
	//pozicuji button
	btnCont.style.width = (contentWidth - 10) + "px";
	btn = document.createElement('DIV')
	btn.className = "close";
	btn.innerHTML = "&times;";

	btn.onclick = function (event) {
	    objClose = objToShow.id;
	    evt = event;
	    closeModal()
	}

	btnCont.appendChild(btn);
	objToShow.appendChild(btnCont);
	////doplňuji curtain do body
	//var myBody = document.getElementById("body");
	var myBody = document.getElementsByTagName("BODY")[0];// document.getElementById("body");
	var modalCurtain = document.createElement('DIV');
	modalCurtain.id = "modalCurtain";
	modalCurtain.style.zIndex = optionalZIndex;
	modalCurtain.className = "modalCont";
	modalCurtain.onclick = function (event) { objClose = objToShow.id; evt = event; closeModal() };
	myBody.appendChild(modalCurtain);
	//doplňuji volání JS funkce pro window resize
	window.addEventListener('resize', function (event) {
		newPosition();
	});
}

function newPosition() {

	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;

	var contentTopPosition = ((y - contentHeight) / 2);
	if (contentTopPosition < 0) {
	    contentTopPosition = 0;
	}
	objToShow.style.top = contentTopPosition + "px";

	var contentLeftPosition = ((x - contentWidth) / 2) + "px";
	objToShow.style.left = contentLeftPosition;
}


(function () {
    loadStyles();
})();
