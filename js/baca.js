// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// ===== Scroll Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.level-card, .certificate-card, .feature-card, .info-card, .about-card, .message-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Contact Form Handling with Notion Integration =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = '送信中...';
        submitButton.disabled = true;
        formStatus.className = 'form-status';
        formStatus.textContent = '';
        
        try {
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value || '（未記入）',
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Submit to Notion form
            const notionFormUrl = 'https://swift-gull-31f.notion.site/ebd/29ba2dd90ded8097b4e4cd50325db8ac';
            
            // Create a hidden iframe to submit to Notion
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.name = 'notion-form-target';
            document.body.appendChild(iframe);
            
            // Create a temporary form
            const tempForm = document.createElement('form');
            tempForm.target = 'notion-form-target';
            tempForm.method = 'POST';
            tempForm.action = notionFormUrl;
            
            // Add form fields (matching Notion form field names)
            const fields = {
                'お名前': formData.name,
                '会社名': formData.company,
                'メールアドレス': formData.email,
                'お問い合わせ内容': formData.message
            };
            
            Object.keys(fields).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = fields[key];
                tempForm.appendChild(input);
            });
            
            document.body.appendChild(tempForm);
            tempForm.submit();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(tempForm);
                document.body.removeChild(iframe);
            }, 1000);
            
            // Show success message
            formStatus.className = 'form-status success';
            formStatus.textContent = 'お問い合わせありがとうございます。内容を確認の上、ご連絡させていただきます。';
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            console.error('Form submission error:', error);
            formStatus.className = 'form-status error';
            formStatus.textContent = '送信に失敗しました。恐れ入りますが、時間をおいて再度お試しください。';
        } finally {
            // Restore button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});
