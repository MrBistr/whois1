document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name-input');
    const jobTitleInput = document.getElementById('job-title-input');
    const imageUpload = document.getElementById('image-upload');
    const addNodeBtn = document.getElementById('add-node-btn');
    const nodesContainer = document.getElementById('nodes-container');
    const nodes = [];
    let isFirstNode = true;

    // Add a new node on button click
    addNodeBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const jobTitle = jobTitleInput.value.trim();
        const file = imageUpload.files[0];

        if (!name || !jobTitle) {
            alert('Please fill in both name and job title!');
            return;
        }

        const node = document.createElement('div');
        node.classList.add('node');
        node.style.top = isFirstNode ? '50%' : `${Math.random() * 80}vh`;
        node.style.left = isFirstNode ? '50%' : `${Math.random() * 80}vw`;
        if (isFirstNode) node.style.transform = 'translate(-50%, -50%)';

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                node.appendChild(img);
            };
            reader.readAsDataURL(file);
        }

        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');
        textContainer.innerHTML = `<strong>${name}</strong><br>${jobTitle}`;

        node.appendChild(textContainer);
        nodesContainer.appendChild(node);
        nodes.push(node);

        // Reset inputs
        nameInput.value = '';
        jobTitleInput.value = '';
        imageUpload.value = '';

        isFirstNode = false;

        // Add drag-and-drop functionality to the node
        addDragAndDrop(node);
    });

    function addDragAndDrop(node) {
        node.draggable = true;

        node.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('nodeId', nodes.indexOf(node));
        });

        node.addEventListener('drop', (e) => {
            e.preventDefault();
            const fromId = e.dataTransfer.getData('nodeId');
            const fromNode = nodes[fromId];
            const line = new LeaderLine(fromNode, node, { color: 'blue', size: 2 });
        });

        node.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
    }
});