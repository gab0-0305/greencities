const cities = [
  {
    name: 'Copenhagen',
    region: 'europe',
    emoji: '🚲',
    gradient: 'linear-gradient(135deg, #a8f0d0, #48c78e)',
    description: 'A global leader in cycling infrastructure and carbon-neutral urban planning.',
    metric: '72%',
    metricLabel: 'Cycling commuters',
  },
  {
    name: 'Singapore',
    region: 'asia',
    emoji: '🌿',
    gradient: 'linear-gradient(135deg, #b9f77c, #2e9c63)',
    description: 'Pioneering vertical gardens and smart water recycling across the city-state.',
    metric: '47%',
    metricLabel: 'Green coverage',
  },
  {
    name: 'Curitiba',
    region: 'americas',
    emoji: '🚌',
    gradient: 'linear-gradient(135deg, #7dd3a3, #1b5e3a)',
    description: "Home of the world's first BRT system and a model for participatory urban design.",
    metric: '85%',
    metricLabel: 'Waste recycled',
  },
  {
    name: 'Amsterdam',
    region: 'europe',
    emoji: '☀️',
    gradient: 'linear-gradient(135deg, #d3f0dd, #48c78e)',
    description: 'Canal-side solar arrays, electric boats, and a dense network of green roofs.',
    metric: '64%',
    metricLabel: 'Renewable energy',
  },
  {
    name: 'Melbourne',
    region: 'oceania',
    emoji: '🌳',
    gradient: 'linear-gradient(135deg, #a8f0d0, #2e9c63)',
    description: 'Urban forest strategy targeting 40% tree canopy cover by 2040.',
    metric: '38%',
    metricLabel: 'Tree canopy',
  },
  {
    name: 'Seoul',
    region: 'asia',
    emoji: '🚇',
    gradient: 'linear-gradient(135deg, #b9f77c, #1b5e3a)',
    description: 'De-paved highways restored to rivers, plus a vast network of bike superhighways.',
    metric: '55%',
    metricLabel: 'Public transit',
  },
  {
    name: 'Bogotá',
    region: 'americas',
    emoji: '🚴',
    gradient: 'linear-gradient(135deg, #7dd3a3, #48c78e)',
    description: 'Ciclovía Sundays open 120km of roads to pedestrians and cyclists weekly.',
    metric: '76%',
    metricLabel: 'Green mobility',
  },
  {
    name: 'Wellington',
    region: 'oceania',
    emoji: '🌊',
    gradient: 'linear-gradient(135deg, #d3f0dd, #2e9c63)',
    description: 'A compact capital leading in zero-emission public transport and coastal restoration.',
    metric: '69%',
    metricLabel: 'Carbon-free grid',
  },
];

const initiatives = [
  {
    icon: '🌳',
    title: 'Urban Forests',
    desc: 'Reintroducing native tree species to city centers, boosting biodiversity and cooling urban heat islands.',
  },
  {
    icon: '🚲',
    title: 'Green Mobility',
    desc: 'Cycling superhighways, pedestrian zones, and electric public transit that put people before cars.',
  },
  {
    icon: '☀️',
    title: 'Renewable Grids',
    desc: 'Solar roofs, wind microgrids, and community-owned energy projects powering neighborhoods.',
  },
  {
    icon: '🌾',
    title: 'Urban Farming',
    desc: 'Rooftop gardens, vertical farms, and community plots bringing food production back to the city.',
  },
  {
    icon: '💧',
    title: 'Smart Water',
    desc: 'Rainwater harvesting, permeable pavements, and greywater recycling to close the loop.',
  },
  {
    icon: '♻️',
    title: 'Circular Waste',
    desc: 'Zero-waste strategies, composting networks, and repair cafés that keep materials in use.',
  },
];

const chartData = [
  { city: 'Copenhagen', values: [12, 24, 38] },
  { city: 'Singapore', values: [18, 32, 45] },
  { city: 'Curitiba', values: [8, 20, 33] },
  { city: 'Amsterdam', values: [15, 28, 42] },
  { city: 'Seoul', values: [10, 22, 36] },
  { city: 'Bogotá', values: [7, 18, 29] },
];

