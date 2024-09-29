const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express());

const server = app.listen(3000, () => {
    console.log('Server running on port 3000.');
})

