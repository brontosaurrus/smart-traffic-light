


const awsIot = require('aws-iot-device-sdk');

const device = awsIot.device({
    certPath: 'c716a60c6e-certificate.pem.crt',
    keyPath: 'c716a60c6e-private.pem.key',
    caPath: 'rootCA.crt',
    clientId: 'traffic-ligh-sensor',
    host: 'a1h3em7aow2w8s-ats.iot.us-east-1.amazonaws.com'
});


device.on('connect', () => {
        console.log('connected');

        //device.publish('test', 'hello IoT Core');
        //console.log('Message Sent');    
        isConnected=true;
        device.subscribe('ChangeState');
    }
);


device.on('message', (topic , payload ) => {
    state.state = state.state=== 'RED'?'GREEN':'RED';
    console.log('message', topic , payload.toString());
});


let state = {state: 'RED', numberOfCars:6};

let isConnected=false;

let timeout=null;

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)

}

function startSimulation(){
    if(isConnected)
        simulateCars();
    else
    {
        setTimeout(startSimulation, 1000);
        console.log('not connected');
    }
}

function stopSimulation() {
    clearTimeout(timeout);
}

function simulateCars() {
    console.log(state);

    state.numberOfCars = Math.max(0, state.numberOfCars + (state.state == 'RED' ? 1: -1) * randomInt(1,5));;

    device.publish('NumberOfCars', JSON.stringify(state));

    timeout = setTimeout(simulateCars,5000);
}

module.exports = {
    state: state,
    startSimulation : startSimulation,
    stopSimulation: stopSimulation

}