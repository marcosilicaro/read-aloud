/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ────────────────────────────────────────────────────────────
   Tiny icon library — line icons to match the literary feel
   ──────────────────────────────────────────────────────────── */
const Icon = ({ name, size = 18 }) => {
  const paths = {
    library: 'M4 4v16M8 4v16M13 6l3-1 4 15-3 1z M4 4h4M4 20h4',
    search: 'M15 15l5 5 M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z',
    close:  'M6 6l12 12M18 6l-12 12',
    chevL:  'M15 6l-6 6 6 6',
    chevR:  'M9 6l6 6-6 6',
    book:   'M4 4h7a3 3 0 013 3v13 M20 4h-7a3 3 0 00-3 3v13 M4 4v16h7M20 4v16h-7',
    bookmark: 'M6 3h12v18l-6-4-6 4z',
    more:   'M12 6v.01M12 12v.01M12 18v.01',
    menu:   'M4 6h16M4 12h16M4 18h16',
    sun:    'M12 4v2M12 18v2M4 12h2M18 12h2M6 6l1.5 1.5M16.5 16.5L18 18M18 6l-1.5 1.5M7.5 16.5L6 18 M12 16a4 4 0 100-8 4 4 0 000 8z',
    moon:   'M20 14A9 9 0 119.5 3.5 7 7 0 0020 14z',
    type:   'M4 7V5h16v2 M12 5v14 M8 19h8',
    speed:  'M12 3a9 9 0 019 9 M12 3v4 M12 12l5-4 M12 21A9 9 0 013 12',
    notes:  'M9 3h10v18H5V7l4-4z M9 3v4H5',
    list:   'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    tap:    'M9 11V6a3 3 0 116 0v7 M9 11v4a4 4 0 008 0v-3 M9 11a2 2 0 10-4 0c0 1 .5 2 2 4l2 3',
    back15: 'M7 4v5h5 M7 9a8 8 0 113-6',
    fwd30:  'M17 4v5h-5 M17 9A8 8 0 107 5',
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}
      fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  );
};

const PlayIcon = ({size=16}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M7 4l14 8-14 8z"/>
  </svg>
);
const PauseIcon = ({size=16}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <rect x="6" y="4" width="4" height="16" rx="1"/>
    <rect x="14" y="4" width="4" height="16" rx="1"/>
  </svg>
);

/* ─────────── Decorative book cover ─────────── */
const BookCover = ({ book }) => {
  const variants = {
    ancient: {
      bg: 'linear-gradient(160deg, oklch(0.34 0.07 55), oklch(0.22 0.05 55))',
      accent: 'oklch(0.72 0.14 70)',
    },
    monetary: {
      bg: 'linear-gradient(160deg, oklch(0.32 0.06 220), oklch(0.22 0.04 220))',
      accent: 'oklch(0.72 0.12 200)',
    },
    transcript: {
      bg: 'linear-gradient(160deg, oklch(0.35 0.05 140), oklch(0.23 0.03 140))',
      accent: 'oklch(0.78 0.1 110)',
    },
  };
  const v = variants[book.cover] || variants.ancient;
  // short title for spine/cover
  const short = book.title.length > 22 ? book.title.split(/[\s:]/)[0] + '…' : book.title;
  return (
    <div className="book-cover" style={{ background: v.bg }}>
      <div className="cv-title">
        <div className="t" style={{ color: v.accent }}>{short}</div>
        <div className="a">{book.author.split('&')[0]}</div>
      </div>
    </div>
  );
};

/* ─────────── Topbar ─────────── */
const TopBar = ({ left, center, right }) => (
  <div className="topbar">
    <div style={{width: 80, display: 'flex', gap: 4}}>{left}</div>
    <div className="center" style={{flex: 1, textAlign: 'center'}}>{center}</div>
    <div style={{width: 80, display: 'flex', gap: 4, justifyContent: 'flex-end'}}>{right}</div>
  </div>
);

