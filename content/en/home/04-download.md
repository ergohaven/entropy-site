---
title: Your device is already capable. Unlock it.
eyebrow: Download Entropy
secondary:
  label: Explore the source
flow:
  os_label: Operating system
  architecture_label: Mac architecture
  installation_label: Installation and launch
  loading: Finding the latest release on GitHub…
  ready: Latest release · Version {version} · {architecture} · {size}
  unavailable: This release has no matching build for {platform}. View all assets on GitHub.
  error: Release details could not be loaded. You can still open GitHub Releases.
  unknown: A supported desktop operating system was not detected. Choose one above or view all releases.
  detected: "Detected: {platform}"
  selected: "Selected: {platform}"
  action_loading: Open GitHub Releases
  action_releases: View all releases
  release_notes: What's new
  noscript: JavaScript is unavailable, so automatic system detection is off. Choose a build on GitHub Releases.
platforms:
  - id: linux
    name: Linux
    build_title: Entropy for Linux
    architecture: x86_64
    action_label: Download AppImage
    instruction: Download the AppImage, make it executable with the command below, and run it. If the device is not detected, install suitable udev rules for the Vial/HID device and reconnect it.
    command: chmod +x Entropy*.AppImage
  - id: windows
    name: Windows
    build_title: Entropy for Windows
    architecture: x86_64
    action_label: Download EXE
    instruction: Download and run the portable EXE. Because the build is unsigned, Windows SmartScreen may ask you to confirm.
  - id: macos
    name: macOS
    build_title: Entropy for macOS
    action_label: Download DMG
    instruction: >-
      Download the DMG from this site or GitHub Releases, not Telegram. Open it, drag Entropy.app onto Applications, eject the image, and launch Entropy from Applications.
      If macOS blocks it, open System Settings → Privacy & Security → Open Anyway and confirm.
      The app uses a project self-signed certificate and is not notarized by Apple.
      For Text Expander, allow Accessibility and Input Monitoring, then quit with ⌘Q and reopen.
      To update, quit Entropy, install the new app the same way, and choose Replace; do not remove existing permission grants.
  - id: other
    name: Other / not sure
    build_title: All Entropy builds
    action_label: View all releases
    instruction: Open GitHub Releases and choose the asset that matches your system.
architectures:
  - id: arm64
    name: Apple Silicon · arm64
  - id: x86_64
    name: Intel · x86_64
---

Choose a build, connect a Vial-compatible device, and start with the layout already stored in its firmware.\
No account, no cloud, no lock-in.
