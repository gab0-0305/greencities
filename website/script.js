const $ = (s) => document.querySelector(s);
const cities = [
  { n: 'Copenhagen', r: 'Europe', m: '72%', l: 'Cycling commuters', d: 'Global leader in cycling infrastructure and carbon-neutral planning.' },
  { n: 'Amsterdam', r: 'Europe', m: '64%', l: 'Renewable energy', d: 'Canal-side solar, electric boats, and a dense network of green roofs.' },
  { n: 'Singapore', r: 'Asia', m: '47%', l: 'Green coverage', d: 'Vertical gardens and smart water recycling across the city-state.' },
  { n: 'Seoul', r: 'Asia', m: '55%', l: 'Public transit', d: 'De-paved highways restored to rivers and bike superhighways.' },
  { n: 'Curitiba', r: 'Americas', m: '85%', l: 'Waste recycled', d: "Home of the world's first BRT system and participatory design." },
  { n: 'Bogotá', r: 'Americas', m: '76%', l: 'Green mobility', d: 'Ciclovía Sundays open 120 km of roads to people on foot and bikes.' },
  { n: 'Melbourne', r: 'Oceania', m: '38%', l: 'Tree canopy', d: 'Urban forest strategy targeting 40% canopy cover by 2040.' },
  { n: 'Wellington', r: 'Oceania', m: '69%', l: 'Carbon-free grid', d: 'Compact capital leading in zero-emission transit and coastal restoration.' },
];
const events = [
  [2018, 'Network founded', 'Green Cities begins tracking urban sustainability programs.'],
  [2020, 'First partner cities join', 'Placeholder: describe your early partner milestone here.'],
  [2022, 'Initiative index launched', 'Placeholder: describe the launch of the public index.'],
  [2024, 'Six continents reached', 'Placeholder: describe the global expansion.'],
  [2026, 'Atlas v2', 'Interactive atlas, scores, and monthly briefing go live.'],
];
const ind = ['Mobility', 'Energy', 'Green space', 'Waste', 'Water', 'Air'];
const scores = {
  Copenhagen: [92, 78, 70, 74, 80, 82], Amsterdam: [88, 80, 66, 76, 78, 74],
  Singapore: [80, 62, 72, 70, 90, 68], Seoul: [86, 64, 58, 82, 72, 56],
  Curitiba: [78, 60, 74, 88, 70, 66], 'Bogotá': [74, 58, 54, 62, 64, 52],
  Melbourne: [70, 66, 78, 64, 68, 80], Wellington: [72, 84, 80, 66, 76, 90],
};
const grid = $('#cityGrid');
if (grid) {
  const draw = (r) => {
    grid.innerHTML = cities.filter((c) => r === 'All' || c.r === r).map((c) =>
      `<div class="card"><div class="mut">${c.r}</div><h3>${c.n}</h3><div class="m">${c.m}</div><div class="mut">${c.l}</div><p style="margin-top:8px">${c.d}</p></div>`).join('');
  };
  $('#filters').innerHTML = ['All', 'Europe', 'Asia', 'Americas', 'Oceania'].map((r, i) => `<button class="chip${i ? '' : ' on'}" data-r="${r}">${r}</button>`).join('');
  $('#filters').onclick = (e) => {
    const b = e.target.closest('.chip'); if (!b) return;
    document.querySelectorAll('#filters .chip').forEach((x) => x.classList.toggle('on', x === b));
    draw(b.dataset.r);
  };
  draw('All');
}
const tl = $('#tl');
if (tl) tl.innerHTML = events.map((e) => `<div><b>${e[0]}</b><h3>${e[1]}</h3><p class="mut">${e[2]}</p></div>`).join('');
const sel = $('#citySel');
if (sel) {
  sel.innerHTML = Object.keys(scores).map((c) => `<option>${c}</option>`).join('');
  const show = () => {
    const s = scores[sel.value];
    $('#bars').innerHTML = ind.map((n, i) => `<div><b>${n}</b> <span class="mut">${s[i]}/100</span><div class="bar"><i data-w="${s[i]}"></i></div></div>`).join('');
    setTimeout(() => document.querySelectorAll('.bar i').forEach((b) => (b.style.width = b.dataset.w + '%')), 30);
  };
  sel.onchange = show; show();
}
document.querySelectorAll('.num[data-to]').forEach((el) => {
  const to = +el.dataset.to, suf = el.dataset.suf || '', t0 = performance.now();
  const tick = (t) => {
    const p = Math.min((t - t0) / 1500, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
const bf = $('#bf');
if (bf) bf.onsubmit = (e) => {
  e.preventDefault();
  const name = $('#nm').value.trim(), mail = $('#em').value.trim(), msg = $('#msg');
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
    msg.className = 'msg err'; msg.textContent = 'Enter your name and a valid email address.'; return;
  }
  msg.className = 'msg ok'; msg.textContent = `Thanks, ${name}. You're on the list.`; bf.reset();
};
if ($('#yr')) $('#yr').textContent = new Date().getFullYear();