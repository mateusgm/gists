
// helpers

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

Date.sparse = function(st) {
     return Date.parse(st.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$2-$1'));
}

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


// bot

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
        var meters = data.ServicesComp[0];
        var days = 1 + ( Date.sparse(data.CurEnd) - Date.sparse(data.CurStart) )  / (1000 * 60 * 60 * 24);
        var consumption = [ +(meters.TotalNow / days).toFixed(1),  meters.TotalNow, 0, 0, 0, 0, 0];
        for (i in meters.CurMeters)
            consumption[meters.CurMeters[i].RadNr+1]  += meters.CurMeters[i].CCDValue;

        console.log(start.fdate(), consumption.join(' '));
        callback(start, stop);
    })
}

function weekly(start, stop) {
    var start = start.add({ days: 7 }),
        end   = start.add({ days: 6 });
    crawl(start, end, stop, weekly);
}

function monthly(start, stop) {
    var start = start.add({ months: 1 });
        end   = start.add({ months: 1, days: -1 });
    crawl(start, end, stop, monthly);
}

var stop = new Date().add({ days: -1 });
weekly( new Date(2023,10,12,2), stop);

// monthly( new Date(2023,8,1,2) , stop);

