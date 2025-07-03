// Smooth Scrolling with Animations
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add smooth scroll animation
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add active state to navigation
                const navLinks = document.querySelectorAll('.navmenu a');
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                const header = document.querySelector('.header');
                if (header && header.classList.contains('header-show')) {
                    header.classList.remove('header-show');
                }
            }
        });
    });
    
    // Enhanced scroll progress bar with smooth animation
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    if (scrollProgressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            scrollProgressBar.style.width = scrollPercent + '%';
        });
    }
    

    
    // Enhanced AOS animations with smooth scrolling
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out-cubic',
            once: true,
            offset: 100,
            delay: 0
        });
    }
    
    // Smooth section transitions
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });
});

// DOM Elements
const authContainer = document.querySelector('.auth-container');
const switchToSignupBtns = document.querySelectorAll('.switch-to-signup');
const switchToSigninBtns = document.querySelectorAll('.switch-to-signin');
const signInForm = document.querySelector('.sign-in-form');
const signUpForm = document.querySelector('.sign-up-form');
const forgotPasswordLink = document.querySelector('.forgot-password');

// Toggle between sign in and sign up
switchToSignupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        authContainer.classList.add('signup-active');
    });
});

switchToSigninBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        authContainer.classList.remove('signup-active');
    });
});

// Form submission handlers
signInForm.addEventListener('submit', handleSignIn);
signUpForm.addEventListener('submit', handleSignUp);

// Forgot password handler
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    showMessage('Password reset functionality coming soon!', 'success');
});

// Handle sign in form submission
function handleSignIn(e) {
    e.preventDefault();
    const email = signInForm.querySelector('input[type="email"]').value;
    const password = signInForm.querySelector('input[type="password"]').value;

    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    setLoading(signInForm, true);
    
    // Simulate API call
    setTimeout(() => {
        setLoading(signInForm, false);
        showMessage('Sign in successful!', 'success');
        
        // Redirect to dashboard after successful signin
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1500);
}

// Handle sign up form submission
function handleSignUp(e) {
    e.preventDefault();
    const name = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;

    if (!name || !email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    setLoading(signUpForm, true);
    
    // Simulate API call
    setTimeout(() => {
        setLoading(signUpForm, false);
        showMessage('Account created successfully!', 'success');
        signUpForm.reset();
        
        // Switch to sign in after successful signup
        setTimeout(() => {
            authContainer.classList.remove('signup-active');
        }, 2000);
    }, 1500);
}

// Show loading state
function setLoading(form, loading) {
    const button = form.querySelector('.primary-btn');
    const originalText = button.textContent;
    
    if (loading) {
        button.disabled = true;
        button.textContent = form === signInForm ? 'Signing In...' : 'Creating Account...';
    } else {
        button.disabled = false;
        button.textContent = form === signInForm ? 'Sign In' : 'Sign Up';
    }
}

// Show message
function showMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(messageEl);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        authContainer.classList.remove('signup-active');
    }
});

// Add form validation
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('blur', validateInput);
    input.addEventListener('input', clearValidation);
});

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            input.style.borderColor = '#ef4444';
            input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        } else {
            input.style.borderColor = '#10b981';
            input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
        }
    }
    
    if (input.type === 'password' && value.length < 6) {
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    }
}

function clearValidation(e) {
    const input = e.target;
    input.style.borderColor = '';
    input.style.boxShadow = '';
}

// Social login button handlers (placeholder)
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = btn.classList.contains('google') ? 'Google' : 
                        btn.classList.contains('facebook') ? 'Facebook' : 'GitHub';
        showMessage(`${provider} sign-in functionality coming soon!`, 'success');
    });
});

// Navbar Interactivity for CodeWithHarry-style Navbar

