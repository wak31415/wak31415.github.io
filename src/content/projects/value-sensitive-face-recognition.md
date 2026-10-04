---
title: Value sensitive design analysis of privacy-preserving face recognition
shortTitle: Value sensitive design analysis
summary: Revisiting my bachelor thesis through its stakeholders, values and value tensions, beyond the purely technical view.
meta: Ethical Computing in Practice · Oxford · 2023
badge: "2023"
section: earlier
article: true
order: 5
deck: Cryptography can make mass surveillance technically impossible. Which ethical questions does that still leave open?
aside:
  text: A value sensitive design analysis of my privacy-preserving face recognition thesis, mapping its stakeholders, value tensions and the decisions that must be made before such a system is deployed.
links:
  - { label: Thesis, url: /papers/privacy-face-recognition/ }
media:
  type: image
  src: /assets/projects/vsd-sociogram.webp
  alt: Hand-drawn sociogram connecting privacy-preserving face recognition to its stakeholders
  width: 1800
  height: 1158
  fit: contain
  background: "#ffffff"
---

## Introduction and relevance

During my course on "Ethical Computing in Practice", I decided to revisit a project I had worked on in the past, titled ["Privacy-Preserving Face Recognition in Large-Scale Video Surveillance Systems"](/papers/privacy-face-recognition/) ([PDF](/files/thesis.pdf)). In the thesis, however, I only looked at the technical dimension of the technology, and not so much at its implications.

The use of video surveillance, let alone face recognition technologies, in public spaces is highly controversial. While some claim that face recognition is essential to effectively combat crime and terrorism, others fear the potential abuse of such systems and how it may impact the freedom of the individual.

In the thesis, I propose a video surveillance framework which maintains the advantages of face recognition while making mass surveillance as we know it impossible. By leveraging recent work on actively secure multi-party computation in a two-party setting, the privacy of the framework relies on involving two independent parties in the computations. This ensures that a person (such as a terrorist) can only be identified and tracked if all parties agree to contribute their results. It follows that a party cannot unilaterally decide to track specific individuals, as this would be detected by the other party. I furthermore address important issues specific to this application, such as the implications of corrupted parties and the possibility of reconstructing movement profiles.

In practice, the system would help identify potential matches in the database (without seeing the face or video) and allow the police to send officers to the identified location. There is no automated decision-making in the considered scenario (potential derivative scenarios with automated decision-making are out of scope). The video can only be reconstructed if **all** involved (and **independent**) parties agree that this is an important, security-critical situation.

While "privacy-preserving" face recognition resolves some of the typical ethically significant harms associated with facial recognition technology (e.g., infringement of civil liberties and misuse), some harms at the very least require further investigation:

- **Privacy invasion.** No individual party has access to personal biometric information, nor could they individually obtain it if they wanted to: cryptographic protocols prevent this from happening. However, nothing *technically* prevents the parties from storing the "random" bits that they do know indefinitely, hypothetically allowing them to collaborate in some distant future to obtain private information from the past. The information is only private as long as one of the parties deems it important to protect the individual. If you are innocent today but commit a severe crime tomorrow, it is up to the involved parties to decide whether they want to be able to reconstruct your movement profile from a time when you were still innocent.
- **Bias.** The system uses a pre-trained model to compute high-dimensional embeddings of faces. No bias tests were performed, but it is likely that the model was predominantly trained on celebrities and a high proportion of people from western countries. If a bias exists in that regard, then white people in the criminal database are more likely to be flagged than people with darker skin (a higher false-negative rate for the latter), which has an impact on equality. Intuitively, I would argue that higher false-positive rates for underrepresented groups are unlikely, as the dataset is small compared to the high dimensionality of the embedding space, but this would require some testing.
- **Psychological harm.** The constant monitoring and tracking enabled by face recognition technology can lead to feelings of anxiety and stress, especially for those who are more vulnerable to such effects. Whether privacy-preserving mechanisms resolve such feelings is unclear, and even unlikely if people do not understand how exactly their privacy is protected (which requires being well educated in mathematics and cryptography). This affects several other life interests, such as happiness and leisure.

