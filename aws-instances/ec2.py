import json
import re
import sys

CATEGORIES = [ 'eks', 'cassandra', '...' ]

def group(item):
    blob = json.dumps(item)
    for m in CATEGORIES:
        if m in blob:
            return m
    return 'others'

def name(item):
    for t in item['Tags']:
        if t['Key'] == 'Name':
            return t['Value']
    return 'none'

file = sys.stdin.read()
res = json.loads(file)['Reservations']
for r in res:
    for i in r['Instances']:
        print(name(i), i['InstanceType'], group(i), sep="\t")