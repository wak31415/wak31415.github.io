---
title: Privacy-preserving face recognition
shortTitle: Privacy-preserving recognition
description: A plain-language explanation of William Koch's thesis on privacy-preserving face recognition.
date: 2020-12-14
section: earlier
badge: "2020"
venue: Preprint · BSc thesis · École Polytechnique
articleMeta: Preprint · BSc thesis · École Polytechnique / Télécom Paris · 2020
summary: A secure multi-party framework that prevents unilateral tracking.
deck: Instead of asking one organization to use surveillance responsibly, can the system make unilateral tracking cryptographically impossible?
aside:
  text: The framework splits a face-recognition computation between independent parties so that no single party can identify or track someone alone.
links:
  - { label: PDF, url: /files/thesis.pdf }
card:
  type: image
  src: /assets/bachelor-thesis-cover.webp
  alt: First page of the thesis on privacy-preserving face recognition
  width: 1107
  height: 1439
  fit: document
  background: "#655e54"
hero:
  type: image
  src: /assets/bachelor-thesis-cover.webp
  alt: First page of the thesis on privacy-preserving face recognition
  width: 1107
  height: 1439
  fit: document
  background: "#655e54"
---

Face recognition creates a genuine tension. It can help find a particular person, but the same infrastructure can become a system for tracking everyone. Policies and access controls help only as long as the organization operating the system follows them.

## A technical system of checks and balances

The thesis replaces a single trusted operator with two independent parties. The camera data and face database are secret-shared, and matching happens through actively secure multi-party computation. Neither party sees the underlying biometric data during the calculation.

Most importantly, a match can be completed only when both parties participate. One party cannot quietly alter the watch list or decide to follow a new person without the other party being able to detect it.

## Privacy is more than hiding a face

Even if images and identities remain encrypted, metadata can leak information. For example, knowing how many people appear in successive camera frames may reveal a movement profile when a location is quiet. The thesis therefore also studies corrupted participants and proposes an obfuscation method for these indirect traces.

## Is it practical?

The online matching phase performed well in the thesis experiments: with a database of 150 entries, four threads could check ten faces per second without revealing their identities. The expensive offline preparation remained a bottleneck and would need further engineering or a trusted cryptographic provider for large-scale, real-time deployment.

## What this work argues

The goal is not to claim that public face recognition becomes harmless. It is to show that privacy constraints can be part of the computation itself. Cryptography can enforce a division of power that would otherwise exist only as an organizational promise.

> A privacy-preserving system should limit what its operator is technically able to do, not merely record whether the operator behaved afterward.
