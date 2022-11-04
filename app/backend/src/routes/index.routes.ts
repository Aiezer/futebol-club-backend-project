import { Router } from 'express';
import loginRouter from './Login.routes';
import teamsRouter from './Teams.routes';
import matchesRouter from './Matches.routes';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
