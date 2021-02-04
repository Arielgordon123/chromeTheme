var x = new XMLHttpRequest();
x.open('GET', 'style.css');
x.onload = function() {
    chrome.devtools.panels.applyStyleSheet(x.responseText);
};
x.send();



var page_getProperties = function() {
    var data = window.$IND && $0 ? $IND.data($0) : {};
    // Make a shallow copy with a null prototype, so that sidebar does not
    // expose prototype.
    var props = Object.getOwnPropertyNames(data);
    var copy = { __proto__: null };
    for (var i = 0; i < props.length; ++i)
        copy[props[i]] = data[props[i]];
    return copy;
}

chrome.devtools.panels.elements.createSidebarPane(
    "jQuery Properties",
    function(sidebar) {
        function updateElementProperties() {
            sidebar.setExpression("(" + page_getProperties.toString() + ")()");
        }
        updateElementProperties();
        chrome.devtools.panels.elements.onSelectionChanged.addListener(
            updateElementProperties);
    });