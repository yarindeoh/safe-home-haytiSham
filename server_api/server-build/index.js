/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/api.routes.js":
/*!*******************************!*\
  !*** ./src/api/api.routes.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar TagController = __webpack_require__(/*! ./tags.controller */ \"./src/api/tags.controller.js\");\n\nvar tagController = new TagController();\n\nvar StorieController = __webpack_require__(/*! ./stories/stories.controller */ \"./src/api/stories/stories.controller.js\");\n\nvar storieController = new StorieController();\n\nvar UsersController = __webpack_require__(/*! ./authentication/users.controller */ \"./src/api/authentication/users.controller.js\");\n\nvar usersController = new UsersController();\nrouter.get('/story/:id', storieController.getStory.bind(storieController));\nrouter.get('/status', function (req, res) {\n  res.send({\n    express: 'OK'\n  });\n}); // anonymous user API\n\nrouter.get('/getAllTags', tagController.getAllTags.bind(tagController));\nrouter.get('/getTagsMap', tagController.getTagsMap.bind(tagController));\nrouter.get('/getStoriesByTags', storieController.getStoriesByTags.bind(storieController));\nrouter.post('/addStory', storieController.addStory.bind(storieController));\nvar loginGuard = usersController.validateUserLogIn.bind(usersController); // moderation admin API\n\nrouter.post('/login', usersController.login.bind(usersController));\nrouter.get('/getStortiesForModeration', loginGuard, storieController.getStortiesForModeration.bind(storieController));\nrouter.get('/getStoryForEdit', loginGuard, storieController.getStoryForEdit.bind(storieController));\nrouter.post('/addModerateStory', loginGuard, storieController.addModerateStory.bind(storieController));\nrouter.post('/publishModerateStory', loginGuard, storieController.publishModerateStory.bind(storieController));\nrouter.get('/getAllModeratedStories', loginGuard, storieController.getAllModeratedStories.bind(storieController)); // send preview image for meta tag\n\nrouter.get('/previewImage', function (req, res) {\n  return res.sendFile(path.join(__dirname + '../../../../src/media/assets/preview.png'));\n});\nmodule.exports = router;\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/api/api.routes.js?");

/***/ }),

/***/ "./src/api/authentication/user.model.js":
/*!**********************************************!*\
  !*** ./src/api/authentication/user.model.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar Schema = mongoose.Schema;\nvar userSchema = new Schema({\n  name: {\n    type: String,\n    index: {\n      unique: true\n    }\n  },\n  password_hash: String\n});\nvar User = mongoose.model('User', userSchema, 'users');\nmodule.exports = User;\n\n//# sourceURL=webpack:///./src/api/authentication/user.model.js?");

/***/ }),

/***/ "./src/api/authentication/users.controller.js":
/*!****************************************************!*\
  !*** ./src/api/authentication/users.controller.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar UsersService = __webpack_require__(/*! ./users.service */ \"./src/api/authentication/users.service.js\");\n\nvar UsersController = /*#__PURE__*/function () {\n  function UsersController() {\n    _classCallCheck(this, UsersController);\n\n    this.usersService = new UsersService();\n  }\n\n  _createClass(UsersController, [{\n    key: \"login\",\n    value: function login(req, res) {\n      var _this = this;\n\n      var userName = req.body.userName;\n      var userPaswword = req.body.password;\n\n      if (!userName || !userPaswword) {\n        return res.status(400).json({\n          error: \"userName and password are required\"\n        });\n      }\n\n      return this.usersService.validateLogIn(userName, userPaswword).then(function (user) {\n        if (!user) {\n          return res.status(403).json({\n            error: \"wrong credentials\"\n          });\n        }\n\n        var id = String(user._id);\n        var name = user.name;\n\n        var jwt = _this.usersService.generateJWTToken(id, name);\n\n        return res.status(200).json({\n          token: jwt\n        });\n      });\n    }\n  }, {\n    key: \"validateUserLogIn\",\n    value: function validateUserLogIn(req, res, next) {\n      var token = req.get(\"authorization\");\n\n      if (!token) {\n        return res.status(401).json({\n          status: \"error\",\n          code: \"unauthorized\",\n          info: \"token is missing\"\n        });\n      }\n\n      return Promise.resolve(this.usersService.validateJWTToken(token)).then(function (valid) {\n        if (!valid) {\n          return res.status(401).json({\n            status: \"error\",\n            code: \"unauthorized\",\n            info: \"token not valid\"\n          });\n        }\n\n        return next();\n      });\n    }\n  }]);\n\n  return UsersController;\n}();\n\nmodule.exports = UsersController;\n\n//# sourceURL=webpack:///./src/api/authentication/users.controller.js?");

