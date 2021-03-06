const express = require('express');
const router = express.Router();
const path = require('path');

const TagController = require('./tags.controller');
const tagController = new TagController();
const StorieController = require('./stories/stories.controller');
const storieController = new StorieController();
const UsersController = require('./authentication/users.controller');
const usersController = new UsersController();

router.get('/story/:id', storieController.getStory.bind(storieController));

router.get('/status', (req, res) => {
    res.send({ express: 'OK' });
});

// anonymous user API
router.get('/getAllTags', tagController.getAllTags.bind(tagController));
router.get('/getTagsMap', tagController.getTagsMap.bind(tagController));
router.get(
    '/getStoriesByTags',
    storieController.getStoriesByTags.bind(storieController)
);
router.post('/addStory', storieController.addStory.bind(storieController));

const loginGuard = usersController.validateUserLogIn.bind(usersController);

// moderation admin API
router.post('/login', usersController.login.bind(usersController));
router.get(
    '/getStortiesForModeration',
    loginGuard,
    storieController.getStortiesForModeration.bind(storieController)
);
router.get(
    '/getStoryForEdit',
    loginGuard,
    storieController.getStoryForEdit.bind(storieController)
);
router.post(
    '/addModerateStory',
    loginGuard,
    storieController.addModerateStory.bind(storieController)
);
router.post(
    '/publishModerateStory',
    loginGuard,
    storieController.publishModerateStory.bind(storieController)
);
router.get(
    '/getAllModeratedStories',
    loginGuard,
    storieController.getAllModeratedStories.bind(storieController)
);

// send preview image for meta tag
router.get('/previewImage', (req, res) =>
    res.sendFile(
        path.join(__dirname + '../../../../src/media/assets/preview.png')
    )
);

module.exports = router;
