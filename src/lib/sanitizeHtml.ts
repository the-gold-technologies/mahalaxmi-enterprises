import DOMPurify from "dompurify";

// Embeds allowed inside CMS rich-text content (videos / maps)
const ALLOWED_IFRAME_HOSTS = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
  "www.google.com",
  "maps.google.com",
];

let hooksInstalled = false;

function installHooks() {
  if (hooksInstalled) return;
  hooksInstalled = true;

  DOMPurify.addHook("uponSanitizeElement", (node, data) => {
    if (data.tagName !== "iframe") return;
    const el = node as Element;
    try {
      const src = new URL(el.getAttribute("src") || "", window.location.href);
      if (src.protocol !== "https:" || !ALLOWED_IFRAME_HOSTS.includes(src.hostname)) {
        el.parentNode?.removeChild(el);
      }
    } catch {
      el.parentNode?.removeChild(el);
    }
  });

  // Links opening in a new tab must not get access to window.opener
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A" && node.getAttribute("target") === "_blank") {
      node.setAttribute("rel", "noopener noreferrer");
    }
  });
}

/**
 * Sanitizes CMS-provided rich-text HTML before it is rendered on the website.
 * Strips scripts, event handlers, javascript: URLs and untrusted iframes.
 * Returns "" during server rendering (content is rendered client-side only).
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return "";
  if (typeof window === "undefined") return "";
  installHooks();
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["target", "allow", "allowfullscreen", "frameborder"],
    FORBID_TAGS: ["style", "form", "input", "button", "textarea", "select"],
  });
}

/** Makes a JSON string safe to embed inside a <script type="application/ld+json"> tag. */
export function safeJsonForScript(json: string): string {
  return json.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}
