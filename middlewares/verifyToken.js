import jwt from 'jsonwebtoken';
import User from '../models/modelsUser.js';
import asyncHandler from './asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const verifyToken = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new ErrorResponse('Unauthorized', 401);
  if (!authorization.startsWith('Bearer '))
    throw new ErrorResponse('No Bearer token is present', 400);
  const token = authorization.substring(7, authorization.length);
  const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  const found = await User.findById(_id);
  if (!found) throw new ErrorResponse('User does not exist', 404);
  req.user = found;
  next();
});

export default verifyToken;