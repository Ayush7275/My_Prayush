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

  if (!techGrid) return;

  techGrid.innerHTML = "";

  technologies[category].forEach((tech) => {

    const card =
      document.createElement("div");

    card.classList.add("tech-card");

    card.innerHTML = `
      <i class="${tech.icon}"></i>
      <h3>${tech.name}</h3>
      <p>${tech.desc}</p>
    `;

    card.addEventListener("click", () => {
      window.location.href = tech.link;
    });

    techGrid.appendChild(card);

  });
}



// DEFAULT

if (techGrid) {
  renderTechnologies("frontend");
}

// TAB SWITCH

if (techGrid && techTabs.length) {

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

}


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
  if (!servicesContent) return;
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

if (servicesContent) {
  renderService("web");
}


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

// OPEN PRIVACY POLICY

if (privacyBtn) {
  privacyBtn.addEventListener("click", (e) => {
    e.preventDefault();

    policyContent.innerHTML = `
      <h2>Privacy Policy</h2>
      <p><strong>Effective Date:</strong> June 7, 2026</p>

      <p>
        This Privacy Policy explains how Prayush Technology (“we,” “our,” or “us”) collects, uses, shares, and protects your personal data when you interact with us via our website or through lead generation forms on LinkedIn and similar platforms.
      </p>

      <p>
        By using our website or submitting your information through LinkedIn or any other medium, you agree to the terms outlined in this Privacy Policy.
      </p>

      <h3>Information We Collect</h3>
      <ul>
        <li>Full Name</li>
        <li>Email Address</li>
        <li>Phone Number</li>
        <li>Company Name</li>
        <li>Job Title</li>
        <li>Location</li>
        <li>LinkedIn Profile URL (if submitted through lead forms)</li>
        <li>Other information you provide via contact forms, inquiries, or LinkedIn lead generation ads</li>
      </ul>
      <p>We may also collect non-identifiable data using cookies or analytics tools.</p>

      <h3>How We Use Your Information</h3>
      <ul>
        <li>To respond to your inquiries and requests</li>
        <li>To send information about our services, pricing, or business proposals</li>
        <li>To follow up with you regarding demos or consultations</li>
        <li>To personalize your experience with us</li>
        <li>To improve our marketing, sales, and customer support services</li>
        <li>To comply with applicable legal obligations</li>
      </ul>
      <p>You may opt-out of non-essential communications at any time by contacting us.</p>

      <h3>Data Sharing and Third-Party Tools</h3>
      <p>We do not sell your personal information. However, we may share your data under the following conditions:</p>
      <ul>
        <li>With our internal team members who need access for service fulfillment</li>
        <li>With trusted third-party service providers like CRM platforms (e.g., HubSpot, Salesforce), marketing automation tools, and website analytics services (e.g., Google Analytics)</li>
        <li>If required by law or to comply with a legal process</li>
        <li>In the event of a merger, acquisition, or sale of Prayush Technology assets</li>
      </ul>

      <h3>Cookies and Analytics</h3>
      <p>
        We use cookies and similar tracking technologies to enhance user experience, measure website traffic, and evaluate the effectiveness of our marketing campaigns. You may control cookie settings through your browser preferences. Disabling cookies may limit your experience on our website.
      </p>
      <p>
        We also use Google Analytics and other tools to collect aggregated, anonymized data about site usage, which helps us improve our offerings.
      </p>

      <h3>Your Rights</h3>
      <ul>
        <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
        <li><strong>Correction:</strong> Ask us to update or correct inaccurate information.</li>
        <li><strong>Deletion:</strong> Request deletion of your data, subject to legal retention obligations.</li>
        <li><strong>Objection:</strong> Object to certain types of data processing (e.g., marketing).</li>
      </ul>
      <p>To exercise any of the above rights, please email us at <strong>contact@prayush.com</strong>. We respond within a reasonable timeframe in accordance with applicable data protection laws.</p>

      <h3>Data Retention and Security</h3>
      <p>
        We retain personal data only as long as necessary for business, legal, or regulatory purposes. All personal data is stored securely with safeguards to protect against unauthorized access, alteration, disclosure, or destruction. Access is restricted to authorized personnel only. If required by law, we may retain certain information for a minimum of five years.
      </p>

      <h3>Changes to This Privacy Policy</h3>
      <p>
        We may update this Privacy Policy occasionally to reflect changes in our practices or legal obligations. When we do, we will update the "Effective Date" at the top of this page. We encourage you to review this page periodically to stay informed.
      </p>

      <h3>Contact Us</h3>
      <p>
        If you have any questions, requests, or concerns regarding this Privacy Policy or your personal data, please contact us at:
      </p>
      <p>Email: <strong>contact@prayush.com</strong><br>
      Contact: <strong>+91 8604917410</strong></p>
    `;

    policyModal.style.display = "block";
  });
}


