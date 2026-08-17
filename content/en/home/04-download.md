---
title: Your device is already capable. Unlock it.
eyebrow: Download Entropy
secondary:
  label: Explore the source
flow:
  os_label: Operating system
  architecture_label: Mac architecture
  loading: Finding the latest release on GitHub…
  ready: Latest release {version}
  unavailable: This release has no matching build for {platform}. View all assets on GitHub.
  error: Release details could not be loaded. You can still open GitHub Releases.
  unknown: A supported desktop operating system was not detected. Choose one above or view all releases.
  detected: "Detected: {platform}"
  selected: "Selected: {platform}"
  detection_unknown: Operating system not detected
  action_loading: Open GitHub Releases
  action_ready: Download for {platform}
  action_releases: View all releases
  release_notes: Release notes
  noscript: JavaScript is unavailable, so automatic system detection is off. Choose a build on GitHub Releases.
platforms:
  - id: linux
    name: Linux
    package: AppImage · x86_64
  - id: windows
    name: Windows
    package: Portable EXE · x86_64
  - id: macos
    name: macOS
    package: DMG · Apple Silicon or Intel
  - id: other
    name: Other / not sure
    package: All release assets on GitHub
architectures:
  - id: arm64
    name: Apple Silicon · arm64
  - id: x86_64
    name: Intel · x86_64
footnote: macOS and Windows builds are currently unsigned. See the release page and project README for current installation notes.
---

Choose a build, connect a Vial-compatible device, and start with the layout already stored in its firmware. No account, no cloud, no lock-in.
