import sys
import re
from datetime import datetime as dt

year = 2023
last_month = 12
def parse_date(x, year):
    x = f"{year} " + x.replace('mei','may').replace('mrt','mar').replace('okt','oct')
    return dt.strftime( dt.strptime(x, "%Y %d %b "), "%Y/%m/%d" )

print("date,note,amount")
for line in sys.stdin:
    try:
        tokens, = map(list,re.findall('^(\d\d \w\w\w )+(.+) (\w\w\w) ([\d\.]+,\d+) (\w+)$', line))
        if 'jan' in tokens[0] and last_month == '12':
            year += 1
        tokens[0] = parse_date(tokens[0], year) 
        tokens[3] = float(tokens[3].replace('.','').replace(',','.')) * (-1 if tokens[4] == 'Af' else 1)
        last_month = tokens[0].split('/')[1]
        print('{},"{} Land:{}",{},{}'.format(*tokens))
    except Exception as e:
        print("Error: " + line.strip() +  str(e), file=sys.stderr)
