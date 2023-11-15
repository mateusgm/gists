function addIframe() {
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("id", "iframeid");
    ifrm.style.width = "640px";
    ifrm.style.height = "480px";
    document.body.appendChild(ifrm);
}

function pageScroll(win, time) {
	var scrolldelay;
	var interval = 100;
	var steps = time / interval;
	var scroll = function() {
		win.scrollBy(0, win.document.body.offsetHeight / steps); // horizontal and vertical scroll increments
	    if ((win.innerHeight + win.pageYOffset) >= win.document.body.offsetHeight) {
	        clearInterval(scrolldelay)
	    }
	}
	scrolldelay = setInterval(scroll,interval);
}

function onImagesLoaded(doc) {
	var imgs = doc.querySelectorAll('figure img');
	var loaded = Array.from(imgs)
		.filter(img => !img.complete)
		.map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }));
	return Promise.all(loaded);
}

function printFrame(urls) {
	var iframe = document.getElementById('iframeid');
	iframe.onload = function() {
		iframe.contentWindow.onafterprint = function() {
        	if (urls.next()) printFrame(urls);
        }
		onImagesLoaded(iframe.contentDocument).then(function() {
	    	document.title = urls.current().text;
	    	iframe.contentWindow.print();
	    });
		pageScroll(iframe.contentWindow, 10000);
    }
	iframe.src = urls.current().href;
}

function Iterator(list, start) {
  let i = start;
  return {
  	current: function() {
  		return list[i];
  	},
    next: function() {
      i++;
      console.warn(i + " / " + list.length);
      return list[i];
    },
    stop: function() {
    	i = list.length;
    }
  };
}

function addLibrary(w, url) {	var jq = w.document.createElement('script');
    jq.src = url;
    w.document.getElementsByTagName('head')[0].appendChild(jq);
}

var jq = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
var hp = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';

addIframe()
addLibrary(window, hp);
addLibrary(window, jq);

var start = 1;
var titles = $('a.frontend-pencraft-Text-module__font-pub-headings--lbOZ2').get();
var urls = Iterator(titles, start); // Iterator([titles[0],titles[1]]);
printFrame(urls);



// function toPdf(w) {
// 	var opt = {
// 	    filename: 'time_sheet_report.pdf',
// 	    image: { type: 'png' },
// 	    html2canvas: { useCORS: true, allowTaint: false },
// 	};
// 	html2pdf().set(opt).from(w.document.body).save();
// }


// function printUrl(url) {
// 	var w = window.open(url, '', 'height=400,width=800');
// 	w.onload = function () {
// 		w.print();
// 	}
// }