/***/ }),

/***/ "./src/api/authentication/users.service.js":
/*!*************************************************!*\
  !*** ./src/api/authentication/users.service.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\nvar saltRounds = 10;\n\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nvar User = __webpack_require__(/*! ./user.model */ \"./src/api/authentication/user.model.js\");\n\nvar UsersService = /*#__PURE__*/function () {\n  function UsersService() {\n    _classCallCheck(this, UsersService);\n\n    this.jwtExpiresInValue = 12 * 60 * 60, // 12 hours;\n    this.jwtSubjectValue = 'login';\n  }\n\n  _createClass(UsersService, [{\n    key: \"createUser\",\n    value: function createUser(userName, userPaswword) {\n      return bcrypt.hash(userPaswword, saltRounds).then(function (hash) {\n        return User.create({\n          name: userName,\n          password_hash: hash\n        });\n      });\n    }\n  }, {\n    key: \"validateLogIn\",\n    value: function validateLogIn(userName, userPaswword) {\n      return User.findOne({\n        name: userName\n      }).then(function (user) {\n        if (user && user.password_hash) {\n          return bcrypt.compare(userPaswword, user.password_hash).then(function (result) {\n            console.log('user password validation ' + result);\n\n            if (result) {\n              return user;\n            }\n\n            return false;\n          });\n        }\n\n        console.log('user not found');\n        return false;\n      });\n    }\n  }, {\n    key: \"generateJWTToken\",\n    value: function generateJWTToken(userId, userName) {\n      var jwtSsecret = process.env.JWT_SECRET || '';\n      var options = {\n        expiresIn: this.jwtExpiresInValue,\n        subject: this.jwtSubjectValue\n      };\n      return jwt.sign({\n        id: userId,\n        name: userName\n      }, jwtSsecret, options);\n    }\n  }, {\n    key: \"validateJWTToken\",\n    value: function validateJWTToken(token) {\n      try {\n        var jwtSsecret = process.env.JWT_SECRET || '';\n        var decoded = jwt.verify(token, jwtSsecret);\n\n        if (!decoded || decoded == null || !decoded.id || decoded.id == null) {\n          return false;\n        }\n\n        return User.findById(decoded.id).then(function (user) {\n          if (user && user._id) {\n            return true;\n          }\n\n          return false;\n        });\n      } catch (err) {\n        return false;\n      }\n    }\n  }]);\n\n  return UsersService;\n}();\n\nmodule.exports = UsersService;\n\n//# sourceURL=webpack:///./src/api/authentication/users.service.js?");

/***/ }),

/***/ "./src/api/stories/counter.model.js":
/*!******************************************!*\
  !*** ./src/api/stories/counter.model.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar Schema = mongoose.Schema;\nvar counterSchema = new Schema({\n  _id: String,\n  sequence_value: Number\n});\nvar Counter = mongoose.model('Counter', counterSchema, 'counter');\nmodule.exports = Counter;\n\n//# sourceURL=webpack:///./src/api/stories/counter.model.js?");

/***/ }),

