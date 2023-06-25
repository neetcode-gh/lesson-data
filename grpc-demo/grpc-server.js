const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./protos/helloworld.proto', {});

// Create a gRPC server and register the handlers for the defined RPCs
const server = new grpc.Server();
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

server.addService(hello_proto.HelloWorld.service, {
    SayHello: sayHello
});
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server running on port 50051');
});

// Synchronous function to handle the SayHello RPC
function sayHello(call, callback) {
    callback(null, {message: 'Hello ' + call.request.name});
}
