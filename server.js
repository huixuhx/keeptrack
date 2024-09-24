const express = require('express');
const path = require('path');
const YAML = require('yamljs');

// Load the YAML configuration file
const config = YAML.load('./config.yaml');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Serve the main HTML file for React's client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Get the port from the config file or fallback to 3000
const PORT = process.env.PORT || config.port || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
