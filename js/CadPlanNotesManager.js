class CadPlanNotesManager {
  /**
   * Manages author and inventor notes using the production Library/DictationWidget.
   * Notes are saved to localStorage and can be bundled into prompts or exported to file.
   */
  static STORAGE_KEY = 'cadplan_author_notes';

  static getNotes() {
    return localStorage.getItem(this.STORAGE_KEY) || '';
  }

  static saveNotes(text) {
    localStorage.setItem(this.STORAGE_KEY, text || '');
  }

  static openDialog() {
    const hostContainer = document.body;

    const wrap = makeElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '420px',
        gap: '8px',
        color: '#e2e8f0',
        fontFamily: 'var(--dr-font-sans)'
      }
    });

    const header = makeElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 4px',
        borderBottom: '1px solid #232d3f',
        fontSize: '11px',
        color: '#94a3b8'
      }
    }, [
      makeElement('span', {}, '🎙️ Voice Dictation & Author Working Notes'),
      makeElement('span', { id: 'cadplan-notes-char-count' }, `${this.getNotes().length} chars`)
    ]);
    wrap.appendChild(header);

    // Mount DictationWidget from shared Library
    const widgetMount = makeElement('div', {
      style: { flex: '1', minHeight: '320px', display: 'flex', flexDirection: 'column' }
    });
    wrap.appendChild(widgetMount);

    let widget = null;
    if (typeof DictationWidget !== 'undefined') {
      widget = new DictationWidget();
      widget.init();
      widgetMount.appendChild(widget.getElement());

      const saved = this.getNotes();
      if (saved) {
        widget.editorContent.textContent = saved;
        widget.updateButtonStates();
      }

      widget.subscribe((text) => {
        this.saveNotes(text);
        const countEl = document.getElementById('cadplan-notes-char-count');
        if (countEl) countEl.textContent = `${text.length} chars`;
      });
    } else {
      const textarea = makeElement('textarea', {
        style: {
          width: '100%', flex: '1', background: '#090d16', color: '#e2e8f0',
          border: '1px solid #232d3f', borderRadius: '6px', padding: '10px',
          fontFamily: 'monospace', fontSize: '13px'
        }
      });
      textarea.value = this.getNotes();
      textarea.oninput = (e) => this.saveNotes(e.target.value);
      widgetMount.appendChild(textarea);
    }

    const footer = makeElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '8px',
        borderTop: '1px solid #232d3f',
        gap: '8px',
        flexWrap: 'wrap'
      }
    }, [
      makeElement('button', {
        className: 'dr-nav-btn',
        onclick: () => {
          const text = this.getNotes();
          const blob = new Blob([text], { type: 'text/markdown' });
          const url = URL.createObjectURL(blob);
          const a = makeElement('a', { href: url, download: `CadPlan_AuthorNotes_${Date.now()}.md` });
          a.click();
          URL.revokeObjectURL(url);
        }
      }, '💾 Download Notes.md'),

      makeElement('div', { style: { display: 'flex', gap: '8px' } }, [
        makeElement('button', {
          className: 'dr-nav-btn',
          onclick: (e) => {
            const btn = e.currentTarget;
            navigator.clipboard.writeText(this.getNotes()).then(() => {
              const orig = btn.textContent;
              btn.textContent = '✓ Copied!';
              setTimeout(() => { btn.textContent = orig; }, 1800);
            });
          }
        }, '📋 Copy Notes'),

        makeElement('button', {
          className: 'dr-nav-btn primary',
          onclick: () => {
            dlg.close();
          }
        }, 'Done')
      ])
    ]);
    wrap.appendChild(footer);

    const dlg = UITools.makeDialog({
      title: '📝 CadPlan Author Notes & Voice Dictation',
      size: [560, 540],
      position: [Math.max(20, (window.innerWidth - 560) / 2), 70],
      contentElement: wrap,
      appendTo: hostContainer,
      onClose: () => {
        if (widget && typeof widget.destroy === 'function') {
          widget.destroy();
        }
      }
    });

    return dlg;
  }
}

globalThis.CadPlanNotesManager = CadPlanNotesManager;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPlanNotesManager;