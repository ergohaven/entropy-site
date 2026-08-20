---
title: Your device is already capable. Unlock it.
eyebrow: Download Entropy
secondary:
  label: Explore the source
flow:
  os_label: Operating system
  architecture_label: Mac architecture
  installation_label: Installation
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
    instruction: Download the AppImage, make it executable with the command below, and run it. If the device is not detected, install suitable udev rules for the Vial/HID device and reconnect it.
    command: chmod +x Entropy*.AppImage
  - id: windows
    name: Windows
    package: Portable EXE · x86_64
    instruction: Download and run the portable EXE. Because the build is unsigned, Windows SmartScreen may ask you to confirm.
  - id: macos
    name: macOS
    package: DMG · Apple Silicon or Intel
    instruction: Open the DMG for your Mac and drag Entropy.app to Applications. If macOS blocks it, use the command below to remove quarantine.
    command: xattr -dr com.apple.quarantine /Applications/Entropy.app
  - id: other
    name: Other / not sure
    package: All release assets on GitHub
    instruction: Open GitHub Releases and choose the asset that matches your system.
architectures:
  - id: arm64
    name: Apple Silicon · arm64
  - id: x86_64
    name: Intel · x86_64
---

Choose a build, connect a Vial-compatible device, and start with the layout already stored in its firmware. No account, no cloud, no lock-in.
