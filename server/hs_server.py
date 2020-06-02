import os

from flask import Flask, request
import gspread
import logging
from logging.handlers import RotatingFileHandler
from datetime import datetime
from flask_cors import CORS
from flask import render_template
from server.static_data import mock_get_tags_map, mock_get_all_tags, mock_get_public_stories, mock_get_stories_by_tags, mock_get_all_data, keys_map

app = Flask(__name__, static_folder="static", static_url_path='')
app.config.JSON_AS_ASCII = False
logger = logging.getLogger('hs_server')
cred_path = 'creds.json'
ss_name = 'moderated_responses'
key_last_update = 'lastUpdate'
key_data = 'data'
key_error = 'error'
date_format = '%m/%d/%Y %H:%M:%S'

CORS(app)

@app.route("/")
def index():
    return render_template("index.html")


@app.route('/getAllDataFromSS', methods=['GET'])
def get_all_data_from_ss():
    gc = gspread.service_account(cred_path)
    try:
        sh = gc.open(ss_name).sheet1
        all_data = sh.get_all_records()
        logger.info(f'getAllData: returning {len(all_data)} records')
        all_data = convert_ss_keys(all_data)
        return {key_data: all_data, key_error: ''}
    except gspread.exceptions.SpreadsheetNotFound:
        err_msg = f'please verify that spreadsheet {ss_name} is shared with client_email from creds.json'
        logger.error(err_msg)
        return {key_data: [], key_error: err_msg}


@app.route('/getAllData', methods=['GET'])
def get_all_data():
    return {key_data: mock_get_all_data, key_error: ''}


@app.route('/getStoriesByTags', methods=['GET'])
def get_stories_by_tags():
    return {key_data: mock_get_stories_by_tags, key_error: ''}


@app.route('/getAllTags', methods=['GET'])
def get_all_tags():
    return {key_data: mock_get_all_tags, key_error: ''}

@app.route('/getPublicStories', methods=['GET'])
def get_public_stories():
    return {key_data: mock_get_public_stories, key_error: ''}


@app.route('/getTagsMap', methods=['GET'])
def get_tags_map():
    return {key_data: mock_get_tags_map, key_error: ''}


def convert_ss_keys(ss_content):
    converted_ss = []
    for record in ss_content:
        converted_rec = {}
        for key in record:
            if key in keys_map:
                converted_rec[keys_map[key]] = str(record[key]).replace('\r\n', '\n')
            else:
                converted_rec[key] = str(record[key]).replace('\r\n', '\n')
        converted_ss.append(converted_rec)
    return converted_ss


@app.route('/getDataAfterDate', methods=['GET'])
def get_latest_data():
    try:
        req_date = request.get_json().get(key_last_update)
        latest_pull_date = datetime.strptime(req_date, date_format)
    except:
        err_msg = f'request must contain data in the following format {date_format}'
        logger.error(err_msg)
        return {key_data: [], key_error: err_msg}
    all_data = get_all_data_from_ss()[key_data]
    data_after_date = list(
        filter(lambda x: datetime.strptime(x['Timestamp'], date_format) > latest_pull_date, all_data))
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
    app.run()
