const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const tempRoutes = require('./routes/tempRoutes');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passportOauth = require('./passportOauth');
const config = require('./config');
const MongoStore = require('connect-mongo');
const otherRoutes = require('./routes/othersRoutes');

app.use(express.json());
mongoose.connect(process.env.DB_LINK, () => {
  console.log('Database connected');
});
if (config.model == 'dev') {
  const cors = require('cors');
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
}

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_LINK,
    }),
  })
);

if (config.model == 'deploy') {
  app.use(express.static(path.join(__dirname, 'public')));
}

app.get('/userToRender', (req, res) => {
  res.json(req.session.user);
});
app.use('/authentication', authRoutes);
app.use('/code', tempRoutes);
app.use('/user', userRoutes);
app.use('/other', otherRoutes);

passportOauth(app);

if (config.model == 'deploy') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
} else {
  //if url is not specified, sending it to 404 page
  app.all('*', (req, res) => {
    res.send('Page not found');
  });
}

//error handler middleware
app.use((err, req, res, next) => {
  const { message = 'Something went wrong', status = 500 } = err;
  res.status(status).send(message);
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
