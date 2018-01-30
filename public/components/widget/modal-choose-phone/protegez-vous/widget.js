(function() {
    //  TODO REPLACE window.jQuery.fn.jquery !== '3.2.1' by a range
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '3.2.1') {
        var script_tag = document.createElement('script');
        script_tag.setAttribute('type','text/javascript');
        script_tag.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
        if (script_tag.readyState) {
          script_tag.onreadystatechange = function () { // For old versions of IE
              if (this.readyState == 'complete' || this.readyState == 'loaded') {
                  scriptLoadHandler();
              }
          };
        } else { // Other browsers
          script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    function scriptLoadHandler() {
        jQuery = window.jQuery.noConflict(false);
        main();
    }

    function main() {
        jQuery(document).ready(function($) {
            console.warn('Widget! Running');

            //  TODO TO BE CHANGED NEED DYNAMIC CHANGE SNIPPET TO BE INCLUDED
            let widgetFiles = {
                applicationVersion: '',
                cssUrls: [
                    //  TODO DRY THE CSS CREATE .less import only whats needed | do it directly inside vue ???
                    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
                    '/components/widget/modal-choose-phone/protegez-vous/static/protegezvous-39.css',
                    //'/dev/compiled/css/defaultInline.dev.css',
                    //'/dev/compiled/css/planhub.dev.css'
                ],
                jsUrls: [
                    //  POTENTIAL COLLISION ???
                    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
                    //'//localhost:35729/livereload.js'  //  TODO REMOVE THIS ONLY FOR DEV...
                ]
            }

            let app = {  //  TODO TO BE CHANGED NEED DYNAMIC CHANGE SNIPPET TO BE INCLUDED
                urlBase: '',
                locale: 'en',
                domain: 'default',
                version: undefined,
                build: undefined,
                province: 'quebec',
                nav: 'mobile',
                searchUrl: 'http://local.www.planhub.ca/quebec/compare-cellphone-plan',
                entryPoint: '#planhubWidgetMobileSearchBar'
            };

            for (var cssUrl of widgetFiles.cssUrls) {
                let css_link = $('<link>', { rel: 'stylesheet', type: 'text/css', href: cssUrl });
                css_link.appendTo(app.entryPoint);
                console.log('CSS URL', cssUrl);
            }

            for (var jsUrl of widgetFiles.jsUrls) {
                let js_link = $('<script>', { src: jsUrl });
                js_link.appendTo(app.entryPoint);
                console.log('JS URL', jsUrl);
            }

            //  TODO CREATE A SNIPPET FOR THIS CODE?
            $(app.entryPoint).append(`
                <div class="row filters home search-block-home" style="background-image:none; height:250px; opacity:0; position:absolute; width:100%;">
                    <div class="container" style="bottom:0px; top:0px; height:0px; margin-bottom:0px; margin-top:0px;">
                        <div id="homeSearch" class="col-md-12 block-search">
                            <form role="search" action="/" name="usage">
                                <input type="hidden" name="province" value="quebec">
                                <div class="row">
                                    <h1>Quels sont vos besoins pour votre forfait cellulaire ?</h1>
                                    <div class="form-group col-sm-3 col-xs-6 text-center">
                                        <label for="voice">Minutes d'appel</label>
                                        <select name="voice" id="voice" class="form-control selectUsage">
                                            <option value="0min" disabled="" selected="">Choisir une durée</option>
                                            <option value="0min">0 min</option>
                                            <option value="50min">50 min</option>
                                            <option value="100min">100 min</option>
                                            <option value="200min">200 min</option>
                                            <option value="300min">300 min</option>
                                            <option value="400min">400 min</option>
                                            <option value="500min">500 min</option>
                                            <option value="1000min">1000 min</option>
                                            <option value="unlimitedcalls">Appels illimités</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-3 col-xs-6 text-center">
                                        <label for="data">Données</label>
                                        <select name="data" id="data" class="form-control selectUsage">
                                        <option value="0MB" disabled="" selected="">Choisir une quantité</option>
                                        <option value="0MB">0 Mo</option>
                                        <option value="50MB">50 Mo</option>
                                        <option value="100MB">100 Mo</option>
                                        <option value="200MB">200 Mo</option>
                                        <option value="300MB">300 Mo</option>
                                        <option value="400MB">400 Mo</option>
                                        <option value="500MB">500 Mo</option>
                                        <option value="1000MB">1 Go</option>
                                        <option value="2000MB">2 Go</option>
                                        <option value="3000MB">3 Go</option>
                                        <option value="4000MB">4 Go</option>
                                        <option value="5000MB">5 Go</option>
                                        <option value="6000MB">6 Go</option>
                                        <option value="7000MB">7 Go</option>
                                        <option value="8000MB">8 Go</option>
                                        <option value="9000MB">9 Go</option>
                                        <option value="10000MB">10 Go</option>
                                        <option value="15000MB">15 Go</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-3 col-sm-6 col-xs-12 text-center">
                                        <label for="phone">Cellulaire</label>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span id="dropdown-choice-label">Choisir une option</span>
                                                <div class="caret-overflow"><span class="caret"></span></div>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <span class="row">
                                                    <li class="col-sm-12 text-center" data-translation="Acheter un téléphone" data-translation2="Changer de téléphone">
                                                        <button type="button" class="btn btn-info btn-lg btn-choice btn-choice-new">
                                                            Acheter un téléphone
                                                        </button>
                                                    </li>
                                                    <li class="col-sm-12 text-center">
                                                        <button type="button" data-name="Apportez Votre Appareil" class="btn btn-info btn-lg btn-choice btn-choice-keep ">
                                                            Apporter votre téléphone
                                                        </button>
                                                    </li>
                                                </span>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-xs-12">
                                        <button type="button" class="btn btn-primary btn-block btn-search">
                                            Rechercher <i class="icon-check-planhub"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `);

            //  TODO SHOULD BE INSIDE A SNIPPET THIS IS THE CORE OF THIS WIDGET
            /* src/Celagora/CoreBundle/Resources/js/lib/components/search/app-search-data.js */
            function getSearchData(carriers) {
                function getContextAsCsv() {
                    return app.version + ';' + app.build + ';' + window.location.href + ';' + app.locale + ';' + app.province + ';' + 'currentCarrier';
                }

                function getMobileSpecificData(data) {
                    if ($("#voice option:selected").length) {
                        data.voice = $("#voice option:selected").val();
                    } else {
                        data.voice = $("#voice").val();
                    }

                    if ($("#data option:selected").length) {
                        data.data = $("#data option:selected").val();
                    } else {
                        data.data = $("#data").val();
                    }

                    var activePhoneChoice = $(".btn-choice.phbActive");
                    // BYOD is default value
                    var phoneId = 2;
                    data.phone = "byod";
                    data.phoneImg = "/img/phone/byod.png";

                    if (activePhoneChoice.hasClass("btn-choice-new")) {
                        phoneId = activePhoneChoice.attr("data-id");
                        data.phone = activePhoneChoice.attr("data-slug");
                        data.phoneImg = activePhoneChoice.attr("data-img");
                    }

                    data.urlPart = data.voice + '.' + data.data;
                    data.urlPart += '.' + phoneId + '.' + data.carriers;

                    data.csv = getContextAsCsv() + ';' + data.voice + ';' + data.data + ';' + data.services + ';' + data.phone + ';' + data.carriers;
                }

                //  TODO SHOULD REMOVE carriers does not seems to be pass as param ever
                //  Internet $('input#sort-by') VS Mobile $('input#sort-by-hidden') ???

                var data = {
                    csv: '',
                    data: null,
                    phone: null,
                    voice: null,
                    sortBy: '',  // sort default value
                    urlPart: '',
                    services: null,
                    phoneImg: null,
                    bandwidth: null,
                    downloadspeed: null,
                    carriers: 'all-carriers',
                    currentCarrier: null
                };

                if ('mobile' == app.nav) {
                    getMobileSpecificData(data);
                }
                /*   //  TODO TO BE CHANGED
                if (geoIp) {
                    data.csv += ';' + geoIp.country_name + ';' + geoIp.region_name + ';' + geoIp.city;
                }
                */
                console.log("getSearchData");
                return data;
            }

            setTimeout(() => {
                /* src/Celagora/CoreBundle/Resources/js/lib/functions/phone-choice/phone-choice.js */
                function initBtnPhoneChoices() {
                    $('.btn-choice-new').off().click(function() {
                        //  TODO CHANGE THIS BEFORE PUSHING TO PROD
                        window.location.hash = '#/home-search-bar';
                        setTimeout(() => {
                            if ($('#modal-select-device').length) {
                                $('#modal-select-device').modal('toggle');
                            }
                        }, 500);
                    });

                    $('.btn-choice-keep').off().click(function() {
                        console.log("$('.btn-choice-keep').off().click(function()");
                        $(this).addClass('active');
                        $(this).addClass('phbActive');
                        $('#dropdown-choice-label').html($(this).attr('data-name'));
                        $(".btn-group-with-phone").removeClass('btn-group-with-phone');
                        var $BtnElemChoiceNew = $('.btn-choice-new');
                        var $liElemBtnChoiceNew = $BtnElemChoiceNew.parent();

                        if ($('div.select-phone a').length) {
                            //  Side phone image not in home page
                            $('div.select-phone a').remove();
                        }

                        $BtnElemChoiceNew.remove();
                        $liElemBtnChoiceNew.html('<button type="button" class="btn btn-info btn-lg btn-choice btn-choice-new">' + $liElemBtnChoiceNew.attr('data-translation') + '</button>');
                        initBtnPhoneChoices();
                    });

                    $('#modal-select-device').on('hide.bs.modal', function(e) {
                        window.location.hash = '#/';
                    });
                }

                initBtnPhoneChoices();

                $(app.entryPoint).append('<div id="app"></div>');

                console.warn('SETTING VUE');
                window.location.hash = '#/';

                let x = document.createElement('LINK');
                x.setAttribute('rel', 'stylesheet');
                x.setAttribute('type', 'text/css');
                x.setAttribute('href', '/components/widget/modal-choose-phone/protegez-vous/static/app.39.css');

                let appScript = document.createElement('SCRIPT');
                let manifest = document.createElement('SCRIPT');
                let vendor = document.createElement('SCRIPT');
                appScript.setAttribute('type', 'text/javascript');
                manifest.setAttribute('type', 'text/javascript');
                vendor.setAttribute('type', 'text/javascript');

                appScript.src='/components/widget/modal-choose-phone/protegez-vous/static/app.39.js';
                manifest.src='/components/widget/modal-choose-phone/protegez-vous/static/manifest.39.js';
                vendor.src='/components/widget/modal-choose-phone/protegez-vous/static/vendor.39.js';

                $(app.entryPoint).append(manifest);
                $(app.entryPoint).append(vendor);
                setTimeout(() => $(app.entryPoint).append(x), 50);
                setTimeout(() => {
                    $(app.entryPoint).append(appScript);
                    setTimeout(() => {
                        $(app.entryPoint + ' .search-block-home').css('opacity', 1);
                        $('#planhubWidgetMobileSearchBar-loader').remove();
                        console.warn('Widget Done!');
                    }, 1000);
                }, 1000);

                $('.btn-search').off().click(function(e) {
                    e.originalEvent.defaultPrevented;

                    /* src/Celagora/CoreBundle/Resources/js/lib/components/search/lib-search.js */
                    let searchData = getSearchData('all-carriers');
                    app.searchUrl = app.searchUrl.replace('province', app.province);

                    console.log('-------------------------------------------------------');
                    console.log('URL=' + app.searchUrl + '/' + searchData.urlPart);
                    console.log('-------------------------------------------------------');

                    location.assign(app.searchUrl + '/' + searchData.urlPart);
                });
            }, 100);
        });
    }
})();
