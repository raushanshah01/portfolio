// Hide/show navigation bar on scroll
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Hide header when scrolling down
        header.style.transform = "translateY(-100%)"; 
    } else {
        // Show header when scrolling up
        header.style.transform = "translateY(0)"; 
    }

    lastScrollTop = scrollTop;
});

// Smooth scrolling on navigation links and Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    // Select all navigation links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default jump

            // Get the target section's class from the link's href
            const targetClass = this.getAttribute("href").substring(1);
            const targetSection = document.querySelector("." + targetClass);

            // If the target section exists, scroll to it smoothly
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Adjust for fixed header
                    behavior: "smooth"
                });
            }
            
            // Close mobile menu after clicking a link
            const navRight = document.querySelector("nav .right");
            if (navRight.classList.contains("active")) {
                navRight.classList.remove("active");
            }
        });
    });
    
    // Hamburger Menu Toggle Logic
    const hamburger = document.querySelector(".hamburger");
    const navRight = document.querySelector("nav .right");

    if (hamburger) {
        hamburger.addEventListener("click", function() {
            navRight.classList.toggle("active");
        });
    }
});


// FIX: Standardized variables for EmailJS and added error logging
document.addEventListener("DOMContentLoaded", function() {
    // Initialize EmailJS with your Public Key
    // NOTE: If this key is generic or expired, the process will still fail.
    emailjs.init("rHrVdormF90lS2DEr"); 

    // Form submission event
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();

        // Collect form data using standardized keys
        const formData = {
            user_name: document.getElementById("name").value,  // CHANGED from 'from_name'
            user_email: document.getElementById("email").value, // CHANGED from 'from_email'
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        // Send email using EmailJS
        // NOTE: If the Service ID or Template ID below are incorrect, it will fail.
        emailjs.send("service_d0f7tw9", "template_v9kc6e7", formData)
            .then(function(response) {
                alert("✅ Message Sent Successfully!");
                document.getElementById("contact-form").reset(); // Reset form
            })
            .catch(function(error) {
                alert("❌ Failed to send message. Please try again.");
                // Log the detailed error to the console for debugging
                console.error("EmailJS Error (Check EmailJS Template Variables!):", error);
            });
    });
});