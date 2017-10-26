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
	{"username":"shodasdasdsadasdasdko  sadasd","isFollowing":false},
	{"username":"loko","isFollowing":false},
	{"username":"bar","isFollowing":false},
	{"username":"eli","isFollowing":true},

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
	followButton.className = "btn btn-primary";
	followButton.type = "button";
    (bool) ? followButton.style.marginLeft = "0" : followButton.style.marginLeft = "-10%";
	(bool) ? followButton.innerHTML = "Follow" : followButton.innerHTML = "unfollow";
	userNameP.innerHTML = username;
	divPanelBody.appendChild(img);
	divPanelBody.appendChild(lineBreak);
	divPanelBody.appendChild(followButton);
    divPanelBody.appendChild(lineBreakTwo);
	divPanelBody.appendChild(userNameP);
	return divPanelBody;
}