Beyond the ethically significant harms, the matter raises several other interesting academic questions surrounding the definition of privacy. What does privacy mean in the context of multi-party computation? Can we have both surveillance and privacy? And even if they do not conflict, is this a desirable outcome?

## Stakeholders

Many groups of people and institutions would be impacted by the use of such a technology, and this overview is far from exhaustive. I look at how the individual stakeholders would be impacted by this system, the ethical significance of that impact, and the values it affects. How the values are interpreted is summarized in the working definitions below.

<figure>
  <img src="/assets/projects/vsd-sociogram.webp" alt="Sociogram: privacy-preserving face recognition at the center, linked to two computing parties, auditors, police, criminals, the general population, underrepresented groups, women, and people with anxiety issues" width="1800" height="1158" loading="lazy" />
  <figcaption>Sociogram of the stakeholders.</figcaption>
</figure>

## Working definitions

| Value | Working definition |
| :-- | :-- |
| Public security | Protection of the general population from criminal action; in this case focused in particular on severe criminal action (not so much minor crimes like theft) |
| Environmental sustainability | Minimization of the additional environmental impact caused by the privacy-enhancing technologies |
| IT security | Minimization of the (online or hardware) attack surface of the cameras, networks and compute infrastructure that would result in leakage or corruption of personal information |
| Privacy | Control over and protection of personal (biometric) data, including facial features, the general video feed and metadata |
| Education | Easily understandable and accessible information on how the technology works, for people with a high-school educational background |
| Autonomy | Independence from others, in particular the ability to walk along streets alone without risking personal safety |
| Mental health | Impact on personal well-being (such as unease or distress) caused by omnipresent video surveillance |
| Equality | Equal treatment across different groups in society, including, but not limited to, equal surveillance* |
| Benefit of the doubt | Awareness and careful consideration of false positives |

\* As the concept of surveillance changes somewhat in this context, by equal surveillance we mean the equal surveillance of **innocent** people (i.e., equal false-positive detection rates across all subsets of the population), since in theory the technology should prevent innocent people from being surveilled.

## Technical and technological objectives

There are two levels of abstraction when defining success metrics: low-level technical success objectives and high-level technological success objectives.

The former aim to optimize quantifiable metrics such as the general accuracy of the system, the false-negative rate in particular, and the number of security vulnerabilities in the system. Other technical objectives may include the power consumption of the system.

From a functional perspective, we are interested in optimizing additional metrics, some of which are often difficult to quantify. The technological success objectives include, but are not limited to, psychological effect, misuse potential and fairness.

### Technical success metrics

- **Predictive accuracy of face recognition.** This includes not only the predictive accuracy of the general face recognition model, but also its accuracy after converting the model output from 32-bit floating-point to 32-bit fixed-point numbers (which loses precision), as required because MPC works over integer arithmetic.
- **Hardware and software security model.** What level of security do we guarantee? Do we assume all parties are honest, or do we assume the existence of malicious actors? If we assume malicious actors (see section 3.3 of the [thesis](/files/thesis.pdf)), the computations become significantly more expensive.
- **Speed of computing face embeddings.** This step is done on the edge, i.e., on the surveillance camera itself.
- **Speed of MPC.** The speed and efficiency of the cryptographic protocol (e.g., the number of communication rounds for certain operations).
- **Latency.** Network latency.
- **Data transmission volume.** Actively secure protocols in particular end up transmitting massive amounts of data. Reducing this brings the required network bandwidth down to manageable amounts and also helps general performance.

### Technological success metrics

- Independence of the two computing parties
- Psychological impact of the chilling effect (does it exist for this technology?)
- Bias measures of the face recognition component
- Carbon footprint
- Crime rates
- Misuse potential
- Public trust in and understanding of the technology

## Value tensions

Some of the values identified in the stakeholder analysis are in tension, and it is important to find a good balance between them.

### ✅ Public security ↔ privacy

The key tension, which is "resolved" by multi-party computation.

### ❓ Privacy or public security ↔ environmental sustainability

