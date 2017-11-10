var urls = [
    'www.planhub.ca',
    'www.planhub.ca/quebec/compare-internet-plan/0Mbps.0Mbps.0MB.15-56-24-1-61-55-16-25-17-18-19-59-60-20-21-58-26-22-4-10-27-23-57',
    'www.planhub.ca/quebec/compare-cellphone-plan/200min.100MB.2.all-carriers',
    'www.planhub.ca/home-internet',
    'www.planhub.ca/quebec/compare-internet-plan/0Mbps.0Mbps.0MB.all-carriers',
    'www.planhub.ca/quebec/compare-internet-plan/5Mbps.0Mbps.50000MB.all-carriers',
    'www.planhub.ca/blog/en/',
    'www.planhub.ca/planhub/about'
];

var second = 0, index = 0;

for (var ind in urls) {
    setTimeout(function() {
        $.ajax(window.origin + '/test/' + urls[index++].replace(/\//gi, '!'))
            .done(function(data) {
                $('#test').append(`
                    <div class="row">
                        <div class="col-sm-1">${ data.request.method }</div>
                        <div class="col-sm-1 color${ data.statusCode }">${ data.statusCode }</div>
                        <div class="col-sm-2">${ data.headers.date }</div>
                        <div class="col-sm-2">${ data.headers.server }</div>
                        <div class="col-sm-5">${ data.request.uri.href }</div>
                        <div class="col-sm-1">${ data.request.uri.query || 'None' }</div>
                    </div>
                `);
            })
            .fail(function(data) { console.error(data); });
    }, 1000 * second++);
}