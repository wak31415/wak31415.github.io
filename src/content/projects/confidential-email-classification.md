---
title: Confidential email classification with multi-party computation
shortTitle: Confidential email classification
summary: An email assistant for law firms that classifies messages with a language model, without the email leaving the firm or the firm seeing the model.
meta: Law and Computer Science · Oxford · 2023
badge: "2023"
section: earlier
article: true
order: 2
deck: How do data protection rules apply when the data processor never has access to the data it processes?
aside:
  text: An interdisciplinary team of law and computer science students built an email assistant that runs its classifier under secure multi-party computation, then analyzed what the GDPR makes of it.
links:
  - { label: GitHub, url: "https://github.com/wak31415/distributed-legal-mail-assistant" }
  - { label: Slides, url: /files/siftit-slides.pdf }
  - { label: Legal memo, url: /files/siftit-legal-memorandum.pdf }
media:
  type: image
  src: /assets/projects/siftit-logo.webp
  alt: SIFTIT logo, two envelopes above the product name
  width: 1400
  height: 789
  fit: contain
  background: "#262047"
---

As part of the "Law and Computer Science" course, which was jointly offered to students from the Law and the Computer Science faculties, we developed an email assistant that is capable of

- detecting data erasure requests and alerting the user about how much time they have to comply,
- quantifying the urgency of an email, and
- applying customizable categorization labels.

It is mostly targeted at the legal industry because of its high confidentiality requirements, but it is generally applicable. The system is able to learn and improve from user interaction but, most importantly, without the email leaving the firm **or** the firm having access to the language model, by leveraging secure multi-party computation.

The team consisted of an interdisciplinary group of students with a legal or computer science background. This led to some very interesting and novel investigations at the intersection of law and technology, in particular how such an application is classified under the GDPR. After all, how do data protection regulations apply if the data processor does not have access to the data that it's processing?

