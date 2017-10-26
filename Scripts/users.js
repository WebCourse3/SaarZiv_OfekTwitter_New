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
	{"username":"shodasdasdsadasdasdko  sadasd","isFollowing":true},
	{"username":"loko","isFollowing":false},
	{"username":"bar","isFollowing":false},
	{"username":"eli","isFollowing":true},

];

loadUsers();

function loadUsers() {
	var loadFollowersFragment = document.createDocumentFragment();
	var loadFolloweesFragment = document.createDocumentFragment();
	for (var i in usersList){
		var divPanelBody = createPanelBody(usersList[i].username);
		if(usersList[i].isFollowing){
			loadFolloweesFragment.appendChild(divPanelBody)
		}
		else{
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
	var followeesDiv = document.getElementById("js-followees");
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
	divPanel.className = "panel panel-default userBox";
	divPanel.appendChild(divPanelBody);
	return divPanel;
}
function createPanelBody(username) {
	var divPanelBody = document.createElement("div");
	var img = document.createElement("img");
	var followButton = document.createElement("button");
	var userNameP = document.createElement("p");
	divPanelBody.className = "panel-body";
	img.src = "../Images/useravatar.png";
	followButton.className = "btn btn-primary";
	followButton.type = "button";
	followButton.innerHTML = "Follow";
	userNameP.innerHTML = username;
	divPanelBody.appendChild(img);
	divPanelBody.appendChild(followButton);
	divPanelBody.appendChild(userNameP);
	return divPanelBody;
}