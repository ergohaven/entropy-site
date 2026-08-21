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

image_name_pattern='^[0-9]{2}(-[0-9]{2})?-[a-z0-9]+(-[a-z0-9]+)*\.(gif|png|jpe?g|webp)$'
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

if command -v node >/dev/null 2>&1; then
  node --check assets/js/site.js
fi

rg -q 'const russianShortWordPattern' assets/js/site.js
rg -q 'const englishShortWordPattern' assets/js/site.js
rg -q 'const innerWordHyphenPattern' assets/js/site.js
rg -q 'text-wrap: balance' assets/css/site.css
rg -q 'text-wrap: pretty' assets/css/site.css

"$project_dir/scripts/build.sh"

test -f public/index.html
test -f public/ru/index.html
test -f public/404.html
test -f public/ru/404.html
test -f public/CNAME
test -f public/favicon-dark.svg
test -f public/favicon-light.svg
test -f public/robots.txt
test -f public/sitemap.xml

rg -qx 'entropy\.tools' public/CNAME
rg -q '^baseURL: https://entropy\.tools/$' hugo.yaml

rg -q '<html lang=en-US' public/index.html
rg -q '<html lang=ru-RU' public/ru/index.html
for page in public/index.html public/ru/index.html; do
  rg -q 'rel=icon href=/favicon\.ico sizes=any' "$page"
  rg -q 'rel=icon type=image/svg\+xml href=/favicon-light\.svg data-theme-favicon data-light-href=/favicon-light\.svg data-dark-href=/favicon-dark\.svg' "$page"
done
for theme in light dark; do
  for preset in split ortho standard; do
    rg -q "01-01-hero-layout-${preset}-en-${theme}\\.png" public/index.html
    rg -q "01-01-hero-layout-${preset}-ru-${theme}\\.png" public/ru/index.html
  done
  rg -q "03-01-key-picker-en-${theme}\\.png" public/index.html
  rg -q "03-01-key-picker-ru-${theme}\\.png" public/ru/index.html
  rg -q "03-02-advanced-actions-en-${theme}\\.gif" public/index.html
  rg -q "03-02-advanced-actions-ru-${theme}\\.gif" public/ru/index.html
  rg -q "03-04-import-export-en-${theme}\\.png" public/index.html
  rg -q "03-04-import-export-ru-${theme}\\.png" public/ru/index.html
  rg -q "03-05-layout-indicator-en-${theme}\\.gif" public/index.html
  rg -q "03-05-layout-indicator-ru-${theme}\\.gif" public/ru/index.html
  rg -q "03-03-text-expander-en-${theme}\\.gif" public/index.html
  rg -q "03-03-text-expander-ru-${theme}\\.gif" public/ru/index.html
  rg -q "03-06-typing-trainer-en-${theme}\\.gif" public/index.html
  rg -q "03-06-typing-trainer-ru-${theme}\\.gif" public/ru/index.html
done
rg -q 'open-source workspace.*Vial-QMK.*Vial-RMK' public/index.html
rg -q 'открытым исходным кодом.*Vial-QMK.*Vial-RMK' public/ru/index.html
rg -qi 'reflash' public/index.html
rg -qi 'перепрошив' public/ru/index.html
rg -q 'Bluetooth' public/index.html
rg -q 'Bluetooth' public/ru/index.html
rg -qi 'wirelessly' public/index.html
rg -q 'по USB или Bluetooth' public/ru/index.html
rg -qi 'battery' public/index.html
rg -qi 'заряд' public/ru/index.html
rg -q 'not tied to a single model' public/index.html
rg -q 'не привязана к одной модели' public/ru/index.html
rg -q 'Macros and advanced actions' public/index.html
rg -q 'Макросы и продвинутые действия' public/ru/index.html
rg -q 'Назначайте отдельным клавишам и их сочетаниям более сложное поведение' public/ru/index.html
rg -q 'Создавайте макросы, Combo и Tap Dance наглядно, без ручного редактирования кода прошивки\.' public/ru/index.html
rg -q 'Закрепите отдельное окно поверх приложений, настройте прозрачность и следите за переключением слоёв и нажатиями, не возвращаясь к конфигуратору\.' public/ru/index.html
rg -q 'Создавайте собственные правила: введите сокращение, и Entropy автоматически заменит его на сохранённый адрес, подпись или любой часто используемый фрагмент\. Все правила сохраняются локально и остаются только под вашим контролем\.' public/ru/index.html
rg -q 'Настраивайте упражнения по времени или количеству слов, добавляйте пунктуацию и цифры, отслеживайте историю результатов\.' public/ru/index.html
rg -q 'Основные сценарии дополнены инструментами для продвинутых функций ввода, настройки прошивки и повседневной работы с устройством\.' public/ru/index.html
rg -q 'Используйте тонкие настройки поведения клавиш и поддерживайте порядок в раскладке\.' public/ru/index.html
rg -q 'Копирование, перенос и отмена действий' public/ru/index.html
rg -q 'Проверяйте устройство и расширяйте его возможности для эффективной работы\.' public/ru/index.html
rg -q 'Ваше устройство умеет многое\. Раскройте его возможности\.' public/ru/index.html
rg -q 'должны работать вместе\.<br>Entropy объединяет' public/ru/index.html
rg -q 'href=https://docs\.eh\.industries/software/entropy/' public/index.html
rg -q 'href=https://docs\.eh\.works/software/entropy/' public/ru/index.html
if rg -q 'target=_blank' public/index.html public/ru/index.html; then
  echo "External links must consistently open in the current tab" >&2
  exit 1
