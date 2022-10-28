import { Router } from 'express';
import loginRouter from './LoginRoutes.routes';

const router = Router();

router.use('/login', loginRouter);

export default router;
