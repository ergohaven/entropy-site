# Images

All editable landing-page images live here. Templates never hide image paths in
HTML; each path is declared next to its text in `content/<language>/home/*.md`.

## Replace an existing image

1. Put the new file in `assets/images/screenshots/`.
2. Reuse the current filename, or update the relevant `image`, `image_light`, or
   `image_dark` field in the language file that uses it. Hero fields live inside
   the matching entry of the `presets` list in `01-hero.md`.
3. Update the matching `image_alt` text in every language and preset.
4. Run `./scripts/build.sh`.

Feature stories can temporarily use `placeholder: true` instead of an image.
When the screenshot is ready, add it here, replace `placeholder` with the matching
`image` or `image_light` / `image_dark` fields in both language files, and update
the localized `image_alt` text.

## Naming

Prefix every content image with the number of the Markdown block that uses it.
For blocks with multiple images, add a second two-digit number for their order:

- `01-01-hero-layout-split-en-light.png` and
  `01-01-hero-layout-split-en-dark.png` are the English light and dark variants
  of the split Hero preset.
- `01-01-hero-layout-ortho-ru-light.png` and
  `01-01-hero-layout-ortho-ru-dark.png` are the Russian light and dark variants
  of the ortholinear Hero preset.
- `01-01-hero-layout-standard-en-light.png` and
  `01-01-hero-layout-standard-en-dark.png` are the English light and dark
  variants of the standard full-size Hero preset.
- `03-01-key-picker-ru-light.png` and `03-01-key-picker-ru-dark.png` are the
  Russian light and dark variants of the first story in `03-features.md`.
- `03-02-advanced-actions-en-light.gif` and
  `03-02-advanced-actions-en-dark.gif` are the English Macro and Tap Dance
  animations.
- `03-03-text-expander-ru-light.gif` and `03-03-text-expander-ru-dark.gif` are
  the Russian Text Expander animations.
- `03-04-import-export-en-light.png` and `03-04-import-export-en-dark.png` are
  the English export screenshots.
- `03-06-typing-trainer-ru-light.gif` and `03-06-typing-trainer-ru-dark.gif`
  are the Russian Typing Trainer animations.

Language, light, and dark variants share the same section and position numbers.
Use `-en` / `-ru` for localized screenshots, followed by `-light` / `-dark`
for theme variants. Keep the descriptive part lowercase and hyphen-separated.

PNG, JPEG, WebP, and animated GIF source files are supported. Use PNG for still
Entropy UI captures and GIF only when motion explains the feature; avoid JPEG
because its compression softens text and thin interface lines. Hugo creates
high-quality responsive WebP variants up to 2560 px for still images. Animated
GIFs remain unchanged so their motion is preserved. Do not commit generated
images from `resources/_gen/`.

Use screenshots at least 2560 px wide for Hero and 2000-2400 px wide for tightly
cropped feature views. Keep important interface content away from the outer 5%
of the image so it remains readable on mobile.
