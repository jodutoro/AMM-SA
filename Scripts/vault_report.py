"""
vault_report.py — Shared dark-mode HTML renderer for Obsidian vault reports.
Both insight-agent.py and research-agent.py call render_report() to produce
standalone HTML files with consistent dark-mode styling.
"""
from __future__ import annotations

import re
from datetime import datetime
from pathlib import Path
from typing import Optional


# ---------------------------------------------------------------------------
# Markdown → HTML (uses `markdown` lib if available, regex fallback otherwise)
# ---------------------------------------------------------------------------

def _md_to_html(md: str) -> str:
    try:
        import markdown
        return markdown.markdown(
            md,
            extensions=["tables", "fenced_code", "nl2br", "toc"],
        )
    except ImportError:
        return _regex_md_to_html(md)


def _regex_md_to_html(md: str) -> str:
    """Minimal regex-based markdown converter used as fallback."""
    html = md

    # Fenced code blocks
    html = re.sub(r"```(\w*)\n(.*?)```", lambda m: f"<pre><code class='lang-{m.group(1)}'>{_escape(m.group(2))}</code></pre>", html, flags=re.DOTALL)

    # Headings
    for level in range(6, 0, -1):
        html = re.sub(rf"^{'#' * level} (.+)$", rf"<h{level}>\1</h{level}>", html, flags=re.MULTILINE)

    # Bold / italic
    html = re.sub(r"\*\*\*(.+?)\*\*\*", r"<strong><em>\1</em></strong>", html)
    html = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", html)
    html = re.sub(r"\*(.+?)\*", r"<em>\1</em>", html)

    # Inline code
    html = re.sub(r"`([^`]+)`", r"<code>\1</code>", html)

    # Horizontal rule
    html = re.sub(r"^---$", "<hr>", html, flags=re.MULTILINE)

    # Unordered lists
    def _ul_block(m: re.Match) -> str:
        items = re.findall(r"^[*\-+] (.+)$", m.group(0), re.MULTILINE)
        return "<ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul>"

    html = re.sub(r"(?:^[*\-+] .+\n?)+", _ul_block, html, flags=re.MULTILINE)

    # Ordered lists
    def _ol_block(m: re.Match) -> str:
        items = re.findall(r"^\d+\. (.+)$", m.group(0), re.MULTILINE)
        return "<ol>" + "".join(f"<li>{i}</li>" for i in items) + "</ol>"

    html = re.sub(r"(?:^\d+\. .+\n?)+", _ol_block, html, flags=re.MULTILINE)

    # Links
    html = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', html)

    # Paragraphs: wrap consecutive non-tag lines
    lines = html.split("\n")
    out, buf = [], []
    block_tags = {"<h", "<ul>", "<ol>", "<pre>", "<hr>", "<table"}

    def _flush():
        if buf:
            text = " ".join(buf).strip()
            if text:
                out.append(f"<p>{text}</p>")
            buf.clear()

    for line in lines:
        stripped = line.strip()
        if not stripped:
            _flush()
        elif any(stripped.startswith(t) for t in block_tags):
            _flush()
            out.append(stripped)
        else:
            buf.append(stripped)
    _flush()

    return "\n".join(out)


