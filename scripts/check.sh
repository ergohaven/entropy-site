#!/usr/bin/env bash
set -euo pipefail

project_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
cd "$project_dir"

expected_blocks=$(printf '%s\n' \
  01-hero.md \
  02-benefits.md \
  03-features.md \
  04-compatibility.md \
  05-download.md \
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
test -f public/fonts/Roboto-Regular.ttf
test -f public/fonts/LICENSE-Roboto.txt

expected_roboto_sha='56a45233d29f11b4dfb86d248e921939d115778f87325e7ae8cc108383d6664d'
actual_roboto_sha=$(sha256sum public/fonts/Roboto-Regular.ttf | cut -d' ' -f1)
if [[ "$actual_roboto_sha" != "$expected_roboto_sha" ]]; then
  echo "Hero mockup must use the same Roboto Regular font as Entropy" >&2
  exit 1
fi

rg -q '<html lang=en-US' public/index.html
rg -q '<html lang=ru-RU' public/ru/index.html

for page in public/index.html public/ru/index.html; do
  rg -q '<h1' "$page"
  rg -q 'id=benefits' "$page"
  rg -q 'id=features' "$page"
  rg -q 'id=compatibility' "$page"
  rg -q 'id=download' "$page"
  rg -q 'data-entropy-demo' "$page"
  rg -q 'data-demo-layout=split' "$page"
  rg -q 'data-demo-layout=standard' "$page"
  rg -q 'data-demo-layout=ortholinear' "$page"
  rg -q 'data-demo-layout-source=k04' "$page"
  rg -q 'data-demo-theme-option=light' "$page"
  rg -q 'data-demo-theme-option=dark' "$page"
  rg -q 'data-demo-presets-menu' "$page"
  rg -q 'data-demo-picker' "$page"
  rg -q 'data-demo-bottom-hint' "$page"
  rg -q 'data-demo-tooltip-bubble' "$page"
  rg -q 'role=dialog' "$page"
  if [[ $(rg -o 'data-demo-action=' "$page" | wc -l) -ne 86 ]]; then
    echo "Hero Key Picker must render all 86 Basic QWERTY keys in $page" >&2
    exit 1
  fi
  if [[ $(rg -o 'data-demo-picker-tab' "$page" | wc -l) -ne 7 ]]; then
    echo "Hero Key Picker must render all seven tabs in $page" >&2
    exit 1
  fi
  if [[ $(rg -o 'data-demo-matrix=' "$page" | wc -l) -ne 60 ]]; then
    echo "K:04 Hero preset must render all 60 matrix keys in $page" >&2
    exit 1
  fi
  if [[ $(rg -o 'entropy-demo__encoder-action' "$page" | wc -l) -ne 4 ]]; then
    echo "K:04 Hero preset must render both encoder directions in $page" >&2
    exit 1
  fi
  if rg -q '(href|src)=""' "$page"; then
    echo "Empty href or src in $page" >&2
    exit 1
  fi
done

echo "Entropy site checks passed"
