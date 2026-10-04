---
title: Learning knot invariants with graph neural networks
shortTitle: Knot invariants
summary: Using the crossing structure of knots as a graph to predict their symmetry type with graph neural networks.
meta: Geometric Deep Learning · Oxford · 2023
badge: "2023"
section: earlier
article: true
order: 1
deck: Can a neural network learn a knot's symmetry from its topological structure?
aside:
  text: Graph neural networks, in particular graph isomorphism networks, predict the symmetry of prime knots more accurately than an MLP, suggesting the structure of knots can be leveraged for learning.
links:
  - { label: PDF, url: /files/gnns-knot-theory.pdf }
media:
  type: image
  src: /assets/projects/knot-table.webp
  alt: Table of prime knots from the unknot to 7₇
  width: 470
  height: 350
  fit: contain
  background: "#ffffff"
---

So far, very little research has been done on the applications of machine learning to the topological field of knot theory. To the best of our knowledge, we are the first to investigate directly leveraging the topological structure of knots for learning tasks to predict certain properties.

We show that graph neural networks, in particular graph isomorphism networks, provide better accuracy in predicting the symmetry of prime knots, indicating that the structure of knots can indeed be leveraged. While the performance of models is still not sufficient for useful applications in research in mathematics, we hope that this study inspires further research at the intersection of knot theory and geometric learning methods.

This page is an excerpt; the [full report](/files/gnns-knot-theory.pdf) has the details.

## A (very!) short and informal introduction to knot theory

We briefly summarize some of the relevant theoretical background on knot theory from Lickorish's "A Beginning for Knot Theory". Knot theory is a branch of topology that intuitively studies how connected one-dimensional strings can be arranged in three-dimensional space. We rephrase definition 1.1 to be specific to knots, as we do not consider the more general case of links with more than one component:

> **Definition.** A knot is a subset of $S^3$, or $\mathbb{R}^3$, that consists of a single, piecewise linear, simple closed curve.

Two knots are said to be equivalent if there exists an orientation-preserving piecewise linear homeomorphism that maps both knots to the same value. A knot invariant is a quantity which remains constant under any two equivalent knots.

Kurt Reidemeister showed that any two equivalent knots can be related through a homeomorphism consisting of only three moves, the so-called Reidemeister moves:

<figure>
  <img src="/assets/projects/knot-reidemeister.webp" alt="Sketches of the three Reidemeister moves, labelled I, II and III" width="1400" height="337" loading="lazy" />
  <figcaption>The three Reidemeister moves under which two knots remain equivalent.</figcaption>
</figure>

Any knot can be represented by a so-called planar diagram (PD). Here, each edge of the plane graph representation of the knot is labeled by a number. The PD representation is a list of crossings of the knot, where each crossing is identified by four numbers which correspond to the connecting edges. The first denotes the incoming lower edge of the crossing, and the others are the remaining edges, in counter-clockwise order.

According to the Jordan Curve Theorem, in the plane graph representation there exists exactly one coloring where the unbounded face is colored white and the remaining surfaces are colored black, i.e. the planar graph is 2-colorable. The black faces describe the Seifert surface of the knot.

We finally distinguish between two crossings in this colored planar graph, left- and right-handed crossings. Distinguishing between the two is important, as it may affect the symmetry of the knot, or the knot altogether.

<figure>
  <img src="/assets/projects/knot-handedness.webp" alt="A left-handed and a right-handed crossing, with the black faces of the coloring shaded" width="592" height="309" loading="lazy" />
  <figcaption>Left- and right-handed crossings in the 2-colored planar graph.</figcaption>
</figure>

## Results

We observe that encoding the crossing type into the node features improves the performance of the Graph Isomorphism Network by approximately 4%. Surprisingly, however, it also leads to an improvement for the basic MLP architecture. In the latter case, we suspect that the symmetry distribution of alternating and non-alternating knots changes, which the MLP could pick up on.

