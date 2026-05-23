document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('#header');
    const mobileMenuButton = document.querySelector('#mobileMenuBtn');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');
    const backToTop = document.querySelector('#backToTop');
    const counters = document.querySelectorAll('.counter');
    const contactForm = document.querySelector('#contactForm');
    const modal = document.querySelector('#formModal');
    const closeModal = document.querySelector('#closeModal');
    const modalTitle = document.querySelector('#modalTitle');
    const modalMessage = document.querySelector('#modalMessage');
    const modalIcon = modal.querySelector('.modal-icon');
    const modalIconGlyph = modalIcon.querySelector('i');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const submitLabel = submitButton.querySelector('.submit-label');

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const destination = document.querySelector(this.getAttribute('href'));
            if (destination) {
                destination.scrollIntoView({ behavior: 'smooth' });
            }
            navLinksContainer.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    });

    mobileMenuButton.addEventListener('click', () => {
        const isOpen = navLinksContainer.classList.toggle('active');
        mobileMenuButton.classList.toggle('active', isOpen);
        mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
    });

    const updateScrollState = () => {
        const currentScroll = window.scrollY;
        header.classList.toggle('scrolled', currentScroll > 20);
        backToTop.classList.toggle('visible', currentScroll > 500);

        sections.forEach((section) => {
            const top = section.offsetTop - 140;
            const isCurrent = currentScroll >= top && currentScroll < top + section.offsetHeight;
            const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (link) {
                link.classList.toggle('active', isCurrent);
            }
        });
    };

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14 });

    document.querySelectorAll('.reveal').forEach((element) => {
        revealObserver.observe(element);
    });

    const countUp = (counter) => {
        const target = Number(counter.dataset.target);
        const startTime = performance.now();
        const duration = 900;

        const update = (time) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * easedProgress);
            if (progress < 1) {
                window.requestAnimationFrame(update);
            }
        };

        window.requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });

    counters.forEach((counter) => counterObserver.observe(counter));

    const showFormResult = (success, title, message) => {
        modalIcon.classList.toggle('success', success);
        modalIcon.classList.toggle('error', !success);
        modalIconGlyph.className = success ? 'fas fa-check' : 'fas fa-exclamation';
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.classList.add('active');
    };

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        submitLabel.textContent = 'Sending...';

        const formData = new FormData(contactForm);
        const payload = Object.fromEntries(formData.entries());
        payload._replyto = payload.email;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (!response.ok || result.success === 'false' || result.success === false) {
                throw new Error('Submission failed');
            }

            contactForm.reset();
            showFormResult(
                true,
                'Message Sent',
                'Thanks for reaching out. Your message has been delivered and I will respond soon.'
            );
        } catch (error) {
            showFormResult(
                false,
                'Could Not Send',
                'Please try again, or contact me directly using the email link beside the form.'
            );
        } finally {
            submitButton.disabled = false;
            submitLabel.textContent = 'Send Message';
        }
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modal.classList.remove('active');
            navLinksContainer.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
});
