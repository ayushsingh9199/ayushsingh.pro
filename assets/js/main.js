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
  on('click', '.mobile-nav-toggle', function(e) {
    select('#header').classList.toggle('header-show')
    select('.mobile-nav-toggle').classList.toggle('bi-list')
    select('.mobile-nav-toggle').classList.toggle('bi-x')
  })

  /**
   * Mobile nav toggle - Alternative implementation
   */
  document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".mobile-nav-toggle");
    const nav = document.querySelector("#navmenu");

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        nav.classList.toggle("navmenu-active");
        toggle.classList.toggle("bi-x"); // change icon to 'X' when open
        select('#header').classList.toggle('header-show');
      });
    }
  });

  /**
   * Hide mobile nav on same-page/hash links
   */
  on('click', '#navmenu a', function(e) {
    if (select(this.hash)) {
      select('#header').classList.remove('header-show')
      select('.mobile-nav-toggle').classList.toggle('bi-list')
      select('.mobile-nav-toggle').classList.toggle('bi-x')
    }
  }, true)

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = select('.navmenu .dropdown > a', true)

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-toggle').classList.contains('bi-list')) {
        event.preventDefault()
        this.classList.toggle('active')
        this.nextElementSibling.classList.toggle('dropdown-active')

        let dropDownIndicator = this.querySelector('.toggle-dropdown')
        dropDownIndicator.classList.toggle('bi-chevron-up')
        dropDownIndicator.classList.toggle('bi-chevron-down')
      }
    })
  })

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

})();