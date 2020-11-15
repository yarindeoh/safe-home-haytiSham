## Safe@Home: Hayti Sham

## Quick Use
In order to run the app locally you need to have a running local Frontend in one 
terminal and a running local Backend in another terminal.
Currently we are using one DB (mongo) for prod and dev until we'll have a credit to have another one. (mongodb+srv://haytiSham_db:sDjE4PezjPl26wNs@cluster0.zzyhy.mongodb.net/haytiSham)

### Front-end development
1. Each UI change should be aligned with the [mock](https://www.figma.com/file/UcF9E1rT6rwKIQkkLD5EqN/hayiti_sham?node-id=446%3A286).
2. Each new string in the UI should be added to `lang-he.js` file and used with `react-18next` library.
    1. For example, search for `t('iHaveBeenThereHashtag')`.
3. Re-use existing strings from the `lang-he.js` file.

### Start Local Frontend
#### Peer Dependencies
- Node ^12
- NPM ^6

First, install all Frontend dependencies:
```
npm install
```

Run in locally with webpack-dev-server (FE)

```
npm run start:dev
```

Run in build with webbpack (FE)

```
npm start
```

Fix lint (FE)

```
npm run lint:fix
```

### Start Local Server
  
* Prerequisite
- Node & NPM 
check your installed node in command line 'node –v'
check your installed npm in command line 'npm -v'
https://nodejs.org/en/download/  
* Install dependencies
``` 
cd server_api 
npm i
```
* Runing the server
``` 
npm start
``` 
* Runing the server for dev
``` 
npm start dev
``` 
* Basic test
http://localhost:5000/api/status

----
## Deployment
- This application is deployed using Heroku: https://haytisham.herokuapp.com/


## UI Mockups
Specified here, made by Lishay Noam:
https://www.figma.com/file/UcF9E1rT6rwKIQkkLD5EqN/hayiti_sham?node-id=446%3A286


## Server API
----
### Anonymous user API
#### getAllTags - get  - /api/getAllTags
no parameters
return a static list of tags (string)

#### getTagsMap - get - /api/getTagsMap
no parameters
return a static map of tags (number - string)

#### getStoriesByTags - get - /api/getStoriesByTags
return a list of moderated stories for an anonymous user

parametesr:
-  tags (optional) - array of tags numbers, default all tags
- page (optional) - page number, default 1
- pageSize (optional) - page size number, default 100
- sortField (optional) - string , default sequence
- sortDirection (optional) - string , default DESC

#### addStory - post - /api/addStory
add an original story (added by an anonymous user)
this story will not be automatic published (only moderated stories are visible)

parametesr:
- whatTriggeredChange (string)
- howDidYouManged (string)
- additionalnfo (string)
- whatHelpedYou (string)
- background (string)
- storyContent (string)
- mail (string)
- name (string)
- contact (boolean) default false

----
### moderation admin API

#### Login - post - /api/login
parametesr:
- userName
- password

For successful login the API return status 200 and JWT token
This token should be sent as part of all the admin moderator requests

#### getStortiesForModeration - get - /api/getStortiesForModeration
require the authentication token
return list of original stories that were not moderated yet

parametesr:
- page (optional) - page number, default 1
- pageSize (optional) - page size number, default 100
- sortField (optional) - string , default sequence
- sortDirection (optional) - string , default DESC

#### getStoryForEdit - get - /api/getStoryForEdit
require the authentication token

parametesr:
- originalStory (string) - original story id
- moderatedStory (string) - moderated stroy id

The API accepts originalStory or moderatedStory, at least one of them should be provided
return:
The API returns the original story and matched the moderated story
{ originalStory, moderatedStory }

#### addModerateStory - post - /api/addModerateStory
require the authentication token
add or edit a moderated story

parametesr:
- whatTriggeredChange (string)
- howDidYouManged (string)
- additionalnfo (string)
- quote (string)
- whatHelpedYou (string)
- background (string)
- storyContent (string)
- publish (boolean), default true
- originalStory (string)
- tags (numbers array)

#### publishModerateStory - post - /api/publishModerateStory
require the authentication token
publish or unpublish moderated story

parametesr:
- moderatedStory (string)
- publish (boolean)

----
## DB structure
Collections:
1. counter - index counters for stories
2. original_stories - original stories (as submitted by users) - these stories are visible only for the admin
3. moderated_stories - moderated stories changed by admin - these stories are visible on the site
4. users - admin users
