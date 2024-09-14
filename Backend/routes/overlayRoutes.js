const express = require('express');
const router = express.Router();
const overlayController = require('../controllers/overlayController');

//Routes for CRUD operations
router.post('/overlays', overlayController.createOverlay);
router.get('/overlays', overlayController.getOverlays);
router.put('/overlays/:id', overlayController.updateOverlay);
router.delete('/overlays/:id', overlayController.deleteOverlay);

module.exports = router;
