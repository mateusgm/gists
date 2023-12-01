
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

function crawl(start, end, stop, callback) {
    if(start >= stop)
        return;

    var url = 'https://mijn.ista.nl/api/Values/ConsumptionValues';

    var params = {
        "JWT": JSON.parse(sessionStorage.uBase).JWT,
        "Cuid": JSON.parse(sessionStorage.uBase).Cus[0].Cuid,
        "LANG": "en-US",
        "Billingperiod":  {
            y: start.add({ months: 6 }).getFullYear() +'',
            s: start.ftime(),
            e: end > stop ? stop.ftime() : end.ftime(),
        }
    }

    $.postJSON(url, params, function(data) {
        console.log(start.fdate(), data.ServicesComp[0].TotalNow);
        callback(start, stop);
    })
}

function weekly(start, stop) {
    var start = start.add({ days: 7 }),
        end   = start.add({ days: 6 });
    crawl(start, end, stop, weekly);
}

function monthly(start, stop) {
    var    start = start.add({ months: 1 });
        end   = start.add({ months: 1, days: -1 });
    crawl(start, end, stop, monthly);
}

var stop = new Date().add({ days: -1 });
weekly( new Date(2023,10,5,2), stop);
// monthly( new Date(2023,9,1,2) , stop);
