import mapModels from "../models/mapModels.js";
import settingsModels from "../models/settingsModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllMaps = asyncHandler(async (req, res) => {
  const Maps = await mapModels.find();
  res.json(Maps);
});

export const getSingleMap = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const Map = await mapModels.findById(id);
  if (!Map) throw new ErrorResponse(`Map with id of ${id} not found`, 404);
  res.json(Map);
});

export const createSingleMap = asyncHandler(async (req, res) => {
  const { setting, type, title, description, image, plane, visibility } = req.body;
  const newMap = await mapModels.create({
    setting,
    type,
    title,
    description,
    image,
    plane,
    visibility,
  });
 await settingsModels.findOneAndUpdate(
    { _id: setting },
    { $addToSet: {maps: newMap._id }},
    { new: true }
  );
  res.status(201).json(newMap);
});

export const updateSingleMap = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { map, type, title, description, image, plane, visibility } = req.body;
  const updatedMap = await mapModels.findOneAndUpdate(
    { _id: id },
    { map, type, title, description, image, plane, visibility },
    { new: true }
  );
  res.json(updatedMap);
});

export const deleteSingleMap = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await mapModels.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});
// Non-geo maps Leaflet -> https://leafletjs.com/examples/crs-simple/crs-simple.html
//PUT /map/:mapId/enable/:userId -> Adding user id to visibility array
//PUT  /map/:mapId/disable/:userId -> Remove user id from visibility array
//GET /map/:userId/enabled -> Get list of maps where user is in visibility array


// added 30.08.
export const grantVisibility = asyncHandler(async (req, res) => {
  const { user, params: { id, userId }, } = req;
  const found = await mapModels.findById(id);
  if (!found) throw new ErrorResponse("Setting does not exist", 404);
  if (found.author.toString() !== user.id.toString()) throw new ErrorResponse("You can only invite player to your own games", 404);
  if(found.players.includes(userId)) throw new ErrorResponse("Player already in setting", 403);
  const updatedArray = await mapModels.findOneAndUpdate(
    { _id: id },
    { $addToSet: { players: userId } },
    { new: true }
  );
  res.json(updatedArray);
});


export const removeVisibility = asyncHandler(async (req, res) => {
  const { user, params: { id, userId }, } = req;
  const found = await mapModels.findById(id);
  if (!found) throw new ErrorResponse("Setting does not exist", 404);
  if (found.author.toString() !== user.id.toString()) throw new ErrorResponse("You can only invite player to your own games", 404);
  if(!found.players.includes(userId)) throw new ErrorResponse("Player is not in the setting", 404);
  const updatedArray = await mapModels.findOneAndUpdate(
    { _id: id },
    { $pull: { players: userId } },
    { new: true }
  );
  res.json(updatedArray);
});

export const getVisibilityByUser = asyncHandler(async (req, res) => {
  const { user, params: { userId }, } = req;
  const maps = await mapModels.find({ players: userId});
  res.json(maps);
});
