## Safe@Home: Hayti Sham

## Quick Use
---> Pay attention, we have 2 folders of servers, current running server is python server under 'server' (which is going to be removed in the future)
and a Node server under 'server_api' that is under development and will replace python server soon. 

In order to run the app locally you need to have a running local Frontend in one 
terminal and a running local Backend in another terminal.
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

### Start Local Server
#### Peer Dependencies
 - Python ^3
 - Pip ^3

prepare server env:
```
pip3 install -r requirements.txt
```

Run server (BE):
```
python3 server/hs_server.py
``` 

#### If you are using python3, and you are getting 'moduleNotFound' error, please add PYTHONPATH as an env variable to your .env file or manually(preffered): (where <repo_path> is where your app is located locally).
#### From project path root directory run:
```
export PYTHONPATH=$PYTHONPATH:<repo path> && python3 server/hs_server.py
``` 

supported methods:
* getAllData: returns all records as json.
* getDataAfterDate: gets json with 'lastUpdate': <timestamp>, e.g.: '5/15/2020 15:04:02'. returns all records posted after lastUpdate as json. 
 * Server is also serving files from '/' and redirecting to '/'.
 * A basic HTML template is being saved and served in server/templates
 * bundle.js and images are being saved in server/static
   
sample requests can be found under server/req_examples.py. 

### Start Local API Server -- node js

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



=======
## Deployment
This application is deployed using Heroku:
https://haytisham.herokuapp.com/


## UI Mockups
Specified here, made by Lishay Noam:
https://www.figma.com/file/UcF9E1rT6rwKIQkkLD5EqN/hayiti_sham?node-id=446%3A286

