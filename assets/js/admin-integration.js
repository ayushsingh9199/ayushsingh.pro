// Admin Integration Script
// This script handles the integration between admin panel changes and the main website

class AdminIntegration {
    constructor() {
        this.init();
    }

    init() {
        this.loadHeroSection();
        this.loadAboutSection();
        this.loadContactInfo();
        this.loadServices();
        this.loadPortfolio();
    }

    // Clear any admin data that might interfere with typing animation
    clearHeroInterference() {
        // Remove any hero section data that might be causing issues
        localStorage.removeItem('heroSection');
        // Force reload the page to ensure clean state
        window.location.reload();
    }

    // Load and apply hero section changes
    loadHeroSection() {
        const heroData = JSON.parse(localStorage.getItem('heroSection') || '{}');
        
        // Only update the title if it exists and is different
        if (heroData.title) {
            const titleElement = document.querySelector('#hero h2');
            if (titleElement && titleElement.textContent !== heroData.title) {
                titleElement.textContent = heroData.title;
            }
        }
        
        // NEVER modify the typing animation paragraph
        // The typing animation should always remain as:
        // <p>I'm <span class="typed" data-typed-items="Student, Web Developer, Designer, Tech Enthusiast">Student</span></p>
        // This preserves the original typing animation functionality
    }

    // Load and apply about section changes
    loadAboutSection() {
        const aboutData = JSON.parse(localStorage.getItem('aboutSection') || '{}');
        if (aboutData.content) {
            const contentElement = document.querySelector('#about .content .fst-italic');
            if (contentElement) contentElement.textContent = aboutData.content;
        }
        if (aboutData.experience) {
            const expElement = document.querySelector('.experience-count');
            if (expElement) expElement.textContent = aboutData.experience;
        }
    }

    // Load and apply contact information changes
    loadContactInfo() {
        const contactData = JSON.parse(localStorage.getItem('contactInfo') || '{}');
        if (contactData.email) {
            const emailElements = document.querySelectorAll('a[href^="mailto:"]');
            emailElements.forEach(el => {
                el.href = `mailto:${contactData.email}`;
                // Don't modify text content to avoid breaking layout
            });
        }
        if (contactData.phone) {
            const phoneElements = document.querySelectorAll('a[href^="tel:"]');
            phoneElements.forEach(el => {
                el.href = `tel:${contactData.phone}`;
                // Don't modify text content to avoid breaking layout
            });
        }
        if (contactData.linkedin) {
            const githubElements = document.querySelectorAll('a[href*="github.com"]');
            githubElements.forEach(el => {
                el.href = contactData.linkedin;
                // Don't modify text content to avoid breaking layout
            });
        }
    }

