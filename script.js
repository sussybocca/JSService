// JSService – generate full JavaScript language as files
(function() {
    // ---------- Language data (static representation) ----------
    // This object describes the JavaScript built‑ins. You can extend it.
    const languageSpec = {
        "Global": {
            type: "folder",
            children: {
                "Infinity.js": "// Represents infinity\n// This property is read‑only.\nconsole.log(Infinity);",
                "NaN.js": "// Not‑a‑Number value\nconsole.log(NaN);",
                "undefined.js": "// Represents an undefined value\nconsole.log(undefined);",
                "eval.js": "// Evaluates JavaScript code represented as a string\nfunction eval(code) {\n    // Custom implementation\n}",
                "isFinite.js": "// Determines whether a value is finite\nfunction isFinite(value) {\n    // Custom implementation\n}",
                "isNaN.js": "// Determines whether a value is NaN\nfunction isNaN(value) {\n    // Custom implementation\n}",
                "parseFloat.js": "// Parses a string and returns a floating point number\nfunction parseFloat(string) {\n    // Custom implementation\n}",
                "parseInt.js": "// Parses a string and returns an integer\nfunction parseInt(string, radix) {\n    // Custom implementation\n}",
                "decodeURI.js": "// Decodes a URI\nfunction decodeURI(encodedURI) {\n    // Custom implementation\n}",
                "encodeURI.js": "// Encodes a URI\nfunction encodeURI(uri) {\n    // Custom implementation\n}"
            }
        },
        "Object": {
            type: "folder",
            children: {
                "Static Methods": {
                    type: "folder",
                    children: {
                        "assign.js": "// Copies properties from source objects to target\nObject.assign = function(target, ...sources) {\n    // Custom implementation\n};",
                        "create.js": "// Creates a new object with the specified prototype\nObject.create = function(proto, propertiesObject) {\n    // Custom implementation\n};",
                        "defineProperty.js": "// Defines a new property on an object\nObject.defineProperty = function(obj, prop, descriptor) {\n    // Custom implementation\n};",
                        "entries.js": "// Returns an array of [key, value] pairs\nObject.entries = function(obj) {\n    // Custom implementation\n};",
                        "freeze.js": "// Freezes an object\nObject.freeze = function(obj) {\n    // Custom implementation\n};",
                        "getPrototypeOf.js": "// Returns the prototype of an object\nObject.getPrototypeOf = function(obj) {\n    // Custom implementation\n};",
                        "keys.js": "// Returns an array of property names\nObject.keys = function(obj) {\n    // Custom implementation\n};",
                        "values.js": "// Returns an array of property values\nObject.values = function(obj) {\n    // Custom implementation\n};"
                    }
                },
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "hasOwnProperty.js": "// Returns boolean indicating own property\nObject.prototype.hasOwnProperty = function(prop) {\n    // Custom implementation\n};",
                        "toString.js": "// Returns string representation\nObject.prototype.toString = function() {\n    // Custom implementation\n};",
                        "valueOf.js": "// Returns primitive value\nObject.prototype.valueOf = function() {\n    // Custom implementation\n};"
                    }
                }
            }
        },
        "Array": {
            type: "folder",
            children: {
                "Static Methods": {
                    type: "folder",
                    children: {
                        "from.js": "// Creates array from iterable\nArray.from = function(iterable, mapFn) {\n    // Custom implementation\n};",
                        "isArray.js": "// Checks if value is array\nArray.isArray = function(value) {\n    // Custom implementation\n};",
                        "of.js": "// Creates array from arguments\nArray.of = function(...items) {\n    // Custom implementation\n};"
                    }
                },
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "concat.js": "// Merges arrays\nArray.prototype.concat = function(...args) {\n    // Custom implementation\n};",
                        "filter.js": "// Filters array\nArray.prototype.filter = function(callback, thisArg) {\n    // Custom implementation\n};",
                        "forEach.js": "// Executes function for each element\nArray.prototype.forEach = function(callback, thisArg) {\n    // Custom implementation\n};",
                        "map.js": "// Maps array\nArray.prototype.map = function(callback, thisArg) {\n    // Custom implementation\n};",
                        "pop.js": "// Removes last element\nArray.prototype.pop = function() {\n    // Custom implementation\n};",
                        "push.js": "// Adds elements to end\nArray.prototype.push = function(...items) {\n    // Custom implementation\n};",
                        "reduce.js": "// Reduces array\nArray.prototype.reduce = function(callback, initialValue) {\n    // Custom implementation\n};",
                        "reverse.js": "// Reverses array\nArray.prototype.reverse = function() {\n    // Custom implementation\n};",
                        "shift.js": "// Removes first element\nArray.prototype.shift = function() {\n    // Custom implementation\n};",
                        "slice.js": "// Returns shallow copy\nArray.prototype.slice = function(start, end) {\n    // Custom implementation\n};",
                        "sort.js": "// Sorts array\nArray.prototype.sort = function(compareFn) {\n    // Custom implementation\n};",
                        "splice.js": "// Changes array by removing/replacing elements\nArray.prototype.splice = function(start, deleteCount, ...items) {\n    // Custom implementation\n};",
                        "unshift.js": "// Adds elements to beginning\nArray.prototype.unshift = function(...items) {\n    // Custom implementation\n};"
                    }
                }
            }
        },
        "String": {
            type: "folder",
            children: {
                "Static Methods": {
                    type: "folder",
                    children: {
                        "fromCharCode.js": "// Creates string from Unicode values\nString.fromCharCode = function(...codes) {\n    // Custom implementation\n};",
                        "fromCodePoint.js": "// Creates string from code points\nString.fromCodePoint = function(...codePoints) {\n    // Custom implementation\n};"
                    }
                },
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "charAt.js": "// Returns character at index\nString.prototype.charAt = function(index) {\n    // Custom implementation\n};",
                        "concat.js": "// Concatenates strings\nString.prototype.concat = function(...strings) {\n    // Custom implementation\n};",
                        "includes.js": "// Checks if substring exists\nString.prototype.includes = function(search, start) {\n    // Custom implementation\n};",
                        "indexOf.js": "// Returns index of first occurrence\nString.prototype.indexOf = function(search, fromIndex) {\n    // Custom implementation\n};",
                        "match.js": "// Matches regex\nString.prototype.match = function(regexp) {\n    // Custom implementation\n};",
                        "replace.js": "// Replaces substring\nString.prototype.replace = function(pattern, replacement) {\n    // Custom implementation\n};",
                        "slice.js": "// Extracts section\nString.prototype.slice = function(start, end) {\n    // Custom implementation\n};",
                        "split.js": "// Splits into array\nString.prototype.split = function(separator, limit) {\n    // Custom implementation\n};",
                        "toLowerCase.js": "// Converts to lower case\nString.prototype.toLowerCase = function() {\n    // Custom implementation\n};",
                        "toUpperCase.js": "// Converts to upper case\nString.prototype.toUpperCase = function() {\n    // Custom implementation\n};",
                        "trim.js": "// Removes whitespace\nString.prototype.trim = function() {\n    // Custom implementation\n};"
                    }
                }
            }
        },
        "Number": {
            type: "folder",
            children: {
                "Static Properties": {
                    type: "folder",
                    children: {
                        "MAX_VALUE.js": "// The maximum numeric value\nconsole.log(Number.MAX_VALUE);",
                        "MIN_VALUE.js": "// The minimum positive value\nconsole.log(Number.MIN_VALUE);",
                        "NaN.js": "// Not‑a‑Number\nconsole.log(Number.NaN);",
                        "POSITIVE_INFINITY.js": "// Infinity\nconsole.log(Number.POSITIVE_INFINITY);"
                    }
                },
                "Static Methods": {
                    type: "folder",
                    children: {
                        "isFinite.js": "// Checks if value is finite\nNumber.isFinite = function(value) {\n    // Custom implementation\n};",
                        "isInteger.js": "// Checks if value is integer\nNumber.isInteger = function(value) {\n    // Custom implementation\n};",
                        "isNaN.js": "// Checks if value is NaN\nNumber.isNaN = function(value) {\n    // Custom implementation\n};"
                    }
                },
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "toFixed.js": "// Formats with fixed decimals\nNumber.prototype.toFixed = function(digits) {\n    // Custom implementation\n};",
                        "toString.js": "// Returns string representation\nNumber.prototype.toString = function(radix) {\n    // Custom implementation\n};"
                    }
                }
            }
        },
        "Math": {
            type: "folder",
            children: {
                "Properties": {
                    type: "folder",
                    children: {
                        "PI.js": "// Ratio of circle circumference to diameter\nconsole.log(Math.PI);",
                        "E.js": "// Euler's number\nconsole.log(Math.E);"
                    }
                },
                "Methods": {
                    type: "folder",
                    children: {
                        "abs.js": "// Absolute value\nMath.abs = function(x) {\n    // Custom implementation\n};",
                        "ceil.js": "// Rounds up\nMath.ceil = function(x) {\n    // Custom implementation\n};",
                        "floor.js": "// Rounds down\nMath.floor = function(x) {\n    // Custom implementation\n};",
                        "max.js": "// Returns largest\nMath.max = function(...values) {\n    // Custom implementation\n};",
                        "min.js": "// Returns smallest\nMath.min = function(...values) {\n    // Custom implementation\n};",
                        "pow.js": "// Raises to power\nMath.pow = function(base, exponent) {\n    // Custom implementation\n};",
                        "random.js": "// Returns random number\nMath.random = function() {\n    // Custom implementation\n};",
                        "round.js": "// Rounds to nearest\nMath.round = function(x) {\n    // Custom implementation\n};",
                        "sqrt.js": "// Square root\nMath.sqrt = function(x) {\n    // Custom implementation\n};"
                    }
                }
            }
        },
        "Date": {
            type: "folder",
            children: {
                "Static Methods": {
                    type: "folder",
                    children: {
                        "now.js": "// Returns current timestamp\nDate.now = function() {\n    // Custom implementation\n};",
                        "parse.js": "// Parses date string\nDate.parse = function(dateString) {\n    // Custom implementation\n};",
                        "UTC.js": "// Returns UTC timestamp\nDate.UTC = function(year, month, day, hour, minute, second) {\n    // Custom implementation\n};"
                    }
                },
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "getDate.js": "// Returns day of month\nDate.prototype.getDate = function() {\n    // Custom implementation\n};",
                        "getDay.js": "// Returns day of week\nDate.prototype.getDay = function() {\n    // Custom implementation\n};",
                        "getFullYear.js": "// Returns year\nDate.prototype.getFullYear = function() {\n    // Custom implementation\n};",
                        "getHours.js": "// Returns hours\nDate.prototype.getHours = function() {\n    // Custom implementation\n};",
                        "getMilliseconds.js": "// Returns milliseconds\nDate.prototype.getMilliseconds = function() {\n    // Custom implementation\n};",
                        "getMinutes.js": "// Returns minutes\nDate.prototype.getMinutes = function() {\n    // Custom implementation\n};",
                        "getMonth.js": "// Returns month\nDate.prototype.getMonth = function() {\n    // Custom implementation\n};",
                        "getSeconds.js": "// Returns seconds\nDate.prototype.getSeconds = function() {\n    // Custom implementation\n};",
                        "getTime.js": "// Returns timestamp\nDate.prototype.getTime = function() {\n    // Custom implementation\n};"
                    }
                }
            }
        },
        "RegExp": {
            type: "folder",
            children: {
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "exec.js": "// Executes regex\nRegExp.prototype.exec = function(string) {\n    // Custom implementation\n};",
                        "test.js": "// Tests regex\nRegExp.prototype.test = function(string) {\n    // Custom implementation\n};"
                    }
                }
            }
        },
        "Error": {
            type: "folder",
            children: {
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "toString.js": "// Returns error message\nError.prototype.toString = function() {\n    // Custom implementation\n};"
                    }
                }
            }
        },
        "JSON": {
            type: "folder",
            children: {
                "Static Methods": {
                    type: "folder",
                    children: {
                        "parse.js": "// Parses JSON string\nJSON.parse = function(text, reviver) {\n    // Custom implementation\n};",
                        "stringify.js": "// Converts to JSON string\nJSON.stringify = function(value, replacer, space) {\n    // Custom implementation\n};"
                    }
                }
            }
        },
        "Promise": {
            type: "folder",
            children: {
                "Static Methods": {
                    type: "folder",
                    children: {
                        "resolve.js": "// Returns resolved promise\nPromise.resolve = function(value) {\n    // Custom implementation\n};",
                        "reject.js": "// Returns rejected promise\nPromise.reject = function(reason) {\n    // Custom implementation\n};",
                        "all.js": "// Waits for all promises\nPromise.all = function(iterable) {\n    // Custom implementation\n};",
                        "race.js": "// Waits for first promise\nPromise.race = function(iterable) {\n    // Custom implementation\n};"
                    }
                },
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "then.js": "// Attaches fulfillment handler\nPromise.prototype.then = function(onFulfilled, onRejected) {\n    // Custom implementation\n};",
                        "catch.js": "// Attaches rejection handler\nPromise.prototype.catch = function(onRejected) {\n    // Custom implementation\n};",
                        "finally.js": "// Attaches handler regardless\nPromise.prototype.finally = function(onFinally) {\n    // Custom implementation\n};"
                    }
                }
            }
        }
    };

    // Helper to convert nested object to our node structure
    function buildTree(spec, name = 'root') {
        if (spec.type === 'folder') {
            const children = [];
            for (const [key, value] of Object.entries(spec.children)) {
                if (value.type === 'folder' || typeof value === 'object' && value.children) {
                    children.push(buildTree(value, key));
                } else {
                    // It's a file (string content)
                    children.push({
                        name: key,
                        type: 'file',
                        content: value
                    });
                }
            }
            return {
                name: name,
                type: 'folder',
                children: children
            };
        } else {
            // Not used at top level
            return null;
        }
    }

    // The root of our file system
    let root = {
        name: 'root',
        type: 'folder',
        children: []  // initially empty
    };

    let selectedNode = null;
    let expandedFolders = new Set();

    // ---------- Tree utilities ----------
    function findNodeByPath(pathArray) {
        let node = root;
        for (let i = 1; i < pathArray.length; i++) {
            const idx = pathArray[i];
            if (node.children && node.children[idx]) {
                node = node.children[idx];
            } else {
                return null;
            }
        }
        return node;
    }

    function findParentAndIndex(pathArray) {
        if (pathArray.length < 2) return { parent: null, index: -1 };
        const parentPath = pathArray.slice(0, -1);
        const parent = findNodeByPath(parentPath);
        const index = pathArray[pathArray.length - 1];
        return { parent, index };
    }

    // Render tree recursively
    function renderTree(container, node = root, path = [0]) {
        const ul = document.createElement('ul');
        ul.className = 'tree';

        node.children.forEach((child, idx) => {
            const li = document.createElement('li');
            const currentPath = path.concat(idx);
            const pathStr = currentPath.join(',');

            const div = document.createElement('div');
            div.className = child.type === 'folder' ? 'folder' : 'file';
            div.setAttribute('data-path', pathStr);
            div.setAttribute('draggable', 'true');
            div.setAttribute('data-type', child.type);

            if (child.type === 'folder') {
                const toggle = document.createElement('span');
                toggle.className = 'collapse-toggle';
                toggle.textContent = expandedFolders.has(pathStr) ? '▼ ' : '▶ ';
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (expandedFolders.has(pathStr)) {
                        expandedFolders.delete(pathStr);
                    } else {
                        expandedFolders.add(pathStr);
                    }
                    refreshTree();
                });
                div.appendChild(toggle);
            } else {
                const spacer = document.createElement('span');
                spacer.style.display = 'inline-block';
                spacer.style.width = '16px';
                spacer.textContent = '  ';
                div.appendChild(spacer);
            }

            const nameSpan = document.createElement('span');
            nameSpan.textContent = child.name;
            div.appendChild(nameSpan);

            div.addEventListener('click', (e) => {
                if (child.type === 'file') {
                    selectFile(child, pathStr);
                } else {
                    selectedNode = { node: child, path: pathStr, type: 'folder' };
                }
                highlightSelected(pathStr);
            });

            // Drag events for internal moves
            div.addEventListener('dragstart', handleDragStart);
            div.addEventListener('dragover', handleDragOver);
            div.addEventListener('dragleave', handleDragLeave);
            div.addEventListener('drop', handleDrop);

            li.appendChild(div);

            if (child.type === 'folder' && expandedFolders.has(pathStr)) {
                const childUl = renderTree(document.createElement('ul'), child, currentPath);
                li.appendChild(childUl);
            }

            ul.appendChild(li);
        });

        container.innerHTML = '';
        container.appendChild(ul);
        return ul;
    }

    function refreshTree() {
        const container = document.getElementById('tree-container');
        renderTree(container, root, [0]);
        if (selectedNode && selectedNode.path) {
            highlightSelected(selectedNode.path);
        }
    }

    function highlightSelected(pathStr) {
        document.querySelectorAll('.tree .selected').forEach(el => el.classList.remove('selected'));
        const selectedDiv = document.querySelector(`[data-path="${pathStr}"]`);
        if (selectedDiv) selectedDiv.classList.add('selected');
    }

    // ---------- Editor ----------
    let editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'default',
        indentUnit: 4
    });

    function selectFile(fileNode, pathStr) {
        selectedNode = { node: fileNode, path: pathStr, type: 'file' };
        document.getElementById('current-file').textContent = fileNode.name;
        editor.setValue(fileNode.content || '');
        highlightSelected(pathStr);
        document.getElementById('output').style.display = 'none';
    }

    document.getElementById('save-file').addEventListener('click', () => {
        if (selectedNode && selectedNode.type === 'file') {
            selectedNode.node.content = editor.getValue();
            document.getElementById('status').textContent = `Saved ${selectedNode.node.name}`;
        } else {
            alert('Select a file to save.');
        }
    });

    // ---------- New file / folder (same as before) ----------
    function getSelectedFolder() {
        if (selectedNode && selectedNode.type === 'folder') {
            return selectedNode.node;
        }
        return root;
    }

    document.getElementById('new-file').addEventListener('click', () => {
        const name = prompt('Enter file name (e.g., script.js):');
        if (!name) return;
        if (!name.endsWith('.js')) {
            alert('Convention: use .js extension for JavaScript files.');
        }
        const parent = getSelectedFolder();
        parent.children.push({ name, type: 'file', content: '' });
        refreshTree();
    });

    document.getElementById('new-folder').addEventListener('click', () => {
        const name = prompt('Enter folder name:');
        if (!name) return;
        const parent = getSelectedFolder();
        parent.children.push({ name, type: 'folder', children: [] });
        refreshTree();
    });

    // ---------- Drag and drop (internal) ----------
    let draggedPath = null;

    function handleDragStart(e) {
        const div = e.target.closest('[data-path]');
        if (!div) return;
        draggedPath = div.dataset.path;
        e.dataTransfer.setData('text/plain', draggedPath);
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const div = e.target.closest('[data-path]');
        if (div && div.dataset.type === 'folder') {
            div.classList.add('drag-over');
        }
    }

    function handleDragLeave(e) {
        const div = e.target.closest('[data-path]');
        if (div) div.classList.remove('drag-over');
    }

    function handleDrop(e) {
        e.preventDefault();
        const targetDiv = e.target.closest('[data-path]');
        if (!targetDiv) return;
        targetDiv.classList.remove('drag-over');

        const targetPath = targetDiv.dataset.path;
        const targetNode = findNodeByPath(targetPath.split(',').map(Number));
        if (!targetNode || targetNode.type !== 'folder') return;

        if (!draggedPath) return;
        const sourcePathArr = draggedPath.split(',').map(Number);
        const sourceNode = findNodeByPath(sourcePathArr);
        if (!sourceNode) return;

        if (sourcePathArr.join(',') === targetPath) return;
        if (targetPath.startsWith(draggedPath + ',')) {
            alert('Cannot move a folder into its own descendant.');
            return;
        }

        const { parent: sourceParent, index: sourceIndex } = findParentAndIndex(sourcePathArr);
        if (sourceParent) {
            sourceParent.children.splice(sourceIndex, 1);
        }

        targetNode.children.push(sourceNode);
        expandedFolders.add(targetPath);
        refreshTree();
        draggedPath = null;
    }

    // ---------- Generate language tree from spec ----------
    function loadLanguageTree() {
        // Convert the languageSpec into our node structure
        const languageRoot = {
            name: 'JavaScript Language',
            type: 'folder',
            children: []
        };
        for (const [key, value] of Object.entries(languageSpec)) {
            if (value.type === 'folder') {
                const folder = {
                    name: key,
                    type: 'folder',
                    children: []
                };
                // Recursively add children
                function addChildren(parentSpec, parentNode) {
                    for (const [childKey, childValue] of Object.entries(parentSpec.children)) {
                        if (childValue.type === 'folder') {
                            const subFolder = {
                                name: childKey,
                                type: 'folder',
                                children: []
                            };
                            parentNode.children.push(subFolder);
                            addChildren(childValue, subFolder);
                        } else {
                            // It's a file with content
                            parentNode.children.push({
                                name: childKey,
                                type: 'file',
                                content: childValue
                            });
                        }
                    }
                }
                addChildren(value, folder);
                languageRoot.children.push(folder);
            }
        }
        // Replace root children with language tree
        root.children = languageRoot.children;
        // Expand all top‑level folders for better visibility
        expandedFolders.clear();
        refreshTree();
        document.getElementById('status').textContent = 'JavaScript language tree loaded.';
    }

    // ---------- Handle file drops: trigger language generation ----------
    const dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', (e) => {
        dropZone.classList.remove('dragover');
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        // Ignore the actual file – just generate the language tree
        loadLanguageTree();
    });

    // Also add a button to load manually
    document.getElementById('load-language').addEventListener('click', loadLanguageTree);

    // ---------- Context menu (rename/delete) ----------
    document.addEventListener('contextmenu', (e) => {
        const div = e.target.closest('[data-path]');
        if (!div) return;
        e.preventDefault();
        const path = div.dataset.path;
        const node = findNodeByPath(path.split(',').map(Number));
        if (!node) return;

        const action = prompt('Type "rename" to rename, "delete" to delete:');
        if (action === 'rename') {
            const newName = prompt('New name:', node.name);
            if (newName) {
                node.name = newName;
                refreshTree();
            }
        } else if (action === 'delete') {
            if (confirm(`Delete ${node.name}?`)) {
                const { parent, index } = findParentAndIndex(path.split(',').map(Number));
                if (parent) {
                    parent.children.splice(index, 1);
                    if (selectedNode && selectedNode.path === path) {
                        selectedNode = null;
                        document.getElementById('current-file').textContent = 'No file selected';
                        editor.setValue('');
                    }
                    refreshTree();
                }
            }
        }
    });

    // ---------- Export project as ZIP ----------
    document.getElementById('download-project').addEventListener('click', () => {
        const zip = new JSZip();
        function addToZip(node, currentPath = '') {
            if (node.type === 'file') {
                zip.file(currentPath + node.name, node.content || '');
            } else {
                const folder = zip.folder(currentPath + node.name);
                node.children.forEach(child => addToZip(child, node.name + '/'));
            }
        }
        root.children.forEach(child => addToZip(child, ''));
        zip.generateAsync({ type: 'blob' }).then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'project.zip';
            a.click();
            URL.revokeObjectURL(url);
        });
    });

    // ---------- Run file (sandboxed) ----------
    document.getElementById('run-file').addEventListener('click', () => {
        if (!selectedNode || selectedNode.type !== 'file') {
            alert('Select a JavaScript file to run.');
            return;
        }

        const code = editor.getValue();
        if (!confirm('You are about to execute this code in a sandboxed iframe. You are solely responsible for what it does. Continue?')) {
            return;
        }

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.sandbox = 'allow-scripts';
        document.body.appendChild(iframe);

        const outputDiv = document.getElementById('output');
        outputDiv.style.display = 'block';
        outputDiv.textContent = '';

        const iframeWindow = iframe.contentWindow;
        iframeWindow.console.log = (...args) => {
            outputDiv.textContent += args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ') + '\n';
        };
        iframeWindow.console.error = (...args) => {
            outputDiv.textContent += 'ERROR: ' + args.map(arg => String(arg)).join(' ') + '\n';
        };

        try {
            const script = iframeWindow.document.createElement('script');
            script.textContent = code;
            iframeWindow.document.body.appendChild(script);
        } catch (e) {
            outputDiv.textContent += 'Execution error: ' + e.message;
        }

        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    });

    // ---------- Initial render (empty) ----------
    refreshTree();
})();
