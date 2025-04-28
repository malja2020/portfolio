const navbar = document.querySelector('.navbar');
const logoName = document.getElementById('logo-name');
const navLinks = navbar.querySelector('ul');
const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = `<div></div><div></div><div></div>`;
navbar.appendChild(hamburger);

const closeBtn = document.createElement('div');
closeBtn.classList.add('close-btn');
closeBtn.innerHTML = '&times;';
closeBtn.style.display = 'none';
navbar.appendChild(closeBtn);

hamburger.style.opacity = '0';
hamburger.style.pointerEvents = 'none';

let isNavbarActive = false;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const firstPageHeight = document.getElementById('home').offsetHeight;

    if (scrollY > firstPageHeight - 100) {
        hamburger.style.opacity = '1';
        hamburger.style.pointerEvents = 'auto';
        hamburger.style.transform = 'translateY(-50%) scale(1)';
        
        navLinks.style.opacity = '0';
        navLinks.style.transform = 'translateY(-10px)';
        logoName.style.opacity = '0';
        logoName.style.transform = 'translateX(-20px)';
    } else {
        hamburger.style.opacity = '0';
        hamburger.style.pointerEvents = 'none';
        hamburger.style.transform = 'translateY(-50%) scale(0.8)';
        
        navLinks.style.opacity = '1';
        navLinks.style.transform = 'translateY(0)';
        logoName.style.opacity = '1';
        logoName.style.transform = 'translateX(0)';
    }

    if (navbar.classList.contains('active') && !isNavbarActive) {
        navbar.classList.remove('active');
        closeBtn.style.display = 'none';
        hamburger.style.display = 'flex';
        isNavbarActive = false;
    }
});

hamburger.addEventListener('click', () => {
    navbar.classList.add('active');
    navLinks.style.opacity = '1';
    navLinks.style.transform = 'translateY(0)';
    logoName.style.opacity = '1';
    logoName.style.transform = 'translateX(0)';
    closeBtn.style.display = 'block';
    hamburger.style.display = 'none';
    isNavbarActive = true;
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    navbar.classList.remove('active');
    closeBtn.style.display = 'none';
    hamburger.style.display = 'flex';
    isNavbarActive = false;
    document.body.style.overflow = '';
});

function scrollToTarget(targetY, duration = 800) {
    const startY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const target = targetY > maxScroll ? maxScroll : targetY;

    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        const scrollY = startY + (target - startY) * ease;
        window.scrollTo(0, scrollY);

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

document.querySelectorAll('.navbar a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) {
            const offset = 80;
            const targetY = target.offsetTop - offset;

            scrollToTarget(targetY, 700);
            navbar.classList.remove('active');
            closeBtn.style.display = 'none';
            hamburger.style.display = 'flex';
            document.body.style.overflow = '';
        }
    });
});

  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');
  const leftBtn = document.querySelector('.carousel-btn.left');
  const rightBtn = document.querySelector('.carousel-btn.right');

  let index = 0;
  const itemsToShow = 3;

  function updateCarousel() {
    const itemWidth = items[0].offsetWidth + 16;
    const maxIndex = items.length - itemsToShow;
    index = Math.max(0, Math.min(index, maxIndex));
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  leftBtn.addEventListener('click', () => {
    index--;
    updateCarousel();
  });

  rightBtn.addEventListener('click', () => {
    index++;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);
  
  (function() {
    emailjs.init("l-n3I8NT-A-xYm42m");
  })();

  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const msgField = document.getElementById("form-message");

    if (!name || !email || !message) {
      msgField.style.color = 'red';
      msgField.innerText = "Please fill out all fields.";
      return;
    }

    // Send using EmailJS
    emailjs.send("earlclarence2020", "template_2020", {
      from_name: name,
      reply_to: email,
      message: message
    }).then(() => {
      msgField.style.color = 'lightgreen';
      msgField.innerText = "Message sent successfully!";
      document.getElementById("contact-form").reset();
    }, (error) => {
      msgField.style.color = 'red';
      msgField.innerText = "Sending failed. Please try again.";
      console.error("EmailJS Error:", error);
    });
  });
  
  const form = document.getElementById('contact-form');
  const messageBox = document.getElementById('form-message');

  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // prevent default form submission

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      const result = await response.text();
      messageBox.textContent = result;
      messageBox.style.color = 'lightgreen';

      // Auto-hide message after 3 seconds
      setTimeout(() => {
        messageBox.textContent = '';
      }, 3000);

      // Optionally clear the form
      form.reset();

    } catch (error) {


      setTimeout(() => {
        messageBox.textContent = '';
      }, 3000);
    }
  });

  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const image = document.querySelector(".round-image");
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (image) {
      // Restart animation by removing and re-adding the class
      image.classList.remove("spin");
      void image.offsetWidth; // Force reflow
      image.classList.add("spin");
    }

    lastScrollTop = scrollTop;
  });

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };



