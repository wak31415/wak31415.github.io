---
title: HEIR
headline: HEIR, in plain language
description: A plain-language explanation of HEIR by William Koch.
date: 2025-10-30
section: publications
featured: true
badge: NeurIPS 2025
venue: NeurIPS 2025
topic: Geometric learning
summary: Learning graph-based motion hierarchies directly from observed dynamics.
authors: Cheng Zheng*, William Koch*, Baiang Li, Felix Heide
deck: Complex motion often has a hidden family tree. HEIR learns that tree from the motion itself.
aside:
  text: HEIR discovers which moving parts should inherit motion from which other parts, without being given a skeleton in advance.
links:
  - { label: Project, url: "https://light.princeton.edu/HEIR/" }
  - { label: arXiv, url: "https://arxiv.org/abs/2510.26786" }
  - { label: GitHub, url: "https://github.com/princeton-computational-imaging/HEIR" }
card:
  type: image
  src: /assets/heir-method.webp
  alt: HEIR method overview showing learned motion encoding, hierarchy sampling, and decoding
  width: 1650
  height: 720
  fit: contain
hero:
  type: image
  src: /assets/heir-deformation.webp
  alt: HEIR deformation comparisons for articulated 3D scenes
  width: 5692
  height: 3973
  background: "#202523"
---

When an excavator moves its arm, the bucket follows. When a person raises an upper arm, the forearm and hand inherit much of that motion. We naturally describe these systems as hierarchies, but graphics methods often need that structure to be specified by hand.

## The problem

A fixed skeleton works when the object category and its joints are already known. It is much less useful for an unfamiliar deforming scene, a point cloud, or a collection of Gaussian splats. A generic model should be able to infer the right structure from observed motion instead of assuming it.

## Motion as a graph

HEIR treats motion elements as vertices in a graph. Directed edges describe possible parent–child relationships. The model learns those relationships from data and separates each element’s movement into two parts: motion inherited from its parent and a local residual of its own.

The hierarchy itself is discrete and interpretable, while the learning procedure remains differentiable. That combination lets the model search for structure during training and return a graph a person can inspect afterward.

## What we tested

We begin with controlled examples of one-dimensional translation and two-dimensional rotation, where the underlying hierarchy is known. We then apply the same formulation to dynamic 3D Gaussian-splatting scenes, where the elements and their dependencies are substantially more complex.

- The simple benchmarks show whether the correct hierarchy can be recovered.
- The 3D experiments test whether the learned structure produces coherent deformations.
- The resulting parent–child graph offers an explicit account of how motion is organized.

## Why it matters

Learned scene representations are becoming easier to render but not necessarily easier to understand or control. Recovering a useful motion hierarchy gives us a compact structural handle: global motion can propagate through the graph while local motion remains local.

> HEIR asks the model to learn not only where every element moves, but also which movements explain the others.