fi
rg -q 'Complex firmware\. A calm interface\.' public/index.html
rg -q 'aria-label="Complex firmware\. A calm interface\."' public/index.html
rg -q 'aria-label="Сложная прошивка\. Простой интерфейс\."' public/ru/index.html
rg -q 'Connect a Vial-QMK or Vial-RMK device and Entropy shows the controls its firmware actually supports\.' public/index.html
rg -q 'Подключите устройство на Vial-QMK или Vial-RMK — Entropy покажет только те настройки, которые поддерживает его прошивка\.' public/ru/index.html
rg -q 'Изменения в раскладке, подсветке и параметрах применяются сразу и сохраняются на устройстве — без пересборки и перепрошивки\.' public/ru/index.html
rg -q 'aria-label="Учитывает прошивку"' public/ru/index.html
rg -q 'Каждое изменение применяется и сохраняется на устройстве — перепрошивка и пересборка не требуются\.' public/ru/index.html
rg -q 'Entropy — приложение с открытым исходным кодом для клавиатур и устройств ввода на базе Vial-QMK или Vial-RMK\. Настраивайте раскладки, параметры устройства и инструменты для ввода — от слоёв и кейкодов до подсветки и поведения устройства — в едином интерфейсе\.' public/ru/index.html
rg -q 'tools of the future by' public/index.html
rg -q 'tools of the future by' public/ru/index.html
rg -q 'class=site-footer__credit-link href=https://eh\.industries/>eh\.industries</a>' public/index.html
rg -q 'class=site-footer__credit-link href=https://eh\.works/>eh\.works</a>' public/ru/index.html
rg -q 'Раскладка и Пикер клавиш' public/ru/index.html
rg -q 'Индикатор раскладки' public/ru/index.html
rg -q 'Экспандер текста' public/ru/index.html
rg -q 'Тренажёр печати' public/ru/index.html
rg -q 'Процессор Mac' public/ru/index.html
rg -q 'Другая / не знаю' public/ru/index.html
rg -q 'Entropy для Windows' public/ru/index.html
rg -q 'Скачать EXE' public/ru/index.html
rg -q 'Установка и запуск' public/ru/index.html
rg -q 'Не удалось получить данные о релизе\. Откройте релизы на GitHub' public/ru/index.html
rg -Fq 'chmod +x Entropy*.AppImage' public/index.html
rg -Fq 'chmod +x Entropy*.AppImage' public/ru/index.html
rg -q 'udev' public/index.html public/ru/index.html

if rg -q 'Раскладка и выбор клавиш|Подстановка текста|Архитектура Mac|Другая / не уверен|Portable EXE|portable EXE' public/ru/index.html; then
  echo "Obsolete Russian feature or download terminology is still rendered" >&2
  exit 1
fi

rg -q '<title>Page not found — Entropy</title>' public/404.html
rg -q '<title>Страница не найдена — Entropy</title>' public/ru/404.html
rg -q 'This page does not exist' public/404.html
rg -q 'Такой страницы нет' public/404.html public/ru/404.html
rg -q 'href=/#download' public/404.html
rg -q 'href=/ru/#download' public/404.html public/ru/404.html

