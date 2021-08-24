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
  if (!user) throw new ErrorResponse(`user with id of ${id} not found`, 404);
  res.json(user);
});

export const createSingleUser = asyncHandler(async (req, res) => {
  const { title, cover, author, body, genre } = req.body;
  const newUser = await modelsUser.create({
    title,
    cover,
    author,
    body,
    genre,
    //Update needed
  });
  res.status(201).json(newuser);
});

export const updateSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, author, body, genre } = req.body;
  const updatedUser = await modelsUser.findOneAndUpdate(
    { _id: id },
    { title, author, body, genre },
    // Update needed
    { new: true }
  );
  res.json(updatedUser);
});

export const deleteSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await modelsUser.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});
