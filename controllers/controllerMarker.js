import modelsMarker from "../models/modelsMarker.js";

export const getAllMarkers = (req, res) => {
  const marker = await modelsMarker.find();
  res.json(marker);
};

export const getSingleMarker = (req, res) => {
  res.send("answer getSingle");
};

export const createSingleMarker = (req, res) => {
  res.send("answer createSingle");
};

export const updateSingleMarker = (req, res) => {
  res.send("answer updateSingle");
};

export const deleteSingleMarker = (req, res) => {
  res.send("answer deleteSingle");
};
