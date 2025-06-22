/**
* Template Name: Personal
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navmenu .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling

    const headerScrolled = () => {
      if ((window.scrollY > headerOffset)) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.header-toggle', function(e) {
    select('#header').classList.toggle('header-show')
    select('.header-toggle').classList.toggle('bi-list')
    select('.header-toggle').classList.toggle('bi-x')
  })

  /**
   * Hide mobile nav on same-page/hash links
   */
  on('click', '#navmenu a', function(e) {
    if (select(this.hash)) {
      select('#header').classList.remove('header-show')
      select('.header-toggle').classList.remove('bi-x')
      select('.header-toggle').classList.add('bi-list')
    }
  }, true)

  /**
   * Close mobile nav when clicking outside
   */
  document.addEventListener('click', function(e) {
    const header = select('#header')
    const toggle = select('.header-toggle')
    
    if (header && toggle) {
      if (!header.contains(e.target) && !toggle.contains(e.target)) {
        header.classList.remove('header-show')
        toggle.classList.remove('bi-x')
        toggle.classList.add('bi-list')
      }
    }
  })

  /**
   * Active link management
   */
  const setActiveLink = () => {
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('#navmenu a')
    
    let current = ''
    sections.forEach(section => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id')
      }
    })

    navLinks.forEach(link => {
      link.classList.remove('active')
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active')
      }
    })
  }

  window.addEventListener('scroll', setActiveLink)
  window.addEventListener('load', setActiveLink)

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrolltop = select('.scroll-top')
  if (scrolltop) {
    const toggleScrolltop = () => {
      window.scrollY > 100 ? scrolltop.classList.add('active') : scrolltop.classList.remove('active')
    }
    window.addEventListener('load', toggleScrolltop)
    onscroll(document, toggleScrolltop)
  }

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.remove();
      }, 500);
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate PureCounter
   */
  window.addEventListener('load', () => {
    new PureCounter();
  });

  /**
   * Stats Counter Animation
   */
  window.addEventListener('load', () => {
    let statsSection = select('#stats');
    if (statsSection) {
      let counters = select('.purecounter', true);
      let animated = false;
      
      let animateCounters = () => {
        if (animated) return;
        animated = true;
        
        counters.forEach((counter) => {
          const start = parseInt(counter.getAttribute('data-purecounter-start'));
          const end = parseInt(counter.getAttribute('data-purecounter-end'));
          const duration = parseInt(counter.getAttribute('data-purecounter-duration'));
          
          let startTime = null;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            const current = Math.floor(progress * (end - start) + start);
            counter.textContent = current;
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        });
      };
      
      // Check if stats section is in view
      let checkStats = () => {
        let rect = statsSection.getBoundingClientRect();
        let windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
          animateCounters();
        }
      };
      
      // Check on scroll
      window.addEventListener('scroll', checkStats);
      
      // Check on load
      checkStats();
    }
  });

  /**
   * Initiate Typed.js
   */
  window.addEventListener('load', () => {
    let typed = select('.typed');
    if (typed) {
      let typed_strings = typed.getAttribute('data-typed-items');
      typed_strings = typed_strings.split(',');
      
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  });

  /**
   * Skills animation
   */
  window.addEventListener('load', () => {
    let skills = select('.skills .progress .progress-bar', true);
    let skillsSection = select('#skills');
    
    if (skillsSection && skills.length > 0) {
      let animated = false;
      
      let progressBar = () => {
        if (animated) return;
        animated = true;
        
        skills.forEach((skill) => {
          const progress = skill.getAttribute('aria-valuenow');
          skill.style.width = '0%';
          
          setTimeout(() => {
            skill.style.width = progress + '%';
          }, 100);
        });
      }
      
      // Check if skills section is in view
      let checkSkills = () => {
        let rect = skillsSection.getBoundingClientRect();
        let windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
          progressBar();
        }
      }
      
      // Check on scroll
      window.addEventListener('scroll', checkSkills);
      
      // Check on load
      checkSkills();
    }
  });

  /**
   * Sidebar navigation functionality
   */
  document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM Content Loaded - Setting up sidebar');
    
    const sidebar = document.querySelector('.sidebar');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelectorAll('.nav-menu a');

    console.log('Sidebar element:', sidebar);
    console.log('Mobile toggle element:', mobileToggle);
    console.log('Nav links found:', navLinks.length);

    // Mobile toggle functionality
    if (mobileToggle && sidebar) {
      console.log('Setting up mobile toggle');
      mobileToggle.addEventListener('click', () => {
        console.log('Mobile toggle clicked');
        sidebar.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (sidebar.classList.contains('active')) {
          icon.className = 'bi bi-x';
          console.log('Sidebar opened');
        } else {
          icon.className = 'bi bi-list';
          console.log('Sidebar closed');
        }
      });
    } else {
      console.error('Mobile toggle or sidebar not found');
    }

    // Active link highlighting
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        console.log('Nav link clicked:', this.textContent);
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
        
        // Close sidebar on mobile after clicking a link
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          icon.className = 'bi bi-list';
        }
      });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
          sidebar.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          icon.className = 'bi bi-list';
        }
      }
    });

    // Set initial active link based on current section
    const setActiveLink = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          if (navLink) {
            navLink.classList.add('active');
          }
        }
      });
    };

    // Set active link on scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Set initial active link
    setActiveLink();
    
    console.log('Sidebar setup complete');
  });

})();