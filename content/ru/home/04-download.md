---
title: Ваше устройство умеет многое. Раскройте его возможности.
eyebrow: Скачать Entropy
secondary:
  label: Посмотреть исходный код
flow:
  os_label: Операционная система
  architecture_label: Процессор Mac
  installation_label: Установка и запуск
  loading: Ищем последний релиз на GitHub…
  ready: Последний релиз · Версия {version} · {architecture} · {size}
  unavailable: В этом релизе нет подходящей сборки для {platform}. Посмотрите все файлы на GitHub.
  error: Не удалось получить данные о релизе. Откройте релизы на GitHub
  unknown: Поддерживаемая настольная ОС не определена. Выберите её выше или откройте все релизы.
  detected: "Определено: {platform}"
  selected: "Выбрано: {platform}"
  action_loading: Открыть GitHub Releases
  action_releases: Посмотреть все релизы
  release_notes: Что нового
  noscript: JavaScript недоступен, поэтому автоматическое определение системы отключено. Выберите сборку на GitHub Releases.
platforms:
  - id: linux
    name: Linux
    build_title: Entropy для Linux
    architecture: x86_64
    action_label: Скачать AppImage
    instruction: Скачайте AppImage, сделайте файл исполняемым командой ниже и запустите его. Если устройство не определяется, установите подходящие правила udev для Vial/HID-устройства и переподключите его.
    command: chmod +x Entropy*.AppImage
  - id: windows
    name: Windows
    build_title: Entropy для Windows
    architecture: x86_64
    action_label: Скачать EXE
    instruction: Скачайте и запустите портативный EXE-файл. Поскольку сборка не подписана, Windows SmartScreen может запросить подтверждение.
  - id: macos
    name: macOS
    build_title: Entropy для macOS
    action_label: Скачать DMG
    instruction: Откройте DMG для своего Mac и перетащите Entropy.app в Applications. Если macOS блокирует приложение, удалите атрибут карантина командой ниже.
    command: xattr -dr com.apple.quarantine /Applications/Entropy.app
  - id: other
    name: Другая / не знаю
    build_title: Все сборки Entropy
    action_label: Посмотреть все релизы
    instruction: Откройте GitHub Releases и выберите файл для своей системы.
architectures:
  - id: arm64
    name: Apple Silicon · arm64
  - id: x86_64
    name: Intel · x86_64
---

Выберите сборку, подключите Vial-совместимое устройство и начните с раскладки, которая уже хранится в его прошивке. Без аккаунта, облака и привязки к производителю.