/***/ "./src/api/stories/moderatedStory.model.js":
/*!*************************************************!*\
  !*** ./src/api/stories/moderatedStory.model.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar Schema = mongoose.Schema;\nvar storySchema = new Schema({\n  whatTriggeredChange: String,\n  howDidYouManged: String,\n  additionalnfo: String,\n  quote: String,\n  whatHelpedYou: String,\n  background: String,\n  storyContent: String,\n  name: String,\n  sequence: Number,\n  publish: Boolean,\n  tags: [Number],\n  originalStory: {\n    type: 'ObjectId',\n    ref: 'Story'\n  }\n}, {\n  timestamps: {\n    createdAt: 'createdAt'\n  }\n});\nstorySchema.index({\n  _id: 1,\n  sequence: 1\n});\nvar ModeratedStrory = mongoose.model('ModeratedStrort', storySchema, 'moderated_stories');\nmodule.exports = ModeratedStrory;\n\n//# sourceURL=webpack:///./src/api/stories/moderatedStory.model.js?");

/***/ }),

/***/ "./src/api/stories/stories.controller.js":
/*!***********************************************!*\
  !*** ./src/api/stories/stories.controller.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar StorieService = __webpack_require__(/*! ./stories.service */ \"./src/api/stories/stories.service.js\");\n\nvar Mailer = __webpack_require__(/*! ../../services/mailer */ \"./src/services/mailer.js\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar envPath = path.join(__dirname, '../../../.env');\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config({\n  path: envPath\n});\n\nvar StorieController = /*#__PURE__*/function () {\n  function StorieController() {\n    _classCallCheck(this, StorieController);\n\n    this.storieService = new StorieService();\n    this.mailer = new Mailer({\n      user: process.env.MAIL_ADDRESS,\n      pass: process.env.MAIL_PASSWORD\n    });\n  }\n\n  _createClass(StorieController, [{\n    key: \"getStory\",\n    value: function getStory(req, res) {\n      var id = req.params.id;\n      this.storieService.getStoryById(id).then(function (story) {\n        return res.json(story);\n      })[\"catch\"](function (error) {\n        return res.status(400).json({\n          error: 'missing story id'\n        });\n      });\n    }\n  }, {\n    key: \"getStoriesByTags\",\n    value: function getStoriesByTags(req, res) {\n      return this.listModeratedStrories(req, res, true);\n    }\n  }, {\n    key: \"getAllModeratedStories\",\n    value: function getAllModeratedStories(req, res) {\n      return this.listModeratedStrories(req, res, false);\n    }\n  }, {\n    key: \"listModeratedStrories\",\n    value: function listModeratedStrories(req, res, publishedOnly) {\n      var tags = req.query.tags || '';\n\n      if (tags) {\n        tags = JSON.parse(tags);\n        tags = tags.map(function (x) {\n          return Number(x);\n        });\n      }\n\n      var page = parseInt(req.query.page) || 1;\n      var pageSize = parseInt(req.query.pageSize) || 100;\n      var sortField = req.query.sortField || 'sequence';\n      var sortDirection = req.query.sortDirection || 'DESC';\n      return this.storieService.listByTags(tags, page, pageSize, sortField, sortDirection, publishedOnly).then(function (data) {\n        res.json(data);\n      });\n    }\n  }, {\n    key: \"addStory\",\n    value: function addStory(req, res) {\n      var _this = this;\n\n      var instance = {\n        whatTriggeredChange: req.body.whatTriggeredChange || '',\n        howDidYouManged: req.body.howDidYouManged || '',\n        additionalnfo: req.body.additionalnfo || '',\n        whatHelpedYou: req.body.whatHelpedYou || '',\n        background: req.body.background || '',\n        storyContent: req.body.storyContent,\n        mail: req.body.mail || '',\n        name: req.body.name || '',\n        contact: req.body.contact || false,\n        contactTime: req.body.contactTime || ''\n      };\n      var mailData = {\n        from: 'haytisham@gmail.com',\n        // sender address\n        to: 'contact@no2violence.co.il',\n        // list of receivers\n        subject: 'התקבלה עדות חדשה באתר',\n        // Subject line\n        text: ' היי! קיבלנו עדות חדשה שממתינה למודרציה לפני העלאה לאתר. אנא היכנסו אל וערכו את העדות וערכו אותה כדי שתעלה אל האתר.',\n        // plain text body\n        html: '<p dir=\"rtl\"> היי! <br/> קיבלנו עדות חדשה שממתינה למודרציה לפני העלאה לאתר. אנא היכנסו וערכו את העדות כדי שתעלה אל האתר. </p>'\n      };\n      return this.storieService.createStory(instance).then(function () {\n        _this.mailer.send(mailData); // send automatic e-mail when story added\n\n\n        res.sendStatus(200);\n      });\n    }\n  }, {\n    key: \"addModerateStory\",\n    value: function addModerateStory(req, res) {\n      var instance = {\n        name: req.body.name,\n        whatTriggeredChange: req.body.whatTriggeredChange,\n        howDidYouManged: req.body.howDidYouManged,\n        additionalnfo: req.body.additionalnfo,\n        quote: req.body.quote,\n        whatHelpedYou: req.body.whatHelpedYou,\n        background: req.body.background,\n        storyContent: req.body.storyContent,\n        publish: req.body.publish\n      };\n\n      if (typeof req.body.publish == 'undefined') {\n        instance.publish = true;\n      }\n\n      var originalStoryID = req.body.originalStory;\n\n      if (!originalStoryID) {\n        return res.status(400).json({\n          error: 'missing originalStory this is the original story ID'\n        });\n      }\n\n      if (req.body.tags) {\n        instance.tags = req.body.tags;\n        instance.tags = instance.tags.map(function (x) {\n          return Number(x);\n        });\n      }\n\n      return this.storieService.createOrEditModeratedStory(instance, originalStoryID).then(function () {\n        res.sendStatus(200);\n      })[\"catch\"](function (error) {\n        console.error(error);\n        return res.status(503).json({\n          error: error\n        });\n      });\n    }\n  }, {\n    key: \"getStortiesForModeration\",\n    value: function getStortiesForModeration(req, res) {\n      var page = parseInt(req.query.page) || 1;\n      var pageSize = parseInt(req.query.pageSize) || 100;\n      var sortField = req.query.sortField || 'sequence';\n      var sortDirection = req.query.sortDirection || 'DESC';\n      return this.storieService.listStriesToModerate(page, pageSize, sortField, sortDirection).then(function (data) {\n        res.json(data);\n      });\n    }\n  }, {\n    key: \"getStoryForEdit\",\n    value: function getStoryForEdit(req, res) {\n      var _this2 = this;\n\n      var originalStoryID = req.query.originalStory;\n      var moderatedStoryID = req.query.moderatedStory;\n\n      if (!originalStoryID && !moderatedStoryID) {\n        return res.status(400).json({\n          error: 'missing story id please add parameter originalStory or moderatedStory'\n        });\n      }\n\n      if (originalStoryID) {\n        var p1 = this.storieService.getStoryById(originalStoryID);\n        var p2 = this.storieService.getModeratedStoryByOriginalId(originalStoryID);\n        return Promise.all([p1, p2]).then(function (stories) {\n          var data = {\n            originalStory: stories[0],\n            moderatedStory: stories[1]\n          };\n          res.json(data);\n        });\n      } else if (moderatedStoryID) {\n        return this.storieService.getModeratedStoryById(moderatedStoryID).then(function (moderatedStory) {\n          if (moderatedStory && moderatedStory._id) {\n            return _this2.storieService.getStoryById(moderatedStory.originalStory).then(function (originalStory) {\n              var data = {\n                originalStory: originalStory,\n                moderatedStory: moderatedStory\n              };\n              res.json(data);\n            });\n          }\n        });\n      }\n    }\n  }, {\n    key: \"publishModerateStory\",\n    value: function publishModerateStory(req, res) {\n      var moderatedStoryID = req.body.moderatedStory;\n      var publish = req.body.publish;\n\n      if (!moderatedStoryID) {\n        return res.status(400).json({\n          error: 'missing moderatedStory'\n        });\n      }\n\n      return this.storieService.editModerateStory(moderatedStoryID, {\n        publish: publish\n      }).then(function () {\n        res.json({\n          publish: publish\n        });\n      })[\"catch\"](function (error) {\n        console.error(error);\n        return res.status(503).json({\n          error: error\n        });\n      });\n    }\n  }]);\n\n  return StorieController;\n}();\n\nmodule.exports = StorieController;\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/api/stories/stories.controller.js?");

