import { Router } from 'express';
import UserService from '../database/models/services/UserService';
import UserController from '../controllers/userController';

const loginRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

loginRouter.post(
  '/',
  userController.login,
);

export default loginRouter;
