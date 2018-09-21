require('dotenv').config();
var cron = require('node-cron');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOK;
const sender = process.env.SENDER;
const receiver = process.env.RECIPIENT;
const client = require('twilio')(accountSid, authToken);


let fetch = require('node-fetch');
let darksky = 'https://api.darksky.net/forecast/';
let key = process.env.DARKSKY_KEY;
let lat = 40.789543;
let lng = -74.056534;
let uri = darksky + key + '/' + lat +','+ lng;

//console.log(uri);
uri = uri.concat('?exclude=daily,minutely,currently&lang=en');
// units - ca, si, us, uk
// exclude - minutely,hourly,daily,currently
// lang - 
let options = {
    method: 'GET',
    mode: 'cors'
}

cron.schedule('0 10 * * 1-5', function(){

    let req = new fetch.Request(uri, options);

    fetch(req)
        .then((response)=>{
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Bad HTTP!')
            }
        })
        .then( (j) =>{
            //console.log(j.hourly);

            sendWeatherReport(j);
            
        })
        .catch( (err) =>{
            console.log('ERROR:', err.message);
        });

});

function sendWeatherReport(j){
    let date = new Date((j.hourly.data[0].time)*1000);

    const options = {
                to: receiver,
                from: sender,
                body: `Weather Report:\n`+
                `Date: ${date.toLocaleDateString("en-US")}\n`+
                `Summary: ${j.hourly.summary}\n`+
                weatherhourlyreport(j),
            };

   

    client.messages.create(options, function(err, response) {
        if (err) {
            // Just log it for now
            console.error(err);
        } else {
            // Log the last few digits of a phone number
            console.log(`Message sent to ${receiver}`);
        }
 });
}

function weatherhourlyreport(j)
{
    var options = { timeZone: "America/New_York"}
    var report ='';
    var i;
    for(i = 0; i<5; i++){
        var date = new Date((j.hourly.data[i].time)*1000);
        report = report + 
             `-----------------------------------\n`+
             `Time: ${date.toLocaleTimeString("en-US",options)}\n`+
             `Summary: ${j.hourly.data[i].summary}\n`+
             `RealFeal: ${j.hourly.data[i].apparentTemperature}\u00B0F\n`+
             `Percip: ${Number((j.hourly.data[i].precipProbability)*100).toFixed(2)}%\n`
                
    }

    return report;
}










