---
title: Make your keyboard truly yours
eyebrow: Open source · Vial-QMK · Vial-RMK
primary:
  label: Download Entropy
secondary:
  label: View on GitHub
availability: Available for Linux, Windows, and macOS
demo:
  aria_label: Interactive Entropy interface preview
  tabs: [Layout, Advanced, Config]
  navigation_label: Entropy navigation
  undo: ↶ Undo
  zoom: 100%
  theme_label: Preview theme
  themes:
    light: Light
    dark: Dark
  layer_label: Layer
  layers: [0. Main, 1. Fn, 2. Media]
  previous_layer: Previous layer
  next_layer: Next layer
  presets_label: Keyboard layout preset
  presets:
    - id: split
      label: Split · K:04
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
      label: Standard
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
      label: Ortholinear
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
  actions_label: Assign an action
  select_key: Select key
  assigned_label: Assigned
  signature: tools of the future by
  signature_brand: eh.industries
  hints:
    change_key: Left click to change this key
    change_modifier_key: Right click to change the modifier key
    switch_modifier_side: Ctrl+right-click to switch left/right side
    go_to_layer: Right click to go to that layer
    change_layer_target: Ctrl+right-click to change layer target
    rename_layer: Click to rename layer
  tooltips:
    key: "Key: %s"
    encoder: "%s encoder action"
    layout: Device layout and connected devices
    advanced: Advanced device features
    settings: Application and device settings
    light_theme: Use light theme
    dark_theme: Use dark theme
    layer: Click to rename layer
    keys:
      Esc: Escape — cancel / close
      Space: Space
      Menu: Menu key — open right-click context menu
      Left: Arrow Left
      Up: Arrow Up
      Down: Arrow Down
      Right: Arrow Right
      Tab: Tab — indent / move focus forward
      Caps: Caps Lock — toggle uppercase input
      Bksp: Backspace — delete character before cursor
      Enter: Enter — confirm / new line
      Delete: Delete — delete character after cursor
      Insert: Insert — toggle insert/overwrite mode
      Home: Home — jump to beginning of line
      End: End — jump to end of line
      Page Up: Page Up — scroll up one page
      Page Down: Page Down — scroll down one page
      Print Screen: Print Screen — take a screenshot
      Pause: Pause / Break
      Ctrl: Left Control
      Shift: Left Shift
      Alt: Left Alt
      Super: Left Super, desktop modifier key and OS shortcuts
      Mute: Mute
      Vol+: Volume up
      Vol−: Volume down
      "MO(1)": Hold to activate layer 1
      "MO(2)": Hold to activate layer 2
  picker:
    title: Key Picker
    close_label: Close Key Picker
    prompt: Press a key on your keyboard, or pick below
    categories: [Basic, Symbols, Mods, Special, Macros, Tap Dance, Custom]
    section_label: Basic keys — standard keyboard layout
    layout: QWERTY
    layout_label: Key legend layout
    rows:
      - keys:
          - { label: Esc }
          - { label: F1 }
          - { label: F2 }
          - { label: F3 }
          - { label: F4 }
          - { label: F5 }
          - { label: F6 }
          - { label: F7 }
          - { label: F8 }
          - { label: F9 }
          - { label: F10 }
          - { label: F11 }
          - { label: F12 }
          - { top: Print, label: Screen, action: Print Screen }
          - { top: Scroll, label: Lock, action: Scroll Lock }
          - { label: Pause }
      - keys:
          - { top: "~", label: "`" }
          - { top: "!", label: "1" }
          - { top: "@", label: "2" }
          - { top: "#", label: "3" }
          - { top: "$", label: "4" }
          - { top: "%", label: "5" }
          - { top: "^", label: "6" }
          - { top: "&", label: "7" }
          - { top: "*", label: "8" }
          - { top: "(", label: "9" }
          - { top: ")", label: "0" }
          - { top: "_", label: "-" }
          - { top: "+", label: "=" }
          - { label: "←", action: Bksp }
          - { label: Insert }
          - { label: Delete }
      - keys:
          - { label: Tab, span: 2 }
          - { label: Q }
          - { label: W }
          - { label: E }
          - { label: R }
          - { label: T }
          - { label: Y }
          - { label: U }
          - { label: I }
          - { label: O }
          - { label: P }
          - { top: "{", label: "[" }
          - { top: "}", label: "]" }
          - { top: "|", label: "\\" }
          - { label: Home }
      - keys:
          - { top: Caps, label: Lock, action: Caps, span: 2 }
          - { label: A }
          - { label: S }
          - { label: D }
          - { label: F }
          - { label: G }
          - { label: H }
          - { label: J }
          - { label: K }
          - { label: L }
          - { top: ":", label: ";" }
          - { top: '"', label: "'" }
          - { label: "↵", action: Enter, span: 2 }
          - { label: End }
      - keys:
          - { label: Shift, span: 3 }
          - { label: Z }
          - { label: X }
          - { label: C }
          - { label: V }
          - { label: B }
          - { label: N }
          - { label: M }
          - { top: "<", label: "," }
          - { top: ">", label: "." }
          - { top: "?", label: "/" }
          - { label: Shift, span: 2 }
          - { top: Page, label: Up, action: Page Up }
      - keys:
          - { label: Ctrl, span: 2 }
          - { label: Super }
          - { label: Alt }
          - { label: Space, span: 4 }
          - { label: Alt }
          - { label: Menu }
          - { label: Ctrl }
          - { label: "←", action: Left }
          - { label: "↑", action: Up }
          - { label: "↓", action: Down }
          - { label: "→", action: Right }
          - { top: Page, label: Down, action: Page Down }
facts:
  - value: One app
    label: Layouts, firmware, and live tools
  - value: Three platforms
    label: Linux, Windows, and macOS
  - value: GPL-3.0
    label: Open source, without lock-in
---

Entropy is a calm, modern workspace for programmable keyboards and input devices. Connect a Vial-compatible device and shape every layer, key, macro, light, and behavior in one coherent interface.
