const express = require("express");
const router = express.Router();
const path = require('path')
const fs = require('fs');
const React = require('react')
const ReactDOMServer = require('react-dom/server');
const App = require('../../src/App');

const TagController = require("./tags.controller");
const tagController = new TagController();
const StorieController = require("./stories/stories.controller");
const storieController = new StorieController()
const UsersController = require("./authentication/users.controller");
const usersController = new UsersController()

//ssr
app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

router.get('/status', (req, res) => {
    res.send({ express: 'OK' });
  });

// anonymous user API
router.get('/getAllTags', tagController.getAllTags.bind(tagController));
router.get('/getTagsMap', tagController.getTagsMap.bind(tagController));
router.get('/getStoriesByTags', storieController.getStoriesByTags.bind(storieController));
router.post('/addStory', storieController.addStory.bind(storieController));

const loginGuard =  usersController.validateUserLogIn.bind(usersController);

// moderation admin API
router.post('/login', usersController.login.bind(usersController));
router.get('/getStortiesForModeration', loginGuard, storieController.getStortiesForModeration.bind(storieController));
router.get('/getStoryForEdit', loginGuard, storieController.getStoryForEdit.bind(storieController));
router.post('/addModerateStory', loginGuard, storieController.addModerateStory.bind(storieController));
router.post('/publishModerateStory', loginGuard, storieController.publishModerateStory.bind(storieController));
router.get('/getAllModeratedStories', loginGuard, storieController.getAllModeratedStories.bind(storieController));

// send preview image for meta tag 
router.get('/previewImage', (req, res) => 
  res.sendFile(path.join(__dirname + '../../../../src/media/assets/preview.png'))
);

module.exports = router;