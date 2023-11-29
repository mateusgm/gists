
$.postJSON = function(url, data, callback) {
    return jQuery.ajax({
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },
    'type': 'POST',
    'url': url,
    'data': JSON.stringify(data),
    'dataType': 'json',
    'success': callback
    });
};

Date.prototype.ftime = function() {
	return this.toISOString().slice(0,19);
}

Date.prototype.fdate = function() {
	return this.toISOString().slice(0,10);
}

Date.prototype.add = function(value) {
    var date = new Date(this.valueOf());
    date.setMonth(date.getMonth() + (value.months || 0));
    date.setDate(date.getDate() + (value.days || 0));
    return date;
};


function crawl(start, stop, interval) {
	var end;

	if(interval == 'month') {
		start = start.add({ months: 1 });
		end   = start.add({ months: 1, days: -1 });
	}
	if(interval == 'week') {
		start = start.add({ days: 7 });
		end   = start.add({ days: 6 });
	}

	var params = {
		"JWT": JSON.parse(sessionStorage.uBase).JWT,
		"Cuid": JSON.parse(sessionStorage.uBase).Cus[0].Cuid,
		"LANG": "en-US",
		"Billingperiod":  {
			y: start.add({ months: 6 }).getFullYear() +'',
			s: start.ftime(),
			e: end.ftime(),
		}
	}

	$.postJSON(url, params, function(data) { 
		console.log(start.fdate(), data.ServicesComp[0].TotalNow);
		if(start < stop)
			crawl(start, stop, interval);
	})
}

var url = 'https://mijn.ista.nl/api/Values/ConsumptionValues';

var start = new Date(2023,10,26,2).add({ days: -7*3 }),
	stop = new Date();

crawl(start, stop, 'week')