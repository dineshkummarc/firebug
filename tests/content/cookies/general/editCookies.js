function runTest()
{
    FBTest.sysout("cookies.test.editCookies; START");

    FBTest.openNewTab(basePath + "cookies/general/editCookies.php", function(win)
    {
        FBTestFireCookie.enableCookiePanel(function(win)
        {
            var panelNode = FBTest.selectPanel("cookies").panelNode;
            var cookie = FBTestFireCookie.getCookieByName(panelNode, "EditCookie3");

            editCookie(cookie);

            cookie = FBTestFireCookie.getCookieByName(panelNode, "EditCookie3");
            FBTest.compare("newvalue", cookie.cookie.value, "Check cookie value");
            FBTest.testDone("cookies.test.editCookies; DONE");
        });
    });
};

function editCookie(cookie)
{
    FBTest.ok(cookie, "Cookie must exist.");
    if (!cookie)
        return;

    var uri = FW.FBL.makeURI(basePath);
    var host = uri.host;

    FBTest.compare(host, cookie.cookie.host, "Check cookie host.");

    // Open editCookie.xul dialog and edit the value.
    FBTest.sysout("cookies.test.issue34; let's edit an existing cookie");
    return FBTestFireCookie.editCookie(cookie, function(dialog) {
        dialog.EditCookie.valueNode.value = "newvalue";
        dialog.EditCookie.onOK();
    });
}
