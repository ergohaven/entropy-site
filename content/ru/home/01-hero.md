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
      label: Сплит · K:04
      source: k04
      view: { min_x: 0.25, min_y: -0.45, width: 18.5, height: 6.6 }
      keys:
        - { matrix: "0,5", label: "`", x: 1, y: 0.4 }
        - { matrix: "0,4", label: "1", x: 2, y: 0.4 }
        - { matrix: "0,3", label: "2", x: 3, y: -0.05 }
        - { matrix: "0,2", label: "3", x: 4, y: -0.15 }
        - { matrix: "0,1", label: "4", x: 5, y: -0.05 }
        - { matrix: "0,0", label: "5", x: 6, y: 0.1 }
        - { matrix: "1,5", label: Esc, x: 1, y: 1.4 }
        - { matrix: "1,4", label: Q, x: 2, y: 1.4 }
        - { matrix: "1,3", label: W, x: 3, y: 0.95 }
        - { matrix: "1,2", label: E, x: 4, y: 0.85 }
        - { matrix: "1,1", label: R, x: 5, y: 0.95 }
        - { matrix: "1,0", label: T, x: 6, y: 1.1 }
        - { matrix: "2,5", label: Tab, x: 1, y: 2.4 }
        - { matrix: "2,4", label: A, x: 2, y: 2.4 }
        - { matrix: "2,3", label: S, x: 3, y: 1.95 }
        - { matrix: "2,2", label: D, x: 4, y: 1.85 }
        - { matrix: "2,1", label: F, x: 5, y: 1.95 }
        - { matrix: "2,0", label: G, x: 6, y: 2.1 }
        - { matrix: "3,5", label: Shift, x: 1, y: 3.4 }
        - { matrix: "3,4", label: Z, x: 2, y: 3.4 }
        - { matrix: "3,3", label: X, x: 3, y: 2.95 }
        - { matrix: "3,2", label: C, x: 4, y: 2.85 }
        - { matrix: "3,1", label: V, x: 5, y: 2.95 }
        - { matrix: "3,0", label: B, x: 6, y: 3.1 }
        - { matrix: "4,0", label: Mute, x: 7, y: 3.1 }
        - { matrix: "4,5", label: Delete, x: 3, y: 3.95 }
        - { matrix: "4,4", label: Super, x: 4, y: 3.85 }
        - { matrix: "4,3", label: Ctrl, x: 5.3, y: 4, r: 20, rx: 5.3, ry: 4 }
        - { matrix: "4,2", label: "MO(1)", x: 6.3, y: 3.8, r: 20, rx: 5.3, ry: 4 }
        - { matrix: "4,1", label: Space, x: 7.3, y: 3.6, r: 20, rx: 5.3, ry: 4 }
        - { matrix: "5,0", label: "6", x: 12, y: 0.1 }
        - { matrix: "5,1", label: "7", x: 13, y: -0.05 }
        - { matrix: "5,2", label: "8", x: 14, y: -0.15 }
        - { matrix: "5,3", label: "9", x: 15, y: -0.05 }
        - { matrix: "5,4", label: "0", x: 16, y: 0.4 }
        - { matrix: "5,5", label: Bksp, x: 17, y: 0.4 }
        - { matrix: "6,0", label: Y, x: 12, y: 1.1 }
        - { matrix: "6,1", label: U, x: 13, y: 0.95 }
        - { matrix: "6,2", label: I, x: 14, y: 0.85 }
        - { matrix: "6,3", label: O, x: 15, y: 0.95 }
        - { matrix: "6,4", label: P, x: 16, y: 1.4 }
        - { matrix: "6,5", label: "\\", x: 17, y: 1.4 }
        - { matrix: "7,0", label: H, x: 12, y: 2.1 }
        - { matrix: "7,1", label: J, x: 13, y: 1.95 }
        - { matrix: "7,2", label: K, x: 14, y: 1.85 }
        - { matrix: "7,3", label: L, x: 15, y: 1.95 }
        - { matrix: "7,4", label: ";", x: 16, y: 2.4 }
        - { matrix: "7,5", label: "'", x: 17, y: 2.4 }
        - { matrix: "9,0", label: Mute, x: 11, y: 3.1 }
        - { matrix: "8,0", label: N, x: 12, y: 3.1 }
        - { matrix: "8,1", label: M, x: 13, y: 2.95 }
        - { matrix: "8,2", label: ",", x: 14, y: 2.85 }
        - { matrix: "8,3", label: ".", x: 15, y: 2.95 }
        - { matrix: "8,4", label: "/", x: 16, y: 3.4 }
        - { matrix: "8,5", label: Shift, x: 17, y: 3.4 }
        - { matrix: "9,4", label: "[", x: 14, y: 3.8 }
        - { matrix: "9,5", label: "]", x: 15, y: 3.95 }
        - { matrix: "9,1", label: Enter, x: 10.76, y: 4.65, r: -20, rx: 10.76, ry: 4.65 }
        - { matrix: "9,2", label: "MO(2)", x: 11.76, y: 4.85, r: -20, rx: 10.76, ry: 4.65 }
        - { matrix: "9,3", label: Alt, x: 12.76, y: 5.05, r: -20, rx: 10.76, ry: 4.65 }
      encoders:
        - { x: 8, y: 2.6, clockwise: Vol+, counter_clockwise: Vol− }
        - { x: 10, y: 2.6, clockwise: Vol+, counter_clockwise: Vol− }
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
