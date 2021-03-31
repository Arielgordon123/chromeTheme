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
    "$IND",
    function(sidebar) {
        function updateElementProperties() {
            sidebar.setExpression("(" + page_getProperties.toString() + ")()");
        }
        updateElementProperties();
        chrome.devtools.panels.elements.onSelectionChanged.addListener(
            updateElementProperties);
    });

var page_getProperties2 = function() {
    var data = window.jQuery && $0 ? jQuery.data($0) : {};
    // Make a shallow copy with a null prototype, so that sidebar does not
    // expose prototype.
    var props = Object.getOwnPropertyNames(data);
    var copy = { __proto__: null };
    for (var i = 0; i < props.length; ++i)
        copy[props[i]] = data[props[i]];
    return copy;
}

chrome.devtools.panels.elements.createSidebarPane(
    "jQuery",
    function(sidebar) {
        function updateElementProperties() {
            sidebar.setExpression("(" + page_getProperties2.toString() + ")()");
        }
        updateElementProperties();
        chrome.devtools.panels.elements.onSelectionChanged.addListener(
            updateElementProperties);
    });


const findReactComponent = () => {
    let el = $0;
    const data = {}
    for (const key in el) {
        if (key.startsWith('__reactInternalInstance$') || key.startsWith('__reactFiber$')) {
            const fiberNode = el[key];
            data.Instance = { fiberNode, 'fiberNode.return': {...fiberNode.return }, 'stateNode': {...fiberNode.return.stateNode } };
        }
        if (key.startsWith('__reactEventHandlers$') || key.startsWith('__reactProps$')) {
            const fiberNode = el[key];
            data.Handlers = {...fiberNode };
        }
    }

    return data ? data : null;
};

chrome.devtools.panels.elements.createSidebarPane(
    "React",
    function(sidebar) {
        function updateElementProperties() {
            sidebar.setExpression("(" + findReactComponent.toString() + ")()");
        }
        updateElementProperties();
        chrome.devtools.panels.elements.onSelectionChanged.addListener(
            updateElementProperties);
    });
const findVueComponent = () => {
    let el = $0;
    const data = {}
    for (const key in el) {
        if (key.startsWith('__vue')) {
            const fiberNode = el[key];
            return fiberNode;
        }
    }
};

chrome.devtools.panels.elements.createSidebarPane(
    "Vue",
    function(sidebar) {
        function updateElementProperties() {
            sidebar.setExpression("(" + findVueComponent.toString() + ")()");
        }
        updateElementProperties();
        chrome.devtools.panels.elements.onSelectionChanged.addListener(
            updateElementProperties);
    });
