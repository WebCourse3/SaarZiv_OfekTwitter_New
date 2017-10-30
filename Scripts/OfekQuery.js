var dom = document.getElementById("js-test");
var nav = document.createElement("nav");
var nav2 = document.createElement("nav");
var div = document.createElement("div");
var p = document.createElement("p");
var p2 = document.createElement("p");
p.className = "";
p.id = "firstP";
p.innerHTML = "firstP";
p2.className = "";
p2.id = "secondP";
p2.innerHTML = "secondP";
div.appendChild(p);
nav.appendChild(div);
nav2.appendChild(p2);
dom.appendChild(nav);
dom.appendChild(nav2);

nav.appendChild(p);
function $(name) {
	return new ofekQuery(name);
}

var ofekQuery = function (query) {
	this.elements = [];
	var childElements = [];
	if(isHierarchical(query)){
		console.log("Hierarchical")
		var elementsNames = query.split(" ");
		console.log(elementsNames);
		//loopingChildren(elementsNames);
		var parentElements = getElements(elementsNames[0]);
		for (var j = 0; j < parentElements.length; j++) {
			childElements.push(getChildElements(parentElements[j], elementsNames[1]));
		}
		this.elements = childElements;
	}else{
		console.log("not");
		this.elements = getElements(query);

	}
	this.addClass = function (className){
		for(var i =0 ; i< this.elements.length;i++) {
			this.elements[i].className += className;
		}
	}
	this.removeClass = function (classNameToDelete){
		for(var i =0 ; i< this.elements.length;i++) {
			if(aContainsB((this.elements[i].className),classNameToDelete)){
				this.elements[i].className = this.elements[i].className.replace(classNameToDelete,"");
			}
		}
	}
	function aContainsB(a, b){
		return a.indexOf(b) >= 0;
	}
	this.each = function (fn) {
		for(var i =0 ; i< this.elements.length;i++) {
			fn(this.elements[i]);
		}
	}
	this.map = function(fn){
		this.each(fn);
		return this.elements;
	}
	this.any = function(){
		var c;
		for(var j =0 ; j< this.elements.length;j++) {
			c = 0;
			for(var i=0; i < arguments.length;i++){
				if(arguments[i](this.elements[j])){
					c++;
				}
			}
		}
		return (arguments.length === c)?  true :  false;
	}


	//this.addClass()
}

// trying to make it hirarcheial more than 2 elements
/*function loopingChildren(elementsNames) {
	var parentElements = getElements(elementsNames[0]);
	for (var j = 0; j < parentElements.length; j++) {
		var childElements = getChildElements(parentElements[j], elementsNames[1]);
	}
	var index = elementsNames.indexOf(0);
	elementsNames.splice(index);
	loopingChildren()
}*/

function isHierarchical(name){
	return new RegExp("(.+ .+)+").test(name);
}
function getElements(name) {
	var element;
	switch (true){
		case new RegExp("^#+").test(name):
			element = document.getElementById(name);
			console.log(element);
			console.log("id");
			return element;
			break;
		case  new RegExp("^\\..+").test(name):
			element = document.getElementsByClassName(name);
			console.log(element);
			console.log("class");
			return element;
			break;
		default:
			element = document.getElementsByTagName(name);
			console.log(element);
			console.log("nothing / tag");
			return element;
			break;
	}
}

function getChildElements(parentElement,currentElementName){
	switch (true){
		case new RegExp("^#+").test(currentElementName):
			return testElementChild(parentElement,currentElementName.substr(1),"id");
			break;
		case  new RegExp("^\\..+").test(currentElementName):
			return testElementChild(parentElement,currentElementName.substr(1),"class");
			break;
		default:
			return testElementChild(parentElement,currentElementName,"tag");
			break;
	}
}
function testElementChild(parentElement,currentElementName,whatToCheck) {
	var childElement;
	if(parentElement !== undefined){
		for (var j = 0; j < parentElement.children.length; j++) {
			switch(whatToCheck){
				case "id":
					if (parentElement.children[j].id === currentElementName) {
						childElement = parentElement.children[j];
						console.log(childElement + "-id"+ " "+childElement.innerHTML);
						return childElement;
					}
					break;
				case "tag":
					if (parentElement.children[j].tagName === currentElementName) {
						childElement = parentElement.children[j];
						console.log(childElement + "-tag"+ " "+childElement.innerHTML);
						return childElement;
					}
					break;
				case "class":
					if (parentElement.children[j].className === currentElementName) {
						childElement = parentElement.children[j];
						console.log(childElement + "-class" + " "+childElement.innerHTML);
						return childElement;
					}
			}

		}
	}

}

var test = new $("nav P");
predOne = function (elem) {
	return (elem.innerHTML ==="some text")
}
predTwo = function (elem) {
	return (elem.className ==="wow")
}
fn = function (elem) {
	elem.innerHTML = "some text";
}
test.addClass("wow");
//test.removeClass("secondP");

var newArray = test.map(fn);
console.log(newArray);

var bool = test.any(predOne,predTwo);

console.log(bool);





