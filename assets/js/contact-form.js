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

        // Send form data using fetch
        fetch('http://localhost:8000/forms/contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    try {
                        return JSON.parse(text);
                    } catch (e) {
                        throw new Error('Server error: ' + text);
                    }
                });
            }
            return response.text().then(text => {
                try {
                    return JSON.parse(text);
                } catch (e) {
                    throw new Error('Invalid JSON response: ' + text);
                }
            });
        })
        .then(data => {
            loading.style.display = 'none';
            
            if (data.status === 'success') {
                sentMessage.style.display = 'block';
                form.reset();
            } else {
                throw new Error(data.message || 'Unknown error occurred');
            }
        })
        .catch(error => {
            loading.style.display = 'none';
            errorMessage.textContent = error.message || 'An error occurred. Please try again later.';
            errorMessage.style.display = 'block';
            console.error('Form submission error:', error);
        });
    });
}); 