/***/ }),

/***/ "./src/api/stories/stories.service.js":
/*!********************************************!*\
  !*** ./src/api/stories/stories.service.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar ObjectId = mongoose.Types.ObjectId;\n\nvar Story = __webpack_require__(/*! ./story.model */ \"./src/api/stories/story.model.js\");\n\nvar ModeratedStrory = __webpack_require__(/*! ./moderatedStory.model */ \"./src/api/stories/moderatedStory.model.js\");\n\nvar Counter = __webpack_require__(/*! ./counter.model */ \"./src/api/stories/counter.model.js\");\n\nvar TagController = __webpack_require__(/*! ../tags.controller */ \"./src/api/tags.controller.js\");\n\nvar tagController = new TagController();\n\nvar StorieService = /*#__PURE__*/function () {\n  function StorieService() {\n    _classCallCheck(this, StorieService);\n  }\n\n  _createClass(StorieService, [{\n    key: \"listByTags\",\n    value: function listByTags(tags) {\n      var _this = this;\n\n      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;\n      var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;\n      var sortField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : \"createdAt\";\n      var sortDirection = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : \"DESC\";\n      var publishedOnly = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;\n      sortDirection = sortDirection === \"ASC\" ? \"\" : \"-\";\n      sortField = sortDirection + sortField;\n      var query = tags ? {\n        tags: {\n          \"$in\": tags\n        }\n      } : {};\n\n      if (publishedOnly) {\n        query[\"publish\"] = true;\n      }\n\n      return Promise.all([ModeratedStrory.countDocuments(query), ModeratedStrory.find(query).sort(sortField).skip((page - 1) * pageSize).limit(pageSize).lean()]).then(function (_ref) {\n        var _ref2 = _slicedToArray(_ref, 2),\n            count = _ref2[0],\n            result = _ref2[1];\n\n        for (var i = 0; i < result.length; i++) {\n          var story = result[i];\n\n          _this.updateStoryInfo(story, tags);\n        }\n\n        return {\n          result: result,\n          total: count,\n          page: page,\n          pages: Math.ceil(count / pageSize)\n        };\n      });\n    }\n  }, {\n    key: \"updateStoryInfo\",\n    value: function updateStoryInfo(story, tags) {\n      if (!story || story == null) return;\n\n      if (story.tags) {\n        if (tags) {\n          //sort tags according to the order of the requested tags\n          story.tags = story.tags.sort(function (a, b) {\n            var aIndex = tags.indexOf(a);\n            var bIndex = tags.indexOf(b);\n\n            if (aIndex < 0 && bIndex < 0) {\n              return 0;\n            }\n\n            if (aIndex > -1 && bIndex < 0) return -1;\n            if (aIndex < 0 && bIndex > -1) return 1;\n            if (aIndex < bIndex) return 1;\n            return -1;\n          });\n        }\n\n        story.tagsIds = story.tags;\n        story.tags = [];\n\n        for (var t = 0; t < story.tagsIds.length; t++) {\n          var tagName = tagController.tagsMap[story.tagsIds[t]];\n\n          if (tagName) {\n            story.tags.push(tagName);\n          }\n        }\n      }\n\n      if (story.createdAt) {\n        var date = new Date(story.createdAt);\n        story.createdAt = \"\".concat(date.getDate(), \".\").concat(date.getMonth() + 1, \".\").concat(date.getFullYear());\n      }\n\n      if (story.updatedAt) {\n        var _date = new Date(story.updatedAt);\n\n        story.updatedAt = \"\".concat(_date.getDate(), \".\").concat(_date.getMonth() + 1, \".\").concat(_date.getFullYear());\n      }\n    }\n  }, {\n    key: \"listStriesToModerate\",\n    value: function listStriesToModerate() {\n      var _this2 = this;\n\n      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;\n      var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;\n      var sortField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : \"createdAt\";\n      var sortDirection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : \"DESC\";\n      sortDirection = sortDirection === \"ASC\" ? \"\" : \"-\";\n      sortField = sortDirection + sortField;\n      var query = {\n        moderated: false\n      };\n      return Promise.all([Story.countDocuments(query), Story.find(query).sort(sortField).skip((page - 1) * pageSize).limit(pageSize).populate('user').lean()]).then(function (_ref3) {\n        var _ref4 = _slicedToArray(_ref3, 2),\n            count = _ref4[0],\n            result = _ref4[1];\n\n        for (var i = 0; i < result.length; i++) {\n          var story = result[i];\n\n          _this2.updateStoryInfo(story);\n        }\n\n        return {\n          result: result,\n          total: count,\n          page: page,\n          pages: Math.ceil(count / pageSize)\n        };\n      });\n    }\n  }, {\n    key: \"getStoryById\",\n    value: function getStoryById(originalStoryID) {\n      var _this3 = this;\n\n      return Story.findById(originalStoryID).lean().then(function (story) {\n        _this3.updateStoryInfo(story);\n\n        return story;\n      });\n    }\n  }, {\n    key: \"getModeratedStoryById\",\n    value: function getModeratedStoryById(storyID) {\n      var _this4 = this;\n\n      return ModeratedStrory.findById(storyID).lean().then(function (story) {\n        _this4.updateStoryInfo(story);\n\n        return story;\n      });\n    }\n  }, {\n    key: \"getModeratedStoryByOriginalId\",\n    value: function getModeratedStoryByOriginalId(originalStoryID) {\n      var _this5 = this;\n\n      return ModeratedStrory.findOne({\n        originalStory: ObjectId(originalStoryID)\n      }).lean().then(function (story) {\n        _this5.updateStoryInfo(story);\n\n        return story;\n      });\n    }\n  }, {\n    key: \"createStory\",\n    value: function createStory(storyInstance) {\n      storyInstance.moderated = false;\n      return this.getValueForNextSequence(\"original_stories\").then(function (number) {\n        storyInstance.sequence = number;\n        return Story.create(storyInstance).then(function (story) {\n          if (story) {\n            return true;\n          }\n        });\n      });\n    }\n  }, {\n    key: \"createOrEditModeratedStory\",\n    value: function createOrEditModeratedStory(storyInstance, originalStoryID) {\n      var p1 = this.getModeratedStoryByOriginalId(originalStoryID);\n      var p2 = Story.findByIdAndUpdate(originalStoryID, {\n        moderated: true\n      }).lean();\n      return Promise.all([p1, p2]).then(function (result) {\n        var mStory = result[0];\n        var story = result[1];\n\n        if (story === null) {\n          throw \"error no original story found\";\n        }\n\n        storyInstance.sequence = story.sequence;\n        var o_id = new mongoose.mongo.ObjectId(originalStoryID);\n        storyInstance.originalStory = o_id;\n\n        if (!mStory || mStory == null) {\n          // moderated story not exist - create                \n          return ModeratedStrory.create(storyInstance);\n        } else {\n          // moderated story exist - update\n          return ModeratedStrory.findByIdAndUpdate(mStory._id, storyInstance);\n        }\n      });\n    }\n  }, {\n    key: \"editModerateStory\",\n    value: function editModerateStory(storyID, update) {\n      return ModeratedStrory.findByIdAndUpdate(storyID, {\n        $set: update\n      });\n    }\n  }, {\n    key: \"getValueForNextSequence\",\n    value: function getValueForNextSequence(sequenceOfName) {\n      return new Promise(function (resolve, reject) {\n        Counter.findOneAndUpdate({\n          _id: sequenceOfName\n        }, {\n          $inc: {\n            sequence_value: 1\n          }\n        }, function (err, sequenceDoc) {\n          if (err) {\n            reject(err);\n            return;\n          }\n\n          resolve(sequenceDoc.sequence_value + 1);\n        });\n      });\n    }\n  }]);\n\n  return StorieService;\n}();\n\nmodule.exports = StorieService;\n\n//# sourceURL=webpack:///./src/api/stories/stories.service.js?");

