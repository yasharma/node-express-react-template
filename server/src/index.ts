// NPM imports
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Http from 'http';
import path from 'path';
import cors from 'cors';

// Application imports
import config from './config';

// Routes ...
import route from './routes';

// Intializations
const app = express();
const http = Http.createServer(app);

app.use(cors());

// To avoid client to know about express
app.disable('x-powered-by');

// To avoid 304 content not modified status.
app.disable('etag');

app.use(express.static(path.join(__dirname, 'client')));

app.get('/healthcheck', (req, res) => {
  res.json('OK');
});


app.use(
  (err: any, req: Request, res: Response, next: (err?: any) => void) => {
    if (!err) return next();
    const errorResponse = {
      error: err.data || err.message || err || 'Something went Wrong!',
      stack: err.stack || undefined
    };
    console.log('[ERROR]: ', JSON.stringify(errorResponse));
    if (process.env.NODE_ENV === 'production') {
      delete errorResponse.stack;
    }
    return res.status(400).json(errorResponse);
  }
);

// parse application/json
app.use(bodyParser.json());

app.use('/', route());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

process.on('SIGINT', () => {
  console.log('Exiting...');
  process.exit(0);
});

http.listen(config.port, () => {
  console.log(`Started on port ${config.port}`);
});