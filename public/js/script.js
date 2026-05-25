// ================================
// CONTACT MODAL
// ================================

/*const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("contactModal");

if (openModal && closeModal && modal) {

  openModal.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  }*/
 
// ================================
// CONTACT MODAL
// ================================

const openModal =
  document.getElementById("openModal");

const openModalNav =
  document.getElementById("openModalNav");

const closeModal =
  document.getElementById("closeModal");

const modal =
  document.getElementById("contactModal");

// HERO BUTTON

if (openModal && modal) {

  openModal.addEventListener("click", () => {

    modal.style.display = "flex";

  });
}

// NAVBAR CONTACT

if (openModalNav && modal) {

  openModalNav.addEventListener("click", (e) => {

    e.preventDefault();

    modal.style.display = "flex";

  });
}

// CLOSE BUTTON

if (closeModal && modal) {

  closeModal.addEventListener("click", () => {

    modal.style.display = "none";

  });
}

// OUTSIDE CLICK

window.addEventListener("click", (e) => {

  if (e.target === modal) {

    modal.style.display = "none";

  }
});



// ================================
// MOBILE MENU
// ================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ================================
// SCROLL REVEAL ANIMATION
// ================================

const reveals = document.querySelectorAll(".reveal");

function revealSections() {

  reveals.forEach((section) => {
    const windowHeight = window.innerHeight;
    const revealTop = section.getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealSections);

revealSections();

// ================================
// ACTIVE NAVBAR LINK
// ================================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";
  sections.forEach((section) => {

    const sectionTop = section.offsetTop;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {

    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// ======================================
// VALIDATION HELPERS
// ======================================

function setError(input, message) {
  input.classList.add("input-error");
  input.classList.remove("input-success");

  const error = input.nextElementSibling;

  if (error) {
    error.innerText = message;
  }
}

function setSuccess(input) {

  input.classList.remove("input-error");
  input.classList.add("input-success");

  const error = input.nextElementSibling;

  if (error) {
    error.innerText = "";
  }
}

function clearValidation(input) {
input.classList.remove("input-error");
  input.classList.remove("input-success");

  const error = input.nextElementSibling;

  if (error) {
    error.innerText = "";
  }
}

function validateEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {

  const cleanedPhone = phone.replace(/\s/g, "");

  const onlyNumbers = /^[0-9]+$/;

  return (
    onlyNumbers.test(cleanedPhone) &&
    cleanedPhone.length >= 8 &&
    cleanedPhone.length <= 15
    );
}

// ======================================
// LIVE INPUT CLEANUP
// ======================================

const allInputs = document.querySelectorAll(
  "input, textarea"
);

allInputs.forEach((input) => {

  input.addEventListener("input", () => {
    clearValidation(input);
  });
});

// ======================================
// INTERNATIONAL PHONE INPUT
// ======================================

const careerPhoneInput =
  document.querySelector("#careerPhone");
  const contactPhoneInput =
  document.querySelector("#contactPhone");

if (careerPhoneInput) {

  window.intlTelInput(careerPhoneInput, {

    initialCountry: "in",

    preferredCountries: [
      "in",
      "us",
      "gb"
    ],

    separateDialCode: true,

    autoPlaceholder: "aggressive",

    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.10/build/js/utils.js"
  });
}
if (contactPhoneInput) {

  window.intlTelInput(contactPhoneInput, {

    initialCountry: "in",

    preferredCountries: [
      "in",
      "us",
      "gb"
    ],

    separateDialCode: true,

    autoPlaceholder: "aggressive",

    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.10/build/js/utils.js"
  });
}

// ======================================
// CAREER FORM VALIDATION
// ======================================
const careerForm =
  document.getElementById("careerForm");

if (careerForm) {

  careerForm.addEventListener("submit", (e) => {

    e.preventDefault();

    let valid = true;

    const name =
      document.getElementById("careerName");

    const email =
      document.getElementById("careerEmail");

    const phone =
      document.getElementById("careerPhone");

    const message =
      document.getElementById("careerMessage");

    const resume =
      document.getElementById("careerResume");
      // NAME

    if (name.value.trim().length < 3) {

      setError(
        name,
        "Name must be at least 3 characters"
      );

      valid = false;

    } else {

      setSuccess(name);
    }

    // EMAIL

    if (!validateEmail(email.value)) {

      setError(
        email,
        "Enter valid email"
      );
      valid = false;

    } else {

      setSuccess(email);
    }

    // PHONE

    if (!validatePhone(phone.value)) {

      setError(
        phone,
        "Enter valid mobile number"
      );

      valid = false;

    } else {

      setSuccess(phone);
    }

    // MESSAGE
    if (message.value.trim().length < 10) {

      setError(
        message,
        "Message too short"
      );

      valid = false;

    } else {

      setSuccess(message);
    }

    // RESUME

    if (!resume.files.length) {

      setError(
        resume,
        "Please upload resume"
      );

      valid = false;
      } else {

      setSuccess(resume);
    }

    // SUCCESS

    if (valid) {

      const success =
        document.getElementById("careerSuccess");

      const button =
  careerForm.querySelector('button[type="submit"]');

      // LOADING START

      button.classList.add("loading");

      button.innerText =
        "Submitting...";

      // FAKE API DELAY
     const formData = new FormData();

formData.append("name", name.value);

formData.append("email", email.value);

formData.append("phone", phone.value);

formData.append("message", message.value);

formData.append(
  "resume",
  resume.files[0]
);

fetch("/api/career", {

  method: "POST",

  body: formData

})

.then((response) => response.json())

.then((data) => {

  if (data.success) {

    success.style.display = "block";

    careerForm.reset();

    button.classList.remove("loading");

    button.innerText =
      "Submit Application";

    setTimeout(() => {

      success.style.display = "none";

    }, 3000);

  } else {

    alert("Something went wrong");

    button.classList.remove("loading");

    button.innerText =
      "Submit Application";
  }

})

.catch((error) => {

  console.log(error);

  alert("Server Error");

  button.classList.remove("loading");

  button.innerText =
    "Submit Application";

});
    }
  });
}

// ======================================
// CONTACT FORM VALIDATION
// ======================================

const contactForm =
  document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", (e) => {

    e.preventDefault();

    let valid = true;

    const name =
      document.getElementById("contactName");

    const email =
      document.getElementById("contactEmail");

    const phone =
      document.getElementById("contactPhone");

    const query =
      document.getElementById("contactQuery");
      // NAME

    if (name.value.trim().length < 3) {

      setError(
        name,
        "Name must be at least 3 characters"
      );

      valid = false;

    } else {

      setSuccess(name);
    }

    // EMAIL

    if (!validateEmail(email.value)) {

      setError(
        email,
        "Enter valid email"
      );
       valid = false;

    } else {

      setSuccess(email);
    }

    // PHONE

    if (!validatePhone(phone.value)) {

      setError(
        phone,
        "Enter valid mobile number"
      );

      valid = false;

    } else {

      setSuccess(phone);
    }

    // QUERY
    if (query.value.trim().length < 10) {

      setError(
        query,
        "Query must be at least 10 characters"
      );

      valid = false;

    } else {

      setSuccess(query);
    }

    // SUCCESS

// SUCCESS

if (valid) {

  const success =
    document.getElementById("contactSuccess");

  const button =
    contactForm.querySelector('button[type="submit"]');

  // LOADING START

  button.classList.add("loading");

  button.innerText =
    "Submitting...";

  // API CALL

  fetch("/api/contact", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({

      name: name.value,

      email: email.value,

      phone: phone.value,

      query: query.value

    })
  })

  .then((response) => response.json())

  .then((data) => {

    if (data.success) {

      success.style.display = "block";

      contactForm.reset();

      button.classList.remove("loading");

      button.innerText =
        "Submit";

      setTimeout(() => {

        success.style.display = "none";

      }, 3000);

    } else {

      alert("Something went wrong");

      button.classList.remove("loading");

      button.innerText =
        "Submit";
    }
  })

  .catch((error) => {

    console.log(error);

    alert("Server Error");

    button.classList.remove("loading");

    button.innerText =
      "Submit";
  });
 }
  });
}


// ======================================
// TECHNOLOGY DATA
// ======================================

const technologies = {

  frontend: [

    {
      name: "React",
      icon: "devicon-react-original",
      desc: "Modern scalable frontend applications.",
      link: "/technologies/react.html"
    },

    {
      name: "Angular",
      icon: "devicon-angularjs-plain",
      desc: "Enterprise-level frontend framework.",
      link: "/technologies/angular.html"
    },

    {
      name: "HTML5",
      icon: "devicon-html5-plain",
      desc: "Semantic and modern web structure.",
      link: "/technologies/html5.html"
    },

    {
      name: "CSS3",
      icon: "devicon-css3-plain",
      desc: "Responsive and premium styling.",
      link: "/technologies/css3.html"
    },

    {
      name: "JavaScript",
      icon: "devicon-javascript-plain",
      desc: "Interactive web experiences.",
      link: "/technologies/javascript.html"
    }

  ],

  backend: [

    {
      name: "Node.js",
      icon: "devicon-nodejs-plain",
      desc: "Fast scalable backend systems.",
      link: "/technologies/nodejs.html"
    },

    {
      name: "Express.js",
      icon: "devicon-express-original",
      desc: "Backend APIs and routing.",
      link: "/technologies/express.html"
    },

    {
      name: "Python",
      icon: "devicon-python-plain",
      desc: "Powerful backend & AI solutions.",
      link: "/technologies/python.html"
    },
  ],

  
// ======================================
// FULL STACK
// ======================================

fullstack: [

  {
    name: "MERN Stack",
    icon: "devicon-react-original",
    desc: "MongoDB, Express, React & Node.js solutions.",
    link: "/technologies/mern.html"
  },

  {
    name: "MEAN Stack",
    icon: "devicon-angularjs-plain",
    desc: "Enterprise Angular full stack architecture.",
    link: "/technologies/mean.html"
  },

  {
    name: "Next.js",
    icon: "devicon-nextjs-original",
    desc: "Modern SSR and scalable web applications.",
    link: "/technologies/nextjs.html"
  }

],

// ======================================
// MOBILE
// ======================================

mobile: [

  {
    name: "Flutter",
    icon: "devicon-flutter-plain",
    desc: "Cross-platform mobile app development.",
    link: "/technologies/flutter.html"
  },

  {
    name: "React Native",
    icon: "devicon-react-original",
    desc: "Native mobile experiences using React.",
    link: "/technologies/reactnative.html"
  },

  {
    name: "Android",
    icon: "devicon-android-plain",
    desc: "Custom Android mobile applications.",
    link: "/technologies/android.html"
  },

  {
    name: "iOS",
    icon: "devicon-apple-original",
    desc: "Premium iOS app development solutions.",
    link: "/technologies/ios.html"
  }

],

// ======================================
// AI / ML
// ======================================

ai: [

  {
    name: "Machine Learning",
    icon: "devicon-python-plain",
    desc: "Predictive and intelligent AI systems.",
    link: "/technologies/ml.html"
  },

  {
    name: "Deep Learning",
    icon: "devicon-tensorflow-original",
    desc: "Advanced neural network architectures.",
    link: "/technologies/deeplearning.html"
  },

  {
    name: "Data Science",
    icon: "devicon-python-plain",
    desc: "Data-driven intelligent solutions.",
    link: "/technologies/datascience.html"
  }

],

// ======================================
// CLOUD & DEVOPS
// ======================================

cloud: [

  {
    name: "AWS",
    icon: "devicon-amazonwebservices-original",
    desc: "Scalable cloud infrastructure solutions.",
    link: "/technologies/aws.html"
  },

  {
    name: "Docker",
    icon: "devicon-docker-plain",
    desc: "Containerized application deployment.",
    link: "/technologies/docker.html"
  },

  {
    name: "Kubernetes",
    icon: "devicon-kubernetes-plain",
    desc: "Cloud-native orchestration systems.",
    link: "/technologies/kubernetes.html"
  }

],

// ======================================
// DATABASE
// ======================================

database: [

  {
    name: "MongoDB",
    icon: "devicon-mongodb-plain",
    desc: "Flexible NoSQL database systems.",
    link: "/technologies/mongodb.html"
  },

  {
    name: "MySQL",
    icon: "devicon-mysql-plain",
    desc: "Reliable relational database management.",
    link: "/technologies/mysql.html"
  },

  {
    name: "PostgreSQL",
    icon: "devicon-postgresql-plain",
    desc: "Advanced enterprise SQL database.",
    link: "/technologies/postgresql.html"
  }

],



  

};




// ======================================
// TECHNOLOGY TABS
// ======================================

const techTabs =
  document.querySelectorAll(".tech-tab");

const techGrid =
  document.getElementById("techGrid");


function renderTechnologies(category) {

  techGrid.innerHTML = "";

  technologies[category].forEach((tech) => {

    const card =
      document.createElement("div");

    card.classList.add("tech-card");

   card.innerHTML = ` <i class="${tech.icon}"></i> <h3>${tech.name}</h3> <p>${tech.desc}</p> `;

    card.addEventListener("click", () => {

      window.location.href = tech.link;

    });

    techGrid.appendChild(card);

  });
}



// DEFAULT

renderTechnologies("frontend");

// TAB SWITCH

techTabs.forEach((tab) => {

  tab.addEventListener("click", () => {

    techTabs.forEach((btn) => {
      btn.classList.remove("active");
    });

    tab.classList.add("active");

    renderTechnologies(
      tab.dataset.category
    );
  });
});


const servicesData = {
  web: {
    title: "Website Development",
    description:
      "Modern responsive websites and scalable web applications built with premium UI and optimized performance.",

    features: [
      "Responsive Design",
      "SEO Optimized",
      "Modern UI/UX",
      "Fast Performance",
    ],
  },

  app: {
    title: "Application Development",
    description:
      "Powerful cross-platform applications with scalable backend systems and intuitive user experiences.",

    features: [
      "Android & iOS Apps",
      "API Integration",
      "Cloud Sync",
      "Realtime Features",
    ],
  },

  salesforce: {
    title: "Salesforce Development",
    description:
      "Custom Salesforce solutions, CRM optimization, automation workflows, and enterprise integrations.",

    features: [
      "CRM Customization",
      "Workflow Automation",
      "API Integration",
      "Enterprise Solutions",
    ],
  },

  staff: {
    title: "IT Staff Augmentation",
    description:
      "Extend your engineering team with experienced developers, designers, and technology experts.",

    features: [
      "Dedicated Developers",
      "Flexible Hiring",
      "Agile Teams",
      "Fast Onboarding",
    ],
  },

  dummy: {
    title: "Dummy Service",
    description:
      "This is a placeholder service section for future scalability and upcoming business solutions.",

    features: [
      "Future Ready",
      "Scalable Architecture",
      "Custom Integrations",
      "Enterprise Support",
    ],
  },
};

const serviceTabs = document.querySelectorAll(".service-tab");
const servicesContent = document.getElementById("servicesContent");

function renderService(serviceKey) {
  const service = servicesData[serviceKey];

  servicesContent.innerHTML = `
  
    <div class="service-display">

      <h3>${service.title}</h3>

      <p>
        ${service.description}
      </p>

      <div class="service-features">

        ${service.features
          .map(
            (feature) => `
          <div class="feature-item">
            <i class="fa-solid fa-circle-check"></i>
            <span>${feature}</span>
          </div>
        `
          )
          .join("")}

      </div>

      <button class="primary-btn">
        Explore More
      </button>

    </div>
  `;
}

serviceTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    serviceTabs.forEach((btn) =>
      btn.classList.remove("active")
    );

    tab.classList.add("active");

    renderService(tab.dataset.service);
  });
});

