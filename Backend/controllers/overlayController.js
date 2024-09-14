const Overlay = require('../models/Overlay');

// Create an overlay
exports.createOverlay = async (req, res) => {
    const { content, position, size } = req.body;
    if (!content || !position || !size) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  try {
    const overlay = new Overlay({ content, position, size });
    await overlay.save();
    res.status(201).json(overlay);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all overlays
exports.getOverlays = async (req, res) => {
  try {
    const overlays = await Overlay.find();
    res.status(200).json(overlays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an overlay
exports.updateOverlay = async (req, res) => {
  
  const { id } = req.params;
  const { content, position, size } = req.body;
  try {
    const overlay = await Overlay.findByIdAndUpdate(id, req.body, { new: true,runValidators: true });
    if (!overlay) return res.status(404).json({ message: 'Overlay not found' });
    res.status(200).json(overlay);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an overlay
exports.deleteOverlay = async (req, res) => {
  const { id } = req.params;

  try {
    const overlay = await Overlay.findByIdAndDelete(id);
    if (!overlay) return res.status(404).json({ message: 'Overlay not found' });
    res.status(200).json({ message: 'Overlay deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
