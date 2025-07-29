const Education = require('../models/Education');

exports.getAllEducation = async (req, res) => {
  try {
    const education = await Education.find().sort('-startDate');
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEducation = async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).json(education);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!education) return res.status(404).json({ error: 'Education not found' });
    res.json(education);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) return res.status(404).json({ error: 'Education not found' });
    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};