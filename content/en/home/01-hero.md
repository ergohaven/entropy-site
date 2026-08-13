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
  theme_label: Preview theme
  themes:
    light: Light
    dark: Dark
  layer_label: Layer
  layer: 0. Main
  presets_label: Keyboard layout preset
  presets:
    - id: split
      label: Split
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
  picker_label: Key picker
  selected_label: Selected key
  actions_label: Assign an action
  select_key: Select key
  assigned_label: Assigned
  hint: Select a key, then choose its new action
  actions: [Esc, Tab, Enter, Space, Mute, RGB]
facts:
  - value: One app
    label: Layouts, firmware, and live tools
  - value: Three platforms
    label: Linux, Windows, and macOS
  - value: GPL-3.0
    label: Open source, without lock-in
---

Entropy is a calm, modern workspace for programmable keyboards and input devices. Connect a Vial-compatible device and shape every layer, key, macro, light, and behavior in one coherent interface.
