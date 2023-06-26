const express = require('express');
const app = express();
app.use(express.json());

// Define and register /sayHello REST endpoint
app.post('/sayHello', (req, res) => {
    const name = req.body.name;
    res.json({ message: 'Hello ' + name });
});


// Create an HTTP server and listen on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
