import { Router } from 'express';
import TokenHandler from '../middlewares/validateToken';
import { MatchesController } from '../controllers';
import { MatchesService } from '../database/models/services';

const matchesRouter = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get(
  '/',
  matchesController.getAll,
);

matchesRouter.post(
  '/',
  TokenHandler.checkToken,
  matchesController.createAMatch,
);

export default matchesRouter;
