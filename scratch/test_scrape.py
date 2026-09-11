import requests
from bs4 import BeautifulSoup

url = "https://hy-techengineers.com/din-metric-fittings.php"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}
response = requests.get(url, headers=headers)
print(f"Status Code: {response.status_code}")

soup = BeautifulSoup(response.content, 'html.parser')
links = soup.find_all('a')
print(f"Total links: {len(links)}")
print("First 20 links:")
for a in links[:20]:
    print(f" - {a.text.strip()} -> {a.get('href')}")
