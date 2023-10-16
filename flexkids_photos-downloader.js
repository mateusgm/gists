function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function download(id, pool_size) {
    var lag = Math.floor(Math.random() * pool_size);
    await sleep(1000*lag);
    console.log("Downloading ", id);
    
    var url = "https://kindergarden.flexkids.nl/ouder/media/download/media/" + id;
    var a = $("<a>")
        .attr("href", url)
        .attr("download", id+".jpg")
        .appendTo("body");
    a[0].click();
    a.remove();
}

$('.fotoalbumimages.images img').each(function(i,e) {
    var id = $(e).data('id');
    download(id, 120);
});