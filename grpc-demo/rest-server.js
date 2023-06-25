const express = require('express');
const app = express();
app.use(express.json()); // for parsing application/json

app.post('/sayHello', (req, res) => {
    const name = req.body.name;
    res.json({ message: 'Hello ' + name });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
