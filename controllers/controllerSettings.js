import modelsSetting from "../models/modelsSettings.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import modelsSettings from "../models/modelsSettings.js";

export const getAllSettings = asyncHandler(async (req, res) => {
  const settings = await modelsSetting.find();
  res.json(settings);
});

export const getSingleSetting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const setting = await modelsSetting.findById(id);
  if (!setting)
    throw new ErrorResponse(`Setting with id of ${id} not found`, 404);
  res.json(setting);
});

export const createSingleSetting = asyncHandler(async (req, res) => {
  const {user} = req
  const { title, description, image, players, maps } = req.body;
  const newSetting = await modelsSetting.create({
    title,
    description,
    image,
    author: user.id,
    players,
    maps,
  });
  res.status(201).json(newSetting);
});

export const updateSingleSetting = asyncHandler(async (req, res) => {
  const {user} = req
  // check if user.id === the author id in the setting 
  const { id } = req.params;
  const { title, description, image, author, players, maps } = req.body;
  const updatedSetting = await modelsSetting.findOneAndUpdate(
    { _id: id },
    { title, description, image, author, players, maps },
    // Update needed
    { new: true }
  );
  res.json(updatedSetting);
});

export const deleteSingleSetting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await modelsSettings.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});
