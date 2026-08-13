# Images

All editable landing-page images live here. Templates never hide image paths in
HTML; each path is declared next to its text in `content/<language>/home/*.md`.

## Replace an existing image

1. Put the new file in `assets/images/screenshots/`.
2. Reuse the current filename, or update the relevant `image`, `image_light`, or
   `image_dark` field in both language files.
3. Update the matching `image_alt` text in every language.
4. Run `./scripts/build.sh`.

PNG, JPEG, and WebP source files are supported. Hugo creates responsive WebP
variants automatically; do not commit generated images from `resources/_gen/`.

Use screenshots at least 1600 px wide when possible. Keep important interface
content away from the outer 5% of the image so it remains readable on mobile.
