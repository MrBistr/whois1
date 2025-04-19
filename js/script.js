document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const nameInput = document.getElementById('name-input');
    const jobTitleInput = document.getElementById('job-title-input');
    const imageUpload = document.getElementById('image-upload');
    const imageDescription = document.getElementById('image-description');
    const imagePreview = document.getElementById('image-preview');
    const generateImageBtn = document.getElementById('generate-image-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const nodesContainer = document.getElementById('nodes-container');
    const API_URL = 'https://api.example.com/generate-image'; // Replace with the actual API endpoint
    const API_KEY = 'your-api-key-here'; // Replace with your API key
    let nodes = [];
    let lines = [];

    // Show modal when clicking anywhere on the screen
    document.body.addEventListener('click', () => modal.classList.remove('hidden'));

    // Generate image from text description
    generateImageBtn.addEventListener('click', async () => {
        const description = imageDescription.value.trim();
        if (!description) {
            alert('Please provide a description to generate an image!');
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({ prompt: description })
            });

            if (!response.ok) throw new Error('Error generating image');

            const data = await response.json();
            imagePreview.src = data.image_url || 'img/placeholder.jpg';
        } catch (error) {
            console.error(error);
            alert('Error generating image.');
        }
    });

    // Update image preview on file upload
    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => (imagePreview.src = e.target.result);
            reader.readAsDataURL(file);
        }
    });

    // Confirm and create a node
    confirmBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const jobTitle = jobTitleInput.value.trim();
        const imageSrc = imagePreview.src;

        if (!name || !jobTitle) {
            alert('Please fill in both name and job title!');
            return;
        }

        const node = document.createElement('div');
        node.classList.add('node');
        node.draggable = true;
        node.style.top = `${Math.random() * 80}vh`;
        node.style.left = `${Math.random() * 80}vw`;

        const img = document.createElement('img');
        img.src = imageSrc;
        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');
        textContainer.innerHTML = `<strong>${name}</strong><br>${jobTitle}`;

        node.appendChild(img);
        node.appendChild(textContainer);
        nodesContainer.appendChild(node);
        nodes.push(node);

        node.addEventListener('dragstart', (e) => (e.dataTransfer.setData('nodeId', nodes.indexOf(node))));
        node.addEventListener('drop', (e) => {
            e.preventDefault();
            const fromId = e.dataTransfer.getData('nodeId');
            const fromNode = nodes[fromId];
            const line = new LeaderLine(fromNode, node, { color: 'blue', size: 2 });
            lines.push(line);
        });
        node.addEventListener('dragover', (e) => e.preventDefault());

        modal.classList.add('hidden');
    });
});
