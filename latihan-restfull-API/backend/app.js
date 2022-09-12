const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
require('./config/database');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(userRoute);

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
