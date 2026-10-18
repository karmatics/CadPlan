class CadVideoRegistry {
  /**
   * Curated registry of video demonstrations, historical archives, and spatial interaction tests.
   */
  static getRegistry() {
    return [
      {
        id: 'accudraw_3d_classic',
        youtubeId: 'dQw4w9WgXcQ', // Placeholder until exact Rob Brown YouTube IDs are passed
        title: 'Original AccuDraw 3D Spatial Navigation (MicroStation 95)',
        description: 'Demonstrating single-stroke plane rotations (T, F, S), floating origin translation, and dynamic coordinate indexing.',
        duration: '4:15',
        bookmarks: [
          { time: 15, label: 'Keyboard & Mouse Team Dynamics' },
          { time: 65, label: 'Rotating Drawing Plane (T/F/S)' },
          { time: 140, label: 'Move Origin (O) in 3D Space' }
        ]
      },
      {
        id: 'accucad_webgl_demo',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'accuCad Three.js WebGL Prototype & Snapping Engine',
        description: 'Live test bench of chorded tentative snapping, squircle compass animation, and real-time path rounding.',
        duration: '3:40',
        bookmarks: [
          { time: 10, label: 'Chorded Clicks (50ms Snap)' },
          { time: 55, label: 'Smart Lock (L Key)' },
          { time: 120, label: 'Dynamic Corner Fillets' }
        ]
      },
      {
        id: 'touch_controller_pairing',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Two-Handed CAD: TouchController WebRTC Modulation',
        description: 'Right hand drives precision cursor snapping while left hand on mobile scrubs curve tension and Z depth.',
        duration: '2:50',
        bookmarks: [
          { time: 15, label: 'Instant QR Scan Pairing' },
          { time: 45, label: 'Dynamic Spline Tension Scrubbing' },
          { time: 95, label: 'Parallax Motion Oscillation' }
        ]
      }
    ];
  }

  static get(videoId) {
    return this.getRegistry().find(v => v.id === videoId || v.youtubeId === videoId);
  }

  static renderPlayer(container, options = {}) {
      const videoData = typeof options === 'string' ? this.get(options) : (options.videoData || this.get(options.id));
      if (!videoData) {
        container.innerHTML = '<div style="color:#ef4444;padding:12px;">Video not found in registry.</div>';
        return;
      }

      container.innerHTML = '';
      const wrap = makeElement('div', {
        style: {
          background: '#090d16',
          border: '1.5px solid #21262d',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column'
        }
      });

      const header = makeElement('div', {
        style: {
          padding: '10px 14px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid #21262d',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
      }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          makeElement('span', { style: { fontSize: '14px' } }, '📹'),
          makeElement('strong', { style: { fontSize: '12px', color: '#38bdf8', fontFamily: 'monospace' } }, videoData.title),
          makeElement('span', { id: `loop-indicator-${videoData.id}`, style: { fontSize: '10px', color: '#64748b', fontFamily: 'monospace' } }, '')
        ]),
        makeElement('span', { style: { fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' } }, videoData.duration || '')
      ]);
      wrap.appendChild(header);

      const playerHost = makeElement('div', {
        style: { width: '100%', height: options.height || '380px', position: 'relative', background: '#000000' }
      });
      wrap.appendChild(playerHost);

      let activePlayer = null;
      let loopInterval = null;
      let activeLoop = null; // { start, end }

      const stopLoop = () => {
        if (loopInterval) {
          clearInterval(loopInterval);
          loopInterval = null;
        }
        activeLoop = null;
        const ind = document.getElementById(`loop-indicator-${videoData.id}`);
        if (ind) ind.textContent = '';
      };

      const startLoop = (startSec, endSec, label) => {
        stopLoop();
        activeLoop = { start: startSec, end: endSec };

        const ind = document.getElementById(`loop-indicator-${videoData.id}`);
        if (ind) {
          ind.textContent = `[🔁 Looping: ${startSec}s - ${endSec}s (${label})]`;
          ind.style.color = '#10b981';
        }

        if (activePlayer && typeof activePlayer.seekTo === 'function') {
          activePlayer.seekTo(startSec);
          activePlayer.play();

          loopInterval = setInterval(() => {
            if (!activeLoop || !activePlayer) return;
            const curTime = activePlayer.getCurrentRawTime();
            if (curTime >= activeLoop.end || curTime < activeLoop.start - 0.5) {
              activePlayer.seekTo(activeLoop.start);
            }
          }, 120);
        }
      };

      if (typeof VideoPlayer !== 'undefined') {
        activePlayer = new VideoPlayer({
          container: playerHost,
          playerType: 'youtube',
          videoId: videoData.youtubeId,
          startTime: options.start || 0,
          autoplay: 0,
          controls: 1
        }, (evt) => {
          if (evt.type === 'ready') {
            console.log(`[CadVideoRegistry] Player ready for "${videoData.title}"`);
          }
        });
      } else {
        const iframe = makeElement('iframe', {
          src: `https://www.youtube.com/embed/${videoData.youtubeId}?start=${options.start || 0}&rel=0&modestbranding=1&enablejsapi=1`,
          style: { width: '100%', height: '100%', border: 'none', display: 'block' },
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowFullscreen: true
        });
        playerHost.appendChild(iframe);
      }

      if (videoData.bookmarks && videoData.bookmarks.length > 0) {
        const bookmarksRow = makeElement('div', {
          style: {
            padding: '8px 12px',
            background: '#0d1117',
            borderTop: '1px solid #21262d',
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }
        }, [
          makeElement('span', { style: { fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', marginRight: '4px' } }, 'Clips & Loops:')
        ]);

        videoData.bookmarks.forEach(bm => {
          const loopEnd = bm.time + (bm.duration || 15);
          const btn = makeElement('button', {
            className: 'dr-nav-btn',
            style: { padding: '3px 8px', fontSize: '10px', borderRadius: '4px' },
            onclick: () => {
              startLoop(bm.time, loopEnd, bm.label);
            }
          }, `🔁 ${Math.floor(bm.time / 60)}:${(bm.time % 60).toString().padStart(2, '0')} ${bm.label}`);
          bookmarksRow.appendChild(btn);
        });

        const btnFull = makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10px', color: '#38bdf8' },
          onclick: () => {
            stopLoop();
            if (activePlayer && typeof activePlayer.seekTo === 'function') {
              activePlayer.seekTo(0);
              activePlayer.play();
            }
          }
        }, '▶ Full Video');
        bookmarksRow.appendChild(btnFull);

        wrap.appendChild(bookmarksRow);
      }

      if (videoData.description) {
        wrap.appendChild(makeElement('div', {
          style: { padding: '8px 14px', fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', background: '#090d16' }
        }, videoData.description));
      }

      container.appendChild(wrap);
    }
}

globalThis.CadVideoRegistry = CadVideoRegistry;
if (typeof module !== 'undefined' && module.exports) module.exports = CadVideoRegistry;