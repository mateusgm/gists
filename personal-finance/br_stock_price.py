from bs4 import BeautifulSoup
import requests
import sys


companies = set([ l.strip() for l in sys.stdin.read().split("\n") if l.strip() and l[-1].isdigit() ])

for c in companies:
    url = 'https://statusinvest.com.br/acoes/{}'.format(c.lower())
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "lxml")

    tag = soup.body.findAll('span', attrs={'class' : 'sub-value'})[3]
    div = tag.text.replace('R$ ', '')

    print("{}\t{}".format(c, div))