const express = require('express');
const app = express();

const apiRoutes = require('./routes/mainApi')
require('./db/database')

// Configuraciones
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', apiRoutes);

// Iniciar server
app.listen(app.get('port'), () => {
    console.log('Server en puerto', app.get('port'));
});