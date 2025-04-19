document.addEventListener('DOMContentLoaded', () => {
    const instructionWindow = document.getElementById('instruction-window');
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('close-modal');
    const nameInput = document.getElementById('name-input');
    const jobTitleInput = document.getElementById('job-title-input');
    const imageUpload = document.getElementById('image-upload');
    const confirmBtn = document.getElementById('confirm-btn');
    const nodesContainer = document.getElementById('nodes-container');
    const nodes = [];
    let isFirstNode = true;

    // Hide instruction window on click anywhere
    document.body.addEventListener('click', () => {
        if (instructionWindow) {
            instructionWindow.remove();
        }
        modal.classList.remove('hidden');
    });

    // Close modal on close button or clicking outside
    closeModalButton.addEventListener('click', () => closeModal());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.add('hidden');
        nameInput.value = '';
        jobTitleInput.value = '';
        imageUpload.value = '';
    }

    // Confirm and create a node
    confirmBtn.addEventListener('click', () => {
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

        isFirstNode = false;
        closeModal();
    });
});