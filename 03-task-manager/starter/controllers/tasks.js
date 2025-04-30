const Task = require("../models/Task");

const getAllTaks = (req, res) => {
  res.send("all items from the file");
};

const createTaks = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};
const getTaks = (req, res) => {
  res.json({ id: req.params.id });
};
const updateTaks = (req, res) => {
  res.send("update task");
};
const deleteTaks = (req, res) => {
  res.send("delete task");
};

module.exports = {
  getAllTaks,
  createTaks,
  getTaks,
  updateTaks,
  deleteTaks,
};
