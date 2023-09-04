var TARGET     = 12;
var INCREMENT  = 1;
var START_FROM = 10; 
var NAME       = 'Mateus';

function get_time() {
	var a = j('.jsDisplayedTimeValue').textContent.split(':');
	if(a.length == 1) return parseInt(a[0]);
	return parseInt(a[1])*60 + parseInt(a[2]);
}

function bid() {
	var current = parseInt(j('.highest-bid .highest-bid').textContent);
	var bidder  = j('#highestBidder').textContent;
	var time    = get_time();

	if( time > START_FROM ) {
		console.log('Skipping!');
		timer = 1000*Math.min(10, time-START_FROM-1);
	

	} else if ( time > 0 ) {
		console.log('Show time!');
		timer = 300;

		if( current + INCREMENT <= TARGET && bidder.search(NAME) < 0 ) {
			var mine = current + INCREMENT;
			document.getElementById("jsActiveBidInput").value = mine;
			document.getElementById('jsActiveBidButton').click();
		}

	} else  {
		console.log('Ending');
		return;
	}

	window.timeout = setTimeout(bid, Math.max(300, timer));
}


window.j = $;
bid()