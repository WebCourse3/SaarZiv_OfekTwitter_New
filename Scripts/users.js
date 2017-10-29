var usersList = [
	{"username":"dani","isFollowing":true},
	{"username":"moshe","isFollowing":true},
	{"username":"esti","isFollowing":true},
	{"username":"mayan","isFollowing":true},
	{"username":"rami","isFollowing":true},
	{"username":"rami","isFollowing":false},
	{"username":"baruch","isFollowing":false},
	{"username":"nesi","isFollowing":false},
	{"username":"varum","isFollowing":true},
	{"username":"moko","isFollowing":true},
	{"username":"dani","isFollowing":false},
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
        var divPanelBody;

        if(usersList[i].isFollowing){
	        divPanelBody =  createPanelBody(usersList[i].username,true);
	        var divPanel = createDivPanel(divPanelBody,true);
	        loadFolloweesFragment.appendChild(divPanel);

        }
		else{
	        divPanelBody =  createPanelBody(usersList[i].username,false);
	        var divPanel = createDivPanel(divPanelBody,false);
	        loadFollowersFragment.appendChild(divPanel);
		}
	}
	LoadFollowers(loadFollowersFragment);
	LoadFollowees(loadFolloweesFragment);
}

function LoadFollowers(loadFollowersFragment) {
	var jsNotFollowingElement = document.getElementById("js-notFollowing");
	jsNotFollowingElement.appendChild(loadFollowersFragment);
}
function LoadFollowees(loadFolloweesFragment) {
	var followeesDiv = document.getElementById("js-followees-thumbnail");
	followeesDiv.appendChild(loadFolloweesFragment);
}

function createDivPanel(divPanelBody,isFollowing) {
	var divPanel = document.createElement("div");
	(isFollowing) ? divPanel.className = "panel panel-default" : divPanel.className = "panel panel-default col-xs-2" ;
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
	(bool) ? followButton.innerHTML = "Unfollow" : followButton.innerHTML = "Follow";
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
    var jsNotFollowingElement  =  document.getElementById('js-notFollowing');
    if(btnElement.innerHTML === "Follow") {
        followUser(btnElement,panelElement,jsFolloweesElement);
	}
	else {
        unFollowUser(btnElement,panelElement,jsNotFollowingElement);
    }
}
function followUser(btnElement,panelElement,jsFolloweesElement) {
    btnElement.innerHTML = "Unfollow";
    btnElement.className = "btn btn-info";
    panelElement.className = "panel panel-default";
    jsFolloweesElement.appendChild(panelElement);
}
function unFollowUser(btnElement,panelElement,jsNotFollowingElement){
    btnElement.innerHTML = "Follow";
    btnElement.className = "btn btn-primary";
	panelElement.className = "panel panel-default col-xs-2";
	jsNotFollowingElement.appendChild(panelElement);
}

function filterUsers(inputElement) {
	var users = document.getElementsByClassName("js-userName");
	var usersToHideArr = [];
	var usersToShowArr = [];
	for (var i  in users){
		var userText = users[i].innerHTML;
		if(userText !== undefined){
			if(!aContainsB(userText,inputElement.value)){
                usersToHideArr.push(users[i]);
			}
			else{
				usersToShowArr.push(users[i]);
			}
		}
	}
	showOtherUsers(usersToShowArr);
    hideOtherUsers(usersToHideArr);
}
function hideOtherUsers(usersToHideArr) {
    var jsFolloweesElement  =  document.getElementById('js-followees-thumbnail');
    var jsNotFollowingElement  =  document.getElementById('js-notFollowing');
    for(var i in usersToHideArr){
    	var panelBody  = usersToHideArr[i].parentElement;
    	var panel = panelBody.parentElement;
    	if(panel.parentElement === jsFolloweesElement || panel.parentElement === jsNotFollowingElement) {
            panel.style.display = "none";
        }

	}
}
function showOtherUsers(usersToShowArr) {
	var jsFolloweesElement  =  document.getElementById('js-followees-thumbnail');
	var jsNotFollowingElement  =  document.getElementById('js-notFollowing');
	for(var i in usersToShowArr){
		var panelBody  = usersToShowArr[i].parentElement;
		var panel = panelBody.parentElement;
		if(panel.parentElement === jsFolloweesElement || panel.parentElement === jsNotFollowingElement) {
			panel.style.display = "";
		}
	}
}

