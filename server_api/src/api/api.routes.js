const express = require("express");
const router = express.Router();
const TagController = require("./tags.controller");
const tagController = new TagController();

router.get('/status', (req, res) => {
    res.send({ express: 'OK' });
  });

router.get('/getAllTags', tagController.getAllTags.bind(tagController));
router.get('/getTagsMap', tagController.getTagsMap.bind(tagController));

module.exports = router;