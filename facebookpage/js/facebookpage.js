
// FACEBOOK PAGE THEME JS

// VARS
var siteOverlayOpacity = 0.7;

// JQUERY DOM READY
$(function()
{
    // SETUP
    $.facebookFrame();

    $('<div id="siteOverlay"></div>').appendTo($(document.body));
    $('#siteOverlay').hide();
    $('.dialog').hide();
    $('.dialogClose').click(closeDialog);

    // Facebook Share
    $('.shareFacebook').live("click", function(e)
    {
        facebookStreamPublish($(this).attr('id'));
        e.preventDefault();
    });

    /**
     * Dialog Click
     */
    $('.dialogClick').live("click", function(e)
    {
        showDialog('#' + $(this).attr('rel'));
        e.preventDefault();
    });

});

// HOST NAME SWITCH FOR SCROLLING ON LOCAL
$.facebookFrame = function()
{
    if (top === self) {
        $('html').css('overflow', 'auto');
        $('body').css('overflow', 'auto');
    } else {
        $('html').css('overflow', 'hidden');
        $('body').css('overflow', 'hidden');
    }
};

// DEBUG LOG
$.log = function(debug, object)
{
    if (window.console && window.console.warn) {
        console.warn(debug, object);
    };
};

/**
 * Show Dialog
 */
function showDialog(id)
{
    $('.dialog').hide();
    $(id).fadeIn(100);
    $(id + '.dialogPopup').css('top', '200px');
    overlaySize();
    $('#siteOverlay').fadeTo(300, siteOverlayOpacity);
}

/**
 * Close Dialog
 */
function closeDialog()
{
    // Fade out Dialog and overlay
    $('.dialog').fadeOut(100);
    $('#siteOverlay').fadeOut(300);
    return false;
}

/**
 * Handle the overlay
 */
function overlaySize()
{
    $('#siteOverlay').css('height', $(document.body).outerHeight(true)).css('width', $(document.body).outerWidth(true)).fadeTo(300, siteOverlayOpacity);
}

/**
 * Facebook Login
 */
$.facebookLogin = function(perms)
{
    FB.login(function(response)
    {
        }, {
            scope   : perms,
            display : 'iframe'
        });

    if (response.status == 'connected') {
        accessToken = response.authResponse.accessToken;
        userID      = response.authResponse.userID;
        return true;
    } else {
        return false;
    }
}

/**
 * Facebook Event Subscription
 * maybe | attending | declined
 *
 * @see http://developers.facebook.com/docs/reference/api/event/
 */
$.facebookEventSubscription = function(ID)
{
    // Get the Event ID and Subscription Type
    var eventID = $('#' + ID).data('eventID');
    var requestURL = '/' + eventID + '/attending?access_token=' + accessToken;

    FB.api(requestURL, 'post');

    return false;
}

/**
 * Facebook Stream Publish
 */
$.facebookStreamPublish = function(id)
{
    FB.ui(
    {
        method      : 'feed',
        name        : facebookShare[id][0].name,
        link        : facebookShare[id][0].link,
        picture     : facebookShare[id][0].picture,
        caption     : facebookShare[id][0].caption,
        description : facebookShare[id][0].description,
        message     : facebookShare[id][0].message
    },
    function(response)
    {
        if (response && response.post_id) {
            return true;
        } else {
            return false;
        }
    });

    return false;
}