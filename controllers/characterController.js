import characterModels from "../models/characterModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllCharacters = asyncHandler(async (req, res) => {
  const characters = await characterModels.find();
  res.json(characters);
});

export const getSingleCharacter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const character = await characterModels.findById(id);
  if (!character) throw new ErrorResponse(`Character with id of ${id} not found`, 404);
  res.json(character);
});

export const createSingleCharacter = asyncHandler(async (req, res) => {
  const { character, type, title, description, image, plane, visibility } = req.body;
  const newCharacter = await characterModels.create({
    character,
    type,
    title,
    description,
    image,
    plane,
    visibility,
  });
  res.status(201).json(newCharacter);
});

export const updateSingleCharacter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { character, type, title, description, image, plane, visibility } = req.body;
  const updatedCharacter = await charakterModels.findOneAndUpdate(
    { _id: id },
    { character, type, title, description, image, plane, visibility },
    { new: true }
  );
  res.json(updatedCharacter);
});

export const deleteSingleCharacter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await charakterModels.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});


// added 30.08.
export const grantVisibility = asyncHandler(async (req, res) => {
  const { user, params: { id, userId }, } = req;
  const found = await characterModel.findById(id);
  if (!found) throw new ErrorResponse("Setting does not exist", 404);
  if (found.author.toString() !== user.id.toString()) throw new ErrorResponse("You can only invite player to your own games", 404);
  if(found.players.includes(userId)) throw new ErrorResponse("Player already in setting", 403);
  const updatedArray = await charakterModel.findOneAndUpdate(
    { _id: id },
    { $addToSet: { players: userId } },
    { new: true }
  );
  res.json(updatedArray);
});


export const removeVisibility = asyncHandler(async (req, res) => {
  const { user, params: { id, userId }, } = req;
  const found = await charakterModel.findById(id);
  if (!found) throw new ErrorResponse("Setting does not exist", 404);
  if (found.author.toString() !== user.id.toString()) throw new ErrorResponse("You can only invite player to your own games", 404);
  if(!found.players.includes(userId)) throw new ErrorResponse("Player is not in the setting", 404);
  const updatedArray = await charakterModel.findOneAndUpdate(
    { _id: id },
    { $pull: { players: userId } },
    { new: true }
  );
  res.json(updatedArray);
});

export const getVisibilityByUser = asyncHandler(async (req, res) => {
  const { user, params: { userId }, } = req;
  const characters = await charakterModel.find({ players: userId});
  res.json(characters);
});
