class CadTouchPairingDialog {

  static open(options = {}) {
    const roomId = 'cad_' + Math.random().toString(36).substring(2, 8);
    // Use verified local LAN IP (10.0.0.226) or fallback to window.location.hostname
    const lanIp = options.lanIp || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? '10.0.0.226' : window.location.hostname);
    const port = options.port || window.location.port || 3000;

    // Mobile URL targeting TouchController with room token
    const touchUrl = `http://${lanIp}:${port}/TouchController/?room=${roomId}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=190x190&data=${encodeURIComponent(touchUrl)}`;

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
        style: {
          fontSize: '11px',
          color: '#94a3b8',
          textAlign: 'center',
          lineHeight: '1.4'
        }
      }, 'Scan with your iPhone/Android camera on the same Wi-Fi to engage wireless two-handed CAD control:'),

      // Dynamic QR Code Container
      makeElement('div', {
        style: {
          background: '#ffffff',
          padding: '12px',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, [
        makeElement('img', {
          src: qrApiUrl,
          alt: 'Scan QR to Connect Phone',
          style: { width: '190px', height: '190px', display: 'block' }
        })
      ]),

      // Direct Link / Room Info
      makeElement('div', {
        style: {
          fontSize: '11px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '8px 12px',
          borderRadius: '8px',
          textAlign: 'center',
          width: '100%',
          boxSizing: 'border-box'
        }
      }, [
        makeElement('div', { style: { color: '#38bdf8', fontWeight: 'bold' } }, `Room Token: ${roomId}`),
        makeElement('div', { style: { color: '#94a3b8', fontSize: '10px', marginTop: '3px', wordBreak: 'break-all' } }, touchUrl)
      ]),

      // Connection Status Pill
      makeElement('div', {
        id: 'cp-touch-dialog-status',
        style: {
          fontSize: '11px',
          padding: '5px 14px',
          borderRadius: '14px',
          background: '#1e293b',
          color: '#f59e0b',
          border: '1px solid #f59e0b',
          fontWeight: 'bold'
        }
      }, '⚪ Waiting for phone camera scan...')
    ]);

    const dlg = UITools.makeDialog({
      title: '📱 Wireless TouchController Pairing',
      size: [360, 440],
      position: [Math.max(20, (window.innerWidth - 360) / 2), Math.max(20, (window.innerHeight - 440) / 2)],
      contentElement: content,
      appendTo: document.body
    });

    return { dlg, roomId, touchUrl };
  }
}

globalThis.CadTouchPairingDialog = CadTouchPairingDialog;
if (typeof module !== 'undefined' && module.exports) module.exports = CadTouchPairingDialog;