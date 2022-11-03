import { Router } from 'express';
import TokenHandler from '../middlewares/validateToken';
import UserService from '../database/models/services/UserService';
import UserController from '../controllers/userController';

const loginRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

loginRouter.post(
  '/',
  userController.login,
);

loginRouter.get('/validate', TokenHandler.getTokenData);

export default loginRouter;
