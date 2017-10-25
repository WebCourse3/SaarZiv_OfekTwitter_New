function Publish() {
    var Tweet = document.getElementById('Tweet').value;
	document.getElementById('Tweet').value="";

	var node  = document.createElement("LI");
	var textNode = document.createTextNode(Tweet);
    var currentTweet = node.appendChild(textNode);

	document.getElementById('test').appendChild(currentTweet);


}