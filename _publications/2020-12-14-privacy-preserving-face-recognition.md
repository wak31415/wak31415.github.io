---
title: "Privacy-Preserving Face Recognition in Large Scale Video Surveillance Systems"
collection: papers
permalink: /papers/2020-12-14-privacy-preserving-face-recognition
excerpt: 'A new framework to preserve anonymity of people in public video surveillance using mulit-party computation'
date: 2020-12-14
venue: 'n/a'
paperurl: '/files/thesis.pdf'
citation: #'Your Name, You. (2009). &quot;Paper Title Number 1.&quot; <i>Journal 1</i>. 1(1).'
---

The use of video surveillance, let alone face recognition technologies, in public spaces is highly controversial. While some claim that face recognition is essential to effectively combat crime and terrorism, others fear the potential abuse of such systems and how it may impact the freedom of the individual.

We propose a video surveillance framework which maintains the advantages of face recognition while making mass-surveillance as we know it impossible. By leveraging recent work on actively secure multi-party computation in a two-party setting, the privacy of our framework relies on involving two independent parties in the computations. This ensures that a person (such as a terrorist) can only be identified and tracked if all parties agree to contribute their results. It follows that a party cannot solely decide to track specific individuals as this would be detected by the other party. We furthermore address important issues specific to this application such as the implications of corrupted parties and the possibility of reconstructing movement profiles.

Our results show that the offline phase is currently too expensive for large-scale realtime applications, and may need to involve a trusted crypto provider instead. The online phase however performs very well when performing matches against a criminal database with 150 entries. Using only four threads, ten faces can be checked every second without revealing the identity. Due to the parallelizability of the operations, our framework can already work over predefined limited time frames.