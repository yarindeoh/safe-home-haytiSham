## Safe@Home: Hayti Sham

## Quick Use

Run in locally with webpack-dev-server (FE)

```
npm run start
```

Run webpack prod build
```
npm run build
```

Run local server after webpack build

```
npm run start-server
```
 
=======
## Deployment
This application is deployed using Heroku:
https://haytisham.herokuapp.com/


##
## Server
### Peer Dependencies
 - Python 3 +
 - Pip 3 +
 
 If you don't have alias run python3 instead python or pip3 instead pip
prepare server env:
```
pip install -r requirements.txt
```


Run server (BE):
```
python server/hs_server.py
``` 
supported methods:
* getAllData: returns all records as json.
* getDataAfterDate: gets json with 'lastUpdate': <timestamp>, e.g.: '5/15/2020 15:04:02'. returns all records posted after lastUpdate as json. 
 * Server is also serving files from '/' and redirecting to '/'.
 * A basic HTML template is being saved and served in server/templates
 * bundle.js and images are being saved in server/static
   
sample requests can be found under server/req_examples.py. 

### Deploy
Create an .env file with the following: 
     ```
     API_URL=http://localhost:5000
     //prod API_URL=https://haytisham.herokuapp.com
     ```


