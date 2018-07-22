const http = require('http');
const req = require('request')

let data_nodes = {
    "208.118.235.190":[8333,34,56],
    "78.46.32.92":[8333,60],
    "185.25.48.184":[8333],
    "111.8.128.219":[8333],
    "176.223.111.242":[8333],
    "54.211.137.101":[8333]

};
let nodes_ar = [];
let ipCounter = 0;
let portcounter = 0;
// /<ADDRESS>-<PORT>

//checkPortIp("208.118.235.190","8332")

function checkPortIp(_port , _ip){
    req("https://bitnodes.earn.com/api/v1/nodes/"+_port+"-"+_ip,{json:true}, function(error, response, body) {
        if(error) {
            console.log('Opps');
        } else {
            if(body.detail){
                console.log("the node:"+_port+":"+_ip+" not found")
            }
            else{
                console.log("the node:"+_port+":"+_ip+" is founded")
            }
           // console.log('statusCode:', response && response.statusCode); 
           // console.log('body:', body); 
        }
    });
}


let server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
   

    res.end(JSON.stringify(data));

}).listen(3000);
console.log('Listening to port 3000');


makeNodeArray()

function makeNodeArray(){
    for(var i in data_nodes){
        //console.log(i);
        //console.log(data_nodes[i])
        nodes_ar.push({
            ip:i,
            ports:data_nodes[i]
        })
       // 
    }
   // console.log(nodes_ar);
    setInterval(checkPortsArrayInterval,1000)
    
}
function checkPortsArrayInterval(){
    
    let currentIp = nodes_ar[ipCounter].ip
    // let currentPort = nodes_ar[ipCounter].ports[0];
    let currentPort = nodes_ar[ipCounter].ports[portcounter];
    checkPortIp(currentIp,currentPort);
    portcounter++;
    if(portcounter >= nodes_ar[ipCounter].ports.length)
    {
        portcounter = 0;
        ipCounter++;
        if(ipCounter >= nodes_ar.length){
            ipCounter = 0;
            console.log("*************** reset array ports *************")
        }
    }
}