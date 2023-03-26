const express = require('express');
const mongoose = require('mongoose');
const candidateRoutes = require('./routes/candidateRoutes');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/candidates';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/candidates', candidateRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
