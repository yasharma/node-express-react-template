// NPM imports
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Http from 'http';
// Routes ...
import currencyConversionRoutes from './routes/currencyConversionRoutes';

// Application imports
import config from './config';

// Intializations
const app = express();
const http = Http.createServer(app);

app.all('/*', (req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header(
    'Access-Control-Allow-Headers',
    'Content-type,Accept,X-Access-Token,X-Key,Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// To avoid client to know about express
app.disable('x-powered-by');

// To avoid 304 content not modified status.
app.disable('etag');

  // parse application/json
  app.use(bodyParser.json());

  app.use('', currencyConversionRoutes());

  app.use(
    (err: any, req: Request, res: Response, next: (err?: any) => void) => {
      if (!err) return next();
      const errorResponse = {
        error: err.data || err.message || err || 'Something went Wrong!',
        stack: err.stack || undefined
      };
      console.error('[ERROR]: ', JSON.stringify(errorResponse));
      return res.status(400).json(errorResponse);
    }
  );

  exports.server = http.listen(config.port, () => {
    console.info(`Started on port ${config.port}`);
  });
