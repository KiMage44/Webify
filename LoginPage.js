var scopes = {
	key1:'user-library-read',
	key2: 'user-library-modify',
	key3: 'streaming',
	key4: 'user-top-read'
}
function getLoginURL(){
	var baseURL = "https://accounts.spotify.com/authorize?";
	scopeList = '';
	for(i in scopes){
		scopeList += scopes[i]+" ";
	}
	var URL = {
		client_id:,
		state : '1239ouy5',
		redirect_uri: encodeURIComponent('http://localhost:1339/MainPage.html'),
		scope: encodeURIComponent(scopeList),
		response_type : 'token'
	}
	var fullString = baseURL;
	for(i in URL){
		if(i === 0){
			fullString += i+"="+URL[i];
		}
		else
			fullString += "&"+i+"="+URL[i];
	}
	state = URL.state;
	console.log(fullString);
	return fullString;
}
