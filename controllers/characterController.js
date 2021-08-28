import charakterModels from "../models/characterModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllCharacters = asyncHandler(async (req, res) => {
  const characters = await charakterModels.find();
  res.json(characters);
});

export const getSingleCharacter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const character = await charakterModels.findById(id);
  if (!character) throw new ErrorResponse(`Character with id of ${id} not found`, 404);
  res.json(character);
});

export const createSingleCharacter = asyncHandler(async (req, res) => {
  const { character, type, title, description, image, plane, visibility } = req.body;
  const newCharacter = await charakterModels.create({
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
