 document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('inquiryForm');
            const serviceSelect = document.getElementById('service');
            const resetBtn = document.getElementById('resetBtn');
            const toast = document.getElementById('toast');
            
            // Payment Link
            const razorpayLink = "https://razorpay.me/@omirainnovationsllp";

            // Map services to their dynamic container IDs
            const dynamicMap = {
                'website': ['dynamic-web'],
                'ecommerce': ['dynamic-web', 'dynamic-ecom'],
                'marketing': ['dynamic-marketing'],
                'ai': ['dynamic-ai'],
                'consulting': ['dynamic-consulting']
            };

            // Toggle dynamic fields function
            function updateDynamicFields() {
                // Hide all sections and remove required attribute
                document.querySelectorAll('.dynamic-section').forEach(section => {
                    section.classList.remove('active');
                    section.querySelectorAll('[data-dyn-req="true"]').forEach(input => {
                        input.removeAttribute('required');
                        input.value = ''; // Reset value when hidden
                    });
                });

                // Show relevant sections and add required attribute
                const selectedService = serviceSelect.value;
                if (dynamicMap[selectedService]) {
                    dynamicMap[selectedService].forEach(sectionId => {
                        const section = document.getElementById(sectionId);
                        section.classList.add('active');
                        section.querySelectorAll('[data-dyn-req="true"]').forEach(input => {
                            input.setAttribute('required', 'true');
                        });
                    });
                }
            }

            // Listen for service changes
            serviceSelect.addEventListener('change', updateDynamicFields);

            // Handle Reset
            resetBtn.addEventListener('click', () => {
                form.reset();
                updateDynamicFields();
            });

            // Custom Validation and Form Submission
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                // Check HTML5 validity
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                // Check 10-digit mobile explicitly (fallback for pattern)
                const mobile = document.getElementById('mobile').value;
                if (!/^[0-9]{10}$/.test(mobile)) {
                    alert("Please enter a valid 10-digit mobile number.");
                    return;
                }

                // Gather Data & Build JSON Payload
                const formData = new FormData(form);
                const payload = Object.fromEntries(formData.entries());

                // Remove empty dynamic fields from the payload to keep it clean
                for (let key in payload) {
                    if (payload[key] === "") {
                        delete payload[key];
                    }
                }

                // Log JSON to console
                console.log("🚀 Form Data Payload:", JSON.stringify(payload, null, 2));

                // Show Success Toast
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 4000);

                // Reset Form
                form.reset();
                updateDynamicFields();

                // Open Razorpay Payment Link
                setTimeout(() => {
                    window.open(razorpayLink, '_blank');
                }, 1000); // 1-second delay so user can see the toast before redirect
            });
        });