def _escape(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


# ---------------------------------------------------------------------------
# Main render function
# ---------------------------------------------------------------------------

DARK_CSS = """
:root {
  --bg: #1a1b26;
  --surface: #24283b;
  --surface2: #2f3451;
  --border: #3b4261;
  --text: #c0caf5;
  --text-dim: #7982a9;
  --accent: #7aa2f7;
  --green: #9ece6a;
  --amber: #e0af68;
  --red: #f7768e;
  --purple: #9d7cd8;
  --cyan: #7dcfff;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
}
.wrap { max-width: 900px; margin: 0 auto; padding: 48px 32px 96px; }
.header { border-bottom: 1px solid var(--border); margin-bottom: 40px; padding-bottom: 28px; }
.badge {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-right: 8px;
  margin-bottom: 4px;
}
.badge-accent { background: rgba(122,162,247,.15); color: var(--accent); border: 1px solid rgba(122,162,247,.3); }
.badge-green  { background: rgba(158,206,106,.12); color: var(--green);  border: 1px solid rgba(158,206,106,.3); }
.badge-amber  { background: rgba(224,175,104,.12); color: var(--amber);  border: 1px solid rgba(224,175,104,.3); }
.badge-purple { background: rgba(157,124,216,.12); color: var(--purple); border: 1px solid rgba(157,124,216,.3); }
h1 { font-size: 28px; font-weight: 800; letter-spacing: -0.5px; color: var(--text); margin: 12px 0 6px; }
h2 { font-size: 20px; font-weight: 700; color: var(--accent); margin: 32px 0 10px; border-bottom: 1px solid var(--border); padding-bottom: 6px; }
h3 { font-size: 16px; font-weight: 700; color: var(--cyan); margin: 22px 0 8px; }
h4 { font-size: 14px; font-weight: 600; color: var(--text-dim); margin: 16px 0 6px; }
p { margin-bottom: 12px; font-size: 15px; color: var(--text); }
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
ul, ol { margin: 0 0 14px 22px; }
li { font-size: 15px; margin-bottom: 6px; }
strong { color: var(--text); font-weight: 600; }
em { color: var(--amber); font-style: italic; }
code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 13px;
  background: var(--surface2);
  padding: 2px 7px;
  border-radius: 4px;
  color: var(--cyan);
}
pre {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px 20px;
  overflow-x: auto;
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 13px;
  line-height: 1.6;
  margin: 14px 0;
}
pre code { background: none; padding: 0; font-size: 13px; color: var(--text); }
table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 14px; }
th {
  background: var(--surface2);
  padding: 9px 14px;
  text-align: left;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-dim);
  border-bottom: 2px solid var(--border);
}
td { padding: 9px 14px; border-bottom: 1px solid var(--border); color: var(--text); }
tr:hover td { background: var(--surface); }
hr { border: none; border-top: 1px solid var(--border); margin: 24px 0; }
blockquote {
  border-left: 3px solid var(--purple);
  padding: 8px 16px;
  background: rgba(157,124,216,.07);
  border-radius: 0 8px 8px 0;
  margin: 14px 0;
  color: var(--text-dim);
}
.meta { font-size: 13px; color: var(--text-dim); margin-top: 4px; }
.toc {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px 20px;
  margin: 20px 0 32px;
  font-size: 14px;
}
.toc-title { font-weight: 700; color: var(--text-dim); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
.toc a { color: var(--text); font-size: 14px; }
.toc ul { margin: 0; list-style: none; }
.toc li { margin-bottom: 5px; }
.footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid var(--border); color: var(--text-dim); font-size: 12px; display: flex; justify-content: space-between; }
"""


def render_report(
    title: str,
    content_md: str,
    output_path: Path,
    lens: Optional[str] = None,
    metadata: Optional[dict] = None,
    source: str = "Vault Intelligence",
) -> Path:
    """
    Convert markdown content to a standalone dark-mode HTML file.

    Args:
        title:       Report title shown in <h1> and <title>.
        content_md:  Markdown body (headings, lists, tables, code blocks).
        output_path: Where to write the .html file.
        lens:        Optional lens name badge (blind-spots, design, etc.).
        metadata:    Dict of extra k/v shown as small badges.
        source:      Attribution string shown in the footer.

    Returns:
        The output_path after writing.
    """
    now = datetime.now()
    date_str = now.strftime("%Y-%m-%d %H:%M")

    # Badge row
    badges = ""
    if lens:
        color = {
            "blind-spots": "badge-red",
            "design": "badge-purple",
            "patterns": "badge-green",
            "weekly": "badge-accent",
            "research": "badge-amber",
        }.get(lens, "badge-accent")
        badges += f'<span class="badge {color}">{lens}</span>'

    if metadata:
        for k, v in metadata.items():
            badges += f'<span class="badge badge-accent">{k}: {v}</span>'

    content_html = _md_to_html(content_md)
    output_path = Path(output_path)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{_escape(title)}</title>
<style>{DARK_CSS}</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div>{badges}</div>
    <h1>{_escape(title)}</h1>
    <div class="meta">{source} &bull; Generated {date_str}</div>
  </div>
  <div class="content">
    {content_html}
  </div>
  <div class="footer">
    <span>{_escape(title)}</span>
    <span>{date_str}</span>
  </div>
</div>
</body>
</html>"""

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(html, encoding="utf-8")
    return output_path
