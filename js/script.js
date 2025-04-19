document.addEventListener('DOMContentLoaded', () => {
    console.log('Social Map App started');

    const modal = document.getElementById('modal');
    const nameInput = document.getElementById('name-input');
    const jobTitleInput = document.getElementById('job-title-input');
    const imageUpload = document.getElementById('image-upload');
    const imageDescription = document.getElementById('image-description');
    const imagePreview = document.getElementById('image-preview');
    const generateImageBtn = document.getElementById('generate-image-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const accountsContainer = document.getElementById('accounts-container');

    // Show modal when clicking anywhere on the screen
    document.body.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    // Generate placeholder image (placeholder for actual text-to-image generator logic)
    generateImageBtn.addEventListener('click', () => {
        const description = imageDescription.value.trim();
        if (description) {
            // Placeholder: Replace with actual text-to-image generator API
            alert(`Generating image for: "${description}"`);
            imagePreview.src = 'img/placeholder.jpg'; // Placeholder image
        }
    });

    // Update image preview when uploading a file
    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Confirm button logic
    confirmBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const jobTitle = jobTitleInput.value.trim();
        const imageSrc = imagePreview.src;

        if (!name || !jobTitle) {
            alert('Please fill in both name and job title!');
            return;
        }

        // Create account node
        const account = document.createElement('div');
        account.classList.add('account');

        const img = document.createElement('img');
        img.src = imageSrc;
        account.appendChild(img);

        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');

        const nameElement = document.createElement('h2');
        nameElement.textContent = name;
        textContainer.appendChild(nameElement);

        const jobTitleElement = document.createElement('p');
        jobTitleElement.textContent = jobTitle;
        textContainer.appendChild(jobTitleElement);

        account.appendChild(textContainer);
        accountsContainer.appendChild(account);

        // Reset modal fields
        nameInput.value = '';
        jobTitleInput.value = '';
        imagePreview.src = 'img/placeholder.jpg';
        modal.classList.add('hidden');
    });
});
