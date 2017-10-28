var usersList = [
	{"username":"dani","isFollowing":false},
	{"username":"moshe","isFollowing":true},
	{"username":"esti","isFollowing":true},
	{"username":"mayan","isFollowing":true},
	{"username":"rami","isFollowing":false},
	{"username":"baruch","isFollowing":false},
	{"username":"nesi","isFollowing":false},
	{"username":"varum","isFollowing":true},
	{"username":"moko","isFollowing":false},
	{"username":"dani avshalomov ","isFollowing":false},
	{"username":"loko","isFollowing":false},
	{"username":"bar","isFollowing":false},
	{"username":"eli","isFollowing":true},
    {"username":"ekey","isFollowing":false}

];
loadUsers();

function loadUsers() {
	var loadFollowersFragment = document.createDocumentFragment();
	var loadFolloweesFragment = document.createDocumentFragment();
	for (var i in usersList){
        var divPanelBody

        if(usersList[i].isFollowing){
            divPanelBody =  createPanelBody(usersList[i].username,true);
			var divPanel = createDivPanel(divPanelBody);
			loadFolloweesFragment.appendChild(divPanel)
		}
		else{
            divPanelBody =  createPanelBody(usersList[i].username,false);
			var divPanel = createDivPanel(divPanelBody);
			var divCol = createDivCol(divPanel);
			loadFollowersFragment.appendChild(divCol);
		}
	}
	LoadFollowers(loadFollowersFragment);
	LoadFollowees(loadFolloweesFragment);
}

function LoadFollowers(loadFollowersFragment) {
	var followersDiv = document.getElementById("js-followers");
	followersDiv.appendChild(loadFollowersFragment);
}
function LoadFollowees(loadFolloweesFragment) {
	var followeesDiv = document.getElementById("js-followees-thumbnail");
	followeesDiv.appendChild(loadFolloweesFragment);
}

function createDivCol(divPanel){
	var divCol2Xs = document.createElement("div");
	divCol2Xs.className = "col-sm-2";
	divCol2Xs.appendChild(divPanel);
	return divCol2Xs;

}
function createDivPanel(divPanelBody) {
	var divPanel = document.createElement("div");
	divPanel.className = "panel panel-default ";
	divPanel.appendChild(divPanelBody);
	return divPanel;
}
function createPanelBody(username,bool) {
	var divPanelBody = document.createElement("div");
	var lineBreak = document.createElement("br");
    var lineBreakTwo = document.createElement("br");
	var img = document.createElement("img");
	var followButton = document.createElement("button");
	var userNameP = document.createElement("p");
	divPanelBody.className = "panel-body centerPanelBody";
	img.src = "../Images/useravatar.png";
	followButton.type = "button";
    (bool) ? followButton.style.marginLeft = "0" : followButton.style.marginLeft = "-10%";
	(bool) ? followButton.innerHTML = "Follow" : followButton.innerHTML = "Unfollow";
	(followButton.innerHTML === "Follow") ? followButton.className = "btn btn-primary" : followButton.className = "btn btn-info";
	followButton.onclick = function() {userBtnClick(this)};
	userNameP.innerHTML = username;
	userNameP.className = "js-userName";
	divPanelBody.appendChild(img);
	divPanelBody.appendChild(lineBreak);
	divPanelBody.appendChild(followButton);
    divPanelBody.appendChild(lineBreakTwo);
	divPanelBody.appendChild(userNameP);
	return divPanelBody;
}
function userBtnClick(btnElement) {
	var panelBodyElement = btnElement.parentElement;
    var panelElement = panelBodyElement.parentElement;
    var jsFolloweesElement  =  document.getElementById('js-followees-thumbnail');
    var jsFollowersElement  =  document.getElementById('js-followers');
    if(btnElement.innerHTML === "Follow") {
        followUser(btnElement,panelElement,jsFolloweesElement,jsFollowersElement);
	}
	else {
        unFollowUser(btnElement,panelElement,jsFolloweesElement,jsFollowersElement);
    }
}
function followUser(btnElement,panelElement,jsFolloweesElement,jsFollowersElement) {
    btnElement.innerHTML = "Unfollow";
    btnElement.className = "btn btn-info";
    jsFolloweesElement.removeChild(panelElement);
    var newColSm2Element = document.createElement('div');
    newColSm2Element.className = "col-sm-2";
    newColSm2Element.appendChild(panelElement);
    jsFollowersElement.appendChild(newColSm2Element);
}
function unFollowUser(btnElement,panelElement,jsFolloweesElement,jsFollowersElement){
    btnElement.innerHTML = "Follow";
    btnElement.className = "btn btn-primary";
    var colSm2Element = panelElement.parentElement;
    jsFollowersElement.removeChild(colSm2Element);
    jsFolloweesElement.appendChild(panelElement);
}

function filterUsers(inputElement) {
	var users = document.getElementsByClassName("js-userName");
	var usersToHideArr = new Array() ;
	for (var i  in users){
		var userText = users[i].innerHTML;
		if(userText !== undefined){
			if(!aContainsB(userText,inputElement.value)){
                usersToHideArr.push(users[i]);
			}
		}
	}
    hideOtherUsers(usersToHideArr);
}
function hideOtherUsers(usersToHideArr) {
    var jsFolloweesElement  =  document.getElementById('js-followees-thumbnail');
    var jsFollowersElement  =  document.getElementById('js-followers');
    for(var i in usersToHideArr){
    	var panelBody  = usersToHideArr[i].parentElement;
    	var panel = panelBody.parentElement;
    	if(panel.parentElement === jsFolloweesElement) {
            panel.style.display = "none";
        }
        else {
    		var col = panel.parentElement;
    		if(col.parentElement === jsFollowersElement){
    			col.style.display = "none";
			}
		}
	}

}

