document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.querySelector('.submit-btn');

    // Function to validate email format
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Function to show error
    function showError(input, message) {
        const inputGroup = input.parentElement;
        const errorDisplay = inputGroup.querySelector('.error-msg');
        
        input.classList.add('error');
        errorDisplay.textContent = message;
    }

    // Function to clear error
    function clearError(input) {
        const inputGroup = input.parentElement;
        input.classList.remove('error');
        inputGroup.querySelector('.error-msg').textContent = '';
    }

    // Event Listener for Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page from reloading

        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        // Validate Name
        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            clearError(name);
        }

        // Validate Email
        if (email.value.trim() === '' || !isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            clearError(email);
        }

        // Validate Subject
        if (subject.value.trim() === '') {
            showError(subject, 'Subject is required');
            isValid = false;
        } else {
            clearError(subject);
        }

        // Validate Message
        if (message.value.trim() === '') {
            showError(message, 'Message cannot be empty');
            isValid = false;
        } else {
            clearError(message);
        }

        // If everything is valid
        if (isValid) {
            // Simulate sending (In real life, you would use fetch() here)
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show success message
                successMessage.style.display = 'block';
                form.reset();
                
                // Reset button
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 1500); // 1.5 second delay to simulate network request
        }
    });
});