for page in public/index.html public/ru/index.html; do
  title_line_count=$(rg -o 'class=benefits__title-line' "$page" | wc -l)
  if [[ "$title_line_count" -ne 2 ]]; then
    echo "Expected exactly two intentional Benefits title lines in $page, found $title_line_count" >&2
    exit 1
  fi

  hero_title_line_count=$(rg -o 'class=hero__title-line' "$page" | wc -l)
  if [[ "$hero_title_line_count" -ne 2 ]]; then
    echo "Expected exactly two intentional Hero title lines in $page, found $hero_title_line_count" >&2
    exit 1
  fi
done

unspaced_english_dashes=$(rg -n '[[:alnum:]][—–]|[—–][[:alnum:]]' content/en || true)
if [[ -n "$unspaced_english_dashes" ]]; then
  echo "English em/en dashes must have surrounding spaces:" >&2
  echo "$unspaced_english_dashes" >&2
  exit 1
fi

if rg -q 'docs\.eh\.works' public/index.html || rg -q 'docs\.eh\.industries' public/ru/index.html; then
  echo "Documentation language domains are mixed" >&2
  exit 1
fi

if rg -q '`\.entlayout`' public/index.html public/ru/index.html; then
  echo "Markdown backticks must not leak into visible front matter text" >&2
  exit 1
fi

if rg -q 'switch between EN and RU|выбирайте EN/RU' public/index.html public/ru/index.html; then
  echo "Typing Trainer must not mention EN/RU language labels" >&2
  exit 1
fi

if rg -q 'Раскладка и Key Picker|Layout Indicator|Text Expander|Typing Trainer' content/ru/home/03-features.md; then
  echo "Unlocalized RU feature names are still present" >&2
  exit 1
fi

if rg -q 'class=site-footer__credit-link href=https://eh\.works/' public/index.html \
  || rg -q 'class=site-footer__credit-link href=https://eh\.industries/' public/ru/index.html; then
  echo "Footer branding domains are mixed between locales" >&2
  exit 1
fi

if rg -q '<a[^>]*>tools of the future by' public/index.html public/ru/index.html; then
  echo "Only the localized footer domain may be clickable" >&2
  exit 1
fi

if rg -q 'macOS and Windows builds are currently unsigned|Сборки для macOS и Windows пока не подписаны' public/index.html public/ru/index.html; then
  echo "Obsolete shared installation footnote is still rendered" >&2
  exit 1
fi

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
  rg -q 'data-site-header' "$page"
  rg -q 'data-language-menu' "$page"
  rg -q 'data-image-lightbox' "$page"
  rg -q 'data-open-original-label' "$page"
  rg -q 'data-hero-presets' "$page"
  rg -q 'data-back-to-top' "$page"
  rg -q 'data-download-flow' "$page"
  rg -q 'data-platform-select' "$page"
  rg -q 'data-architecture-select' "$page"
  rg -q 'data-download-action' "$page"
  rg -q 'data-release-notes' "$page"
  rg -q 'value=linux' "$page"
  rg -q 'value=windows' "$page"
  rg -q 'value=macos' "$page"
  rg -q 'value=other' "$page"
  rg -q 'data-download-instruction=linux' "$page"
  rg -q 'data-download-instruction=windows' "$page"
  rg -q 'data-download-instruction=macos' "$page"
  rg -q 'data-download-instruction=other' "$page"
  rg -q 'data-state=loading' "$page"
  rg -q 'site-footer__license' "$page"
  download_anchor_count=$(rg -o '#download' "$page" | wc -l)
  if [[ "$download_anchor_count" -ne 2 ]]; then
    echo "Expected Header and Hero download anchors in $page, found $download_anchor_count" >&2
    exit 1
  fi
  image_zoom_trigger_count=$(rg -o 'data-image-zoom-trigger' "$page" | wc -l)
  if [[ "$image_zoom_trigger_count" -ne 18 ]]; then
    echo "Expected 18 theme-specific clickable landing images in $page, found $image_zoom_trigger_count" >&2
    exit 1
  fi
  hero_preset_tab_count=$(rg -o 'data-hero-preset-tab' "$page" | wc -l)
  if [[ "$hero_preset_tab_count" -ne 3 ]]; then
    echo "Expected 3 Hero preset tabs in $page, found $hero_preset_tab_count" >&2
    exit 1
  fi
  hero_preset_panel_count=$(rg -o 'data-hero-preset-panel' "$page" | wc -l)
  if [[ "$hero_preset_panel_count" -ne 3 ]]; then
    echo "Expected 3 Hero preset panels in $page, found $hero_preset_panel_count" >&2
    exit 1
  fi
  feature_story_count=$(rg -o 'data-feature-story' "$page" | wc -l)
  if [[ "$feature_story_count" -ne 6 ]]; then
    echo "Expected 6 primary feature stories in $page, found $feature_story_count" >&2
    exit 1
  fi
  if rg -q 'data-feature-placeholder' "$page"; then
    echo "Unexpected feature placeholder in $page" >&2
    exit 1
  fi
  animated_image_count=$(rg -o 'data-animated-image' "$page" | wc -l)
  if [[ "$animated_image_count" -ne 8 ]]; then
    echo "Expected 8 theme-specific animated feature images in $page, found $animated_image_count" >&2
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

