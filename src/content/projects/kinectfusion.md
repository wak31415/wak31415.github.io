---
title: Real-time 3D reconstruction with hand-held scanners
shortTitle: Real-time 3D reconstruction
summary: A KinectFusion implementation that fuses a hand-held depth camera's stream into a 3D model in real time.
meta: 3D reconstruction · TU Munich · 2021
badge: "2021"
section: earlier
article: true
order: 6
deck: Turning the depth stream of a hand-held scanner into a 3D model while you move the camera.
aside:
  text: During my semester abroad at TU Munich, I worked with two graduate students on a KinectFusion implementation, including a GUI and marching cubes for mesh extraction.
links:
  - { label: Report, url: /files/kinectfusion-report.pdf }
hero:
  type: image
  src: /assets/projects/kinectfusion-app.webp
  alt: The reconstruction app showing a gray 3D surface model of a desk scene
  width: 1279
  height: 719
media:
  type: image
  src: /assets/projects/kinectfusion-app.webp
  alt: The reconstruction app showing a gray 3D surface model of a desk scene
  width: 1279
  height: 719
---

During my semester abroad at the Technical University of Munich in 2020/2021, I collaborated with two graduate students on implementing a real-time 3D reconstruction system for hand-held depth scanners. The full [report (PDF)](/files/kinectfusion-report.pdf) has all the details.

## Abstract

In this report, we first introduce the KinectFusion approach and why it is interesting to implement. Afterward, an overview of the method is given. The main part discusses different implementation details, as well as the GUI and marching cubes implementation. Finally, we briefly go over experimental results and give a conclusion.

<figure>
  <img src="/assets/projects/kinectfusion-pipeline.webp" alt="KinectFusion pipeline: measurement, pose estimation with ICP, reconstruction update into a global TSDF, and surface prediction by ray casting, with depth-map and model previews" width="1316" height="735" loading="lazy" />
  <figcaption>The KinectFusion pipeline: surface measurement, ICP pose estimation, TSDF fusion and ray-cast surface prediction.</figcaption>
</figure>

<figure>
  <img src="/assets/projects/kinectfusion-performance.webp" alt="Table of frame rates and GPU memory for 256³, 384³ and 512³ volumes, and a bar chart showing that fusion takes about 70% of the runtime" width="712" height="571" loading="lazy" />
  <figcaption>Frame rate and GPU memory by volume size on the freiburg_xyz dataset (Ryzen 5600X, GTX 1070), and the runtime share of each kernel for a 512³ grid.</figcaption>
</figure>
