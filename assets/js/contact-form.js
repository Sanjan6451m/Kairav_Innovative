document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.php-email-form');
    const loading = form.querySelector('.loading');
    const errorMessage = form.querySelector('.error-message');
    const sentMessage = form.querySelector('.sent-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading message
        loading.style.display = 'block';
        errorMessage.style.display = 'none';
        sentMessage.style.display = 'none';

        // Get form data
        const formData = new FormData(form);

        // Send form data using FormSubmit
        fetch('https://formsubmit.co/ajax/sanjan.m@softcons.net', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            loading.style.display = 'none';
            
            if (data.success) {
                sentMessage.style.display = 'block';
                form.reset();
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        })
        .catch(error => {
            loading.style.display = 'none';
            errorMessage.textContent = 'An error occurred. Please try again later.';
            errorMessage.style.display = 'block';
            console.error('Form submission error:', error);
        });
    });
}); 