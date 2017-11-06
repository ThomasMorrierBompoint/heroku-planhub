$(function() {
    window.scrollTo(0, 0);
    onWindowScroll();
});

var $w, iphoneOverTopTime = 2500;
var pos1 = 0, pos2 = 0;
var isWindowSetTimeout = false;
var onWindowSetTimeout = null;
//  Prevent container to be hidden when content collapsing trigger scrolling effect
function preventWindowOnScroll(time) {
    isWindowSetTimeout = true;
    clearTimeout(onWindowSetTimeout);
    onWindowSetTimeout = setTimeout(function() { isWindowSetTimeout = false; }, time || 500);
}

function onWindowScroll() {
    var $searchSummary = $('#sticky-searchbar');
    var $btnShow = $('#btnShowSearchSummary');
    var $time = $('#time');

    function hideSearchBar() {
        $searchSummary.slideUp(250, () => $btnShow.slideDown(175));
    }

    function showSearchBar() {
        $btnShow.fadeOut(100, () => $searchSummary.slideDown(250));
    }

    var test = document.getElementById('test');

    $w = $(window).scroll(function() {
        test.innerHTML += ' ' + $w.scrollTop() + ' |';
        pos2 = $w.scrollTop();
        if (!isWindowSetTimeout) {
            iphoneOverTopTime = $time.val();
            if ($w.scrollTop() < 0) {
                //  Prevent hidding when mobile go over the top mostly Iphone
                preventWindowOnScroll($time.val() || 500);
                showSearchBar();
            } else {
                preventWindowOnScroll();
                if (pos1 > pos2) {  //  GOING UP
                    showSearchBar();
                } else {  //  GOING DOWN
                    hideSearchBar();
                }
            }
        }
        pos1 = pos2;
    });
}