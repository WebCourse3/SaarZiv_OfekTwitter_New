/*Count doesnt work for one element.
*doesnt support more than two selectors
* check if instace func works
* get() works*/
function $(name) {
	return new ofekQuery(name);
}

var ofekQuery = function (query) {
    var elements = [];
    var constructor = function () {
        if (testHierarchy(query)) {
            return getAllElements(query);
        } else {
            console.log("false");
            return getRootElements(query);
        }

    }


    //Private static methods
    var testHierarchy = function (query) {
        return new RegExp("(.+ .+)+").test(query);
    }
    var getAllElements = function (query) {
        var childrenOfAllRoot = [];
    	var lastChildren = [];
    	var dividedQuery = query.split(" ");
    	var n = 0;
        /*for (var n = 0; n<dividedQuery.length;n++) {
            childrenOfAllRoot =  getHierarchyElements(n, dividedQuery);
        }
        lastChildren = pushChildren(childrenOfAllRoot,lastChildren)
		return lastChildren*/
        return getHierarchyElements(n,dividedQuery);
    }
    var getHierarchyElements = function (currOperatorIndex, dividedQuery) {
        var rootElements = getRootElements(dividedQuery[currOperatorIndex]);
        return  getChildrenOfAllRoots(rootElements, getNextOperator(currOperatorIndex, dividedQuery))
    }
    var getNextOperator = function (currOperatorIndex, dividedQuery) {
        return dividedQuery[currOperatorIndex + 1];
    }
    var getRootElements = function (query) {
        switch (true) {
            case new RegExp("^#+").test(query):
				var a = document.getElementById((query.substr(1)));
				//console.log(a)
                return a;
                break;
            case new RegExp("^\\..+").test(query):
                return document.getElementsByClassName(query.substr(1));
                break;
            default:
                return (document.getElementsByTagName(query).length === 0) ? "" :
                    document.getElementsByTagName(query);
                break;

        }
    }
    var getChildrenOfAllRoots = function (RootElements, operator) {
        var childrenOfOneRoot = [];
        var childrenOfAllRoots = [];//need to check,
		//if there is only one root Element:
        if(RootElements.length === undefined ){
            childrenOfOneRoot = switchCallGetChildrenOfOneRoot(RootElements,operator);
            if (childrenOfOneRoot !== "" && childrenOfOneRoot !== undefined) {
                childrenOfAllRoots = pushChildren(childrenOfOneRoot,childrenOfAllRoots);
            }
        }
        else if(RootElements.length <= 1){
            childrenOfOneRoot = switchCallGetChildrenOfOneRoot(RootElements[0],operator);
            if (childrenOfOneRoot !== "" && childrenOfOneRoot !== undefined) {
                childrenOfAllRoots = pushChildren(childrenOfOneRoot,childrenOfAllRoots);
            }
        }
        else {
            for (var j = 0; j < RootElements.length; j++) {
                childrenOfOneRoot = switchCallGetChildrenOfOneRoot(RootElements[j],operator);
                if (childrenOfOneRoot !== "" && childrenOfOneRoot !== undefined) {
                    childrenOfAllRoots = pushChildren(childrenOfOneRoot,childrenOfAllRoots);
                }
            	/*switch (true) {
                    case new RegExp("^#+").test(operator):
                        child = getChildElement(RootElements[j], operator.substr(1), "id");
                        if (child !== "" && child !== undefined) {
                            children.push(child);
                        }
                        break;
                    case new RegExp("^\\..+").test(operator):
                        child = getChildElement(RootElements[j], operator.substr(1), "class");
                        if (child !== "" && child !== undefined) {
                            children.push(child);
                        }
                        break;
                    default:
                        if (RootElements[j].getElementsByTagName(operator).length !== 0) {
                            child = getChildElement(RootElements[j], operator, "tag");
                            if (child !== "" && child !== undefined) {
                                children.push(child);
                            }
                        }
                        break;
                }*/
            }
        }
        return childrenOfAllRoots;
    }
    var pushChildren = function(childrenOfOneRoot,childrenOfAllRoots){
    	for(var i=0;i<childrenOfOneRoot.length;i++){
    		childrenOfAllRoots.push(childrenOfOneRoot[i])
		}
		return childrenOfAllRoots;
	}
    var switchCallGetChildrenOfOneRoot = function(RootElement,operator){
    	switch (true) {
        	case new RegExp("^#+").test(operator):
                return getChildrenOfOneRoot(RootElement, operator.substr(1), "id");

                break;
            case new RegExp("^\\..+").test(operator):
                return getChildrenOfOneRoot(RootElement, operator.substr(1), "class");

                break;
            default:
                if (RootElement.getElementsByTagName(operator).length !== 0) {
                    return getChildrenOfOneRoot(RootElement, operator, "tag");
                }
                break;
        }
	}
    var getChildrenOfOneRoot = function (RootElement,operator,whatToCheck) {
	    var childrenOfOneRoot = [];
	    var child ;

    	for (var i = 0; i < RootElement.children.length; i++) {
            var bool = false;
    		switch (whatToCheck) {
			    case "id":
				    if (RootElement.children[i].id === operator) {
					    child =  RootElement.children[i];
					    bool = true;
				    }
				    break;
			    case "tag":
				    if (RootElement.children[i].tagName.toLowerCase() === operator) {
                        child =  RootElement.children[i];
                        bool = true;
				    }
				    break;
			    case "class":
				    if (RootElement.children[i].className === operator) {
                        child = RootElement.children[i];
                        bool = true;
				    }
		    }
			if(bool){childrenOfOneRoot.push(child)};
	    }
        return (childrenOfOneRoot === null ||childrenOfOneRoot.length === 0) ?
			"" : childrenOfOneRoot;
    }
	elements = constructor();

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
		return  (elements.length !== NaN) ? elements.length : 1;

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
	this.getElements = function(){
		return elements;
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






