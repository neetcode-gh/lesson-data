/** Test gRPC server */
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf files
const packageDefinition = protoLoader.loadSync('protos/helloworld.proto', {});
const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// Create a new client instance
const client = new helloProto.HelloWorld('localhost:50051', grpc.credentials.createInsecure());

// Define your request
const request = {name: 'World'};

// Make a call to the 'SayHello' method
client.sayHello(request, (err, response) => {
  if (err) {
    console.error('Error:', err);
  } else {
    // Print the response
    console.log('Response:', response);

    // Calculate the size of the response
    const responseSize = Buffer.byteLength(JSON.stringify(response), 'utf8');
    console.log('Response size:', responseSize);
  }
});


/** Test express server */
const fetch = require('node-fetch');

// Define your request
const expressRequest = {
  method: 'POST',
  body: JSON.stringify({name: 'World'}),
  headers: { 'Content-Type': 'application/json' },
};

// Make a call to the '/sayHello' endpoint
fetch('http://localhost:3000/sayHello', expressRequest)
  .then(res => res.json())
  .then(response => {
    // Print the response
    console.log('Response:', response);

    // Calculate the size of the response
    const responseSize = Buffer.byteLength(JSON.stringify(response), 'utf8');
    console.log('Response size:', responseSize);
  })
  .catch(err => {
    console.error('Error:', err);
  });

