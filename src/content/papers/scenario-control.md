---
title: ScenarioControl
fullTitle: "ScenarioControl: Vision-Language Controllable Vectorized Latent Scenario Generation"
headline: ScenarioControl, in plain language
description: A plain-language explanation of ScenarioControl by William Koch.
date: 2026-04-18
section: publications
featured: true
badge: ECCV 2026
venue: ECCV 2026
topic: Generative world models
summary: Vision-language controllable, vectorized latent scenario generation.
authors: Lili Gao*, Yanbo Xu*, William Koch*, Samuele Ruffino, Luke Rowe, Behdad Chalaki, Dmitriy Rivkin, Julian Ost, Roger Girgis, Mario Bijelic, Felix Heide
authorsShort: Lili Gao*, Yanbo Xu*, William Koch*, and collaborators
deck: How do you build a driving-scenario generator that listens to an image or a sentence without losing the precise structure a simulator needs?
aside:
  text: ScenarioControl turns an image or text prompt into a structured, editable driving world—not just a video of one.
url: https://princeton-computational-imaging.github.io/ScenarioControl/
links:
  - { label: arXiv, url: "https://arxiv.org/abs/2604.17147" }
  - { label: GitHub, url: "https://github.com/princeton-computational-imaging/ScenarioControl/tree/main" }
card:
  type: video
  src: /assets/video/scenario-control-hero.mp4
  poster: /assets/scenario-control-hero-poster.webp
hero:
  type: image
  src: /assets/scenario-control.webp
  alt: ScenarioControl pipeline from image and text conditioning to a generated vectorized driving scenario
  width: 4602
  height: 1066
  fit: contain
---

A useful driving simulator needs more than plausible pixels. It needs lanes, road geometry, cars, pedestrians, and their motion over time in a form that another system can inspect and change. ScenarioControl generates that underlying scene structure while still accepting the intuitive inputs people actually want to use: a reference image or a written description.

## The problem

Generative models are good at making scenes that look realistic, but detailed control is harder. A prompt such as “an intersection at a red light with one car ahead” describes the whole scene at once. A simulator, by contrast, represents the scene as many sparse elements: lane segments, individual actors, positions, and trajectories. Connecting those two views is the central challenge.

## The core idea

We represent the road and all dynamic actors together in a vectorized latent space. The model can therefore reason about global context—what kind of scene this is—and local relationships, such as which vehicle belongs in which lane.

A cross-global control mechanism brings the image or text condition into the model at both levels. Standard cross-attention handles fine-grained correspondences; a lightweight global branch carries the overall scene context. The decoder then produces explicit map and actor elements rather than stopping at an image.

## What comes out

The generated scenario includes road structure, infrastructure, pedestrians, and reactive agents evolving over time. Because the representation is structured, it can be rendered from different actors’ viewpoints, connected to a video generator, or continued over a longer horizon.

- Text can specify conditions that are difficult to collect repeatedly in the real world.
- An input image can anchor the generated scenario to a visual observation.
- The vectorized output keeps the scene useful for simulation and downstream control.

## Why it matters

Simulation is most useful when it can produce rare or targeted cases, not only random variations. A controllable generator makes it easier to ask for a specific traffic arrangement, preserve realistic interactions, and still obtain the machine-readable structure needed to evaluate an autonomous system.

> The important shift is from generating how a driving scene looks to generating what the scene is—and keeping both views consistent.