Our code is open source: [wak31415/distributed-legal-mail-assistant](https://github.com/wak31415/distributed-legal-mail-assistant).

## Case study

In order to analyze the implications of the GDPR on secure multi-party computation, we discuss data locality and visibility at every single step in the process through a case study.

### Assumptions

Since we (the server operator) enter contractual agreements with our clients, we assume a semi-honest threat model. This means that none of the involved parties would corrupt the computations, and all provide information honestly. Nonetheless, it is assumed that the clients may be curious and exchange information to potentially learn secret data.

The MPC protocol is chosen in a way to address this specific threat model. More secure protocols could be used, at the cost of performance.

### Technical setup

<figure>
  <img src="/assets/projects/siftit-architecture.webp" alt="Diagram: on the client side, an Outlook plugin talks to the client's NLP MPC server, which exchanges data over HTTPS with the service provider's NLP MPC server holding the model weights" width="1600" height="451" loading="lazy" />
</figure>

All communications are encrypted (not included in the proof of concept) to prevent tampering by third parties. The red lines in particular indicate information flows that would not reveal anything even if an attacker could read them: they are meaningless with respect to the original data, apart from their purpose of potentially updating model weights.

The NLP MPC server accepts requests from the Outlook plugin, encrypts the data, and engages with the service provider's NLP MPC server to evaluate their model on the client's data. The client's MPC server decrypts the predicted label and forwards it back to the Outlook plugin.

The service provider and the client additionally use a trusted third party which provides so-called *Beaver triples* that are required for the multiplications in the NLP model.

### The MPC process

#### Step 1: Client prepares the data (client side)

Each email is associated with a unique identifier (e.g., simply the ID of the email in the database, or a cryptographic hash of the sender and receiver addresses and the time and date). This is required to correctly associate label predictions with the email. Only the client knows the relation between ID and email, and the identifier as such reveals no private information.

| Email identifier | Email |
| :-- | :-- |
| f25d9c52 | Good afternoon, … |
| d37e9512 | Hello Angela, could you… |

#### Step 2: NLP preprocessing (client side)

The email message is run through a preprocessing NLP pipeline, which tokenizes the input and then computes a high-dimensional embedding (a context-rich representation) of the email.

| Email identifier | Embedding | Email |
| :-- | :-- | :-- |
| f25d9c52 | [0.1174, 0.9917, 0.4426, …] | Good afternoon, … |
| d37e9512 | [-1.2324, 0.2673, 0.6215, …] | Hello Angela, could you… |

Note that this embedding may still contain personally identifiable information (PII). At this point, no data has left the client or been shared with anyone else.

#### Step 3: Secret-sharing model weights and embedding

The embedding is split into two shares. By the properties of secret sharing, they are individually indistinguishable from random and therefore, on their own, do not contain PII.

Formally, if $x$ is the embedding, then $[x]=(x_1, x_2)$ such that $x = x_1+x_2 \bmod 2^k$ are the secret shares of $x$ (where $k$ is a security parameter of the protocol). Let $r\in [0, 2^k-1]$ be chosen uniformly at random. We set $x_1 = x - r \bmod 2^k$ and $x_2 = r \bmod 2^k$. Both $x_1$ and $x_2$ are then indistinguishable from random, as long as $r$ is unknown to anyone who didn't create the secret shares.

The client keeps one of the shares and gives the service provider the other one. The model provider performs the same steps with its model weights.

At this stage, both the client and the service provider hold pieces of information from each other from which they could not possibly reconstruct the original data (it is just as hard as guessing the PII randomly).

#### Step 4: Computing the label

The secret shares of the data (indistinguishable from random) are then passed through a single-layer perceptron, that is, the parties compute

$$
[\mathbf{Y}] = \mathrm{ReLU}([\mathbf{W}][\mathbf{X}]+[\mathbf{b}])
$$

where $\mathbf{W}\in\mathbb{R}^{3\times 768}$, $\mathbf{X}\in\mathbb{R}^{768\times b}$, $\mathbf{b}\in\mathbb{R}^{3}$ and $\mathbf{Y}\in\mathbb{R}^{3\times b}$. Secret matrix-vector multiplication can be performed as follows:

$$
([\mathbf{W}][\mathbf{X}])_{i,j} = \sum_{k=1}^{768}[\mathbf{W}_{i,k}] [\mathbf{X}_{k, j}]
$$

The multiplication of two secret shares involves a trusted third party. This party does **not** receive any (encrypted) data, but rather assists in the computation by creating so-called ["Beaver triples"](https://link.springer.com/content/pdf/10.1007/3-540-46766-1_34.pdf), which can be precomputed before the data is known. This third party must, however, be trusted (i.e., it does not secretly collaborate with the client or the server); otherwise, information leakage is possible.

So far, neither the client nor the server has learned any information about the data or the model weights. Every piece of data is indistinguishable from random.

#### Step 5: Revealing the label

The server and the client share the secret $[\mathbf{Y}] = (\mathbf{Y}_1, \mathbf{Y}_2)$, that is, the server knows $\mathbf{Y}_1$ and the client knows $\mathbf{Y}_2$, but neither knows the actual label $\mathbf{Y}$.

The server now sends $\mathbf{Y}_1$ to the client, which can then compute $\mathbf{Y}=\mathbf{Y}_1+\mathbf{Y}_2$ (only the client learns $\mathbf{Y}$).

Note that the function $\mathrm{ReLU}$ is not invertible, so the client cannot uniquely determine $\mathbf{W}$ and $\mathbf{b}$ from $\mathbf{Y}$ (i.e., the model remains secret).

#### Step 6: Training the model

This is where things get more challenging. Currently, the setup consists of the local, client-side part of the model and the MPC final-layer classification module that is computed by both the client and the server.

<figure>
  <img src="/assets/projects/siftit-training.webp" alt="Diagram: the client runs the email through a local network; red lines carry values known only to the server, and a blue line returns the label, which only the client can decrypt" width="1600" height="843" loading="lazy" />
</figure>

Red lines are known only to the server, and blue lines are results computed by the server but only decryptable by the client. In this case, the server learns no information at all.

But when the client corrects a label that it receives (and sends a secret share of the label to the server), the server and client use MPC to update the weights without revealing the original input (the final layer of the DeBERTa model) or the weights to the client. However, the updated weights are known to the server, so it knows the gradient. Knowing the gradient, the paper ["Deep Leakage from Gradients"](https://dlg.mit.edu/assets/NeurIPS19_deep_leakage_from_gradients.pdf) shows that we would be able to reconstruct the final-layer representation and the label from the client by trying to replicate the gradient using optimization methods.

The final layer of the DeBERTa model itself reveals a lot of information about the original text, quite possibly including personally identifiable information, since DeBERTa was trained using an encoder-decoder model.

The paper also proposes some methods to limit this attack, in particular gradient pruning (setting all gradient entries below a certain threshold to zero), which could be implemented relatively easily using MPC, at the cost of accuracy.

> **What can be recovered:** the original email and the corrected classification label, **if** the user corrects the original classification.
>
> This is only possible if we (the third party) were to keep a copy of the old weights or store the gradients, which we don't. Otherwise, **PII is not recoverable**.

> **What cannot be recovered:** the original email and label **if** the user **does not** correct the original classification.
>
> An attacker on our server would only get our weights, which themselves do not allow PII recovery.

#### Other ways of information leakage: model weights and informed adversaries

["Reconstructing Training Data with Informed Adversaries"](https://arxiv.org/pdf/2201.04845.pdf) is an interesting paper, albeit with an unrealistic setting. It shows that if the adversary knows the model weights and all of the training data except for a single data point, they can reconstruct that data point. In our example, that would correspond to the following setting:

Our server is attacked and the model weights are copied by the attacker. The original training data of the model is public, so for the very first email where a company corrects the classification, the attacker would be able to infer the email just from the weights. As soon as more than one update has been performed on the model weights, this attack becomes significantly harder, as the number of unknowns increases. A formal mathematical proof is out of scope for this case study.

In a more general setting (after several model updates), it is infeasible to reconstruct training data from the model weights. In that case, we pass the anonymity test:

1. Is it still possible to single out an individual? No.
2. Is it still possible to link records relating to an individual? No.
3. Can information be inferred concerning an individual? No.

### Conclusion

The above steps illustrate that anonymity can be guaranteed for basic inference, as well as for training if the necessary safeguards are put in place. These anonymity safeguards for training are technically feasible (as explained above) but have not yet been implemented in our proof of concept.

In our demo, for training, we do however fulfill pseudonymisation, since "the personal data can no longer be attributed to a specific data subject without the use of additional information, provided that such additional information is kept separately and is subject to technical and organisational measures to ensure that the personal data are not attributed to an identified or identifiable natural person" ([Article 4(5) GDPR](http://www.privacy-regulation.eu/en/article-4-definitions-GDPR.htm)). In our case, the additional information is the gradients obtained in the training process.

## Final presentation and legal memorandum

Our final "pitch deck" is available as [slides (PDF)](/files/siftit-slides.pdf), and the accompanying [legal memorandum (PDF)](/files/siftit-legal-memorandum.pdf) covers the GDPR analysis in full.

<figure>
  <img src="/assets/projects/siftit-team.webp" alt="The project team smiling around a table in an Oxford college room" width="1600" height="1200" loading="lazy" />
  <figcaption>Team picture at the end of the project.</figcaption>
</figure>