/* ---------- 2. Render Cities ---------- */
function renderCities(filter = 'all') {
  const grid = document.getElementById('citiesGrid');
  if (!grid) return;

  const list = filter === 'all'
    ? cities
    : cities.filter((c) => c.region === filter);

  grid.innerHTML = list
    .map(
      (c, i) => `
      <article class="city-card reveal" style="animation-delay:${i * 60}ms">
        <div class="city-visual" style="background:${c.gradient}">
          <span>${c.emoji}</span>
        </div>
        <div class="city-body">
          <h3 class="city-name">${c.name}</h3>
          <p class="city-region">${c.region}</p>
          <p class="city-desc">${c.description}</p>
          <div class="city-metric">
            <span class="metric-value">${c.metric}</span>
            <span class="metric-label">${c.metricLabel}</span>
          </div>
        </div>
      </article>
    `
    )
    .join('');

  // Re-observe newly injected cards
  attachRevealObserver();
}

/* ---------- 3. Filters ---------- */
function initFilters() {
  const filtersEl = document.getElementById('filters');
  if (!filtersEl) return;

  filtersEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filtersEl.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderCities(btn.dataset.filter);
  });
}

/* ---------- 4. Render Initiatives ---------- */
function renderInitiatives() {
  const grid = document.getElementById('initiativesGrid');
  if (!grid) return;

  grid.innerHTML = initiatives
    .map(
      (it, i) => `
      <div class="initiative-card reveal" style="transition-delay:${i * 60}ms">
        <div class="initiative-icon">${it.icon}</div>
        <h3 class="initiative-title">${it.title}</h3>
        <p class="initiative-desc">${it.desc}</p>
      </div>
    `
    )
    .join('');
}

/* ---------- 5. Render Chart ---------- */
function renderChart() {
  const chart = document.getElementById('chart');
  if (!chart) return;

  chart.innerHTML = chartData
    .map((group) => {
      const max = 50;
      const bars = group.values
        .map((v, i) => {
          const heightPct = (v / max) * 100;
          return `<div class="bar bar-${i + 1}" data-value="${v}%" data-height="${heightPct}"></div>`;
        })
        .join('');
      return `
        <div class="chart-group">
          ${bars}
          <span class="chart-group-label">${group.city}</span>
        </div>
      `;
    })
    .join('');
}

function animateChart() {
  document.querySelectorAll('.bar').forEach((bar) => {
    const target = bar.dataset.height;
    bar.style.height = target + '%';
  });
}

/* ---------- 6. Stats Counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const animate = (el) => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    };

    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((c) => observer.observe(c));
}

/* ---------- 7. Chart on scroll ---------- */
function initChartObserver() {
  const chart = document.getElementById('chart');
  if (!chart) return;

  if (!('IntersectionObserver' in window)) {
    animateChart();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateChart();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(chart);
}

/* ---------- 8. Reveal on scroll ---------- */
let revealObserver;
function attachRevealObserver() {
  const elements = document.querySelectorAll('.reveal:not(.visible)');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
  }

  elements.forEach((el) => revealObserver.observe(el));
}

/* ---------- 9. Navbar scroll ---------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- 10. Mobile Menu ---------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  const toggle = () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  };

  const close = () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggle);
  navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
}

/* ---------- 11. Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ---------- 12. Active Nav Highlight ---------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 130;
    let current = '';
    sections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- 13. Back to Top ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const onScroll = () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- 14. Theme Toggle ---------- */
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const icon = btn.querySelector('.theme-icon');
  const stored = localStorage.getItem('gc-theme');

  if (stored === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    icon.textContent = '☀️';
  }

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      icon.textContent = '🌙';
      localStorage.setItem('gc-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      icon.textContent = '☀️';
      localStorage.setItem('gc-theme', 'dark');
    }
  });
}

/* ---------- 15. Newsletter Form ---------- */
function initJoinForm() {
  const form = document.getElementById('joinForm');
  const input = document.getElementById('emailInput');
  const msg = document.getElementById('formMsg');
  if (!form || !input || !msg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      msg.textContent = 'Please enter a valid email address.';
      msg.className = 'form-msg error';
      return;
    }

    msg.textContent = `🌱 Thanks! ${email} has been added to our list.`;
    msg.className = 'form-msg success';
    input.value = '';
  });
}

/* ---------- 16. Footer Year ---------- */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- 17. Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderCities();
  renderInitiatives();
  renderChart();
  initFilters();
  attachRevealObserver();
  initCounters();
  initChartObserver();
  initNavbarScroll();
  initMobileMenu();
  initSmoothScroll();
  initActiveNav();
  initBackToTop();
  initThemeToggle();
  initJoinForm();
  initYear();
});