const express = require('express');
const router = express.Router();
const { sendNotification } = require('../controller/notificationController');

// Send notification
router.post('/send', async (req, res) => {
  try {
    const { recipientId, message, type } = req.body;
    const result = await sendNotification(recipientId, message, type);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;