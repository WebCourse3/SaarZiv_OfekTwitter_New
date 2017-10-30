var tweetList = document.getElementById("tweetsList");
var tweetsArray = [
	{ "userName":"lachtong", "tweet":"huckleg libenshracth?"},
	{ "userName":"frachzabe", "tweet":"uun eech den shrachtel vayden"},
	{ "userName":"lachtong", "tweet":"huckleg libenshracth?"},
	{ "userName":"frachzabe", "tweet":"uun eech den shrachtel vayden"},
	{ "userName":"geboydun", "tweet":"Ayyn FAS !"}
];
loadTweets();

function loadTweets() {
	var loadFragment = document.createDocumentFragment();
	for (var i in tweetsArray){
		loadFragment.appendChild(createTweet(tweetsArray[i].userName,tweetsArray[i].tweet));
	}
	tweetList.appendChild(loadFragment);
}
function createTweet(userName, tweet) {
	var li  = document.createElement("li");
	var imgP = document.createElement("p");
	var img = document.createElement("img");
	var divText = document.createElement("div");
	var userNameP  = document.createElement("p");
	var tweetP  = document.createElement("p");
	var boldUserName = document.createElement("b");
	img.setAttribute("src","../Images/useravatar.png");
	img.setAttribute("class","pull-left");
	imgP.appendChild(img);
	userNameP.innerHTML = userName + " says :";
	boldUserName.appendChild(userNameP);
	tweetP.innerHTML = tweet;
	divText.appendChild(boldUserName);
	divText.appendChild(tweetP);
	userNameP.style.marginLeft = "7%";
	tweetP.style.marginLeft = "7%";
	li.appendChild(imgP);
	li.appendChild(divText);
	return li;
}

function publish() {
	var tweet = document.getElementById('Tweet').value;
	var newJsonTweet = {"userName":"someone", "tweet":tweet};
	tweetsArray.push(newJsonTweet);
	var newTweetLi = createTweet("someone",tweet);
	var newTweetFragment = document.createDocumentFragment();
	newTweetFragment.appendChild(newTweetLi);
	tweetList.appendChild(newTweetFragment);
	document.getElementById('Tweet').value = "";

}
function testPublish(){
	var tweet = document.getElementById('Tweet').value;
	var UlElem = document.getElementById('tweetsList');
	if(UlElem.childElementCount > 5 && tweet === ""){
		return true;
	}
	return false;

}
function assert(value,name) {
	var testGroupDiv = document.getElementsByClassName("testGroupDiv");
	var labelPara = document.createElement('p');
	var assertLabel = document.createElement("label");
	assertLabel.innerHTML = name;
	assertLabel.style.color = "black";
	if(value){
		labelPara.style.backgroundColor = "green";

	}else{
		labelPara.style.backgroundColor = "red";
		this.testGroupDiv.style.backgroundColor = "red";
	}
	labelPara.appendChild(assertLabel);
	testGroupDiv[testGroupDiv.length -1].appendChild(labelPara);
}
function testGroup(testGroupName,assertsFunctions) {
	var testGroupParentElement = document.getElementById("js-testGroupParent");
	this.testGroupDiv = document.createElement("div");
	this.testGroupDiv.className = "testGroupDiv";
	var h3Title = document.createElement("h3");
	h3Title.innerHTML = testGroupName;
	this.testGroupDiv.appendChild(h3Title);
	testGroupParentElement.appendChild(this.testGroupDiv);
	this.testGroupDiv.style.backgroundColor = "green";
	assertsFunctions.bind(this)();
}
testGroup("TestGroupOne", function () {
	assert(true, "Test Publish");
	assert(true, "some test two");
	assert(true, "some test three");
});

