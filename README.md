## safe@home-beenthere

#### Whats included?
- webpack-dev-server
- webpack 4
- eslint configuration + prettier 
- redux
- redux-saga
- sass
- i18n (translation infra)
- jest
- babel
- hot reload


## Quick Use

Run in locally - webpack-dev-server

```
yarn start
```

Run tests / test in dev mode (--watch)

```
yarn test
```

Fix eslint issues

```
yarn lint-fix
```


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