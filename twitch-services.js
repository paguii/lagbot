function checkIfChannelOnline(channels){
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    
    var url = 'https://api.twitch.tv/helix/streams';
    var parameter = '?user_login=' + channels[0]['url'];
    
    xhr.open('GET', url + parameter);
    xhr.setRequestHeader('Client-ID:', '5kpjhurts95291wu241gchjfmdl7em');
    xhr.onload = function() {
        if (xhr.status === 200) {
           console.log("foi");
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };

    xhr.send();
}

function checkIfChannelOnline2(channels){
    var url = 'https://api.twitch.tv/helix/streams';
    var parameter = '?user_login=' + channels[0]['url'];

    $.ajax({
        type: 'GET',
        url: url + parameter,
        headers: {
            'Client-ID': '5kpjhurts95291wu241gchjfmdl7em'
        },
        success: function(data) {
            console.log(data);
        }
    });
}

function checkIfChannelOnline3(channels){
    const curl = require('curl');

    var url = 'https://api.twitch.tv/helix/streams';
    var parameter = '?user_login=' + channels[0]['url'];
    var options =  'Client-ID: 5kpjhurts95291wu241gchjfmdl7em';


    curl.get(url + parameter, options, (err,resp,body)=>{
        if(resp.statusCode == 200){
            parseData(body);
        } else{
            //some error handling
            console.log(resp.statusCode);
        }
    });
}

var channels = require("./data/twitch-channels.json");
checkIfChannelOnline3(channels);

