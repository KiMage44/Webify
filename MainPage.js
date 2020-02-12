var authParameters;
var operatingWindow;

function start(mainWindow) {
	operatingWindow = mainWindow;
	authParameters = _auth();
	requestSiteContent();
}
function requestSiteContent() {
	requestParameters = getCurrentUser();
	makeRequest(requestParameters, "Account", loadSiteContent);
	requestParameters = getUserTop("tracks");
	makeRequest(requestParameters, "main",loadSiteContent);
}
function loadSiteContent(contentLocale,data) {
	if(contentLocale == "Account")
		operatingWindow.document.getElementById(contentLocale).src = data.images[0].url;
}
function _auth(){
	current_url = operatingWindow.location.href;
	values = current_url.split("#");
	parameters = values[1].split("&");
	for(i in parameters){
		parameters[i] = parameters[i].split("=");
		parameters[i] = parameters[i][1];
	}
	return parameters;
}

function getCurrentUser(){
	var Data = {
		base_url : 'https://api.spotify.com/v1/me',
		requestType : "GET",
		headers: {
			type:"Authorization",
			value:"Bearer "+authParameters[0]
		}
	}
	return Data;
}
function getUserTop(input) {
	var Data = {
		base_url : 'https://api.spotify.com/v1/me/top/tracks',
		requestType : "GET",
		headers: {
			type:"Authorization",
			value:"Bearer "+authParameters[0]
		}
	}
	return Data;
}
function makeRequest(requestData, contentLocale, callback){
	request = new XMLHttpRequest();
	request.open(requestData.requestType,requestData.base_url);
	request.setRequestHeader(requestData.headers.type,requestData.headers.value);
	request.send();
	console.log("Request Sent");
	request.onreadystatechange = ()=>{
		if(request.readyState ===4 && request.status ===200){
			var Data = request.responseText;
			var data_parsed = parseJSON(Data);
			callback(contentLocale, data_parsed);
			return true;
		}
		else if(request.readyState === 4 && request.status !== 200){
			console.log("An error occured");
			return null;
		}
		else console.log("attempting to access Content");
	}
}
function parseJSON(input){
	Data = JSON.parse(input);
	console.log("Verify Data: "+Data);
	return Data;
}
function MusicHandler(){
	console.log("A music button was clicked");
}