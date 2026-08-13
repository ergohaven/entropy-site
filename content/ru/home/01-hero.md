---
title: Сделайте клавиатуру по-настоящему своей
eyebrow: Open source · Vial-QMK · Vial-RMK
primary:
  label: Скачать Entropy
secondary:
  label: Открыть GitHub
availability: Доступно для Linux, Windows и macOS
demo:
  aria_label: Интерактивный пример интерфейса Entropy
  tabs: [Раскладка, Дополнительно, Настройки]
  navigation_label: Навигация Entropy
  undo: ↶ Отменить
  zoom: 100%
  theme_label: Тема примера
  themes:
    light: Светлая
    dark: Тёмная
  layer_label: Слой
  layers: [0. Основной, 1. Fn, 2. Медиа]
  previous_layer: Предыдущий слой
  next_layer: Следующий слой
  presets_label: Пресет раскладки клавиатуры
  presets:
    - id: split
      label: Сплит
      rows:
        - groups:
            - [Esc, "1", "2", "3", "4", "5"]
            - ["6", "7", "8", "9", "0", Bksp]
        - groups:
            - [Tab, Q, W, E, R, T]
            - [Y, U, I, O, P, "\\"]
        - groups:
            - [Caps, A, S, D, F, G]
            - [H, J, K, L, ";", Quote]
        - groups:
            - [Shift, Z, X, C, V, B]
            - [N, M, ",", ".", "/", Shift]
        - groups:
            - [Ctrl, Super, Alt, "MO(1)", Space, Enter]
            - [Space, "MO(2)", Left, Down, Up, Right]
    - id: standard
      label: Стандартная
      rows:
        - groups:
            - [Esc, "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", Bksp]
        - groups:
            - [Tab, Q, W, E, R, T, Y, U, I, O, P, "[", "]", "\\"]
        - groups:
            - [Caps, A, S, D, F, G, H, J, K, L, ";", Quote, Enter]
        - groups:
            - [Shift, Z, X, C, V, B, N, M, ",", ".", "/", Shift]
        - groups:
            - [Ctrl, Super, Alt, Space, Alt, Fn, Menu, Ctrl]
    - id: ortholinear
      label: Ортолинейная
      rows:
        - groups:
            - ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="]
        - groups:
            - [Q, W, E, R, T, Y, U, I, O, P, "[", "]"]
        - groups:
            - [Caps, A, S, D, F, G, H, J, K, L, ";", Enter]
        - groups:
            - [Shift, Z, X, C, V, B, N, M, ",", ".", "/", Shift]
        - groups:
            - [Ctrl, Super, Alt, Lower, Space, Space, Space, Space, Raise, Left, Down, Right]
  actions_label: Назначить действие
  select_key: Выбрать клавишу
  assigned_label: Назначено
  signature: инструменты будущего от
  signature_brand: eh.industries
  picker:
    title: Выбор клавиши
    close_label: Закрыть выбор клавиши
    prompt: Нажмите клавишу на клавиатуре или выберите ниже
    categories: [Основные, Символы, Модификаторы, Специальные, Макросы, Tap Dance]
    section_label: Основные клавиши — стандартная раскладка
    layout: QWERTY
    action_rows:
      - [Esc, "1", "2", "3", "4", "5"]
      - [Tab, Q, W, E, R, T]
      - [Caps, A, S, D, F, G]
      - [Shift, Z, X, C, V, B]
      - [Ctrl, Super, Alt, Space, Mute, Enter]
facts:
  - value: Одно приложение
    label: Раскладки, прошивка и живые инструменты
  - value: Три платформы
    label: Linux, Windows и macOS
  - value: GPL-3.0
    label: Открытый код без привязки к вендору
---

Entropy — спокойное современное пространство для программируемых клавиатур и устройств ввода. Подключите Vial-совместимое устройство и настройте каждый слой, кейкод, макрос, подсветку и поведение в одном цельном интерфейсе.
