---
title: "Efficient Non-Rigid Neural Radiance Fields for Virtual Reality Video Conferencing"
collection: papers
permalink: /papers/2023-08-30-efficient-non-rigid-neural-radiance-fields
excerpt: ''
date: 2023-08-30
venue: ''
paperurl: '/files/master-thesis.pdf'
citation: 'William Koch. 2023. "Efficient Non-Rigid Neural Radiance Fields for Virtual Reality Video Conferencing". Self-published.'
---

We present an efficient novel-pose and view synthesis model that can be used in downstream tasks such as virtual reality video conferencing systems. The system uses input from a standard webcam, and then generates different perspectives of the person in front of the camera. This enables the creation of a virtual round table with photo-realistic human avatars with minimal hardware requirements. While prior work on non-rigid scenes primarily deals with fixed-length videos, we adapt the architecture of neural radiance fields to deal with previously unseen facial expressions in video streams. To achieve the required real-time performance, we propose a simple preprocessing stage during training and inference which relies on existing priors to optimize ray sampling. By isolating the face region and using the head as a frame of reference, we reduce motion, allowing us to perform raymarching more efficiently. We compare our results against existing methods, as well as very recent advances from August.