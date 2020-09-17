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
npm run start-dev
```

Run in build with webbpack (FE)

```
npm start
```

Fix lint (FE)

```
npm run lint-fix
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
* Login - post - /api/login
parametesr:
userName
password
For successful login the API return status 200 and JWT token
This token should be sent as part of all the admin moderator requests