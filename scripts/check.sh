#!/usr/bin/env bash
set -euo pipefail

project_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
cd "$project_dir"

expected_blocks=$(printf '%s\n' \
  01-hero.md \
  02-benefits.md \
  03-features.md \
  04-download.md \
  index.md)

for language in en ru; do
  diff -u \
    <(printf '%s\n' "$expected_blocks") \
    <(find "content/$language/home" -maxdepth 1 -type f -name '*.md' -printf '%f\n' | LC_ALL=C sort)
done

single_sentence_heading_periods=$(
  awk '
    /^[[:space:]]*title:[[:space:]]*/ {
      value = $0
      sub(/^[[:space:]]*title:[[:space:]]*/, "", value)
      sub(/[[:space:]]+#.*$/, "", value)
      gsub(/^[[:space:]]+|[[:space:]]+$/, "", value)

      quote = substr(value, 1, 1)
      if ((quote == "\"" || quote == sprintf("%c", 39)) &&
          substr(value, length(value), 1) == quote) {
        value = substr(value, 2, length(value) - 2)
      }

      if (substr(value, length(value), 1) == ".") {
        stem = substr(value, 1, length(value) - 1)
        if (stem !~ /[.!?][[:space:]]/) {
          printf "%s:%d:%s\n", FILENAME, FNR, $0
        }
      }
    }
  ' content/en/*.md content/en/home/*.md content/ru/*.md content/ru/home/*.md
)

if [[ -n "$single_sentence_heading_periods" ]]; then
  echo "Single-sentence headings must not end with a period:" >&2
  echo "$single_sentence_heading_periods" >&2
  exit 1
fi

image_name_pattern='^[0-9]{2}(-[0-9]{2})?-[a-z0-9]+(-[a-z0-9]+)*\.(png|jpe?g|webp)$'
invalid_image_names=$(
  find assets/images/screenshots -maxdepth 1 -type f -printf '%f\n' \
    | LC_ALL=C sort \
    | rg -v "$image_name_pattern" \
    || true
)

if [[ -n "$invalid_image_names" ]]; then
  echo "Screenshot names must start with their two-digit content block number:" >&2
  echo "$invalid_image_names" >&2
  exit 1
fi

"$project_dir/scripts/build.sh"

test -f public/index.html
test -f public/ru/index.html
test -f public/robots.txt
test -f public/sitemap.xml

rg -q '<html lang=en-US' public/index.html
rg -q '<html lang=ru-RU' public/ru/index.html
rg -q '01-01-hero-layout-en\.png' public/index.html
rg -q '01-01-hero-layout-ru\.png' public/ru/index.html
rg -q '03-01-key-picker-en\.png' public/index.html
rg -q '03-01-key-picker-ru\.png' public/ru/index.html
rg -q '03-04-import-export-en\.png' public/index.html
rg -q '03-04-import-export-ru\.png' public/ru/index.html
rg -q '03-03-text-expander\.png' public/index.html
rg -q '03-03-text-expander\.png' public/ru/index.html
rg -q 'open-source workspace.*Vial-QMK.*Vial-RMK' public/index.html
rg -q 'открытым исходным кодом.*Vial-QMK.*Vial-RMK' public/ru/index.html
rg -qi 'reflash' public/index.html
rg -qi 'перепрошив' public/ru/index.html
rg -q 'Bluetooth' public/index.html
rg -q 'Bluetooth' public/ru/index.html
rg -qi 'wirelessly' public/index.html
rg -qi 'без проводов' public/ru/index.html
rg -qi 'battery' public/index.html
rg -qi 'заряд' public/ru/index.html
rg -q 'not tied to a single model' public/index.html
rg -q 'не привязана к одной модели' public/ru/index.html
rg -q 'Macros and advanced actions' public/index.html
rg -q 'Макросы и продвинутые действия' public/ru/index.html

if rg -q 'Firmware and device|Прошивка и устройство' public/index.html public/ru/index.html; then
  echo "Obsolete firmware-and-device feature story is still rendered" >&2
  exit 1
fi

if rg -q 'Open source · Vial-QMK · Vial-RMK' public/index.html public/ru/index.html; then
  echo "Obsolete Hero eyebrow is still rendered" >&2
  exit 1
fi

if rg -q 'id=compatibility|#compatibility|Vial-compatible by design|Совместимость с Vial по архитектуре' public/index.html public/ru/index.html; then
  echo "Removed compatibility section is still rendered or linked" >&2
  exit 1
fi

for page in public/index.html public/ru/index.html; do
  rg -q '<h1' "$page"
  rg -q 'id=benefits' "$page"
  rg -q 'id=features' "$page"
  rg -q 'id=download' "$page"
  rg -q 'data-language-menu' "$page"
  rg -q 'site-footer__license' "$page"
  feature_story_count=$(rg -o 'data-feature-story' "$page" | wc -l)
  if [[ "$feature_story_count" -ne 6 ]]; then
    echo "Expected 6 primary feature stories in $page, found $feature_story_count" >&2
    exit 1
  fi
  if rg -q '(href|src)=""' "$page"; then
    echo "Empty href or src in $page" >&2
    exit 1
  fi
  for image_width in 720 1280 1920 2560; do
    if ! rg -q " ${image_width}w" "$page"; then
      echo "Responsive image width ${image_width}w is missing from $page" >&2
      exit 1
    fi
  done
done

if rg -q 'brand__mark' layouts/partials/header.html; then
  echo "Header must use the text-only Entropy wordmark" >&2
  exit 1
fi

if rg -q 'brand__mark|footer\.tagline|footer\.made_by' layouts/partials/footer.html; then
  echo "Footer must remain a compact text-only service line" >&2
  exit 1
fi

echo "Entropy site checks passed"
