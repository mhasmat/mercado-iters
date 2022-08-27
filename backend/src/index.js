const express = require('express');

const session = require('express-session');

//requiero el archivo donde están las rutas:
const publicationRouter = require('./routes/publications');

//requiero el archivo de las rutas de autenticación:
const authRouter = require('./routes/auth');

const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); //permiso de cors

app.use(express.static('../public')); //para usar archivos estáticos

app.use(
  session({
    secret: 'kr34t10',
    name: 'mercadoiters',
    saveUninitialized: true,
    resave: false,
  })
);

app.use(express.json());

app.use('/publicaciones', publicationRouter);

app.use('/auth', authRouter);

app.listen(8000);
