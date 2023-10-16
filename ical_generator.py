
from icalendar import Calendar, Event, LocalTimezone, vDatetime
from datetime import datetime, timedelta
import pytz
import sys


tz = pytz.timezone("Europe/Amsterdam")
today = datetime.now().replace(tzinfo=tz)
header = sys.stdin.readline().strip().split(",")

cal = Calendar()
for i,line in enumerate(sys.stdin):
    row = dict(zip(header, line.strip().split(",")))
    if not row['Data'] or row['Hide'] == 'Yes' or row['Data'] == '?':
        continue

    dt = datetime.strptime(row['Data'], '%d/%m/%Y').replace(year=today.year,hour=8,minute=30, tzinfo=tz)
    if dt < today:
        dt = dt.replace(year=today.year+1)

    event = Event()
    event.add('uid', hash(row['Quem']))
    event.add('summary', f"Niver {row['Quem']}")
    event.add('dtstart', dt)
    event.add('dtend', dt.replace(hour=9,minute=0))
    event.add('rrule', dict(freq='yearly'))

    cal.add_component(event)

cal.add('prodid', 'my-facebook')
cal.add('version', '2.0')
print( cal.to_ical().decode("utf-8").replace('\r\n', '\n').strip() )