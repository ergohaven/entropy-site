# Entropy website

The local Hugo landing page for Entropy. It uses a custom theme, no Node.js
runtime, no external font service, and no third-party JavaScript.

## Quick start

```bash
./scripts/setup-hugo.sh
./scripts/dev.sh
```

The preview listens only on `127.0.0.1:1313`. From another computer, open an
SSH tunnel:

```bash
ssh -N -L 1313:127.0.0.1:1313 user@server
```

Then open <http://localhost:1313>.

## Editing content

Each homepage block has its own Markdown file. English and Russian use the same
filenames, so translations are easy to compare side by side.

| Block | English | Russian |
| --- | --- | --- |
| Page metadata, navigation, footer | `content/en/_index.md` | `content/ru/_index.md` |
| Hero | `content/en/home/01-hero.md` | `content/ru/home/01-hero.md` |
| Benefits | `content/en/home/02-benefits.md` | `content/ru/home/02-benefits.md` |
| Features and screenshots | `content/en/home/03-features.md` | `content/ru/home/03-features.md` |
| Device compatibility | `content/en/home/04-compatibility.md` | `content/ru/home/04-compatibility.md` |
| Download section | `content/en/home/05-download.md` | `content/ru/home/05-download.md` |

Text below the second `---` in a block is ordinary Markdown. Short structured
items above it use readable YAML fields. Keep the same keys in both languages.

Feature stories whose final screenshot is not ready use `placeholder: true` in
`03-features.md`. The section renders the same blank Entropy window in its place;
replace that flag with `image` or `image_light` / `image_dark` fields when the
real asset is available.

### Editorial rules

- A heading that consists of one sentence never ends with a period.
- Multi-sentence headings keep the punctuation needed to separate their
  sentences.
- Keep the meaning and hierarchy aligned between English and Russian.

## Editing images

Source images live in `assets/images/screenshots/`. Image filenames and alt text
are declared in the Markdown block that displays them. See
`assets/images/README.md` for the replacement workflow.

Image names follow the same numbered structure as content blocks. The first
two-digit prefix identifies the block; an optional second prefix identifies the
image within that block, for example `01-01-hero-layout-en.png` and
`03-02-matrix-tester.png`.

Localized variants keep the same block and position numbers and use a language
suffix, as in `01-01-hero-layout-en.png` and `01-01-hero-layout-ru.png`.

Hugo generates responsive WebP sizes during the build. Never edit or commit
`resources/_gen/` or `public/`.

## Project structure

```text
assets/
  css/site.css             Visual system and responsive layout
  js/site.js               Theme, mobile navigation, subtle reveal behavior
  images/                  Human-managed source images
content/
  en/                      English text
  ru/                      Russian text
layouts/
  partials/sections/       One template per homepage block
  partials/                Shared header, footer, metadata, responsive images
scripts/                   Pinned Hugo setup, preview, and production build
static/                    Files copied as-is
hugo.yaml                  Languages, base URL, and shared project links
```

Content, presentation, and behavior are intentionally separate. Most routine
updates require changes only inside `content/` or `assets/images/`.

## Build

```bash
./scripts/build.sh
./scripts/check.sh
```

The build pins Hugo Extended through `.hugo-version`, verifies its official
SHA-256 checksum during setup, minifies the output, and treats Hugo warnings as
errors. The check command also verifies that both languages contain the same
block files and that the generated pages retain their required sections.

Automatic Hugo download supports Linux x86_64 and arm64. On another development
platform, install the exact Hugo Extended version from `.hugo-version`; the
scripts will use it automatically.

Before publishing, replace the reserved `https://entropy.invalid/` base URL in
`hugo.yaml` with the production domain. GitHub links and the download destination
are also kept in that file.
