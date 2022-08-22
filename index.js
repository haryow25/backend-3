const express = require('express');
const cors = require('cors');
const router = require('./routes');
const passport = require('./lib/passport');
const app = express();

const swaggerUI = require('swagger-ui-express');

const swaggerJSON = require('./swagger.json');
const port = process.env.PORT || 4000;

var corsOptions = {
  origin: 'http://localhost:3001',
};
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use(passport.initialize());
app.use('/api', router);

app.listen(port, () => {
  console.log(`this app listening at http://localhost:${port}/api`);
});