document.addEventListener('DOMContentLoaded', function () {
  // Desktop dropdown (Tutorials)
  const tutorialsBtn = document.querySelector('button[aria-controls="tutorials-dropdown"]');
  const tutorialsDropdown = document.getElementById('tutorials-dropdown');

  if (tutorialsBtn && tutorialsDropdown) {
    tutorialsBtn.addEventListener('click', function (e) {
      const expanded = tutorialsBtn.getAttribute('aria-expanded') === 'true';
      tutorialsBtn.setAttribute('aria-expanded', !expanded);
      tutorialsDropdown.style.opacity = expanded ? '0' : '1';
      tutorialsDropdown.style.pointerEvents = expanded ? 'none' : 'auto';
      tutorialsDropdown.style.transform = expanded ? 'translateY(10px) scale(0.98)' : 'translateY(0) scale(1)';
    });
    // Close dropdown on outside click
    document.addEventListener('click', function (e) {
      if (!tutorialsBtn.contains(e.target) && !tutorialsDropdown.contains(e.target)) {
        tutorialsBtn.setAttribute('aria-expanded', 'false');
        tutorialsDropdown.style.opacity = '0';
        tutorialsDropdown.style.pointerEvents = 'none';
        tutorialsDropdown.style.transform = 'translateY(10px) scale(0.98)';
      }
    });
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  function openMobileMenu() {
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  }
  function closeMobileMenu() {
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }
  if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
    mobileMenuToggle.addEventListener('click', openMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    // Close on outside click
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) closeMobileMenu();
    });
  }

  // Mobile dropdown accordion
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      const menu = btn.nextElementSibling;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      if (!expanded) {
        menu.classList.add('open');
        menu.classList.remove('hidden');
      } else {
        menu.classList.remove('open');
        menu.classList.add('hidden');
      }
    });
  });

  // Theme toggle (desktop and mobile)
  function setTheme(dark) {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  function toggleTheme(iconId) {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(!isDark);
    updateThemeIcon(iconId);
  }
  function updateThemeIcon(iconId) {
    const icon = document.getElementById(iconId);
    if (!icon) return;
    if (document.documentElement.classList.contains('dark')) {
      icon.innerHTML = '<path d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 6.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>';
    } else {
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>';
    }
  }
  // Desktop theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => toggleTheme('themeIcon'));
  }
  // Mobile theme toggle
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', () => toggleTheme('mobileThemeIcon'));
  }
  // Set initial theme
  setTheme(localStorage.getItem('theme') === 'dark');
  updateThemeIcon('themeIcon');
  updateThemeIcon('mobileThemeIcon');

  // Keyboard shortcut for search (Ctrl/Cmd + K)
  function focusSearch() {
    const search = document.getElementById('navbar-search');
    if (search) search.focus();
    const mobileSearch = document.getElementById('mobile-navbar-search');
    if (mobileMenu && mobileMenu.getAttribute('aria-hidden') === 'false' && mobileSearch) mobileSearch.focus();
  }
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      focusSearch();
    }
  });

  // Dummy login/signup handlers
  function dummyAuth(action) {
    alert(action + ' functionality coming soon!');
  }
  document.getElementById('loginBtn')?.addEventListener('click', () => dummyAuth('Login'));
  document.getElementById('signupBtn')?.addEventListener('click', () => dummyAuth('Signup'));
  document.getElementById('mobileLoginBtn')?.addEventListener('click', () => dummyAuth('Login'));
  document.getElementById('mobileSignupBtn')?.addEventListener('click', () => dummyAuth('Signup'));
});

document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const html = document.documentElement;
  // Get saved theme or default to light
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);
  updateToggleButton(currentTheme);

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateToggleButton(newTheme);
      this.style.transform = 'scale(0.95)';
      setTimeout(() => { this.style.transform = ''; }, 150);
    });
  }

  function updateToggleButton(theme) {
    if (!darkModeToggle) return;
    const lightIcon = darkModeToggle.querySelector('.light-icon');
    const darkIcon = darkModeToggle.querySelector('.dark-icon');
    const lightText = darkModeToggle.querySelector('.light-text');
    const darkText = darkModeToggle.querySelector('.dark-text');
    if (theme === 'dark') {
      if (lightIcon) lightIcon.style.display = 'inline-block';
      if (darkIcon) darkIcon.style.display = 'none';
      if (lightText) lightText.style.display = 'inline';
      if (darkText) darkText.style.display = 'none';
    } else {
      if (lightIcon) lightIcon.style.display = 'none';
      if (darkIcon) darkIcon.style.display = 'inline-block';
      if (lightText) lightText.style.display = 'none';
      if (darkText) darkText.style.display = 'inline';
    }
  }
}); 