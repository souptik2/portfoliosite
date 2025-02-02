// Smooth scrolling for navigation links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const navHeight = document.querySelector(".navbar").offsetHeight;
    const targetPosition = targetSection.offsetTop - navHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

// Navbar background change on scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "#ffffff";
    navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "#ffffff";
    navbar.style.boxShadow = "none";
  }
});

// Skill level bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".level-bar");
  skillBars.forEach((bar) => {
    const level = bar.getAttribute("data-level");
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = `${level}%`;
    }, 200);
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.2,
};

// Animate skill cards on scroll
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      if (entry.target.id === "skills") {
        animateSkillBars();
      }
    }
  });
}, observerOptions);

document.querySelectorAll(".skill-card").forEach((card) => {
  card.style.opacity = 0;
  card.style.transform = "translateY(20px)";
  card.style.transition = "all 0.6s ease-out";
  skillsObserver.observe(card);
});

// Animate project cards on scroll
const projectsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".project-card").forEach((card, index) => {
  card.style.opacity = 0;
  card.style.transform = "translateY(20px)";
  card.style.transition = "all 0.6s ease-out";
  card.style.transitionDelay = `${index * 0.2}s`;
  projectsObserver.observe(card);
});

// Form handling with validation
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showFormAlert("Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showFormAlert("Please enter a valid email address", "error");
    return;
  }

  // Simulate form submission
  //const submitButton = this.querySelector('button[type="submit"]');
  //submitButton.disabled = true;
  //submitButton.textContent = "Sending...";

  // Simulate API call

  const formData = new FormData(this);
  const jsonData = {};

  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  const submitButton = this.querySelector('button[type="submit"]');
  submitButton.textContent = "Sending...";

  fetch("https://hook.us2.make.com/bdpi9fgyhffrmmjw5zcypjrfm9oecbnc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then(
      setTimeout(() => {
        showFormAlert("Oops! looks like need to fix something :-)", "error");
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
        this.reset();
      }, 8000)
    )
    .then((response) => {
      console.log("Success:", response);
      if (response.status === 200) {
        console.log(response.status);
        showFormAlert("Message sent successfully!", "success");
        submitButton.textContent = "Send Message";
        this.reset();
      } else {
        showFormAlert("Oops! looks like need to fix something :-)", "error");
        submitButton.textContent = "Send Message";
      }
      setTimeout(() => {
        showFormAlert("Message sent successfully!", "success");
        this.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }, 1500);
    });
  // .catch((error) => {
  //   console.error("Error:", error);
  //   alert("Error submitting form. Please try again.");
  //   showFormAlert("Error sending your message", "error");
  //   submitButton.textContent = "Send Message";
  // });
});

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Form alert message
function showFormAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `form-alert ${type}`;
  alertDiv.textContent = message;

  const form = document.querySelector(".contact-form");
  form.insertBefore(alertDiv, form.firstChild);

  // Remove alert after 3 seconds
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}

// Add CSS for form alerts
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .form-alert {
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      opacity: 0;
      animation: fadeIn 0.3s ease forwards;
  }
  
  .form-alert.success {
      background-color: #dcfce7;
      color: #166534;
      border: 1px solid #bbf7d0;
  }
  
  .form-alert.error {
      background-color: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
  }
  
  @keyframes fadeIn {
      to {
          opacity: 1;
      }
  }
`;
document.head.appendChild(styleSheet);

// Typing animation for hero section
function setupTypingAnimation() {
  const titles = [
    "MuleSoft Developer",
    "MuleSoft Mentor",
    "Integration Specialist",
    "API Designer",
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const titleElement = document.querySelector(".title");

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      titleElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      titleElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      setTimeout(type, 2000); // Wait before starting to delete
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(type, 500); // Wait before typing next title
    } else {
      setTimeout(type, isDeleting ? 100 : 200);
    }
  }

  type();
}

// Initialize typing animation when DOM is loaded
document.addEventListener("DOMContentLoaded", setupTypingAnimation);
