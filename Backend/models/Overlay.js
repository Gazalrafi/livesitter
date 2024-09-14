const mongoose = require('mongoose');

const OverlaySchema = new mongoose.Schema({
 
  content: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
    enum: ['top-left', 'top-right', 'bottom-left', 'bottom-right','top','bottom','left','right'],
    default: 'top-left',
  },
  size: {
    type: String,
    required: true,
    enum: ['small', 'medium', 'large'],
    default: 'medium',
  },
});

module.exports = mongoose.model('Overlay', OverlaySchema);
