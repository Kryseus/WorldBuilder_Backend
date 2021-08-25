import modelsUser from "../models/modelsMarker.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await modelsUser.find();
  res.json(users);
});

export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await modelsUser.findById(id);
  if (!user) throw new ErrorResponse(`User with id of ${id} not found`, 404);
  res.json(user);
});

export const createSingleUser = asyncHandler(async (req, res) => {
  const { title, email, password } = req.body;
  const newUser = await modelsUser.create({
    title,
    email, 
    password,
  });
  res.status(201).json(newUser);
});

export const updateSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, email, password } = req.body;
  const updatedUser = await modelsUser.findOneAndUpdate(
    { _id: id },
    {  title, email, password },
    { new: true }
  );
  res.json(updatedUser);
});

export const deleteSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await modelsUser.deleteOne({ _id: id });
  res.json({ success: `User with id of ${id} was deleted` });
});
