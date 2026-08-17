---
title: Ваше устройство уже многое умеет. Раскройте его возможности.
eyebrow: Скачать Entropy
secondary:
  label: Посмотреть исходный код
flow:
  os_label: Операционная система
  architecture_label: Архитектура Mac
  installation_label: Установка
  loading: Ищем последний релиз на GitHub…
  ready: Последний релиз {version}
  unavailable: В этом релизе нет подходящей сборки для {platform}. Посмотрите все файлы на GitHub.
  error: Не удалось загрузить данные о релизе. Страница GitHub Releases по-прежнему доступна.
  unknown: Поддерживаемая настольная ОС не определена. Выберите её выше или откройте все релизы.
  detected: "Определено: {platform}"
  selected: "Выбрано: {platform}"
  detection_unknown: Не удалось определить операционную систему
  action_loading: Открыть GitHub Releases
  action_ready: Скачать для {platform}
  action_releases: Посмотреть все релизы
  release_notes: Описание релиза
  noscript: JavaScript недоступен, поэтому автоматическое определение системы отключено. Выберите сборку на GitHub Releases.
platforms:
  - id: linux
    name: Linux
    package: AppImage · x86_64
    instruction: Скачайте AppImage, сделайте файл исполняемым и запустите его.
  - id: windows
    name: Windows
    package: Portable EXE · x86_64
    instruction: Скачайте и запустите portable EXE. Поскольку сборка не подписана, Windows SmartScreen может запросить подтверждение.
  - id: macos
    name: macOS
    package: DMG · Apple Silicon или Intel
    instruction: Откройте DMG для своего Mac и перетащите Entropy.app в Applications. Если macOS блокирует приложение, удалите атрибут карантина командой ниже.
    command: xattr -dr com.apple.quarantine /Applications/Entropy.app
  - id: other
    name: Другая / не уверен
    package: Все файлы релиза на GitHub
    instruction: Откройте GitHub Releases и выберите файл для своей системы.
architectures:
  - id: arm64
    name: Apple Silicon · arm64
  - id: x86_64
    name: Intel · x86_64
---

Выберите сборку, подключите Vial-совместимое устройство и начните с раскладки, которая уже хранится в его прошивке. Без аккаунта, облака и привязки к производителю.
