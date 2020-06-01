## Safe@Home: Hayti Sham

## Quick Use
### Start Local Frontend

Create an .env file in the root of the project with the following:


     
     API_URL=http://localhost:5000
     //prod API_URL=https://haytisham.herokuapp.com
     

Run in locally with webpack-dev-server (FE)

```
npm run start-dev
```

### Start Local Server
#### Peer Dependencies
 - Python 3 +
 - Pip 3 +

prepare server env:
```
pip3 install -r requirements.txt
```

Run server (BE):
```
python3 server/hs_server.py
``` 

#### If you are using python3, and you are getting 'moduleNotFound' error, please add PYTHONPATH as an env variable to your .env file or manually: (where <repo_path> is where your app is located locally)
```
export PYTHONPATH=$PYTHONPATH:<repo_path>/server && python3 hs_server.py
``` 

supported methods:
* getAllData: returns all records as json.
* getDataAfterDate: gets json with 'lastUpdate': <timestamp>, e.g.: '5/15/2020 15:04:02'. returns all records posted after lastUpdate as json. 
 * Server is also serving files from '/' and redirecting to '/'.
 * A basic HTML template is being saved and served in server/templates
 * bundle.js and images are being saved in server/static
   
sample requests can be found under server/req_examples.py. 

=======
## Deployment
This application is deployed using Heroku:
https://haytisham.herokuapp.com/


