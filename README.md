## Safe@Home: Hayti Sham

## Quick Use

Run in locally with webpack-dev-server

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


run server:
```
python server/hs_server.py
``` 
supported methods:
* getAllData: returns all records as json.
* getDataAfterDate: gets json with 'lastUpdate': <timestamp>, e.g.: '5/15/2020 15:04:02'. returns all records posted after lastUpdate as json.   
   
sample requests can be found under server/req_examples.py. 
