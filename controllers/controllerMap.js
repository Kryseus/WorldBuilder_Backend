import modelsMap from "../models/modelsMap.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllMaps = asyncHandler(async (req, res) => {
  const Maps = await modelsMap.find();
  res.json(Maps);
});

export const getSingleMap = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const Map = await modelsMap.findById(id);
  if (!Map) throw new ErrorResponse(`Map with id of ${id} not found`, 404);
  res.json(Map);
});

export const createSingleMap = asyncHandler(async (req, res) => {
  const { map, type, title, description, image, plane, visibility } = req.body;
  const newMap = await modelsMap.create({
    map,
    type,
    title,
    description,
    image,
    plane,
    visibility, //is this needed here?
  });
  res.status(201).json(newMap);
});

export const updateSingleMap = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { map, type, title, description, image, plane, visibility } = req.body;
  const updatedMap = await modelsMap.findOneAndUpdate(
    { _id: id },
    { map, type, title, description, image, plane, visibility },
    { new: true }
  );
  res.json(updatedMap);
});

export const deleteSingleMap = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await modelsMap.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});