// OPEN TERMS POLICY

// OPEN TERMS POLICY

if (termsBtn) {
  termsBtn.addEventListener("click", (e) => {
    e.preventDefault();

    policyContent.innerHTML = `
      <h2>Terms of Service</h2>
      <p><strong>Effective Date:</strong> June 7, 2026</p>

      <h3>Overview</h3>
      <p>
        This website is operated by Prayush Technology. Throughout the site, the terms “we”, “us” and “our” refer to Prayush Technology. 
        By accessing or using our website and services, you agree to be bound by these Terms of Service (“Terms”).
      </p>
      <p>
        These Terms govern your use of our website and the services made available through it, including any purchases made via the Razorpay payment gateway.
      </p>

      <h3>Eligibility</h3>
      <ul>
        <li>You are at least the age of majority in your jurisdiction.</li>
        <li>You are legally capable of entering into binding contracts.</li>
        <li>You are not prohibited from using the website under any applicable laws.</li>
      </ul>

      <h3>Payment Terms</h3>
      <p>
        All payments on the website are processed securely through Razorpay. We do not store your credit/debit card or UPI information. 
        By providing your payment details, you authorize us and Razorpay to charge the applicable fees for any product or service you purchase.
      </p>
      <p>
        In case of payment failures or unauthorized transactions, Razorpay’s dispute resolution policy will apply.
      </p>

      <h3>Account & Billing Information</h3>
      <ul>
        <li>Provide current, complete, and accurate information for all purchases.</li>
        <li>Update your account details promptly, including email, billing address, and payment information.</li>
        <li>We reserve the right to refuse or cancel any orders.</li>
      </ul>

      <h3>Product & Service Descriptions</h3>
      <p>
        We make every effort to display products and services accurately. However, we do not guarantee that descriptions, pricing, or availability will always be error-free or up to date.
      </p>
      <ul>
        <li>Modify or discontinue any product or service.</li>
        <li>Limit quantities sold.</li>
        <li>Correct errors without prior notice.</li>
      </ul>

      <h3>Refunds and Cancellations</h3>
      <p>
        Refunds and cancellations are governed by our Refund & Cancellation Policy. All requests must comply with timelines and conditions specified in that policy.
      </p>
      <p>
        If payment was made via Razorpay, refunds (if applicable) will be processed back through Razorpay.
      </p>

      <h3>Use Restrictions</h3>
      <ul>
        <li>No unlawful usage</li>
        <li>No unauthorized access attempts</li>
        <li>No harmful activities (e.g., transmitting viruses or malicious code)</li>
        <li>No violation of applicable local, national, or international law</li>
      </ul>

      <h3>Intellectual Property</h3>
      <p>
        All content including logos, text, graphics, and software is the property of Prayush Technology or its licensors. 
        You may not copy, reproduce, or redistribute any part of the content without our express written permission.
      </p>

      <h3>Limitation of Liability</h3>
      <p>
        We are not liable for any indirect, incidental, special, or consequential damages arising out of your use of this website or any services/products.
      </p>

      <h3>Indemnification</h3>
      <p>
        You agree to indemnify and hold harmless Prayush Technology, its directors, officers, and affiliates from any claims or liabilities arising out of your use of the website, breach of Terms, or violation of law or third-party rights.
      </p>

      <h3>Governing Law</h3>
      <p>
        These Terms are governed by the laws of India. The courts in Gurugram, Haryana shall have exclusive jurisdiction over any dispute arising out of the use of this website.
      </p>

      <h3>Changes to These Terms</h3>
      <p>
        We reserve the right to update or modify these Terms at any time. Any changes will be posted on this page. 
        Continued use of the website following such changes constitutes your agreement to the revised Terms.
      </p>

      <h3>Contact Us</h3>
      <p>
        If you have any questions, requests, or concerns regarding these Terms of Service, please contact us at:
      </p>
      <p>Email: <strong>contact@prayush.com</strong><br>
      Contact: <strong>+91 8604917410</strong></p>
    `;

    policyModal.style.display = "block";
  });
}


// OPEN REFUND POLICY

// OPEN REFUND POLICY

