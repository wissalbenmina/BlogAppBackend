const express = require('express');
const postRoutes = require('./routes/postRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

// middlewares
app.use(express.json());
app.use(logger);
app.use(errorHandler)

// routes
app.use('/', postRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});