/* ─────────── Library view ─────────── */
const LibraryView = ({ active, onOpen, onOpenSummary }) => {
  const books = window.LIBRARY;
  const current = books[0]; // The Volcker book is the "continue" candidate; pick the long one.
  const continueBook = books.find(b => b.listenedMin > 0 && b.listenedMin < b.minutes) || books[0];
  const recent = books.filter(b => b.id !== continueBook.id);

  // Totals
  const totalMin = books.reduce((s, b) => s + b.listenedMin, 0);
  const totalHrs = Math.floor(totalMin / 60);
  const totalExtra = totalMin % 60;

  const fmtProgress = (b) => `${Math.floor(b.listenedMin / 60)}h ${b.listenedMin % 60}m of ${Math.floor(b.minutes / 60)}h`;

  return (
    <div className={`view ${active ? 'active' : ''}`}>
      <TopBar
        left={<button className="iconbtn" aria-label="menu"><Icon name="menu" /></button>}
        center={<span className="brand">Aloud</span>}
        right={<button className="iconbtn" aria-label="search"><Icon name="search" /></button>}
      />
      <div className="lib-scroll">
        <div className="lib-masthead">
          <div className="kicker">Tuesday · April 17</div>
          <h1>Your <em>Reading Room</em></h1>
        </div>

        {/* Continue reading — hero */}
        <div className="hero" onClick={() => onOpen(continueBook)}>
          <div className="hero-kicker">
            <span className="dot"/>
            Continue reading
          </div>
          <h2>{continueBook.title}</h2>
          <div className="hero-author">by {continueBook.author}</div>
          <div className="hero-excerpt">
            “Since it's saying no additional rent, that means it's a gross lease. What they can do is separately meter the utilities…”
          </div>
          <div className="hero-progress">
            <span>{fmtProgress(continueBook)}</span>
            <div className="bar"><div className="fill" style={{width: `${(continueBook.listenedMin / continueBook.minutes) * 100}%`}}/></div>
            <span>{Math.round((continueBook.listenedMin / continueBook.minutes) * 100)}%</span>
          </div>
          <div className="play-pill"><PlayIcon size={18}/></div>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat">
            <div className="num">{totalHrs}<em>h</em>{totalExtra > 0 ? <>{' '}{totalExtra}<em>m</em></> : null}</div>
            <div className="lbl">Listened</div>
          </div>
          <div className="stat">
            <div className="num">{books.length}</div>
            <div className="lbl">In Progress</div>
          </div>
          <div className="stat">
            <div className="num">12</div>
            <div className="lbl">Day Streak</div>
          </div>
        </div>

        <div className="shelf-title">Your Shelf</div>
        {books.map(b => (
          <div key={b.id} className="book-row" onClick={() => onOpen(b)}>
            <BookCover book={b} />
            <div className="book-info">
              <div className="bk-title">{b.title}</div>
              <div className="bk-author">{b.author}</div>
              <div className="bk-meta">
                <span>{fmtProgress(b)}</span>
                <div className="bk-bar"><div className="bf" style={{width: `${(b.listenedMin / b.minutes) * 100}%`}}/></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────── Reader view — the centerpiece ─────────── */
const ReaderView = ({ active, onBack, onOpenSummary }) => {
  const chapter = window.SAMPLE_CHAPTER;
  const segments = chapter.segments;

  const [isPlaying, setPlaying] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const [currentSeg, setCurrentSeg] = useState(2); // we're in the middle of the call
  const [currentSent, setCurrentSent] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const surfaceRef = useRef(null);
  const tickRef = useRef(null);
  const ghostRef = useRef(null);

  // Split segments' text into sentences
  const segmentsWithSentences = useMemo(() =>
    segments.map(s => ({
      ...s,
      sentences: s.text.split(/(?<=[.!?])\s+/).filter(Boolean),
    })), [segments]);

  // Total "read" time estimate for progress bar
  const totalSentences = segmentsWithSentences.reduce((s, seg) => s + seg.sentences.length, 0);
  const readSentences = segmentsWithSentences.slice(0, currentSeg).reduce((s, seg) => s + seg.sentences.length, 0) + currentSent;

  // Auto-advance while playing
  useEffect(() => {
    if (!isPlaying) { clearTimeout(tickRef.current); return; }
    const seg = segmentsWithSentences[currentSeg];
    if (!seg) { setPlaying(false); return; }
    const sentText = seg.sentences[currentSent] || '';
    const baseMs = Math.max(1400, Math.min(5500, sentText.length * 55));
    const ms = baseMs / speed;

    // Scroll the current sentence into comfortable view
    requestAnimationFrame(() => {
      const el = document.querySelector('.sentence.current');
      if (el && surfaceRef.current) {
        const surfRect = surfaceRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const target = (elRect.top - surfRect.top) - (surfRect.height * 0.38);
        surfaceRef.current.scrollBy({ top: target, behavior: 'smooth' });
      }
    });

    tickRef.current = setTimeout(() => {
      if (currentSent + 1 < seg.sentences.length) {
        setCurrentSent(currentSent + 1);
      } else if (currentSeg + 1 < segmentsWithSentences.length) {
        setCurrentSeg(currentSeg + 1);
        setCurrentSent(0);
      } else {
        setPlaying(false);
      }
    }, ms);

    return () => clearTimeout(tickRef.current);
  }, [isPlaying, currentSeg, currentSent, speed, segmentsWithSentences]);

  // Immersive mode: auto-activate after 3s of play, deactivate on tap
  useEffect(() => {
    if (isPlaying) {
      const t = setTimeout(() => setImmersive(true), 2500);
      return () => clearTimeout(t);
    } else {
      setImmersive(false);
    }
  }, [isPlaying]);

  // Tap on a sentence to jump there
  const onSegClick = (segIdx, sentIdx) => {
    setCurrentSeg(segIdx);
    setCurrentSent(sentIdx);
    // keep playing
  };

  // Skip back/forward
  const skip = (delta) => {
    // delta in sentences
    let newSeg = currentSeg, newSent = currentSent + delta;
    while (newSent < 0) {
      if (newSeg === 0) { newSent = 0; break; }
      newSeg--;
      newSent += segmentsWithSentences[newSeg].sentences.length;
    }
    while (newSent >= (segmentsWithSentences[newSeg]?.sentences.length || 0)) {
      if (newSeg + 1 >= segmentsWithSentences.length) {
        newSent = segmentsWithSentences[newSeg].sentences.length - 1; break;
      }
      newSent -= segmentsWithSentences[newSeg].sentences.length;
      newSeg++;
    }
    setCurrentSeg(newSeg); setCurrentSent(newSent);
    flashGhost(delta > 0 ? 'fwd30' : 'back15');
  };

  const flashGhost = (name) => {
    if (!ghostRef.current) return;
    ghostRef.current.dataset.icon = name;
    ghostRef.current.classList.add('show');
    setTimeout(() => ghostRef.current?.classList.remove('show'), 450);
  };

  // Tap anywhere in surface while immersive → exit immersive
  const onSurfaceTap = (e) => {
    if (e.target.closest('.seg')) return; // sentence tap handled below
    if (immersive) setImmersive(false);
  };

  // Speed cycle
  const cycleSpeed = () => {
    const speeds = [0.8, 1.0, 1.25, 1.5, 1.75, 2.0];
    setSpeed(speeds[(speeds.indexOf(speed) + 1) % speeds.length]);
  };

  const progress = totalSentences ? (readSentences / totalSentences) : 0;
  const elapsedMin = Math.floor(progress * 17);
  const remainMin = 17 - elapsedMin;

  return (
    <div className={`view reader ${active ? 'active' : ''} ${immersive ? 'immersive' : ''}`}>
      <TopBar
        left={
          <button className="iconbtn" onClick={onBack} aria-label="back">
            <Icon name="chevL" />
          </button>
        }
        center={
          <>
            <div className="ch-kicker">Call with James</div>
            <div className="ch-title">{chapter.chapterTitle}</div>
          </>
        }
        right={
          <>
            <button className="iconbtn" onClick={onOpenSummary} aria-label="summary"><Icon name="notes" /></button>
            <button className="iconbtn" aria-label="chapters"><Icon name="list" /></button>
          </>
        }
      />
      <div className="reader-surface" ref={surfaceRef} onClick={onSurfaceTap}>
        <div className="ch-head">
          <div className="num">
            <span className="flourish"/>
            Chapter One
            <span className="flourish"/>
          </div>
          <h2>{chapter.chapterTitle}</h2>
        </div>
        {segmentsWithSentences.map((seg, sIdx) => (
          <div key={sIdx} className={`seg ${sIdx === currentSeg ? 'active' : ''}`}>
            <div className="seg-head">
              <span className="speaker">{seg.speaker}</span>
            </div>
            <div className="seg-body">
              {seg.sentences.map((sent, tIdx) => {
                const isCurrent = sIdx === currentSeg && tIdx === currentSent && isPlaying;
                const sentMs = Math.max(1400, Math.min(5500, sent.length * 55)) / speed;
                return (
                  <span
                    key={tIdx}
                    className={`sentence ${isCurrent ? 'current' : ''}`}
                    style={isCurrent ? { '--sent-ms': `${sentMs}ms` } : {}}
                    onClick={(e) => { e.stopPropagation(); onSegClick(sIdx, tIdx); if (!isPlaying) setPlaying(true); }}
                  >
                    {sent}{tIdx < seg.sentences.length - 1 ? ' ' : ''}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="tap-ghost" ref={ghostRef}>
        <Icon name={ghostRef.current?.dataset.icon || 'tap'} size={22}/>
      </div>

      <div className="rail">
        <div className="track"><div className="fill" style={{width: `${progress * 100}%`}}/></div>
        <div className="labels">
          <span>{String(elapsedMin).padStart(2,'0')}:00 elapsed</span>
          <span>−{String(remainMin).padStart(2,'0')}:00</span>
        </div>
      </div>

      <div className="pill">
        <button className="icon" onClick={() => skip(-3)} aria-label="back 15s">
          <Icon name="back15" size={17}/>
        </button>
        <button className="play" onClick={() => setPlaying(!isPlaying)} aria-label={isPlaying ? 'pause' : 'play'}>
          {isPlaying ? <PauseIcon size={14}/> : <PlayIcon size={14}/>}
        </button>
        <button className="icon" onClick={() => skip(3)} aria-label="forward 30s">
          <Icon name="fwd30" size={17}/>
        </button>
        <button className="speed" onClick={cycleSpeed}>{speed.toFixed(speed % 1 === 0 ? 1 : 2)}×</button>
      </div>
    </div>
  );
};

/* ─────────── Summary view ─────────── */
const SummaryView = ({ active, onBack }) => {
  const s = window.SAMPLE_SUMMARY;
  return (
    <div className={`view ${active ? 'active' : ''}`}>
      <TopBar
        left={<button className="iconbtn" onClick={onBack}><Icon name="chevL"/></button>}
        center={<span className="brand" style={{fontSize: 14}}>Chapter Notes</span>}
        right={<button className="iconbtn"><Icon name="bookmark"/></button>}
      />
      <div className="summary-scroll">
        <div className="summary-masthead">
          <div className="sm-kicker">Editor's Summary</div>
          <div className="sm-period">{s.period}</div>
          <h1>{s.chapterTitle}</h1>
        </div>

        <div className="big-idea">{s.bigIdea}</div>

        <div className="sec-label">Key Takeaways</div>
        {s.takeaways.map((t, i) => (
          <div className="takeaway" key={i}>
            <div className="tk-num">{String(i+1).padStart(2,'0')}</div>
            <div>
              <div className="tk-title">{t.title}</div>
              <div className="tk-text">{t.text}</div>
            </div>
          </div>
        ))}

        <div className="pull-quote">{s.pullQuote}</div>

        <div className="sec-label">Dramatis Personae</div>
        <div className="figures">
          {s.figures.map((f, i) => (
            <div className="figure" key={i}>
              <div className="fig-name">{f.name}</div>
              <div className="fig-role">{f.role}</div>
            </div>
          ))}
        </div>

        <div className="sec-label">Timeline</div>
        <div className="timeline">
          {s.timeline.map((t, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-year">{t.year}</div>
              <div className="tl-label">{t.label}</div>
            </div>
          ))}
        </div>

        <div className="sec-label">Key Terms</div>
        <div className="terms">
          {s.terms.map((t, i) => <div className="term" key={i}>{t}</div>)}
        </div>
      </div>
    </div>
  );
};

/* ─────────── App ─────────── */
const App = () => {
  const [view, setView] = useState('reader'); // start in reader so users immediately see the centerpiece
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(19);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.style.setProperty('--reader-size', fontSize + 'px');
  }, [fontSize]);

  // Expose for Tweaks panel
  useEffect(() => {
    window.__setView = setView;
    window.__setTheme = setTheme;
    window.__setFontSize = setFontSize;
    window.__getState = () => ({ view, theme, fontSize });
  });

  return (
    <div className="page">
      <LibraryView
        active={view === 'library'}
        onOpen={(b) => setView('reader')}
      />
      <ReaderView
        active={view === 'reader'}
        onBack={() => setView('library')}
        onOpenSummary={() => setView('summary')}
      />
      <SummaryView
        active={view === 'summary'}
        onBack={() => setView('reader')}
      />
    </div>
  );
};

Object.assign(window, { App, Icon, PlayIcon, PauseIcon });
