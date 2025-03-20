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
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            loading.style.display = 'none';
            
            if (data.status === 'success') {
                sentMessage.style.display = 'block';
                form.reset();
            } else {
                errorMessage.textContent = data.message;
                errorMessage.style.display = 'block';
            }
        })
        .catch(error => {
            loading.style.display = 'none';
            errorMessage.textContent = 'An error occurred. Please try again later.';
            errorMessage.style.display = 'block';
        });
    });
}); 