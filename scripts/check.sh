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

for page in public/index.html public/ru/index.html; do
  rg -q '<h1' "$page"
  rg -q 'id=benefits' "$page"
  rg -q 'id=features' "$page"
  rg -q 'id=compatibility' "$page"
  rg -q 'id=download' "$page"
  if rg -q '(href|src)=""' "$page"; then
    echo "Empty href or src in $page" >&2
    exit 1
  fi
done

echo "Entropy site checks passed"
