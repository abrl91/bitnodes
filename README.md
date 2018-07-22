# bitnodes

1. Create a Node server that receives a JSON object as an input - constructed from IP addresses and ports e.g.
{
“1.1.1.1” : [21, 53],
“127.0.0.1” : [22, 110, 80, 443]
….
}
2. The server should check periodically whether each of the IP’s (on the given ports) are used as Bitcoin Nodes - Bitcoin nodes are servers used as Bitcoin clients and are accepting incoming connections from other nodes.
You can use a bitnodes api such as bitnodes.earn.com.
3. For the API requests use request.
4. The output can be displayed using console.log() (UI is optional).
