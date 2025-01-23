const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const port = process.env.PORT || 3000;

let angle = 90; // Default angle of the servo

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON body
app.use(express.json());

// Endpoint to get the current servo angle
app.get('/get-angle', (req, res) => {
  res.json({ angle: angle });
});

// Endpoint to set the servo angle
app.post('/set-angle', (req, res) => {
  const newAngle = req.body.angle;

  if (newAngle >= 0 && newAngle <= 180) {
    angle = newAngle;
    console.log(`Updated angle: ${angle}`);
    res.status(200).send(`Angle updated to ${angle}`);
  } else {
    res.status(400).send('Invalid angle. Must be between 0 and 180.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
