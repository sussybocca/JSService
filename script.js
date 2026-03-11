// JSService Pro – file tree, drag‑and‑drop, CodeMirror editor
(function() {
    // ---------- Data structure ----------
    let root = {
        name: 'root',
        type: 'folder',
        children: [
            { name: 'welcome.js', type: 'file', content: '// Welcome to JSService Pro!\nconsole.log("Edit me!");' }
        ]
    };

    let selectedNode = null;          // currently selected file (for editor)
    let expandedFolders = new Set();   // store paths of expanded folders, e.g. '/root/folder1'

    // Helper to build a string path for a node (starting from root)
    function getPath(node, parentPath = '') {
        if (node === root) return '/root';
        // This is simplified; we'll store full path as an array of indices during drag/drop.
        // For expand/collapse we use a unique key: we'll generate an id during rendering.
        // We'll use a data-path attribute.
    }

    // We'll assign a unique DOM id during rendering: "node-<random>"
    // For move operations we need to locate the node in the tree. We'll use a path array of indices.
    function findNodeByPath(pathArray) {
        let node = root;
        for (let i = 1; i < pathArray.length; i++) { // skip root
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

            // Toggle for folders
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
                // Add a spacer for alignment
                const spacer = document.createElement('span');
                spacer.style.display = 'inline-block';
                spacer.style.width = '16px';
                spacer.textContent = '  ';
                div.appendChild(spacer);
            }

            const nameSpan = document.createElement('span');
            nameSpan.textContent = child.name;
            div.appendChild(nameSpan);

            // Click to select file (or folder for context)
            div.addEventListener('click', (e) => {
                if (child.type === 'file') {
                    selectFile(child, pathStr);
                }
                // For folders, you might want to toggle expand on double-click, but we'll keep single-click for selection too
                // We'll just select the folder for context (new file creation)
                selectedNode = { node: child, path: pathStr, type: child.type };
                highlightSelected(pathStr);
            });

            // Drag events
            div.addEventListener('dragstart', handleDragStart);
            div.addEventListener('dragover', handleDragOver);
            div.addEventListener('dragleave', handleDragLeave);
            div.addEventListener('drop', handleDrop);

            li.appendChild(div);

            // If folder and expanded, render children
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
        // Re-highlight selected file
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
    }

    document.getElementById('save-file').addEventListener('click', () => {
        if (selectedNode && selectedNode.type === 'file') {
            selectedNode.node.content = editor.getValue();
            document.getElementById('status').textContent = `Saved ${selectedNode.node.name}`;
        } else {
            alert('Select a file to save.');
        }
    });

    // ---------- New file / folder ----------
    function getSelectedFolder() {
        if (selectedNode && selectedNode.type === 'folder') {
            return selectedNode.node;
        }
        return root; // default to root
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

    // ---------- Drag and drop ----------
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
        if (!targetNode || targetNode.type !== 'folder') return; // only folders are drop targets

        if (!draggedPath) return;
        const sourcePathArr = draggedPath.split(',').map(Number);
        const sourceNode = findNodeByPath(sourcePathArr);
        if (!sourceNode) return;

        // Prevent dropping onto itself or its descendants
        if (sourcePathArr.join(',') === targetPath) return;
        // Check if target is inside source (would create cycle)
        if (targetPath.startsWith(draggedPath + ',')) {
            alert('Cannot move a folder into its own descendant.');
            return;
        }

        // Remove source from its parent
        const { parent: sourceParent, index: sourceIndex } = findParentAndIndex(sourcePathArr);
        if (sourceParent) {
            sourceParent.children.splice(sourceIndex, 1);
        }

        // Add to target folder
        targetNode.children.push(sourceNode);

        // Expand target folder to show result
        expandedFolders.add(targetPath);

        refreshTree();
        draggedPath = null;
    }

    // ---------- Context menu for rename/delete (basic) ----------
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

    // ---------- Initial render ----------
    refreshTree();
    // Select the first file by default
    if (root.children.length > 0 && root.children[0].type === 'file') {
        selectFile(root.children[0], '0,0');
    }
})();
