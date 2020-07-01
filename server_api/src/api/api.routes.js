const express = require("express");
const router = express.Router();

const TagController = require("./tags.controller");
const tagController = new TagController();
const StorieController = require("./stories/stories.controller");
const storieController = new StorieController()

router.get('/status', (req, res) => {
    res.send({ express: 'OK' });
  });

router.get('/getAllTags', tagController.getAllTags.bind(tagController));
router.get('/getTagsMap', tagController.getTagsMap.bind(tagController));

router.get('/getStoriesByTags', storieController.getStoriesByTags.bind(storieController));
router.get('/getStortiesForModeration', storieController.getStortiesForModeration.bind(storieController));
router.post('/addStory', storieController.addStory.bind(storieController));
router.post('/addModerateStory', storieController.addModerateStory.bind(storieController));

module.exports = router;