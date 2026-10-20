class CadPlanContentConverter {
  /**
   * Automated Zero-Token Content Converter for CadPlan.
   * Reflects over existing JavaScript content classes, reads their manifests
   * and static string array methods, and generates clean, semantic HTML files
   * with data-page, data-section, and data-block attributes.
   */
  constructor() {}

  static convertClassToHtml(contentClass, pageId = 'page') {
      if (!contentClass) return '';

      const meta = typeof contentClass.getMeta === 'function' ? contentClass.getMeta() : {};
      const manifest = typeof contentClass.manifest === 'function' ? contentClass.manifest() : [];

      let html = `<article data-page="${pageId}" data-dossier="CadPlan">\n`;

      if (meta.title || meta.subtitle) {
        html += `  <header data-section="page_header">\n`;
        if (meta.kicker) html += `    <span class="dossier-kicker">${meta.kicker}</span>\n`;
        if (meta.title) html += `    <h1 class="dossier-title">${meta.title}</h1>\n`;
        if (meta.subtitle) html += `    <p class="dossier-subtitle">${meta.subtitle}</p>\n`;
        html += `  </header>\n\n`;
      }

      manifest.forEach(sec => {
        const secId = sec.section || 'section';
        html += `  <section data-section="${secId}">\n`;
        if (sec.title) {
          html += `    <h2 class="section-title">${sec.title}</h2>\n`;
        }

        (sec.blocks || []).forEach(block => {
          // Self-describing semantic identifier convention:
          // Format: [pageId]_[secId]_[type]_[rawId]
          const bId = block.id;
          const bType = block.type || 'p';
          const semanticBlockId = bId.startsWith(pageId) ? bId : `${pageId}_${bId}`;

          if (bType === 'component') {
            html += `    <div data-block="${semanticBlockId}" data-type="component" data-component="${block.component}"></div>\n`;
            return;
          }

          let contentText = '';
          if (typeof contentClass[bId] === 'function') {
            const val = contentClass[bId]();
            contentText = Array.isArray(val) ? val.join('\n\n') : String(val);
          }

          if (bType === 'sidebar') {
            const sKicker = block.kicker ? `<span class="sidebar-kicker">${block.kicker}</span>\n      ` : '';
            const sTitle = block.title ? `<strong class="sidebar-title">${block.title}</strong>\n      ` : '';
            html += `    <aside data-block="${semanticBlockId}" data-type="sidebar">\n      ${sKicker}${sTitle}<p>${contentText.replace(/\n\n/g, '</p>\n      <p>')}</p>\n    </aside>\n`;
          } else if (bType === 'quote') {
            html += `    <blockquote data-block="${semanticBlockId}">\n      <p>${contentText}</p>\n    </blockquote>\n`;
          } else {
            html += `    <p data-block="${semanticBlockId}">${contentText.replace(/\n\n/g, '</p>\n    <p data-block="' + semanticBlockId + '_sub">')}</p>\n`;
          }
        });

        html += `  </section>\n\n`;
      });

      html += `</article>\n`;
      return html;
  }
  static async convertAllChaptersToStorage(options = {}) {
    const chapters = [
      { id: 'meta', cls: globalThis.CadPlanMetaContent, file: 'CadPlan/content/meta.html' },
      { id: 'origins', cls: globalThis.CadOriginsContent, file: 'CadPlan/content/origins.html' },
      { id: 'philosophy', cls: globalThis.AccuDrawPhilosophyContent, file: 'CadPlan/content/philosophy.html' },
      { id: 'accucad', cls: globalThis.AccuCadAuditContent, file: 'CadPlan/content/accucad.html' },
      { id: 'shortcuts', cls: globalThis.KeyCommandEngineContent, file: 'CadPlan/content/shortcuts.html' },
      { id: 'curvedrawer', cls: globalThis.CadCurveDrawerContent, file: 'CadPlan/content/curvedrawer.html' },
      { id: 'touchp2p', cls: globalThis.CadTouchP2PContent, file: 'CadPlan/content/touchp2p.html' },
      { id: 'demos', cls: globalThis.CadInteractiveDemoContent, file: 'CadPlan/content/demos.html' },
      { id: 'ecosystem', cls: globalThis.CadLunoEcosystemContent, file: 'CadPlan/content/ecosystem.html' },
      { id: 'architecture', cls: globalThis.CadArchitectureDecisionsContent, file: 'CadPlan/content/architecture.html' },
      { id: 'cadcraft', cls: globalThis.CadCraftIntegrationContent, file: 'CadPlan/content/cadcraft.html' },
      { id: 'itwin', cls: globalThis.CadITwinParityContent, file: 'CadPlan/content/itwin.html' },
      { id: 'interview', cls: globalThis.CadVisionInterviewContent, file: 'CadPlan/content/interview.html' }
    ];

    const filesToWrite = [];

    for (const ch of chapters) {
      if (ch.cls) {
        const html = CadPlanContentConverter.convertClassToHtml(ch.cls, ch.id);
        filesToWrite.push({
          filePath: ch.file,
          content: html,
          action: 'direct'
        });
      }
    }

    if (options.dryRun) {
      return { success: true, count: filesToWrite.length, files: filesToWrite };
    }

    if (typeof LunoApiClient !== 'undefined' && LunoApiClient.savePayload) {
      const res = await LunoApiClient.savePayload({
        files: filesToWrite,
        serverScript: '',
        project: 'CadPlan'
      }, 'CadPlan');
      return { success: res.success, count: filesToWrite.length, response: res };
    }

    return { success: false, error: 'LunoApiClient unavailable' };
  }

  static async runSelfUpgrade(targetProject = 'CadPlan') {
      const isStatic = (typeof LunoFileSystem !== 'undefined' && LunoFileSystem.isStaticHosting()) ||
                     (typeof LunoApiClient !== 'undefined' && LunoApiClient.isStaticMode());

      console.log(`[CadPlanContentConverter] Starting automated content migration for [${targetProject}]...`);

      const result = await CadPlanContentConverter.convertAllChaptersToStorage();
      if (result && result.success) {
        const msg = `✅ Converted ${result.count} chapter(s) to clean HTML templates under ${targetProject}/content/*.html`;
        console.log(msg);
        if (typeof ClientApp !== 'undefined' && ClientApp.showToast) {
          ClientApp.showToast(msg, 'success', '⚡');
        }
        return result;
      } else {
        throw new Error((result && result.error) || 'Failed to save converted HTML templates');
      }
    }

  static generateServerMigrationScript(projectName = 'CadPlan') {
      return [
        '<script data-file="RUN: SERVER" data-action="run-server">',
        'const fs = require("fs");',
        'const path = require("path");',
        `const proj = "${projectName}";`,
        'const projRoot = LunoServer.resolveProjectBaseDir(proj);',
        'const contentDir = path.join(projRoot, "content");',
        'if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });',
        '',
        'return { success: true, project: proj, contentDir: contentDir, message: "Server-side content directory initialized." };',
        '</' + 'script>'
      ].join('\n');
    }

  static parseHtmlToClass(htmlString, targetClassName, pageId = 'page') {
      if (!htmlString || !targetClassName) return null;

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const article = doc.querySelector(`article[data-page="${pageId}"], article`);
      if (!article) return null;

      const patches = [];
      const blocks = article.querySelectorAll('[data-block]');

      blocks.forEach(blockEl => {
        const blockId = blockEl.getAttribute('data-block');
        if (!blockId || blockEl.getAttribute('data-type') === 'component') return;

        const pTags = blockEl.querySelectorAll('p');
        let textLines = [];
        if (pTags.length > 0) {
          pTags.forEach(p => textLines.push(p.textContent.trim()));
        } else {
          textLines = [blockEl.textContent.trim()];
        }

        const escaped = textLines.map(line => `    ${JSON.stringify(line)}`).join(',\n');
        const methodCode = `${blockId}() {\n  return [\n${escaped}\n  ];\n}`;
        patches.push({ blockId, methodCode });
      });

      return {
        className: targetClassName,
        pageId,
        patchCount: patches.length,
        patches
      };
  }
}

globalThis.CadPlanContentConverter = CadPlanContentConverter;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPlanContentConverter;