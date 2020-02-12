var token;
var state;
var operatingWindow;
var userID;
function start(mainWindow) {
	operatingWindow = mainWindow;
	var accessParams = _getAccessParameters();
	token = accessParams[0];
	var userURL = buildURL('userProfileC','GET',null);
	var userDetails = makeAPIRequest(userURL,null,null);
	userID = userDetails['id'];
	userDisplayName = userDetails['display_name'];
	imageDisplayURL = buildURL('getTrack','GET','0vvXsWCC9xrXsKd4FyS8kM');
	imageDisplay = makeAPIRequest(imageDisplayURL,null,null);
	//Right now, given that all requests are "promises" and may not actually return the value in time, i may have to 
	//make all data requested go to a callback function that by default stores the info in a cookie. doesn't seem 
	//very secure, so lets hope we can find a better solution.
}
function _getAccessParameters(){
	current_url = operatingWindow.location.href;
	values = current_url.split("#");
	parameters = values[1].split("&");
	for(i in parameters){
		parameters[i] = parameters[i].split("=");
		parameters[i] = parameters[i][1];
	}
	return parameters;
}
function buildURL(dataRequested,requestType,secondaryInput){
	var url_Full = getBaseURL(dataRequested,secondaryInput);
	console.log("baseurl recieved: "+url_Full);
	console.log("Token: "+token);
	var Data = {
		base_url : url_Full,
		requestType : requestType,
		headers: {
			type:"Authorization",
			value:"Bearer "+token
		}
	}
	console.log("request data constructed, ready to send: "+Data);
	return Data;
}
function getBaseURL(input, secondaryInput){
	var url = {
		topTracks:'https://api.spotify.com/v1/me/top/tracks',
		topArtists: 'https://api.spotify.com/v1/me/top/artists',
		userProfileC:'https://api.spotify.com/v1/me',
		userPlaylists: 'https://api.spotify.com/v1/users/'+secondaryInput+'/playlists',
		userSavedAlbums: 'https://api.spotify.com/v1/me/albums', 
		userSavedTracks: 'https://api.spotify.com/v1/me/tracks',
		getTrack:'https://api.spotify.com/v1/tracks/'+secondaryInput
	}
	return url[input]
}
function makeAPIRequest(requestParameters, LocationRequested,callback){
	dataRequest = new XMLHttpRequest();
	dataRequest.open(requestParameters.requestType,requestParameters.base_url);
	dataRequest.setRequestHeader(requestParameters.headers.type,requestParameters.headers.value);
	dataRequest.send();
	dataRequest.onreadystatechange = () =>{
		if(dataRequest.readyState === 4 && dataRequest.status === 200){
			console.log("Data Received from api, processing now.");
			var processedData = DataProcessor(dataRequest.responseText);
			if(callback == null) return processedData;
			else callback(processedData);
		}
		else if(dataRequest.readyState !== 4){
			console.log("request is being processed by api, please stand by.");
		}
		else if(dataRequest.readyState === 4 && dataRequest.status !== 200){
			console.log("Something went wrong during the request.\nStatus:"+dataRequest.Status);
			return null;
		}
	}
}
function DataProcessor(data){
	dataProcessed = JSON.parse(input);
	console.log("Data has been processed, returning to callback function");
	return dataProcessed;
}

