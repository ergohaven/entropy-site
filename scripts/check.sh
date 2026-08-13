#!/usr/bin/env bash
set -euo pipefail

project_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
cd "$project_dir"

diff -u \
  <(find content/en/home -maxdepth 1 -type f -name '*.md' -printf '%f\n' | sort) \
  <(find content/ru/home -maxdepth 1 -type f -name '*.md' -printf '%f\n' | sort)

"$project_dir/scripts/build.sh"

test -f public/index.html
test -f public/ru/index.html
test -f public/robots.txt
test -f public/sitemap.xml

rg -q '<html lang=en-US' public/index.html
rg -q '<html lang=ru-RU' public/ru/index.html

for page in public/index.html public/ru/index.html; do
  rg -q '<h1' "$page"
  rg -q 'id=features' "$page"
  rg -q 'id=workflow' "$page"
  rg -q 'id=compatibility' "$page"
  rg -q 'id=download' "$page"
  if rg -q '(href|src)=""' "$page"; then
    echo "Empty href or src in $page" >&2
    exit 1
  fi
done

echo "Entropy site checks passed"
