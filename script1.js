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

// Smooth scrolling on navigation links
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
        });
    });
});


// recive mail settings
document.addEventListener("DOMContentLoaded", function() {
    // Initialize EmailJS
    emailjs.init("rHrVdormF90lS2DEr"); // Replace with your actual EmailJS Public Key

    // Form submission event
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();

        // Collect form data
        const formData = {
            from_name: document.getElementById("name").value,  // Name of sender
            from_email: document.getElementById("email").value, // Email of sender
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        // Send email using EmailJS
        emailjs.send("service_d0f7tw9", "template_v9kc6e7", formData)
            .then(function(response) {
                alert("✅ Message Sent Successfully!");
                document.getElementById("contact-form").reset(); // Reset form
            })
            .catch(function(error) {
                alert("❌ Failed to send message. Please try again.");
                console.error("EmailJS Error:", error);
            });
    });
});
