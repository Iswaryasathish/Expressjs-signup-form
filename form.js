
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});


app.post('/signup', (req, res) => {
  const { name, email, password, phonenumber, address } = req.body;

  // Validate input
  let errors = [];

  if (!validator.isEmail(email)) {
    errors.push('Invalid email address.');
  }
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long.');
  }

  if (errors.length > 0) {
    return res.status(400).send(errors.join('<br>'));
  }


  res.send('Signup successful!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
