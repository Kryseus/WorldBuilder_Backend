import { Router } from 'express';
import { getUserInfo, signIn, signUp } from '../controllers/authController.js';
import verifyToken from '../middlewares/verifyToken.js';

const authRouter = Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.get('/me', verifyToken, getUserInfo);

export default authRouter;