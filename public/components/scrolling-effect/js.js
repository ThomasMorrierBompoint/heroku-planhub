$(function() {
    window.scrollTo(0, 0);
    onWindowScroll();
});

var $w;
var pos1 = 0, pos2 = 0;
var isWindowSetTimeout = false;
var onWindowSetTimeout = null;
//  Prevent container to be hidden when content collapsing trigger scrolling effect
function preventWindowOnScroll(time) {
    isWindowSetTimeout = true;
    clearTimeout(onWindowSetTimeout);
    onWindowSetTimeout = setTimeout(function() { isWindowSetTimeout = false; }, time || 700);
}

function onWindowScroll() {
    var $searchSummary = $('#sticky-searchbar');
    var $btnShow = $('#btnShowSearchSummary');

    function hideSearchBar() {
        $searchSummary.slideUp(250, () => $btnShow.slideDown(175));
    }

    function showSearchBar() {
        $btnShow.fadeOut(100, () => $searchSummary.slideDown(250));
    }

    $w = $(window).scroll(function() {
        pos2 = $w.scrollTop();
        if (!isWindowSetTimeout) {
            if ($w.scrollTop() > 5 && $w.scrollTop() < 50) {
                //  Prevent hidding when mobile go over the top mostly Iphone
                preventWindowOnScroll(2000);
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