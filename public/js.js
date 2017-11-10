var urls = [], interval = 0.01, limit = 14;
var dataUrls = [];

$.ajax(window.origin + '/site-map/' + 'www.planhub.ca/site-map'.replace(/\//gi, '!'))
    .done(function(data) {
        urls = data;
        $('#test').prepend(`
            <div class="row">
                <div class="col-xs-6"><h4>${ data.length } Links where found inside www.planhub.ca/site-map  <button type="button" class="btn btn-primary" onclick="startURLTest(false)">Test All | (${ (data.length * interval / 60).toFixed(2) } min)</button></h4></div>
                <div class="col-xs-6"><h4><button type="button" class="btn btn-primary" onclick="startURLTest(true)">Test only 15 first links | (${ (limit * interval / 60 * 1000).toFixed(2) } second)</button></h4></div>
            </div>
            <br>
        `);
    })
    .fail(function(data) { console.error(data); });

function show(type) {
    if (type == '.color200') {
        return $(type).parent().removeClass('hidden');
    }

    if (type == '.row-alert') {
        return $(type).removeClass('hidden');
    }

    $('.row-url').removeClass('hidden');
}

function hide(type) {
    if (type == '.color200') {
        return $(type).parent().addClass('hidden');
    }

    if (type == '.row-alert') {
        return $(type).addClass('hidden');
    }

    $('.row-url').addClass('hidden');
}

function startURLTest(dev) {
    var asyncIndex = 0, index = 0;
    $('.row-url').remove();

    (dev) ? limit : limit = 100000;

    for (var ind in urls) {
        if (ind > limit) { break; }

        setTimeout(function() {
            $.ajax(window.origin + '/test/www.planhub.ca' + urls[index++].replace(/\//gi, '!'))
                .done(function(data) {
                    dataUrls.push(data);

                    $('#test').append(`
                        <div class="row ${ (data.statusCode != 200) ? 'row-alert' : 'hidden' } row-url">
                            <div class="col-xs-1">${ data.request.method }</div>
                            <div class="col-xs-1 color${ data.statusCode }">${ data.statusCode }</div>
                            <div class="col-xs-2">${ data.headers.date }</div>
                            <div class="col-xs-2">${ data.headers.server }</div>
                            <div class="col-xs-5">${ data.request.uri.href }</div>
                            <div class="col-xs-1">${ data.request.uri.query || 'None' }</div>
                        </div>
                    `);
                })
                .fail(function(data) { console.error(data); });
        }, interval * asyncIndex++);
    }

    setTimeout(() => {
        $('#testBtns').prepend(`
            <div class="row">
                <div class="col-xs-2"><button type="button" class="btn btn-primary" onclick="show('.color200')">Show 200</div>
                <div class="col-xs-2"><button type="button" class="btn btn-primary" onclick="show('.row-alert')">Show Error</div>
                <div class="col-xs-2"><button type="button" class="btn btn-primary" onclick="show(false)">Show All</div>
                <div class="col-xs-2"><button type="button" class="btn btn-primary" onclick="hide('.color200')">Hide 200</div>
                <div class="col-xs-2"><button type="button" class="btn btn-primary" onclick="hide('.row-alert')">Hide Error</div>
                <div class="col-xs-2"><button type="button" class="btn btn-primary" onclick="hide(false)">Hide All</div>
            </div>
            <br>
        `);
    }, limit * interval * 10000);
}