renderService("web");


// ======================================
// POLICY MODAL
// ======================================

const policyModal =
  document.getElementById("policyModal");

const closePolicyModal =
  document.getElementById("closePolicyModal");

const policyContent =
  document.getElementById("policyContent");

const privacyBtn =
  document.getElementById("privacyPolicyBtn");

const termsBtn =
  document.getElementById("termsPolicyBtn");

const refundBtn =
  document.getElementById("refundPolicyBtn");

// OPEN PRIVACY POLICY

if (privacyBtn) {

  privacyBtn.addEventListener("click", (e) => {

    e.preventDefault();

    policyContent.innerHTML = `

      <h2>Privacy Policy</h2>

      <p>
        This Privacy Policy explains how Prayush Technology collects,
        uses, shares and protects your personal information.
      </p>

      <h3>Information We Collect</h3>

      <ul>
        <li>Full Name</li>
        <li>Email Address</li>
        <li>Phone Number</li>
        <li>Company Name</li>
      </ul>

      <h3>How We Use Your Information</h3>

      <p>
        We use your information to respond to inquiries,
        improve our services and provide business communication.
      </p>

      <h3>Contact Us</h3>

      <p>
        Email: contact@prayush.com
      </p>
    `;

    policyModal.style.display = "block";
  });
}