<figure>
  <img src="/assets/projects/knot-crossing-type.webp" alt="Line chart of test accuracy for input types 0 and 1: GIN rises from about 0.63 to 0.655, MLP from about 0.545 to 0.56" width="648" height="540" loading="lazy" />
  <figcaption>For input type 0, we set all node features to 1, whereas for input type 1, we provide information about the crossing. Both MLP and GIN benefit from information on the crossing type.</figcaption>
</figure>

Encoding the crossing types into the node features, we compare the performance of additional networks against the MLP as a baseline. We observe that the MLP architecture achieves an accuracy close to 54%, which is the occurrence of the most frequent symmetry type and therefore not much better than an educated guess.

On the other hand, all graph-based models outperform the MLP, the Graph Isomorphism Network in particular. Learning the aggregation function appears to be useful for predicting the symmetry of knots.

| Architecture | Test accuracy |
| :-- | --: |
| GIN | 65.54 ± 1.91% |
| GCN | 58.79 ± 1.85% |
| GAT | 58.27 ± 1.26% |
| MLP | 56.30 ± 1.74% |

## References

- Planar Diagrams. *The Knot Atlas.* [katlas.org/wiki/Planar_Diagrams](http://katlas.org/wiki/Planar_Diagrams)
- Keir Adams, Lagnajit Pattanaik, and Connor W. Coley. [Learning 3D Representations of Molecular Chirality with Invariance to Bond Rotations](http://arxiv.org/abs/2110.04383). arXiv:2110.04383, October 2021.
- Benjamin A. Burton. [The Next 350 Million Knots](https://doi.org/10.4230/LIPIcs.SoCG.2020.25). In *36th International Symposium on Computational Geometry (SoCG 2020)*, LIPIcs 164, pp. 25:1–25:17, 2020.
- Jessica Craven, Mark Hughes, Vishnu Jejjala, and Arjun Kar. [Learning knot invariants across dimensions](http://arxiv.org/abs/2112.00016). *SciPost Physics*, 14(2):021, February 2023.
- Mark C. Hughes. [A neural network approach to predicting and computing knot invariants](http://arxiv.org/abs/1610.05744). arXiv:1610.05744, October 2016.
- Thomas N. Kipf and Max Welling. [Semi-Supervised Classification with Graph Convolutional Networks](http://arxiv.org/abs/1609.02907). arXiv:1609.02907, February 2017.
- Marc Lackenby. [Elementary Knot Theory](https://doi.org/10.1093/oso/9780198784913.003.0002). Oxford University Press, May 2017.
- W. B. Raymond Lickorish. [A Beginning for Knot Theory](https://doi.org/10.1007/978-1-4612-0691-0_1). In *An Introduction to Knot Theory*, Graduate Texts in Mathematics, pp. 1–14. Springer, 1997.
- Charles Livingston and Allison H. Moore. KnotInfo: Table of Knot Invariants. [knotinfo.math.indiana.edu](https://knotinfo.math.indiana.edu)
- Kurt Reidemeister. [Elementare Begründung der Knotentheorie](https://doi.org/10.1007/BF02952507). *Abhandlungen aus dem Mathematischen Seminar der Universität Hamburg*, 5(1):24–32, December 1927.
- Petar Veličković, Guillem Cucurull, Arantxa Casanova, Adriana Romero, Pietro Liò, and Yoshua Bengio. [Graph Attention Networks](https://openreview.net/forum?id=rJXMpikCZ). ICLR 2018.
- Keyulu Xu, Chengtao Li, Yonglong Tian, Tomohiro Sonobe, Ken-ichi Kawarabayashi, and Stefanie Jegelka. [Representation Learning on Graphs with Jumping Knowledge Networks](http://arxiv.org/abs/1806.03536). arXiv:1806.03536, June 2018.
- Keyulu Xu, Weihua Hu, Jure Leskovec, and Stefanie Jegelka. [How Powerful are Graph Neural Networks?](http://arxiv.org/abs/1810.00826) arXiv:1810.00826, February 2019.
