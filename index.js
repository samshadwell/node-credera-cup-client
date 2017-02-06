require('dotenv').config();

var WebSocket = require('ws');
var path = require('path');

var HOST = process.argv[2];
var TOKEN = process.env['CREDERA_AUTH_TOKEN'];

if (!HOST) {
    console.error('Usage: node ' + path.basename(process.argv[1]) + ' <server URL>');
    process.exit(1);
}

if (!TOKEN) {
    console.error('Missing required environment variable $CREDERA_AUTH_TOKEN');
    process.exit(1);
}

function getStatus(code) {
    if (code === 1000) {
        return 'Finished';
    } else if (code === 1001) {
        return 'Ran out of fuel';
    } else if (code === 1002) {
        return 'Retired';
    } else if (code === 1003) {
        return 'Crashed';
    } else {
        return 'Unknown status code';
    }
}

var ws = new WebSocket('wss://' + HOST, null, {
    headers: {
        'X-Credera-Auth-Token': process.env['CREDERA_AUTH_TOKEN']
    }
});

ws.on('open', function() {
    console.log('Connection established.');
    ws.send(JSON.stringify({instruction: 'beginrace'}))
});

ws.on('close', function() {
    console.log('Connection closed.');
});

ws.on('error', function(msg) {
    console.log(msg)
});

ws.on('message', function(res) {
    var data = JSON.parse(res);
    if (data.lapResult) {
        var lapNumber = data.lapResult.lapNumber;
        var remainingFuel = data.lapResult.fuel;
        var madePitStop = data.lapResult.madePitStop;

        // Determine if we should make a pit stop or not
        var makePitStop = false;

        ws.send(JSON.stringify({ instruction: makePitStop ? 'pit' : 'continue' }));
    } else if (data.raceResult) {
        console.log('Race complete!');
        console.log('Level: ' + data.raceResult.circuit);
        console.log('Status: ' + getStatus(data.raceResult.status));
        console.log('Total time: ' + data.raceResult.totalTime);
        ws.close();
    }
});