Video surveillance technology obviously has a carbon footprint. Adding privacy-enhancing technology, however, significantly increases the computational requirements (hardware production, power consumption), which leads to a larger footprint.

We may think about relaxing the security model to reduce this tension (e.g., by using a trusted crypto provider); however, if we go too far, the privacy-enhancing measures become redundant (section 3.3 of the thesis).

### ❓ Privacy ↔ education (more accurately: privacy ➡️ education)

The privacy-enhancing measures make the technology significantly harder to understand for most people, and understanding matters for making people feel more comfortable with the surveillance. While no reasonable change can be made on the technical side without endangering the safety of the system, valuing educational measures and investing in information material fortunately does not conflict with privacy (a one-directional challenge).

### ❓ Mental health ↔ public security

Despite allowing privacy and public security to coexist in this setting, the feeling of being watched may remain, in particular among people with anxiety problems.

Interesting, simple but effective measures include [a physical camera shield](https://www.dallmeier.com/fileadmin/user_upload/PDFs/Technology/Panomera/Dallmeier_Panomera_S-Series_Brochure_EN.pdf) that can be activated to visibly show pedestrians that the camera is currently not recording (e.g., during peaceful protests). Obviously, this is not a general solution. Mitigation strategies that improve the "psychological impact of the chilling effect" metric become more important, as mental health is inevitably linked to the core functionality of the system (i.e., it is not a component that could easily be removed). Perhaps making all communication between the computing parties public would put many people's minds at ease.

## Decision points

To strike a balance between the value tensions above, the following questions need to be answered first.

**Public security ↔ privacy**

- How do we define surveillance and privacy?
- While surveillance and privacy can coexist in their technical definitions, does the same hold for our philosophical understanding of the concepts?

**Privacy or public security ↔ environmental sustainability**

- How big is the carbon footprint of standard surveillance technology, and is it justifiable?
- How big is the additional carbon footprint of privacy-enhancing methods, and is it justifiable?
- When relaxing the cryptographic security model (to reduce computational overhead), are there regulatory means that are sufficient to guarantee the correct functioning of the system and prevent abuse?
  - Even if so, would the technology be perceived differently psychologically?
  - How would the regulatory measures be enforced, e.g., what would repercussions look like?
- Can we involve more parties and use probabilistic approaches to detect misconduct (maintaining the security of the system) while reducing the cryptographic measures (improving efficiency and reducing the carbon footprint)?
- Will the cryptographic protocols become more efficient in the future?

**Privacy ↔ education**

- How big is the impact of the general population understanding the privacy-enhancing functionality?
- Which methods are effective for communicating how the technology works?

**Mental health ↔ public security**

- What is the root cause of potential anxiety caused by surveillance?
- How widespread is it, and how significantly are people impacted?
- Do mental health or anxiety issues with respect to the technology depend on certain situations (e.g., protests only), or are they of a general nature?

## Conclusion

The implementation of privacy-preserving face recognition technology brings about several challenges, including privacy invasion, bias and psychological harm. To tackle these challenges, different stakeholders can take several measures.

To address privacy invasion, researchers can attempt to invent additional cryptographic mechanisms that ensure the erasure of data after a certain time period. They could also investigate revocation mechanisms that allow individuals to delete their randomized data to prevent future privacy violations. From what I can tell, such a revocation process would be possible, but it would be computationally expensive and would likely leak sensitive information about that person in the process.

To address psychological harm, operators of the system would need to make the software open source and provide exact hardware information. This would allow people to trust the systems being used. Similarly, educators and researchers would need to collaborate to provide understandable educational material on exactly how secure multi-party computation cryptographically guarantees the privacy of the population. Important behavioral questions arise and need to be addressed: what is the magnitude of behavioral change under general video surveillance (including face recognition) in public spaces, and what impact do the privacy-preserving methods used in the thesis have? Answering them would require psychological studies comparing behavior across different levels of information given to participants about how the system works.

Bias appears to be easier to address, as it merely requires a more representative dataset; additional statistical tools can be used to verify accuracy across different groups.
