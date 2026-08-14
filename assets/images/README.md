# Images

All editable landing-page images live here. Templates never hide image paths in
HTML; each path is declared next to its text in `content/<language>/home/*.md`.

## Replace an existing image

1. Put the new file in `assets/images/screenshots/`.
2. Reuse the current filename, or update the relevant `image`, `image_light`, or
   `image_dark` field in the language file that uses it.
3. Update the matching `image_alt` text in every language.
4. Run `./scripts/build.sh`.

Feature stories can temporarily use `placeholder: true` instead of an image.
When the screenshot is ready, add it here, replace `placeholder` with the matching
`image` or `image_light` / `image_dark` fields in both language files, and update
the localized `image_alt` text.

## Naming

Prefix every content image with the number of the Markdown block that uses it.
For blocks with multiple images, add a second two-digit number for their order:

- `01-01-hero-layout-en.png` and `01-01-hero-layout-ru.png` are localized
  variants of the first image in `01-hero.md`.
- `03-01-key-picker-light.png` and `03-01-key-picker-dark.png` are theme
  variants of the first image in `03-features.md`.
- `03-02-matrix-tester.png` is the second image in `03-features.md`.

Language, light, and dark variants share the same section and position numbers.
Use `-en` / `-ru` for localized screenshots and `-light` / `-dark` for theme
variants. Keep the descriptive part lowercase and hyphen-separated.

PNG, JPEG, and WebP source files are supported. Hugo creates responsive WebP
variants automatically; do not commit generated images from `resources/_gen/`.

Use screenshots at least 1600 px wide when possible. Keep important interface
content away from the outer 5% of the image so it remains readable on mobile.
