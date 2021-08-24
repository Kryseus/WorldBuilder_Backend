import modelsSetting from "../models/modelsSettings.js";
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllSettings = asyncHandler(async (req, res) => {
  const settings = await modelsSetting.find();
  res.json(settings);
});

export const getSingleSetting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const setting = await modelsSetting.findById(id);
  if (!setting) throw new ErrorResponse(`Setting with id of ${id} not found`, 404);
  res.json(setting);
});

export const createSingleSetting = asyncHandler(async (req, res) => {
  const { title, cover, author, body, genre } = req.body;
  const newSetting = await modelsSetting.create({
    title,
    cover,
    author,
    body,
    genre
    //Update needed
  });
  res.status(201).json(newSetting);
});

export const updateSingleSetting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, author, body, genre } = req.body;
  const updatedSetting = await modelsSetting.findOneAndUpdate(
    { _id: id },
    { title, author, body, genre },
    // Update needed
    { new: true }
  );
  res.json(updatedSetting);
});

export const deleteSingleSetting = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await modelsSetting.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});
