import settingsModel from "../models/settingsModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllSettings = asyncHandler(async (req, res) => {
  const settings = await settingsModel.find();
  res.json(settings);
});

export const getSingleSetting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const setting = await settingsModel.findById(id);
  if (!setting)
    throw new ErrorResponse(`Setting with id of ${id} not found`, 404);
  res.json(setting);
});

export const createSingleSetting = asyncHandler(async (req, res) => {
  const { user } = req;
  const { title, description, image } = req.body;
  const newSetting = await settingsModel.create({
    title,
    description,
    image,
    author: user.id,
  });
  res.status(201).json(newSetting);
});

export const updateSingleSetting = asyncHandler(async (req, res) => {
  const { user, params: {id} } = req;
  const found = await  settingsModel.findById(id).populate('author')
  if(!found) throw new ErrorResponse("Setting does not exist! ", 404);
  if (!user.id === found.author._id)
    throw new ErrorResponse("You are not authorized! ", 403); // check if user.id === the author id in the setting
  const { title, description, image, author, players, maps } = req.body;
  const updatedSetting = await settingsModel.findOneAndUpdate(
    { _id: id },
    { title, description, image, author, players, maps },
    // Update needed
    { new: true }
  );
  res.json(updatedSetting);
});

export const deleteSingleSetting = asyncHandler(async (req, res) => {
  const { user, params: {id} } = req;
  const found = await  settingsModel.findById(id).populate('author')
  if(!found) throw new ErrorResponse("Setting does not exist! ", 404);
  if (!user.id === found.author._id)
    throw new ErrorResponse("You are not authorized! ", 403);
  await settingsModels.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});
