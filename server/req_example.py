import requests
import traceback
import json

from server.hs_server import key_last_update

server_ip = '127.0.0.1'
server_port = '8080'
url = f'http://{server_ip}:{server_port}'
get_all_data = 'getAllData'
get_latest_data = 'getDataAfterDate'
get_tags_map = 'getTagsMap'
get_all_tags = 'getAllTags'
get_stories_by_tags = 'getStoriesByTags'
get_public_stories = 'getPublicStories'


def send_and_save_res(req_url: str, req_json: dict, out_path: str):
    try:
        response = requests.get(url=req_url, json=req_json)
        r = response.json()['data']
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(json.dumps(response.json(), indent=2, ensure_ascii=False))
    except:
        traceback.print_exc()


send_and_save_res(req_url=f'{url}/{get_all_data}', req_json={}, out_path=f'{get_all_data}.json')
send_and_save_res(req_url=f'{url}/{get_all_tags}', req_json={}, out_path=f'{get_all_tags}.json')
send_and_save_res(req_url=f'{url}/{get_stories_by_tags}', req_json={}, out_path=f'{get_stories_by_tags}.json')
send_and_save_res(req_url=f'{url}/{get_tags_map}', req_json={}, out_path=f'{get_tags_map}.json')
send_and_save_res(req_url=f'{url}/{get_public_stories}', req_json={}, out_path=f'{get_public_stories}.json')
# send_and_save_res(req_url=f'{url}/{get_latest_data}', req_json={key_last_update: '5/15/2020 15:04:02'},
#                   out_path=f'{get_latest_data}.json')
