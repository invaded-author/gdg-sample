// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Language Toggle Functionality
    const languageBtn = document.getElementById('language-btn');
    if (languageBtn) {
        languageBtn.addEventListener('click', function() {
            const elements = document.querySelectorAll('[data-en], [data-hi]');
            const currentLang = this.textContent;
            
            elements.forEach(el => {
                if (el.hasAttribute('data-en')) {
                    const enText = el.getAttribute('data-en');
                    const hiText = el.getAttribute('data-hi');
                    
                    if (el.textContent.trim() === enText.trim()) {
                        el.textContent = hiText;
                    } else {
                        el.textContent = enText;
                    }
                }
            });
            
            // Toggle button text
            this.textContent = currentLang === 'Language' ? 'हिन्दी' : 'English';
        });
    }

    // Testimonial Form Handling
    const shareBtn = document.getElementById('share-insights');
    const modal = document.getElementById('testimonial-form');
    const closeBtn = document.querySelector('.close');

    if (shareBtn && modal && closeBtn) {
        shareBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        const testimonialForm = document.getElementById('new-testimonial');
        if (testimonialForm) {
            testimonialForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('review-name').value;
                const stars = document.getElementById('review-stars').value;
                const comment = document.getElementById('review-comment').value;
                const photoInput = document.getElementById('review-photo');
                
                if (!name || !stars || !comment || !photoInput.files[0]) {
                    showAlert('Please fill all fields', 'error');
                    return;
                }
                
                const photo = photoInput.files[0];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const newTestimonial = document.createElement('div');
                    newTestimonial.className = 'testimonial-card';
                    newTestimonial.innerHTML = `
                        <div class="user-image">
                            <img src="${e.target.result}" alt="${name}">
                        </div>
                        <h3>${name}</h3>
                        <div class="stars">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</div>
                        <p>"${comment}"</p>
                    `;
                    
                    document.querySelector('.testimonial-carousel').appendChild(newTestimonial);
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    testimonialForm.reset();
                    showAlert('Testimonial submitted successfully!', 'success');
                };
                
                reader.readAsDataURL(photo);
            });
        }
    }

    // Signup Page Redirects
    const farmerSignupBtn = document.getElementById('farmer-signup');
    const agromitraSignupBtn = document.getElementById('agromitra-signup');

    if (farmerSignupBtn) {
        farmerSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'farmer-signup.html';
        });
    }

    if (agromitraSignupBtn) {
        agromitraSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'agromitra-signup.html';
        });
    }

    // Farmer Form Submission with Validation
    const farmerForm = document.getElementById('farmer-form');
    if (farmerForm) {
        // Password toggle visibility
        setupPasswordToggle('farmer-password', 'farmer-toggle-password');
        
        farmerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('farmer-name').value.trim(),
                email: document.getElementById('farmer-email').value.trim(),
                password: document.getElementById('farmer-password').value,
                confirmPassword: document.getElementById('farmer-confirm-password').value,
                phone: document.getElementById('farmer-phone').value.trim(),
                address: document.getElementById('farmer-address').value.trim(),
                dob: document.getElementById('farmer-dob').value,
                pan: document.getElementById('farmer-pan').value.trim(),
                aadhar: document.getElementById('farmer-aadhar').value.trim(),
                photo: document.getElementById('farmer-photo').files[0],
                agreedToTerms: document.getElementById('farmer-terms').checked
            };

            // Validate form
            const validation = validateFarmerForm(formData);
            if (!validation.isValid) {
                showAlert(validation.message, 'error');
                return;
            }

            try {
                // Simulate API call
                showAlert('Processing your registration...', 'info');
                
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                showAlert('Registration successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'farmer-dashboard.html';
                }, 2000);
            } catch (error) {
                console.error('Registration error:', error);
                showAlert('Registration failed. Please try again.', 'error');
            }
        });

        // Password strength indicator
        setupPasswordStrengthMeter('farmer-password', 'farmer-strength');
    }

    // AgroMitra Form Submission with Validation
    const agromitraForm = document.getElementById('agromitra-form');
    if (agromitraForm) {
        // Password toggle visibility
        setupPasswordToggle('agromitra-password', 'agromitra-toggle-password');
        
        agromitraForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('agromitra-name').value.trim(),
                email: document.getElementById('agromitra-email').value.trim(),
                password: document.getElementById('agromitra-password').value,
                confirmPassword: document.getElementById('agromitra-confirm-password').value,
                phone: document.getElementById('agromitra-phone').value.trim(),
                photo: document.getElementById('agromitra-photo').files[0],
                dob: document.getElementById('agromitra-dob').value,
                address: document.getElementById('agromitra-address').value.trim(),
                pincode: document.getElementById('agromitra-pincode').value.trim(),
                gst: document.getElementById('agromitra-gst').value.trim(),
                aadhar: document.getElementById('agromitra-aadhar').value.trim(),
                pan: document.getElementById('agromitra-pan').value.trim(),
                agreedToTerms: document.getElementById('agromitra-terms').checked,
                consent: document.getElementById('agromitra-consent').checked
            };

            // Validate form
            const validation = validateAgroMitraForm(formData);
            if (!validation.isValid) {
                showAlert(validation.message, 'error');
                return;
            }

            try {
                // Simulate API call
                showAlert('Processing your registration...', 'info');
                
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                showAlert('Registration successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'agromitra-dashboard.html';
                }, 2000);
            } catch (error) {
                console.error('Registration error:', error);
                showAlert('Registration failed. Please try again.', 'error');
            }
        });

        // Password strength indicator
        setupPasswordStrengthMeter('agromitra-password', 'agromitra-strength');
    }

    // Helper Functions
    function validateFarmerForm(formData) {
        // Check required fields
        if (!formData.name || !formData.email || !formData.password || 
            !formData.confirmPassword || !formData.phone || !formData.address || 
            !formData.dob || !formData.pan || !formData.aadhar || !formData.photo) {
            return { isValid: false, message: 'Please fill all required fields' };
        }

        if (!formData.agreedToTerms) {
            return { isValid: false, message: 'You must agree to the terms and conditions' };
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return { isValid: false, message: 'Please enter a valid email address' };
        }

        // Validate password
        if (formData.password.length < 8) {
            return { isValid: false, message: 'Password must be at least 8 characters long' };
        }
        if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
            return { isValid: false, message: 'Password must contain at least one number and one special character' };
        }
        if (formData.password !== formData.confirmPassword) {
            return { isValid: false, message: 'Passwords do not match' };
        }

        // Validate phone (10 digits)
        if (!/^\d{10}$/.test(formData.phone)) {
            return { isValid: false, message: 'Phone number must be 10 digits' };
        }

        // Validate PAN
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
            return { isValid: false, message: 'Invalid PAN format (Example: ABCDE1234F)' };
        }

        // Validate Aadhar (12 digits)
        if (!/^\d{12}$/.test(formData.aadhar)) {
            return { isValid: false, message: 'Aadhar number must be 12 digits' };
        }

        // Validate age (18+)
        const dob = new Date(formData.dob);
        const ageDiff = Date.now() - dob.getTime();
        const ageDate = new Date(ageDiff);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age < 18) {
            return { isValid: false, message: 'You must be at least 18 years old to register' };
        }

        return { isValid: true, message: 'Validation successful' };
    }

    function validateAgroMitraForm(formData) {
        // Check required fields
        if (!formData.name || !formData.email || !formData.password || 
            !formData.confirmPassword || !formData.phone || !formData.photo || 
            !formData.dob || !formData.address || !formData.pincode || 
            !formData.gst || !formData.aadhar || !formData.pan) {
            return { isValid: false, message: 'Please fill all required fields' };
        }

        if (!formData.agreedToTerms) {
            return { isValid: false, message: 'You must agree to the terms and conditions' };
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return { isValid: false, message: 'Please enter a valid email address' };
        }

        // Validate password
        if (formData.password.length < 8) {
            return { isValid: false, message: 'Password must be at least 8 characters long' };
        }
        if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
            return { isValid: false, message: 'Password must contain at least one number and one special character' };
        }
        if (formData.password !== formData.confirmPassword) {
            return { isValid: false, message: 'Passwords do not match' };
        }

        // Validate phone (10 digits)
        if (!/^\d{10}$/.test(formData.phone)) {
            return { isValid: false, message: 'Phone number must be 10 digits' };
        }

        // Validate PIN code (6 digits)
        if (!/^\d{6}$/.test(formData.pincode)) {
            return { isValid: false, message: 'PIN code must be 6 digits' };
        }

        // Validate GST
        if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gst)) {
            return { isValid: false, message: 'Invalid GST format (Example: 22ABCDE1234F1Z5)' };
        }

        // Validate PAN
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
            return { isValid: false, message: 'Invalid PAN format (Example: ABCDE1234F)' };
        }

        // Validate Aadhar (12 digits)
        if (!/^\d{12}$/.test(formData.aadhar)) {
            return { isValid: false, message: 'Aadhar number must be 12 digits' };
        }

        // Validate age (18+)
        const dob = new Date(formData.dob);
        const ageDiff = Date.now() - dob.getTime();
        const ageDate = new Date(ageDiff);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age < 18) {
            return { isValid: false, message: 'You must be at least 18 years old to register' };
        }

        return { isValid: true, message: 'Validation successful' };
    }

    function setupPasswordToggle(passwordFieldId, toggleButtonId) {
        const passwordField = document.getElementById(passwordFieldId);
        const toggleButton = document.getElementById(toggleButtonId);
        
        if (passwordField && toggleButton) {
            toggleButton.addEventListener('click', function(e) {
                e.preventDefault();
                const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordField.setAttribute('type', type);
                toggleButton.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
            });
        }
    }

    function setupPasswordStrengthMeter(passwordFieldId, strengthMeterId) {
        const passwordField = document.getElementById(passwordFieldId);
        const strengthMeter = document.getElementById(strengthMeterId);
        
        if (passwordField && strengthMeter) {
            passwordField.addEventListener('input', function() {
                const password = this.value;
                let strength = 0;
                
                // Length check
                if (password.length >= 8) strength++;
                // Contains number
                if (/\d/.test(password)) strength++;
                // Contains special char
                if (/[!@#$%^&*]/.test(password)) strength++;
                
                // Update strength meter
                strengthMeter.className = 'password-strength';
                if (password.length > 0) {
                    if (strength === 1) {
                        strengthMeter.classList.add('weak');
                    } else if (strength === 2) {
                        strengthMeter.classList.add('medium');
                    } else if (strength >= 3) {
                        strengthMeter.classList.add('strong');
                    }
                }
            });
        }
    }

    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create alert element
        const alert = document.createElement('div');
        alert.className = `custom-alert ${type}`;
        alert.textContent = message;
        
        // Add to body
        document.body.appendChild(alert);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
});