// OPEN TERMS POLICY

if (termsBtn) {

  termsBtn.addEventListener("click", (e) => {

    e.preventDefault();

    policyContent.innerHTML = `

      <h2>Terms of Service</h2>

      <p>
        By using this website and our services,
        you agree to comply with all terms and conditions.
      </p>

      <h3>Payment Terms</h3>

      <p>
        All payments are securely processed through Razorpay.
      </p>

      <h3>Use Restrictions</h3>

      <ul>
        <li>No unlawful usage</li>
        <li>No unauthorized access attempts</li>
        <li>No harmful activities</li>
      </ul>

      <h3>Contact Us</h3>

      <p>
        Email: contact@prayush.com
      </p>
    `;

    policyModal.style.display = "block";
  });
}

// OPEN REFUND POLICY

if (refundBtn) {

  refundBtn.addEventListener("click", (e) => {

    e.preventDefault();

    policyContent.innerHTML = `

      <h2>Refund Policy</h2>

      <p>
        Due to the nature of IT services,
        payments are generally non-refundable.
      </p>

      <h3>Eligible Refund Cases</h3>

      <ul>
        <li>Duplicate payments</li>
        <li>Project non-initiation</li>
      </ul>

      <h3>Non-Refundable Cases</h3>

      <ul>
        <li>Change of mind</li>
        <li>Client-side delays</li>
        <li>Completed milestones</li>
      </ul>

      <h3>Contact Us</h3>

      <p>
        Email: contact@prayush.com
      </p>
    `;

    policyModal.style.display = "block";
  });
}

// CLOSE MODAL

if (closePolicyModal) {

  closePolicyModal.addEventListener("click", () => {

    policyModal.style.display = "none";
  });
}

// CLOSE OUTSIDE CLICK

window.addEventListener("click", (e) => {

  if (e.target === policyModal) {

    policyModal.style.display = "none";
  }
});