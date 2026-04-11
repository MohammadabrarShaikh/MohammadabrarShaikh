
  /* ═══════════════════════════════════════════
     LOADER
  ═══════════════════════════════════════════ */
  const STEPS = [
    'Booting systems...',
    'Loading QA Arsenal...',
    'Calibrating bug detectors...',
    'Spawning portfolio assets...',
    'Feature POC reporting for duty...',
    'All systems go. Launching...'
  ];
  let prog = 0;
  const fillEl   = document.getElementById('loaderFill');
  const pctEl    = document.getElementById('loaderPct');
  const statEl   = document.getElementById('loaderStatus');

  function tickLoader() {
    const idx = Math.min(Math.floor(prog / (100 / STEPS.length)), STEPS.length - 1);
    statEl.textContent    = STEPS[idx];
    fillEl.style.width    = prog + '%';
    pctEl.textContent     = Math.round(prog) + '%';
    if (prog < 100) {
      prog = Math.min(prog + (prog < 65 ? Math.random() * 9 + 4 : Math.random() * 3 + 1), 100);
      setTimeout(tickLoader, prog < 70 ? 110 : 190);
    } else {
      setTimeout(() => {
        document.getElementById('gameLoader').classList.add('hidden');
        startTypewriter();
        startCasinoRolls();
      }, 480);
    }
  }
  window.addEventListener('load', () => setTimeout(tickLoader, 150));

  /* ═══════════════════════════════════════════
     TYPEWRITER
  ═══════════════════════════════════════════ */
  function typeAnimate(el, len, speed, onDone) {
    let i = 0;
    el.style.width = '0';
    function tick() {
      i++;
      el.style.width = (i / len * 100) + '%';
      if (i < len) setTimeout(tick, speed);
      else if (onDone) onDone();
    }
    tick();
  }

  function startTypewriter() {
    const tw1 = document.getElementById('tw1');
    const tw2 = document.getElementById('tw2');
    typeAnimate(tw1, 14, 60, () => {          // "Mohammadabrar" = 14 chars
      setTimeout(() => {
        typeAnimate(tw2, 6, 80, () => {       // "Shaikh" = 6 chars
          setTimeout(() => {
            const cur = document.getElementById('twCursor');
            if (cur) cur.style.display = 'none';
          }, 2800);
        });
      }, 120);
    });
  }

  /* ═══════════════════════════════════════════
     CASINO ROLL — hero stats
  ═══════════════════════════════════════════ */
  function casinoRoll(el, target, suffix, dur) {
    const frames = Math.round(dur / 16);
    let f = 0;
    const ease = t => 1 - Math.pow(1 - t, 3);
    function tick() {
      f++;
      const p = ease(f / frames);
      if (f < frames * 0.82) {
        el.textContent = Math.floor(Math.random() * target * 1.3) + suffix;
      } else {
        el.textContent = Math.round(p * target) + suffix;
      }
      if (f < frames) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  function startCasinoRolls() {
    document.querySelectorAll('.hero-stat-val[data-target]').forEach((el, i) => {
      setTimeout(() => {
        casinoRoll(el, +el.dataset.target, el.dataset.suffix || '', 1300);
      }, i * 220);
    });
  }

  /* ═══════════════════════════════════════════
     COUNT UP — impact numbers
  ═══════════════════════════════════════════ */
  function countUp(el, target, suffix, dur) {
    let start = null;
    const ease = t => 1 - Math.pow(1 - t, 3);
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(ease(p) * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  /* ═══════════════════════════════════════════
     INTERSECTION OBSERVER — fade + countup + XP
  ═══════════════════════════════════════════ */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');

      // Impact count-up
      e.target.querySelectorAll('.impact-num[data-target]').forEach(el => {
        if (!el.dataset.counted) {
          el.dataset.counted = '1';
          countUp(el, +el.dataset.target, el.dataset.suffix || '', 1800);
        }
      });

      // XP bar
      const xp = e.target.querySelector('#xpFill');
      if (xp && !xp.dataset.animated) {
        xp.dataset.animated = '1';
        requestAnimationFrame(() => { xp.style.width = '72%'; });
      }

      obs.unobserve(e.target);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  /* ═══════════════════════════════════════════
     STUDIO NAV
  ═══════════════════════════════════════════ */
  function openStudio(id) {
    document.getElementById('studiosGrid').closest('section').style.display = 'none';
    const d = document.getElementById('detail-' + id);
    d.classList.add('active');
    d.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeStudio() {
    document.querySelectorAll('.studio-detail').forEach(d => d.classList.remove('active'));
    const s = document.getElementById('mywork');
    s.style.display = '';
    s.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function selectGame(btn, gameId) {
    btn.closest('.studio-detail').querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    btn.closest('.studio-detail').querySelectorAll('[id^="game-"]').forEach(p => p.style.display = 'none');
    document.getElementById('game-' + gameId).style.display = 'block';
  }

  /* ═══════════════════════════════════════════
     BUG DATA
  ═══════════════════════════════════════════ */
  const bugData = {
    'bug-frag-01': {
      id: 'FRAG-001', title: 'Rate Flag Dialog Displays Debug String',
      game: 'Frag', studio: 'Oh BiBi', platform: 'iOS / Android',
      build: 'v4.2.1 (Live)', severity: 'low', repro: '5/5 attempts',
      description: 'When the user freshly installs the game and completes the tutorial, the Rate Flag dialog is displayed. Tapping on the text fields shows a debug string in the textbox instead of an empty input field.',
      steps: [
        'Freshly install the game.',
        'Complete the tutorial.',
        'Wait for the Rate Flag dialog to surface.',
        'Tap on the text field.',
        'Observe: a debug string is displayed in the textbox.'
      ],
      expected: 'On tapping the text field, user must see an empty textbox.',
      actual: 'User is presented with a debug string on tapping the text field present in the Rate Flag dialog.',
      media: [
        { type: 'video', label: 'Video — Full reproduction', file: 'https://drive.google.com/file/d/1497duNzUDfKTpmgu4JNGmwszkCMzkpCG/view?usp=drive_link' }
      ]
    },
    'bug-frag-02': {
      id: 'FRAG-002', title: 'Agent Jet Can Bypass Port C Barrier Using Special Ability',
      game: 'Frag', studio: 'Oh BiBi', platform: 'Android (18:9 devices)',
      build: 'v4.2.1 (Live)', severity: 'medium', repro: '5/5 attempts',
      description: 'Agent Jet is able to bypass the restricted barrier at Port C by using their special flying ability. This allows unintended access to restricted areas',
      steps: [
        'Launch the game',
        'Start a Match',
        'Select Agent Jet',
        'Navigate to the barrier at Port C',
        'Tap on the super ability',
        'Move forward and hover above the barrier',
        'Observe the agent pass the barrier'
      ],
      expected: 'Agent Jet should not be able to cross or bypass the Port C barrier',
      actual: 'Agent Jet successfully flies over through the barrier',
      media: [
       // { type: 'screenshot', label: 'Screenshot — Overlap on 18:9 device', file: null },
        { type: 'video', label: 'Video — Full reproduction', file: 'https://drive.google.com/file/d/134Blh9HicF3sG_aZZcg8U3gfd9Cnp6Ec/view?usp=drive_link' }
      ]
    }
  };

  const sevMap   = { critical:'sev-critical', high:'sev-high', medium:'sev-medium', low:'sev-low' };
  const sevLabel = { critical:'Critical', high:'High', medium:'Medium', low:'Low' };

  /* Drive helpers */
  const isDrive    = u => u && u.includes('drive.google.com');
  const driveEmbed = u => { const m = u.match(/\/file\/d\/([a-zA-Z0-9_-]+)/); return m ? 'https://drive.google.com/file/d/'+m[1]+'/preview' : u; };

  /* ═══════════════════════════════════════════
     OPEN BUG MODAL
  ═══════════════════════════════════════════ */
  function openBug(id) {
    const d = bugData[id]; if (!d) return;
    document.getElementById('mBugId').textContent       = d.id;
    document.getElementById('mTitle').textContent       = d.title;
    document.getElementById('mGame').textContent        = d.game;
    document.getElementById('mStudio').textContent      = d.studio;
    document.getElementById('mPlatform').textContent    = d.platform;
    document.getElementById('mBuild').textContent       = d.build;
    document.getElementById('mRepro').textContent       = d.repro;
    document.getElementById('mDescription').textContent = d.description;
    document.getElementById('mExpected').textContent    = d.expected;
    document.getElementById('mActual').textContent      = d.actual;

    const chip = document.getElementById('mSeverityChip');
    chip.className   = 'bug-severity ' + (sevMap[d.severity] || 'sev-low');
    chip.textContent = sevLabel[d.severity] || d.severity;

    document.getElementById('mSteps').innerHTML = d.steps.map((s,i) =>
      `<li><span class="step-num">${i+1}</span><span>${s}</span></li>`).join('');

    document.getElementById('mMedia').innerHTML = d.media.map(m => {
      if (!m.file) {
        return `<div class="modal-media-item" style="cursor:default;">
          <div class="modal-media-placeholder-tile">
            <span class="modal-media-placeholder-icon">${m.type==='video'?'▶':'◻'}</span>
            <span class="modal-media-placeholder-label">${m.label}</span>
            <span class="modal-media-placeholder-hint">Add URL in bugData to display</span>
          </div></div>`;
      }
      if (m.type === 'video') {
        if (isDrive(m.file)) {
          return `<div class="modal-media-item" style="cursor:default;">
            <div style="position:relative;width:100%;padding-top:56.25%;background:#000;">
              <iframe src="${driveEmbed(m.file)}"
                style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"
                allow="autoplay" allowfullscreen></iframe>
            </div>
            <div class="modal-media-caption-bar">
              <span class="modal-media-caption">${m.label}</span>
              <a href="${m.file}" target="_blank"
                style="font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--amber);text-decoration:none;">
                ↗ Open in Drive
              </a>
            </div></div>`;
        }
        return `<div class="modal-media-item" style="cursor:default;">
          <video src="${m.file}" controls preload="metadata"
            style="width:100%;max-height:480px;display:block;background:#000;"></video>
          <div class="modal-media-caption-bar">
            <span class="modal-media-caption">${m.label}</span>
            <span class="modal-media-expand" onclick="openLightboxVideo('${m.file}')">⛶ Fullscreen</span>
          </div></div>`;
      }
      return `<div class="modal-media-item" onclick="openLightboxImg('${m.file}')">
        <img src="${m.file}" alt="${m.label}" loading="lazy"
          style="width:100%;height:auto;max-height:480px;object-fit:contain;display:block;background:#000;" />
        <div class="modal-media-caption-bar">
          <span class="modal-media-caption">${m.label}</span>
          <span class="modal-media-expand">⛶ Fullscreen</span>
        </div></div>`;
    }).join('');

    document.getElementById('mMediaHint').textContent =
      d.media.every(m => m.file) ? '' : 'To show media: set file: "https://url" in bugData.';
    document.getElementById('bugModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeBug() {
    document.getElementById('bugModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function handleModalOverlayClick(e) {
    if (e.target === document.getElementById('bugModal')) closeBug();
  }

  document.addEventListener('keydown', e => { if (e.key==='Escape') { closeBug(); closeLightbox(); } });

  /* ═══════════════════════════════════════════
     LIGHTBOX
  ═══════════════════════════════════════════ */
  function openLightboxImg(src) {
    const lb=document.getElementById('lightbox'), img=document.getElementById('lightboxImg'), vid=document.getElementById('lightboxVid');
    img.src=src; img.style.display='block'; vid.style.display='none'; lb.classList.add('open');
  }
  function openLightboxVideo(src) {
    const lb=document.getElementById('lightbox'), img=document.getElementById('lightboxImg'), vid=document.getElementById('lightboxVid');
    vid.src=src; vid.style.display='block'; img.style.display='none'; lb.classList.add('open');
  }
  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.getElementById('lightboxVid').pause?.();
  }