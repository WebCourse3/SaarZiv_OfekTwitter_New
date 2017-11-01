var isHierarchical = function (query) {
    return new RegExp("(.+ .+)+").test(query);
}
var getElements = function (name) {
    var elements;
    switch (true){
        case new RegExp("^#+").test(name):
            elements = document.getElementById(name);
            console.log("element type:"+name+" element obj:"+elements);
            console.log("id");
            return elements;
            break;
        case  new RegExp("^\\..+").test(name):
            elements = document.getElementsByClassName(name);
            console.log("elements type:"+name+", elements array length :"+elements.length+", elements array obj:"+elements);
            console.log("class");
            return elements;
            break;
        default:
            elements = document.getElementsByTagName(name);
            console.log("elements type:"+name+", elements array length :"+elements.length+", elements array obj:"+elements);
            return elements;
            break;
    }
}
var testChildElements = function (parentElement,currentElementName){
    switch (true){
        case new RegExp("^#+").test(currentElementName):
            return getElementChild(parentElement,currentElementName.substr(1),"id");
            break;
        case  new RegExp("^\\..+").test(currentElementName):
            return getElementChild(parentElement,currentElementName.substr(1),"class");
            break;
        default:
            return getElementChild(parentElement,currentElementName,"tag");
            break;
    }
}
var getElementChild = function (parentElement,currentElementName,whatToCheck) {
    var childElement;
    if(parentElement !== undefined){
        for (var j = 0; j < parentElement.children.length; j++) {
            switch(whatToCheck){
                case "id":
                    break;
                    if (parentElement.children[j].id === currentElementName) {
                        childElement = parentElement.children[j];
                        console.log(childElement + "-id"+ " "+childElement.innerHTML);
                        return childElement;
                    }
                    break;
                case "tag":
                    if (parentElement.children[j].tagName.toLowerCase() === currentElementName) {
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
// trying to make it hirarcheial more than 2 elements
/*var loopingChildren = function (elementsNames) {
    var parentElements = getElements(elementsNames[0]);
    for (var j = 0; j < parentElements.length; j++) {
        var childElements = getChildElements(parentElements[j], elementsNames[1]);
    }
    var index = elementsNames.indexOf(0);
    elementsNames.splice(index);
    loopingChildren()
}*/
    //<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
