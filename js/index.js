// function weatherReport(latitude,longitude) {
// 	var apiKey       =  config.DARKSKY_KEY,
// 			url          = 'https://api.darksky.net/forecast/',
// 			lati         = latitude, //40.4862° N, 74.4518° W (New Brunswick)
// 			longi        = longitude,
// 			api_call     = url + apiKey + "/" + lati + "," + longi;

// }
// //40.4862° N, 74.4518° W (New Brunswick)
// var apiKey       =  config.DARKSKY_KEY,
// 			url          = 'https://api.darksky.net/forecast/',
// 			lati         = 40.4862, 
// 			longi        = 74.4518,
// 			api_call     = url + apiKey + "/" + lati + "," + longi;

// $.getJSON(api_call,function(forecast) {
// 	console.log(forecast);
// 	// var jsonStr = JSON.stringify(forecast);
// 	// document.body.innerHTML = jsonStr;

// })

//https://api.darksky.net/forecast/de3a5a5bd3920d590553ee3de5f8f077/37.8267,-122.4233

var xhr = new XMLHttpRequest();
xhr.open('GET', "https://api.darksky.net/forecast/de3a5a5bd3920d590553ee3de5f8f077/37.8267,-122.4233", true);
xhr.send();
 
xhr.onreadystatechange = processRequest;

function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
       	document.body.innerHTML = response;

    }
}
