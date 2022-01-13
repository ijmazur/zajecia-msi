import requests

api_url = 'http://api.nbp.pl/api/exchangerates/rates/A/'
h = {
    'Accept': 'application/json'
}

def get_exchange_rate(currency_code):
    response = requests.get(api_url + currency_code, headers=h, timeout=10)
    if response.status_code == 200:
        json_data = response.json()
        print(json_data)
        return json_data['rates'][0]['mid']
    else:
        return None