if (refundBtn) {
  refundBtn.addEventListener("click", (e) => {
    e.preventDefault();

    policyContent.innerHTML = `
      <h2>Refund Policy</h2>
      <p><strong>Effective Date:</strong> June 7, 2026</p>

      <h3>Overview</h3>
      <p>
        At Prayush Technologies Pvt. Ltd., we are committed to delivering high-quality IT services including mobile application development, web development, UI/UX design, and software consultation. 
        Due to the nature of our services, all payments made to us are final and non-refundable, except in limited circumstances explicitly stated in this policy.
      </p>
      <p>
        By engaging our services, the client agrees to the terms outlined below and understands that once a project or milestone is initiated, refund requests will not be entertained without substantial and documented justification.
      </p>

      <h3>General Policy – No Refunds</h3>
      <p>
        We follow a milestone-based payment structure governed by mutually agreed deliverables. Once a milestone is initiated or delivered, it is considered non-refundable. Payments made toward:
      </p>
      <ul>
        <li>Project Discovery or Consultation</li>
        <li>Design Phase</li>
        <li>Development Sprints</li>
        <li>Source Code Releases</li>
        <li>Dedicated Resources (Developers, Designers, PMs, QA, etc.)</li>
        <li>Third-party License Procurements or Integrations</li>
      </ul>
      <p>...are strictly non-refundable, regardless of project continuation or client satisfaction, except where explicitly stated otherwise.</p>

      <h3>Exceptions – Eligible Scenarios for Partial Refunds</h3>
      <ul>
        <li><strong>Project Non-Initiation:</strong> If the client has made an upfront payment and the project has not commenced within 15 working days from the agreed start date, and no effort or man-hours have been allocated, a partial refund (up to 50%) may be issued after deducting administrative and planning costs.</li>
        <li><strong>Duplicate Payment:</strong> If a client makes a payment twice for the same invoice or transaction, the extra amount will be refunded after validation.</li>
        <li><strong>Technical Infeasibility (Pre-Development Only):</strong> If after a thorough discovery phase it is found that a promised feature is technically unfeasible and Prayush Technology chooses not to proceed, a proportional refund for that feature scope may be issued.</li>
      </ul>
      <p><em>Note:</em> Refund decisions will be made only after internal review and approval by the operations and finance team.</p>

      <h3>Non-Eligible Scenarios for Refunds</h3>
      <ul>
        <li>Change of mind or change in business direction after project commencement</li>
        <li>Communication gaps or delays caused by the client</li>
        <li>Failure to provide required content, feedback, or approvals</li>
        <li>Delay in project delivery due to client-side dependencies</li>
        <li>Dissatisfaction based on subjective expectations (e.g., design tastes, aesthetics)</li>
        <li>Partial completion or rejection of features without valid reason or against prior scope agreement</li>
        <li>Claims made after 30 days of milestone delivery from Prayush Technology</li>
      </ul>

      <h3>Service Cancellation</h3>
      <p>
        If the client chooses to terminate the project midway:
      </p>
      <ul>
        <li>All completed work up to the date of cancellation must be paid in full.</li>
        <li>All intellectual property and source code rights will be withheld until outstanding dues are cleared.</li>
        <li>No refunds will be processed for milestones already delivered or initiated.</li>
      </ul>

      <h3>Dispute Resolution</h3>
      <p>
        In case of a payment dispute, Prayush Technology encourages open communication. Clients may write to <strong>contact@prayush.com</strong> with a clear explanation and supporting evidence. 
        We aim to respond within 7 business days. Any legal dispute, if escalated, will fall under the jurisdiction of India, as per our governing laws.
      </p>

      <h3>Payment Method & Refund Processing Time</h3>
      <p>
        All payments must be made via officially invoiced bank transfers, Razorpay, or approved gateways only. 
        Any approved refund (if applicable) will be processed via the original method of payment within 30 working days after approval. 
        Prayush Technology will not be liable for delays caused by the payment gateway or intermediary banks.
      </p>

      <h3>Changes to This Policy</h3>
      <p>
        Prayush Technology reserves the right to modify this Refund Policy at any time without prior notice. 
        It is the client’s responsibility to review the most updated version before engaging our services.
      </p>

      <h3>Contact Us</h3>
      <p>
        If you have any questions, requests, or concerns regarding this Refund Policy, please contact us at:
      </p>
      <p>Email: <strong>contact@prayush.com</strong><br>
      Contact: <strong>+91 8604917410</strong></p>
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