document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Toggle mobile menu
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Dynamic content loading (if applicable)
    function loadContent(sectionId, contentUrl) {
        fetch(contentUrl)
            .then(response => response.text())
            .then(data => {
                document.getElementById(sectionId).innerHTML = data;
            })
            .catch(error => console.error("Error loading content:", error));
    }

    // Contact Form Submission
    document.getElementById("contact-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        
        fetch("/send-message", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert("Message sent successfully!");
            this.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to send message. Please try again.");
        });
    });

    // Dynamic Event Calendar (Placeholder for real implementation)
    function generateCalendar() {
        const calendar = document.getElementById("event-calendar");
        const events = [
            { date: "2025-02-20", title: "Youth Fellowship Night" },
            { date: "2025-02-25", title: "Prayer and Worship Night" },
            { date: "2025-03-05", title: "Community Outreach" }
        ];

        let calendarHtml = "<ul>";
        events.forEach(event => {
            calendarHtml += `<li><strong>${event.date}:</strong> ${event.title}</li>`;
        });
        calendarHtml += "</ul>";
        calendar.innerHTML = calendarHtml;
    }

    generateCalendar();

    // Testimonials Carousel (if applicable)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll(".testimonial");

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? "block" : "none";
        });
    }

    document.getElementById("next-testimonial").addEventListener("click", function () {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    document.getElementById("prev-testimonial").addEventListener("click", function () {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    showTestimonial(currentTestimonial);
});
