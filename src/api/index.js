import express from 'express';
import v1 from './v1';

var app = express();
app.use('/v1', v1);

module.exports = app;
