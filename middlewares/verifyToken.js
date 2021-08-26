import jwt from 'jsonwebtoken';
import User from '../models/modelsAuth.js';
import asyncHandler from './asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const verifyToken = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new ErrorResponse('Unauthorized', 401);
  const { _id } = jwt.verify(authorization, process.env.JWT_SECRET);
  const found = await User.findById(_id);
  if (!found) throw new ErrorResponse('User does not exist', 404);
  req.user = found;
  next();
});

export default verifyToken;