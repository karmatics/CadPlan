class CadVideoClipComponent {
  /**
   * Standalone micro-clip video card powered by Library/VideoPlayer.
   * Renders in-situ short video loops (15s–45s) demonstrating exact CAD and AccuDraw gestures.
   */
  static render(container, options = {}) {
    const videoId = options.videoId || 'accudraw_3d_classic';
    const videoData = (typeof CadVideoRegistry !== 'undefined') ? CadVideoRegistry.get(videoId) : null;

    if (!videoData) {
      container.innerHTML = `<div style="padding:12px;color:#94a3b8;font-style:italic;">Video clip placeholder [${videoId}]</div>`;
      return;
    }

    if (typeof CadVideoRegistry !== 'undefined') {
      CadVideoRegistry.renderPlayer(container, {
        videoData: videoData,
        start: options.start || 0,
        height: options.height || '340px'
      });
    }
  }
}

globalThis.CadVideoClipComponent = CadVideoClipComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadVideoClipComponent;