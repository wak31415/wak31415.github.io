---
title: Non-rigid NeRFs for VR video conferencing
fullTitle: "Efficient Non-Rigid Neural Radiance Fields for Virtual Reality Video Conferencing"
shortTitle: Non-rigid NeRFs
headline: Non-rigid NeRFs for video conferencing
description: A plain-language explanation of William Koch's thesis on non-rigid neural radiance fields.
date: 2023-08-30
section: earlier
badge: "2023"
venue: Preprint · MSc thesis · University of Oxford
articleMeta: Preprint · MSc thesis · University of Oxford · 2023
summary: Efficient novel-view synthesis for moving faces from ordinary webcam input.
deck: Can a normal webcam produce the changing viewpoints needed for a convincing virtual round table?
aside:
  text: This thesis adapts neural radiance fields to render a moving face from new viewpoints while reducing the computation needed for a live video stream.
links:
  - { label: PDF, url: /files/master-thesis.pdf }
card:
  type: image
  src: /assets/master-thesis-cover.webp
  alt: Cover of the Oxford thesis on non-rigid neural radiance fields
  width: 1107
  height: 1439
  fit: document
  background: "#15274b"
hero:
  type: image
  src: /assets/master-thesis-cover.webp
  alt: Cover of the Oxford master's thesis on non-rigid neural radiance fields
  width: 1107
  height: 1439
  fit: document
  background: "#15274b"
---

Most video calls place everyone in a flat grid. A virtual-reality meeting would feel more natural if each participant could see the others from the viewpoint of their own seat. Producing those views normally requires a multi-camera capture setup. This project asks how far we can get with a standard webcam and a learned 3D representation.

## Why this is difficult

A conventional NeRF is best suited to a static scene observed from many camera positions. A person on a video call is neither static nor fully known in advance: the head moves, expressions change, and the system must handle new frames continuously. Rendering also needs to be fast enough for communication, not an offline reconstruction.

## The approach

The model learns a radiance field that varies with time and facial expression, allowing it to synthesize both new views and new poses. The thesis also uses priors already available from face analysis to spend computation where it matters most.

Two preprocessing choices are especially practical. First, rays are concentrated around the face instead of being sampled uniformly across the image. Second, the head becomes the reference frame, removing much of its rigid motion before the neural field has to model what remains.

## What that buys us

Reducing unnecessary motion and empty-space sampling makes ray marching more efficient. The resulting system can take webcam input and render perspectives that were not directly captured—a step toward photo-realistic avatars around a shared virtual table.

## The broader lesson

Neural representations do not have to learn every part of the problem from scratch. Known geometric and semantic structure can simplify the task, reduce computation, and make a research model more useful in an interactive setting.

> The project combines a flexible learned representation with simple face-specific priors: model the hard non-rigid detail, but factor out the motion and space we already understand.
