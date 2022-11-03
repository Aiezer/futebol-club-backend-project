import { Router } from 'express';
import loginRouter from './Login.routes';
import teamsRouter from './Teams.routes';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);

export default router;
