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
	var img = document.createElement("img")
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