if rg -q 'data-image-lightbox-image' public/index.html public/ru/index.html; then
  echo "The lightbox image must be created dynamically with a valid src" >&2
  exit 1
fi

if rg -q 'story__media:hover|scale\(1\.015\)' assets/css/site.css; then
  echo "Feature images must not scale on hover" >&2
  exit 1
fi

if rg -U -q '\.button:hover[^\{]*\{[^\}]*transform' assets/css/site.css; then
  echo "Buttons must not move on hover" >&2
  exit 1
fi

rg -q '\.site-header\.is-hidden' assets/css/site.css
rg -q "classList\.add\('is-hidden'\)" assets/js/site.js
rg -q 'headerHideProgress = 0\.12' assets/js/site.js
rg -q 'backToTopProgress = 0\.35' assets/js/site.js
rg -q "event\.key === 'ArrowRight'" assets/js/site.js
rg -q "event\.key === 'ArrowLeft'" assets/js/site.js
rg -q 'actionIcon\.hidden = directDownload' assets/js/site.js
rg -q 'themeFavicon\.href = root\.dataset\.theme' assets/js/site.js
rg -Fq "var darkPreference = window.matchMedia('(prefers-color-scheme: dark)');" layouts/partials/head.html
rg -Fq "var theme = darkPreference.matches ? 'dark' : 'light';" layouts/partials/head.html
rg -Fq "if (saved === 'light' || saved === 'dark') theme = saved;" layouts/partials/head.html
rg -Fq "if (!storedTheme()) setTheme(event.matches ? 'dark' : 'light');" assets/js/site.js
rg -q '\.benefits__title-line' assets/css/site.css
rg -q '\.site-footer__credit-link:focus-visible' assets/css/site.css
rg -U -q '\.site-footer__credit-link[[:space:]]*\{[^}]*color: var\(--accent\)' assets/css/site.css
rg -q 'prefers-reduced-motion: reduce' assets/css/site.css
rg -q 'aspect-ratio: 16 / 9' assets/css/site.css
rg -q 'max-height: calc\(100dvh - 4rem\)' assets/css/site.css
rg -q 'min-width: 981px' layouts/partials/sections/features.html
rg -q '<section class="features__catalog" aria-labelledby="features-catalog-title">' layouts/partials/sections/features.html
rg -Fq "document.createElement('img')" assets/js/site.js
rg -q 'CrOS|Chrome OS' assets/js/site.js
rg -q 'FreeBSD|OpenBSD|NetBSD' assets/js/site.js
rg -q 'isIPadOS' assets/js/site.js
rg -q 'api\.github\.com/repos/ergohaven/entropy/releases/latest' hugo.yaml
rg -q -- '-x86_64\.AppImage' hugo.yaml
rg -q -- '-windows-x86_64\.exe' hugo.yaml
rg -q -- '-macos-arm64\.dmg' hugo.yaml
rg -q -- '-macos-x86_64\.dmg' hugo.yaml

if rg -q 'brand__mark' layouts/partials/header.html; then
  echo "Header must use the text-only Entropy wordmark" >&2
  exit 1
fi

if rg -q 'brand__mark|footer\.tagline|footer\.made_by' layouts/partials/footer.html; then
  echo "Footer must remain a compact text-only service line" >&2
  exit 1
fi

if rg -q 'site-footer__download|footer\.download_label' layouts assets content; then
  echo "Footer Download link or dead localization data is still present" >&2
  exit 1
fi

if rg -q "directDownload \? '↓'" assets/js/site.js; then
  echo "Final Download action still renders the removed down-arrow icon" >&2
  exit 1
fi

echo "Entropy site checks passed"
