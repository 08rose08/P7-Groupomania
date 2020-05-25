const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const routes = require('./routes/routes');
const path = require('path');


const app = express();

/*mongoose.connect(' mongodb+srv://Rewri:mdpRewri@cluster0-1vlb0.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
*/

 




app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/posts', routes);
app.use('/api/auth', routes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;