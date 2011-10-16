Ext.onReady(codeblender.app.init, codeblender.app);

Ext.BLANK_IMAGE_URL = 'http://static.triangle-solutions.com/images/ajax/s.gif';

// Instantiate the quick tips
Ext.QuickTips.init();

var xg = Ext.grid;

if (Ext.ux.grid) {
    if (Ext.ux.grid.RowEditor) {
        // Use RowEditor for editing
        var rowEditor = new Ext.ux.grid.RowEditor({
            errorSummary : false,
            saveText     : 'Update'
        });
    }
}

// The DataWriter component.
var writer = new Ext.data.JsonWriter({
    encode         : false,
    writeAllFields : false
});

// Message function for the file upload
var msg = function(title, msg, type) {

    if (type == 'error') {
        var icon = Ext.Msg.ERROR;
    } else {
        icon = Ext.Msg.INFO;
    }

    Ext.Msg.show({
        buttons  : Ext.Msg.OK,
        icon     : icon,
        msg      : msg,
        minWidth : 200,
        modal    : true,
        msg      : msg,
        title    : title
    });
};

// Method to handle console message being displayed
var debug = function debugSend(debugText, functionCalled)
{
    console.info('Method: %o - Object: %o', functionCalled, debugText);
}
