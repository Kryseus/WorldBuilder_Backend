import modelsMarker from "../models/modelsMarker.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllMarkers = asyncHandler(async (req, res) => {
  const markers = await modelsMarker.find();
  res.json(markers);
});

export const getSingleMarker = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const marker = await modelsMarker.findById(id);
  if (!marker)
    throw new ErrorResponse(`Marker with id of ${id} not found`, 404);
  res.json(marker);
});

export const createSingleMarker = asyncHandler(async (req, res) => {
  const { map, type, title, description, visibility } = req.body;
  const newMarker = await modelsMarker.create({
    map,
    type,
    title,
    description,
    visibility, //Needed?
    //Update needed
  });
  res.status(201).json(newMarker);
});

export const updateSingleMarker = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { map, type, title, description, visibility } = req.body;
  const updatedMarker = await modelsMarker.findOneAndUpdate(
    { _id: id },
    { map, type, title, description, visibility },
    // Update needed
    { new: true }
  );
  res.json(updatedMarker);
});

export const deleteSingleMarker = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await modelsMarker.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});