/***/ }),

/***/ "./src/api/stories/story.model.js":
/*!****************************************!*\
  !*** ./src/api/stories/story.model.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar Schema = mongoose.Schema;\nvar storySchema = new Schema({\n  whatTriggeredChange: String,\n  howDidYouManged: String,\n  additionalnfo: String,\n  whatHelpedYou: String,\n  background: String,\n  storyContent: String,\n  mail: String,\n  name: String,\n  sequence: Number,\n  contact: {\n    type: Boolean,\n    \"default\": false\n  },\n  contactTime: String,\n  moderated: {\n    type: Boolean,\n    \"default\": false\n  }\n}, {\n  timestamps: {\n    createdAt: 'createdAt'\n  }\n});\nstorySchema.index({\n  _id: 1,\n  moderated: 1,\n  sequence: 1\n});\nvar Story = mongoose.model('Story', storySchema, 'original_stories');\nmodule.exports = Story;\n\n//# sourceURL=webpack:///./src/api/stories/story.model.js?");

/***/ }),

/***/ "./src/api/tags.controller.js":
/*!************************************!*\
  !*** ./src/api/tags.controller.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar TagController = /*#__PURE__*/function () {\n  function TagController() {\n    _classCallCheck(this, TagController);\n\n    this.tagsMap = {\n      1: 'אלימות מינית',\n      2: 'אלימות כלכלית',\n      3: 'אלימות טכנולוגית',\n      4: 'אלימות פיזית',\n      5: 'אלימות מילולית',\n      6: 'איומים ואיומים בנשק',\n      7: 'פגיעה ברכוש',\n      8: 'אלימות רגשית',\n      9: 'קנאה ואובססיביות',\n      10: 'בגידות',\n      11: 'מניפולציות וגזלייטינג',\n      12: 'תקופות \"ירח דבש\"',\n      13: 'עונשים ונקמה',\n      14: 'הפחדה',\n      15: 'ניתוק / התנתקות מחברים ומשפחה',\n      16: 'תלות וחוסר עצמאות',\n      17: 'הריון לידה והפלה',\n      18: 'משטרה',\n      19: 'רבנות',\n      20: 'מקלט לנשים מוכות',\n      21: 'רשויות',\n      22: 'בתי משפט וצווי הרחקה',\n      23: 'דיכאון',\n      24: 'בדידות',\n      25: 'פוסט טראומה',\n      26: 'עדויות ילדים',\n      27: 'להטב',\n      28: 'טיפול פסיכולוגי',\n      29: 'תמיכה ממעגלים קרובים',\n      30: 'העצמה אישית'\n    };\n  }\n\n  _createClass(TagController, [{\n    key: \"getAllTags\",\n    value: function getAllTags(req, res) {\n      var data = Object.values(this.tagsMap);\n      return res.json(data);\n    }\n  }, {\n    key: \"getTagsMap\",\n    value: function getTagsMap(req, res) {\n      return res.json(this.tagsMap);\n    }\n  }]);\n\n  return TagController;\n}();\n\nmodule.exports = TagController;\n\n//# sourceURL=webpack:///./src/api/tags.controller.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {var express = __webpack_require__(/*! express */ \"express\");\n\nvar morgan = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar helmet = __webpack_require__(/*! helmet */ \"helmet\");\n\nvar cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nconsole.log(\"Starting server...\");\nvar app = express();\n/* requests logger */\n\napp.use(morgan('tiny'));\n/* config middlewares */\n\napp.use(helmet());\napp.use(cors());\napp.use(bodyParser.json({\n  limit: '50mb'\n}));\napp.use(bodyParser.urlencoded({\n  extended: true\n}));\n/* security headers */\n\napp.use(function applyHeaders(req, res, next) {\n  res.set('X-Frame-Options', 'DENY');\n  res.set('Content-Security-Policy', \"frame-ancestors 'none';\");\n  next();\n});\n/* api router */\n\nvar routes = __webpack_require__(/*! ./api/api.routes */ \"./src/api/api.routes.js\");\n\napp.use('/api', routes);\n/* basic configuration */\n\nvar envPath = path.join(__dirname, '../.env');\nvar args = process.argv.slice(2);\n\nif (args && args[0] == 'dev') {\n  envPath = path.join(__dirname, '../.env-development');\n}\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config({\n  path: envPath\n});\n/* static files */\n\n\nvar staticPath = path.join(__dirname, '../../build');\nconsole.log(\"Static files from folder \" + staticPath);\napp.use(express[\"static\"](staticPath));\napp.get('/*', function (req, res) {\n  res.sendFile(path.join(staticPath, 'index.html'));\n});\n/* DB connection */\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar dbURI = process.env.DB_URI;\n\nif (!dbURI) {\n  console.error(\"No DB_URI in config file. Please check\");\n  process.exit();\n}\n\nvar options = {\n  autoIndex: false,\n  useCreateIndex: true,\n  useFindAndModify: false,\n  useNewUrlParser: true,\n  reconnectTries: Number.MAX_VALUE,\n  // Never stop trying to reconnect\n  reconnectInterval: 1000 // Reconnect every 500ms\n\n};\nmongoose.Promise = global.Promise;\nmongoose.connect(dbURI, options).then(function (c) {\n  return console.log('Db is connected');\n});\n/* listen on port */\n\nvar port = process.env.PORT || 5000;\nvar env = process.env.ENV || '';\napp.listen(process.env.PORT || 5000, function () {\n  console.log(\"Express server listening on port %d in %s mode\", this.address().port, app.settings.env);\n}); // app.listen(port, () => console.log(`Listening on port ${port} configuration  ${env}`));\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/services/mailer.js":
/*!********************************!*\
  !*** ./src/services/mailer.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\"); //default is gmail host\n\n\nvar Mailer = /*#__PURE__*/function () {\n  function Mailer() {\n    var auth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n      user: user,\n      pass: pass\n    };\n    var host = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'smtp.gmail.com';\n    var port = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 465;\n    var secure = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;\n\n    _classCallCheck(this, Mailer);\n\n    if (!auth) {\n      this.transporter = null;\n    } else {\n      this.transporter = nodemailer.createTransport({\n        host: host,\n        port: port,\n        secure: secure,\n        auth: auth\n      });\n    }\n  }\n  /**\n   * Send email\n   * @param {object} data\n   * @property {from} data.from       - From who the mail sent.\n   * @property {to} data.to           - To whom the mail sent.\n   * @property {subject} data.subject - Mail subject.\n   * @property {text} data.text       - Mail body text.\n   * @property {html} data.html       - Mail body html text.\n   */\n\n\n  _createClass(Mailer, [{\n    key: \"send\",\n    value: function send(_ref) {\n      var from = _ref.from,\n          to = _ref.to,\n          subject = _ref.subject,\n          text = _ref.text,\n          html = _ref.html;\n      if (!this.transporter) return Promise.reject();\n      return this.transporter.sendMail({\n        from: from,\n        to: to,\n        subject: subject,\n        text: text,\n        html: html\n      });\n    }\n  }]);\n\n  return Mailer;\n}();\n\nmodule.exports = Mailer;\n\n//# sourceURL=webpack:///./src/services/mailer.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");\n\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nodemailer\");\n\n//# sourceURL=webpack:///external_%22nodemailer%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });