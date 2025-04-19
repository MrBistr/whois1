document.addEventListener('DOMContentLoaded', () => {
    console.log('Social Map App started');

    const createAccountBtn = document.getElementById('create-account-btn');
    const accountsContainer = document.getElementById('accounts-container');

    // Array of random images for account avatars
    const randomImages = [
        '../img/avatar1.jpg',
        '../img/avatar2.jpg',
        '../img/avatar3.jpg',
        '../img/avatar4.jpg'
    ];

    // Function to create a new account
    function createAccount() {
        // Create account container
        const account = document.createElement('div');
        account.classList.add('account');

        // Randomly select an avatar image
        const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
        const img = document.createElement('img');
        img.src = randomImage;
        account.appendChild(img);

        // Create text container
        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');

        // Add name input
        const name = document.createElement('h2');
        name.textContent = 'Name';
        textContainer.appendChild(name);

        // Add job title input
        const jobTitle = document.createElement('p');
        jobTitle.textContent = 'Job Title';
        textContainer.appendChild(jobTitle);

        account.appendChild(textContainer);

        // Add the account to the container
        accountsContainer.appendChild(account);
    }

    // Add event listener to the "Create Account" button
    createAccountBtn.addEventListener('click', createAccount);
});
