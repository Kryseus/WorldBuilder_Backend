import settingsModel, {ObjectId} from "../models/settingsModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import nodemailer from "nodemailer"

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
  const {
    user,
    params: { id },
  } = req;
  const found = await settingsModel.findById(id).populate("author");
  if (!found) throw new ErrorResponse("Setting does not exist! ", 404);
  if (!user.id === found.author._id)
    throw new ErrorResponse("You are not authorized! ", 403);
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
  const {
    user,
    params: { id },
  } = req;
  const found = await settingsModel.findById(id).populate("author");
  if (!found) throw new ErrorResponse("Setting does not exist! ", 404);
  if (!user.id === found.author._id)
    throw new ErrorResponse("You are not authorized! ", 403);
  await settingsModels.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});

export const inviteUser = asyncHandler(async (req, res) => {
  const { user, params: { id, userId }, } = req;
  const found = await settingsModel.findById(id);
  if (!found) throw new ErrorResponse("Setting does not exist", 404);
  if (found.author.toString() !== user.id.toString()) throw new ErrorResponse("You can only invite player to your own games", 404);
  if(found.players.includes(userId)) throw new ErrorResponse("Player already in setting", 403);
  const updatedArray = await settingsModel.findOneAndUpdate(
    { _id: id },
    { $addToSet: { players: userId } },
    { new: true }
  );
  res.json(updatedArray);
});

// added 30.08.
export const kickUser = asyncHandler(async (req, res) => {
  const { user, params: { id, userId }, } = req;
  const found = await settingsModel.findById(id);
  if (!found) throw new ErrorResponse("Setting does not exist", 404);
  if (found.author.toString() !== user.id.toString()) throw new ErrorResponse("You can only invite player to your own games", 404);
  if(!found.players.includes(userId)) throw new ErrorResponse("Player is not in the setting", 404);
  const updatedArray = await settingsModel.findOneAndUpdate(
    { _id: id },
    { $pull: { players: userId } },
    { new: true }
  );
  res.json(updatedArray);
});

export const getSettingsByUser = asyncHandler(async (req, res) => {
  const { user, params: { userId }, } = req;
  const settings = await settingsModel.find({ players: userId});
  res.json(settings);
});