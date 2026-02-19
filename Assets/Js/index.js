 document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Mobile Menu Toggle
            const hamburger = document.querySelector('.hamburger');
            const navContainer = document.querySelector('.nav-container');
            const navLinks = document.querySelectorAll('.nav-links a');

            hamburger.addEventListener('click', () => {
                const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
                hamburger.setAttribute('aria-expanded', !isExpanded);
                navContainer.classList.toggle('menu-open');
                hamburger.innerHTML = isExpanded ? '☰' : '✕';
            });

            // Close mobile menu when a link is clicked
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navContainer.classList.remove('menu-open');
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.innerHTML = '☰';
                });
            });

            // 2. FAQ Accordion Logic
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', () => {
                    // Close others (optional, remove if you want multiple open at once)
                    faqItems.forEach(otherItem => {
                        if(otherItem !== item) {
                            otherItem.classList.remove('active');
                            otherItem.querySelector('.faq-icon').textContent = '+';
                        }
                    });

                    // Toggle current
                    item.classList.toggle('active');
                    const icon = item.querySelector('.faq-icon');
                    icon.textContent = item.classList.contains('active') ? '×' : '+';
                });
            });

            // 3. Toast Notification for Placeholder CTAs
            const toast = document.getElementById('toast');
            let toastTimeout;

            const showToast = (message) => {
                toast.textContent = message;
                toast.classList.add('show');
                
                clearTimeout(toastTimeout);
                toastTimeout = setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            };

            // Attach toast event to all interactive buttons/links with the class 'cta-action'
            const ctaButtons = document.querySelectorAll('.cta-action');
            ctaButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // If it's a link to #paid-inquiry, let the smooth scroll happen, but still show toast
                    const isAnchor = btn.tagName.toLowerCase() === 'a';
                    const target = btn.getAttribute('href');
                    
                    if (!isAnchor || target === '#') {
                        e.preventDefault();
                    }
                    
                    const msg = btn.getAttribute('data-msg') || 'Action triggered...';
                    showToast(msg);
                });
            });
        });