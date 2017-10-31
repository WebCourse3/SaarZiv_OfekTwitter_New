function $(name) {
	return new ofekQuery(name);
}

var ofekQuery = function (query) {
    var constructor = function () {
        if(testHierarchy(query)){
            return getAllElements(query);
		}else {
        	console.log("false");
        	return getRootElements(query);
		}

    }


	//Private static methods
	var testHierarchy =  function (query) {
        return new RegExp("(.+ .+)+").test(query);
    }
    var getAllElements = function (query) {
        var dividedQuery =  query.split(" ");
		var n =0;
		var allElements = [];
	    //allElements.push(getHierarchyElements(n,dividedQuery));
	    return getHierarchyElements(n,dividedQuery);
    }
	var getHierarchyElements = function (currOperatorIndex,dividedQuery) {
		var hierarchyElements = [];
    	var rootElements = getRootElements(dividedQuery[currOperatorIndex]);
    	var childElement = getChildElements(rootElements,getNextOperator(currOperatorIndex,dividedQuery))
		if(childElement !=="") {
			hierarchyElements.push(childElement);
		}
		return hierarchyElements;

    }
    var getNextOperator = function (currOperatorIndex,dividedQuery){
        return dividedQuery[currOperatorIndex + 1];
    }
    var getRootElements = function (query) {
        switch (true){
            case new RegExp("^#+").test(query):
                return document.getElementById(query);
                break;
            case new RegExp("^\\..+").test(query):
                return document.getElementsByClassName(query);
                break;
            default:
                return (document.getElementsByTagName(query).length === 0) ? "" :
                    document.getElementsByTagName(query);
                break;

        }
    }

    var getChildElements = function (RootElements,operator) {
    	var children ;//need to check,
        for (var j = 0; j < RootElements.length; j++) {
            switch (true){
                case new RegExp("^#+").test(operator):
	                children = getThroughChildren(RootElements[j],operator.substr(1),"id");
                    break;
                case new RegExp("^\\..+").test(operator):
	                children =  getThroughChildren(RootElements[j],operator.substr(1),"class");
                    break;
                default:
                    return (RootElements[j].getElementsByTagName(operator).length === 0) ? "" :
	                    children = getThroughChildren(RootElements[j],operator,"tag");
                    break;

            }
        }
    }
    var getThroughChildren = function (RootElement,operator,whatToCheck) {
	    for (var i = 0; i < RootElement.children.length; i++) {
	    	switch (whatToCheck) {
			    case "id":
				    if (RootElement.children[i].id === operator) {
					    return RootElement.children[i];
				    }
				    break;
			    case "tag":
				    if (RootElement.children[i].tagName.toLowerCase() === operator) {
					    return RootElement.children[i];
				    }
				    break;
			    case "class":
				    if (RootElement.children[i].className === operator) {
					    return RootElement.children[i];
				    }
		    }
	    }
	    return "";
    }
    var elements = constructor();

    //Public instance methods
	this.addClass = function (className){
		for(var i =0 ; i< elements.length;i++) {
			(elements[i].className !== "")? elements[i].className +=" "+className :
			 elements[i].className = className;
		}
	}
	this.removeClass = function (classNameToDelete){
		for(var i =0 ; i< elements.length;i++) {
			if(aContainsB((elements[i].className),classNameToDelete)){
				elements[i].className = elements[i].className.replace(classNameToDelete,"");
			}
		}
	}
	this.each = function (fn) {
		for(var i =0 ; i< elements.length;i++) {
			fn(elements[i]);
		}
	}
	this.map = function(fn){
		this.each(fn);
		return elements;
	}
	this.all = function(){
		var c;
		for(var j =0 ; j< elements.length;j++) {
			c = 0;
			for(var i=0; i < arguments.length;i++){
				if(arguments[i](elements[j])){
					c++;
				}
				else{
					return false;
				}
			}
		}
		return (arguments.length === c)?  true :  false;
	}
	this.any = function(){
		var c;
		for(var j =0 ; j< elements.length;j++) {
			c = 0;
			for(var i=0; i < arguments.length;i++){
				if(arguments[i](elements[j])){
					return true
				}
			}
		}
		return false;
	}
	this.filter = function (){
		var c = 0;
		var newOfekInstance = new $("");
        for (var j = 0; j < elements.length; j++) {
            c = 0;
        	for (var i = 0;i<arguments.length;i++) {
                if(arguments[i](elements[j])) {
                    c++;
                }else {
                    break;
                }
            }
            if(c===arguments.length) {
                newOfekInstance.addElement(elements[j]);
            }
        }
		return newOfekInstance;
	}
	this.css = function(property,value){
		for (var j = 0; j < elements.length; j++) {
        	elements[j].setAttribute("style",property+":"+value+";");
        }

	}
	this.count = function(){
        return elements.length;
	}
	this.appendChild = function(childElementTag){
        for (var j = 0; j < elements.length; j++) {
            elements[j].appendChild((document.createElement(childElementTag)));
        }
	}
	this.getAttribute = function (attributeName){
        var attributeArray = [];
		for (var j = 0; j < elements.length; j++) {
            var att = elements[j].getAttribute(attributeName);
            attributeArray.push(att);
        }
        return attributeArray;
	}
	this.setAttribute = function (attributeName,attributeValue){
        for (var j = 0; j < elements.length; j++) {
            elements[j].setAttribute(attributeName,attributeValue);
        }
    }
    this.get = function get(index) {
        for (var j = 0; j < elements.length; j++) {
            return elements[index];
        }
    }
	this.addElement = function (element){
		if(elements===""){
			elements = [];
		}
		elements.push(element);
	}

}


function aContainsB(a, b){
    return a.indexOf(b) >= 0;
}







predOne = function (elem) {
	return (elem.innerHTML ==="some text")
}
predTwo = function (elem) {
	return (aContainsB(elem.className,"testClass"))
}
fn = function (elem) {
	elem.innerHTML = "some text";
}
//var test = $("nav div");






