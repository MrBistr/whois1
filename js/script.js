document.addEventListener('DOMContentLoaded', () => {
    console.log('Social Map App started');

    const createAccountBtn = document.getElementById('create-account-btn');
    const formContainer = document.getElementById('form-container');
    const submitBtn = document.getElementById('submit-btn');
    const nameInput = document.getElementById('name-input');
    const jobTitleInput = document.getElementById('job-title-input');
    const accountsContainer = document.getElementById('accounts-container');

    // Avatar image (you can add more options)
    const avatarImage = '../img/avatar1.jpg';

    // Show the form when "Create Account" is clicked
    createAccountBtn.addEventListener('click', () => {
        formContainer.classList.remove('hidden');
    });

    // Handle form submission
    submitBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const jobTitle = jobTitleInput.value.trim();

        if (!name || !jobTitle) {
            alert('Please enter both a name and a job title!');
            return;
        }

        // Create the account
        const account = document.createElement('div');
        account.classList.add('account');

        // Add the avatar image
        const img = document.createElement('img');
        img.src = avatarImage;
        account.appendChild(img);

        // Add the name and job title
        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');

        const nameElement = document.createElement('h2');
        nameElement.textContent = name;
        textContainer.appendChild(nameElement);

        const jobTitleElement = document.createElement('p');
        jobTitleElement.textContent = jobTitle;
        textContainer.appendChild(jobTitleElement);

        account.appendChild(textContainer);

        // Add the account to the container
        accountsContainer.appendChild(account);

        // Clear inputs and hide the form
        nameInput.value = '';
        jobTitleInput.value = '';
        formContainer.classList.add('hidden');
    });
});
