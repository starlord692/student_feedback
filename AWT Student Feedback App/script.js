// DOM Elements
const feedbackForm = document.getElementById('feedbackForm');
const successMessage = document.getElementById('successMessage');
const resetBtn = document.getElementById('resetBtn');
const starRating = document.getElementById('starRating');
const stars = starRating.querySelectorAll('i');
const ratingInput = document.getElementById('rating');
const ratingText = document.getElementById('ratingText');
const commentsTextarea = document.getElementById('comments');
const charCount = document.getElementById('charCount');

// Rating labels
const ratingLabels = [
    'Click to rate',
    'Poor',
    'Fair',
    'Good',
    'Very Good',
    'Excellent'
];

// Initialize star rating
function initStarRating() {
    stars.forEach(star => {
        // Click event
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            setRating(rating);
        });

        // Hover effects
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            highlightStars(rating);
        });
    });

    // Reset stars on mouse leave from container
    starRating.addEventListener('mouseleave', () => {
        const currentRating = parseInt(ratingInput.value);
        highlightStars(currentRating);
    });
}

// Highlight stars up to the given rating
function highlightStars(rating) {
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
}

// Set the rating
function setRating(rating) {
    ratingInput.value = rating;
    ratingText.textContent = ratingLabels[rating];
    ratingText.style.color = rating > 0 ? '#f59e0b' : '#64748b';
    
    // Clear error if rating is selected
    const ratingError = document.getElementById('ratingError');
    if (ratingError) {
        ratingError.textContent = '';
    }
    
    highlightStars(rating);
}

// Character count for textarea
function initCharCount() {
    commentsTextarea.addEventListener('input', () => {
        const currentLength = commentsTextarea.value.length;
        charCount.textContent = currentLength;
        
        // Change color when approaching limit
        if (currentLength > 450) {
            charCount.parentElement.style.color = '#ef4444';
        } else if (currentLength > 400) {
            charCount.parentElement.style.color = '#f59e0b';
        } else {
            charCount.parentElement.style.color = '#94a3b8';
        }
        
        // Prevent typing beyond 500 characters
        if (currentLength >= 500) {
            commentsTextarea.value = commentsTextarea.value.substring(0, 500);
            charCount.textContent = 500;
        }
    });
}

// Form validation
function validateForm() {
    let isValid = true;
    
    // Get form values
    const name = document.getElementById('studentName').value.trim();
    const email = document.getElementById('studentEmail').value.trim();
    const course = document.getElementById('course').value;
    const rating = parseInt(ratingInput.value);
    const comments = commentsTextarea.value.trim();
    
    // Validate name
    const nameError = document.getElementById('nameError');
    if (!name) {
        nameError.textContent = 'Please enter your name';
        document.getElementById('studentName').classList.add('error');
        isValid = false;
    } else if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        document.getElementById('studentName').classList.add('error');
        isValid = false;
    } else {
        nameError.textContent = '';
        document.getElementById('studentName').classList.remove('error');
    }
    
    // Validate email
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        emailError.textContent = 'Please enter your email';
        document.getElementById('studentEmail').classList.add('error');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        document.getElementById('studentEmail').classList.add('error');
        isValid = false;
    } else {
        emailError.textContent = '';
        document.getElementById('studentEmail').classList.remove('error');
    }
    
    // Validate course
    const courseError = document.getElementById('courseError');
    if (!course) {
        courseError.textContent = 'Please select a course';
        document.getElementById('course').classList.add('error');
        isValid = false;
    } else {
        courseError.textContent = '';
        document.getElementById('course').classList.remove('error');
    }
    
    // Validate rating
    const ratingError = document.getElementById('ratingError');
    if (rating === 0) {
        ratingError.textContent = 'Please select a rating';
        isValid = false;
    } else {
        ratingError.textContent = '';
    }
    
    // Validate comments
    const commentsError = document.getElementById('commentsError');
    if (!comments) {
        commentsError.textContent = 'Please enter your feedback comments';
        commentsTextarea.classList.add('error');
        isValid = false;
    } else if (comments.length < 10) {
        commentsError.textContent = 'Feedback must be at least 10 characters';
        commentsTextarea.classList.add('error');
        isValid = false;
    } else {
        commentsError.textContent = '';
        commentsTextarea.classList.remove('error');
    }
    
    return isValid;
}

// Form submission
function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        // Scroll to first error
        const firstError = document.querySelector('.error-message:not(:empty)');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Get submit button
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submitting...';
    
    // Simulate form submission (in a real app, this would send data to server)
    setTimeout(() => {
        // Show success message
        feedbackForm.classList.add('hidden');
        successMessage.classList.add('show');
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Feedback';
        
        // Log form data (for demonstration)
        console.log('Feedback submitted:', {
            name: document.getElementById('studentName').value,
            email: document.getElementById('studentEmail').value,
            course: document.getElementById('course').value,
            rating: ratingInput.value,
            comments: commentsTextarea.value
        });
    }, 1500);
}

// Reset form
function resetForm() {
    feedbackForm.reset();
    ratingInput.value = 0;
    charCount.textContent = '0';
    ratingText.textContent = 'Click to rate';
    ratingText.style.color = '#64748b';
    
    // Reset stars
    stars.forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
    });
    
    // Clear all error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    
    // Remove error classes
    document.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
    });
    
    // Hide success message and show form
    successMessage.classList.remove('show');
    feedbackForm.classList.remove('hidden');
}

// Clear error on input
function initErrorClearance() {
    const inputs = feedbackForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            const errorEl = input.parentElement.querySelector('.error-message');
            if (errorEl) {
                errorEl.textContent = '';
            }
        });
        
        input.addEventListener('change', () => {
            input.classList.remove('error');
            const errorEl = input.parentElement.querySelector('.error-message');
            if (errorEl) {
                errorEl.textContent = '';
            }
        });
    });
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    initStarRating();
    initCharCount();
    initErrorClearance();
    
    feedbackForm.addEventListener('submit', handleSubmit);
    resetBtn.addEventListener('click', resetForm);
});

