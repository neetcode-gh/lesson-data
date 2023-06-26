const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./protos/helloworld.proto', {});

const server = new grpc.Server();
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// Define and register helloworld RPC handler
function sayHello(call, callback) {
    callback(null, {message: 'Hello ' + call.request.name});
}

server.addService(hello_proto.HelloWorld.service, {
    SayHello: sayHello
});

// Create a gRPC server and listen on port 50051
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server running on port 50051');
});
