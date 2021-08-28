import mapModels from "../models/mapModels.js";
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
  const { map, type, title, description, image, plane, visibility } = req.body;
  const newMap = await mapModels.create({
    map,
    type,
    title,
    description,
    image,
    plane,
    visibility,
  });
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
