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
    instruction: >-
      Скачайте DMG с этого сайта или из релизов на GitHub, а не через Telegram. Откройте образ, перетащите Entropy.app на значок Applications, извлеките образ и запустите Entropy из папки «Программы».
      Если macOS блокирует запуск, откройте «Системные настройки → Конфиденциальность и безопасность», нажмите «Всё равно открыть» (Open Anyway) и подтвердите запуск.
      Приложение подписано собственным сертификатом проекта, но не нотарифицировано Apple.
      Для Экспандера текста разрешите «Универсальный доступ» и «Мониторинг ввода», затем завершите Entropy через ⌘Q и откройте заново.
      Для обновления закройте Entropy, установите новую копию тем же способом и выберите «Заменить»; уже выданные разрешения не удаляйте.
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
