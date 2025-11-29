 // Particle Animation
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.width = Math.random() * 100 + 50 + 'px';
                particle.style.height = particle.style.width;
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
                particlesContainer.appendChild(particle);
            }
        }
        createParticles();

        // Typing Animation
        const nameText = 'Mohammadabrar Shaikh';
        const taglineText = 'Ensuring every game is bug-free and smooth for players';
        let nameIndex = 0;
        let taglineIndex = 0;
        
        function typeWriter() {
            const typingElement = document.getElementById('typingText');
            const taglineElement = document.getElementById('tagline');
            
            if (nameIndex < nameText.length) {
                typingElement.textContent += nameText.charAt(nameIndex);
                nameIndex++;
                setTimeout(typeWriter, 100);
            } else if (taglineIndex < taglineText.length) {
                taglineElement.textContent += taglineText.charAt(taglineIndex);
                taglineIndex++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);

        // Navbar Scroll Animation
        const navbar = document.getElementById('navbar');
        const scrollTop = document.getElementById('scrollTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                navbar.classList.add('visible');
                scrollTop.classList.add('visible');
            } else {
                navbar.classList.remove('visible');
                scrollTop.classList.remove('visible');
            }
        });

        // Scroll to Top
        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Active Navigation Link
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Smooth Scroll for Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                targetSection.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        
                        // Trigger counter animation
                        if (entry.target.classList.contains('stat-card')) {
                            const valueElement = entry.target.querySelector('.stat-value');
                            const target = parseFloat(valueElement.dataset.target);
                            animateCounter(valueElement, target);
                        }
                        
                        // Trigger skill bar animation
                        if (entry.target.classList.contains('skill-category')) {
                            const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
                            skillBars.forEach(bar => {
                                setTimeout(() => {
                                    bar.classList.add('animate');
                                }, 200);
                            });
                        }
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Counter Animation
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 50;
            const isDecimal = target % 1 !== 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = isDecimal ? current.toFixed(1) : Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = isDecimal ? target.toFixed(1) : target;
                }
            };
            
            updateCounter();
        }

        // Form Submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });

        // Project Card 3D Tilt Effect
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // Magnetic Button Effect for CTA buttons
        const ctaButtons = document.querySelectorAll('.btn');
        ctaButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-3px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });

        // Add ripple effect on button clicks
        document.querySelectorAll('.btn, .submit-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.5)';
                ripple.style.pointerEvents = 'none';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s ease-out';
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    