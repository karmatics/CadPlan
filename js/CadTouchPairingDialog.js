class CadTouchPairingDialog {

  static open(options = {}) {
    // Use existing active P2P connector or boot a clean one
    let p2p = globalThis.P2PConnector?.instance;
    const activeController = globalThis.BaseController?.getActiveController() || globalThis.baseController;

    if (!p2p && typeof P2PConnector !== 'undefined') {
      p2p = new P2PConnector(activeController);
    }

    const roomCode = p2p ? p2p.roomCode : Math.floor(1000 + Math.random() * 9000).toString();
    const mobileUrl = p2p ? p2p.getMobileUrl() : `${window.location.origin}/TouchController/?room=${roomCode}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=190x190&data=${encodeURIComponent(mobileUrl)}`;

    const content = makeElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '8px',
        fontFamily: 'monospace',
        color: '#e2e8f0'
      }
    }, [
      makeElement('div', {
        style: { fontSize: '11.5px', color: '#94a3b8', textAlign: 'center', lineHeight: '1.45' }
      }, 'Scan with your iPhone/Android camera to pair directly via WebRTC data channel (works across Wi-Fi or cellular):'),

      // Dynamic High-Contrast QR Code Card
      makeElement('div', {
        style: {
          background: '#ffffff',
          padding: '12px',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px'
        }
      }, [
        makeElement('img', {
          src: qrApiUrl,
          alt: 'Scan QR to Connect Phone',
          style: { width: '170px', height: '170px', display: 'block' }
        }),
        makeElement('div', {
          style: { color: '#090d16', fontWeight: '800', fontSize: '15px', letterSpacing: '2px' }
        }, `ROOM: ${roomCode}`)
      ]),

      // Direct Room Token & Link
      makeElement('div', {
        style: {
          fontSize: '11px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '8px 12px',
          borderRadius: '8px',
          textAlign: 'center',
          width: '100%',
          boxSizing: 'border-box'
        }
      }, [
        makeElement('div', { style: { color: '#38bdf8', fontWeight: 'bold' } }, `Room Code: ${roomCode}`),
        makeElement('div', {
          style: { color: '#64748b', fontSize: '10px', marginTop: '3px', wordBreak: 'break-all' }
        }, mobileUrl)
      ]),

      // Live Connection Status Pill
      makeElement('div', {
        id: 'cp-touch-dialog-status',
        style: {
          fontSize: '11px',
          padding: '6px 16px',
          borderRadius: '14px',
          background: '#161e2b',
          color: '#f59e0b',
          border: '1px solid #f59e0b',
          fontWeight: 'bold',
          transition: 'all 0.2s ease'
        }
      }, '🟡 Initializing PeerJS broker...')
    ]);

    const dlg = UITools.makeDialog({
      title: '📱 Wireless TouchController Pairing',
      size: [360, 470],
      position: [Math.max(20, (window.innerWidth - 360) / 2), Math.max(20, (window.innerHeight - 470) / 2)],
      contentElement: content,
      appendTo: document.body
    });

    // Listen to live connection status changes
    if (p2p) {
      const unsub = p2p.onStatusChange((status) => {
        const pill = document.getElementById('cp-touch-dialog-status');
        if (!pill) return;

        if (status === 'connected') {
          pill.textContent = '🟢 Phone Connected! Two-Handed CAD Active';
          pill.style.color = '#10b981';
          pill.style.borderColor = '#10b981';
          pill.style.background = 'rgba(16, 185, 129, 0.15)';
        } else if (status === 'ready') {
          pill.textContent = '○ Waiting for camera scan...';
          pill.style.color = '#38bdf8';
          pill.style.borderColor = '#38bdf8';
          pill.style.background = 'rgba(56, 189, 248, 0.1)';
        } else if (status === 'connecting') {
          pill.textContent = '🟡 Connecting broker...';
          pill.style.color = '#f59e0b';
          pill.style.borderColor = '#f59e0b';
        } else {
          pill.textContent = '✕ Offline';
          pill.style.color = '#ef4444';
          pill.style.borderColor = '#ef4444';
        }
      });

      const origClose = dlg.options.onClose;
      dlg.options.onClose = () => {
        unsub();
        if (typeof origClose === 'function') origClose();
      };
    }

    return { dlg, roomId: roomCode, touchUrl: mobileUrl };
  }
}

globalThis.CadTouchPairingDialog = CadTouchPairingDialog;
if (typeof module !== 'undefined' && module.exports) module.exports = CadTouchPairingDialog;