    // Load and apply services changes
    loadServices() {
        const services = JSON.parse(localStorage.getItem('services') || '[]');
        const servicesContainer = document.querySelector('#academic-focus .row');
        if (servicesContainer && services.length > 0) {
            servicesContainer.innerHTML = services.map(service => `
                <div class="col-lg-4 col-md-6 academic-item d-flex" data-aos="fade-up" data-aos-delay="100">
                    <div class="icon flex-shrink-0"><i class="bi bi-cog"></i></div>
                    <div>
                        <h4 class="title">${service.title}</h4>
                        <p class="description">${service.description}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    // Load and apply portfolio changes
    loadPortfolio() {
        const portfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');
        const portfolioContainer = document.querySelector('#portfolio .row');
        if (portfolioContainer && portfolio.length > 0) {
            portfolioContainer.innerHTML = portfolio.map(item => `
                <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-web">
                    <div class="portfolio-content h-100">
                        <img src="${item.image}" class="img-fluid" alt="${item.title}">
                        <div class="portfolio-info">
                            <h4>${item.title}</h4>
                            <p>${item.description}</p>
                            <a href="${item.image}" title="${item.title}" data-gallery="portfolio-gallery" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                            <a href="portfolio-details.html" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Extract real data from website and populate admin panel
    extractRealData() {
        // Extract hero data
        const heroTitle = document.querySelector('#hero h2');
        const heroSubtitle = document.querySelector('#hero p');
        
        const heroData = {
            title: heroTitle ? heroTitle.textContent : 'Ayush Singh',
            subtitle: heroSubtitle ? heroSubtitle.textContent.replace(/I'm.*?Student.*?Tech Enthusiast/, '').trim() : 'Full Stack Developer',
            description: 'Passionate developer creating innovative digital solutions.'
        };
        localStorage.setItem('heroSection', JSON.stringify(heroData));

        // Extract about data
        const aboutContent = document.querySelector('#about .content .fst-italic');
        const aboutData = {
            content: aboutContent ? aboutContent.textContent : 'I am a passionate Full Stack Developer with expertise in modern web technologies.',
            experience: '3'
        };
        localStorage.setItem('aboutSection', JSON.stringify(aboutData));

        // Extract contact data
        const emailElement = document.querySelector('a[href^="mailto:"]');
        const phoneElement = document.querySelector('a[href^="tel:"]');
        const githubElement = document.querySelector('a[href*="github.com"]');
        
        const contactData = {
            email: emailElement ? emailElement.href.replace('mailto:', '') : 'ayushpurnia919@gmail.com',
            phone: phoneElement ? phoneElement.href.replace('tel:', '') : '+91 8603637243',
            linkedin: githubElement ? githubElement.href : 'https://github.com/ayushsingh919'
        };
        localStorage.setItem('contactInfo', JSON.stringify(contactData));

        // Extract portfolio data
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const portfolio = [];
        
        portfolioItems.forEach((item, index) => {
            const title = item.querySelector('h4');
            const description = item.querySelector('p');
            const image = item.querySelector('img');
            
            portfolio.push({
                id: index + 1,
                title: title ? title.textContent : `Project ${index + 1}`,
                category: item.className.includes('filter-web') ? 'Web Development' : 
                         item.className.includes('filter-ui') ? 'UI/UX Design' : 
                         item.className.includes('filter-terminal') ? 'Terminal Apps' : 'Portfolio',
                description: description ? description.textContent : 'Project description',
                image: image ? image.src : 'assets/img/portfolio/app-1.jpg'
            });
        });
        localStorage.setItem('portfolio', JSON.stringify(portfolio));

        // Extract services data
        const academicItems = document.querySelectorAll('.academic-item');
        const services = [];
        
        academicItems.forEach((item, index) => {
            const title = item.querySelector('.title');
            const description = item.querySelector('.description');
            
            services.push({
                id: index + 1,
                title: title ? title.textContent : `Service ${index + 1}`,
                description: description ? description.textContent : 'Service description'
            });
        });
        localStorage.setItem('services', JSON.stringify(services));
    }

    // Update website content in real-time
    updateContent(section, data) {
        switch(section) {
            case 'hero':
                this.loadHeroSection();
                break;
            case 'about':
                this.loadAboutSection();
                break;
            case 'contact':
                this.loadContactInfo();
                break;
            case 'services':
                this.loadServices();
                break;
            case 'portfolio':
                this.loadPortfolio();
                break;
        }
    }

    // Check for admin session
    checkAdminSession() {
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        const sessionTime = localStorage.getItem('adminSession');
        
        if (isLoggedIn && sessionTime) {
            const currentTime = Date.now();
            const sessionAge = currentTime - parseInt(sessionTime);
            const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
            
            if (sessionAge > maxSessionAge) {
                this.logout();
                return false;
            }
            return true;
        }
        return false;
    }

    // Logout function
    logout() {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminSession');
        window.location.href = 'admin-login.html';
    }

    // Add admin link to website (if admin is logged in)
    addAdminLink() {
        if (this.checkAdminSession()) {
            const adminLink = document.createElement('a');
            adminLink.href = 'admin-dashboard.html';
            adminLink.innerHTML = '<i class="fas fa-cog"></i> Admin';
            adminLink.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(102, 126, 234, 0.9);
                color: white;
                padding: 10px 15px;
                border-radius: 25px;
                text-decoration: none;
                font-size: 14px;
                z-index: 1000;
                transition: all 0.3s ease;
            `;
            adminLink.addEventListener('mouseenter', () => {
                adminLink.style.background = 'rgba(102, 126, 234, 1)';
            });
            adminLink.addEventListener('mouseleave', () => {
                adminLink.style.background = 'rgba(102, 126, 234, 0.9)';
            });
            document.body.appendChild(adminLink);
        }
    }

    // Initialize data extraction on page load
    initializeDataExtraction() {
        // Extract real data when page loads
        this.extractRealData();
        
        // Add button to manually extract data (for admin use)
        if (this.checkAdminSession()) {
            const extractButton = document.createElement('button');
            extractButton.textContent = 'Extract Website Data';
            extractButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(40, 167, 69, 0.9);
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 25px;
                font-size: 12px;
                z-index: 1000;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            extractButton.addEventListener('click', () => {
                this.extractRealData();
                alert('Website data extracted and saved to admin panel!');
            });
            document.body.appendChild(extractButton);
        }
    }
}

// Initialize admin integration when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const adminIntegration = new AdminIntegration();
    adminIntegration.addAdminLink();
    adminIntegration.initializeDataExtraction();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminIntegration;
} 