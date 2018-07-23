const req = require('request');

let data_nodes = {
    "208.118.235.190": [8333, 34, 56],
    "78.46.32.92": [8333, 60],
    "185.25.48.184": [8333],
    "111.8.128.219": [8333],
    "176.223.111.242": [8333],
    "54.211.137.101": [8333]
};

let nodes_ar = [];
let ipCounter = 0;
let portcounter = 0;
// /<ADDRESS>-<PORT>

//checkPortIp("208.118.235.190","8332");

const checkPortIp = (_port, _ip) => {
    req(`https://bitnodes.earn.com/api/v1/nodes/${_port}-${_ip}`, { json: true }, (err, body) => {
        if (err) return console.log('Error');
        body.detail ? console.log(`the node: ${_port}:${_ip} not found`) : console.log(`the node: ${_port}:${_ip} found`);
    });
}

const checkPortsArrayInterval = () => {
    let currentIp = nodes_ar[ipCounter].ip;
    let currentPort = nodes_ar[ipCounter].ports[portcounter];
    checkPortIp(currentIp, currentPort);
    portcounter++;
    if (portcounter >= nodes_ar[ipCounter].ports.length) {
        portcounter = 0;
        ipCounter++;
        if (ipCounter >= nodes_ar.length) {
            ipCounter = 0;
            console.log("*************** reset array ports *************");
        }
    }
}

const makeNodeArray = () => {
    for (let i in data_nodes) {
        nodes_ar.push({
            ip: i,
            ports: data_nodes[i]
        })
    }
    setInterval(checkPortsArrayInterval, 1000);
}

makeNodeArray()


