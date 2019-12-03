import { Router, Response } from 'express';
import config from '../config';

export default () => {
  const router = Router();

  router.route('/')
    .get((req: any, res: Response, next) => {
      return res.json('Ok');
    });
  return router;
};