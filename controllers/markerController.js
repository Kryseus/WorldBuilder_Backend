import markerModels from "../models/markerModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllMarkers = asyncHandler(async (req, res) => {
  const markers = await markerModels.find();
  res.json(markers);
});

export const getSingleMarker = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const marker = await markerModels.findById(id);
  if (!marker)
    throw new ErrorResponse(`Marker with id of ${id} not found`, 404);
  res.json(marker);
});

export const createSingleMarker = asyncHandler(async (req, res) => {
  const { map, type, title, description, visibility } = req.body;
  const newMarker = await markerModels.create({
    map,
    type,
    title,
    description,
    visibility,
  });
  res.status(201).json(newMarker);
});

export const updateSingleMarker = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { map, type, title, description, visibility } = req.body;
  const updatedMarker = await markerModels.findOneAndUpdate(
    { _id: id },
    { map, type, title, description, visibility },
    // Update needed
    { new: true }
  );
  res.json(updatedMarker);
});

export const deleteSingleMarker = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await markerModels.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});


// added 30.08.
export const grantVisibility = asyncHandler(async (req, res) => {
  const { user, params: { id, userId }, } = req;
  const found = await markerModels.findById(id);
  if (!found) throw new ErrorResponse("Setting does not exist", 404);
  if (found.author.toString() !== user.id.toString()) throw new ErrorResponse("You can only invite player to your own games", 404);
  if(found.players.includes(userId)) throw new ErrorResponse("Player already in setting", 403);
  const updatedArray = await markerModels.findOneAndUpdate(
    { _id: id },
    { $addToSet: { players: userId } },
    { new: true }
  );
  res.json(updatedArray);
});


export const removeVisibility = asyncHandler(async (req, res) => {
  const { user, params: { id, userId }, } = req;
  const found = await markerModels.findById(id);
  if (!found) throw new ErrorResponse("Setting does not exist", 404);
  if (found.author.toString() !== user.id.toString()) throw new ErrorResponse("You can only invite player to your own games", 404);
  if(!found.players.includes(userId)) throw new ErrorResponse("Player is not in the setting", 404);
  const updatedArray = await markerModels.findOneAndUpdate(
    { _id: id },
    { $pull: { players: userId } },
    { new: true }
  );
  res.json(updatedArray);
});

export const getVisibilityByUser = asyncHandler(async (req, res) => {
  const { user, params: { userId }, } = req;
  const characters = await markerModels.find({ players: userId});
  res.json(characters);
});
