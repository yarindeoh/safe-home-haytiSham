import os

from flask import Flask, request
import gspread
import logging
from logging.handlers import RotatingFileHandler
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
app.config.JSON_AS_ASCII = False
logger = logging.getLogger('hs_server')
cred_path = 'creds.json'
ss_name = 'hayti_sham_responses'
key_last_update = 'lastUpdate'
key_data = 'data'
key_error = 'error'
date_format = '%m/%d/%Y %H:%M:%S'

CORS(app)
MYDIR = os.path.dirname(__file__)

@app.route("/")
def root(path):
    logger.info(MYDIR)
    return send_from_directory(MYDIR+ '/../build', index.html)

@app.route('/getAllData', methods=['GET'])
def get_all_data():
    gc = gspread.service_account(cred_path)
    try:
        sh = gc.open(ss_name).sheet1
        all_data = sh.get_all_records()
        logger.info(f'getAllData: returning {len(all_data)} records')
        return {key_data: all_data, key_error: ''}
    except gspread.exceptions.SpreadsheetNotFound:
        err_msg = f'please verify that spreadsheet {ss_name} is shared with client_email from creds.json'
        logger.error(err_msg)
        return {key_data: [], key_error: err_msg}


@app.route('/getDataAfterDate', methods=['GET'])
def get_latest_data():
    try:
        req_date = request.get_json().get(key_last_update)
        latest_pull_date = datetime.strptime(req_date, date_format)
    except:
        err_msg = f'request must contain data in the following format {date_format}'
        logger.error(err_msg)
        return {key_data: [], key_error: err_msg}
    all_data = get_all_data()[key_data]
    data_after_date = list(filter(lambda x: datetime.strptime(x['Timestamp'], date_format) > latest_pull_date, all_data))
    logger.info(f'getDataAfterDate: returning {len(data_after_date)} records after date {req_date}')
    return {key_data: data_after_date, key_error: ''}


def init_logger():
    logger.setLevel(logging.DEBUG)
    fh = RotatingFileHandler('hs_server.log', maxBytes=10000, backupCount=2)
    fh.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    fh.setFormatter(formatter)
    logger.addHandler(fh)


if __name__ == '__main__':
    init_logger()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)


