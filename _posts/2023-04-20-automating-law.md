---
title: 'Essay: How should we measure the success or failure of automated systems in legal practice?'
date: 2023-04-20
permalink: /posts/2023/automating-law/
tags:
  - law-and-computer-science
---

**Introduction**

This essay takes a step back and argues that we cannot, and should not, measure the success or failure of automation in legal practice - quantitatively at least. We will start by introducing the importance of this question, as well as defining the concepts of success and measure. Once we have established a common understanding, we investigate three main areas. Throughout the essay, we focus on automated decision making (ADM) systems used by public judicial bodies, as these require particular due diligence. Furthermore, we focus on measuring success, instead of failure, as it is more challenging to identify. To show that a system is a failure, it is sufficient to find one dimension in which it fails. But showing that a system is successful requires more rigor.

Firstly, in order to understand how we should measure success or failure, we need to know whether the measurement of automation in legal practice is even possible in the first place. We argue that not only is not everything in law measurable, but that doing so may lead to contradictions.

Secondly, assuming we *can* develop sufficiently good metrics to capture the abstract concept of “success”, we need to investigate whether we *should*. We discuss the ethical, technical and legal consequences of introducing a measure for success of automated systems, and the downstream effect it has on legal practice. 

However, since it is beyond doubt that automation will continue to and increasingly play an important role in legal practice, there is a necessity for us to have the ability to distinguish between automated systems - for one because public institutions for example will need to justify their choice of one system over another. In the final part, we therefore attempt to develop design considerations for measurements of automated systems in legal practice, taking the previous challenges into consideration. 

**Relevance and Concepts**

What measures for success the legal industry and regulators finally agree on ultimately affects whether and to what extent automation will exist in legal practice in the future, and therefore affects the cost and accessibility of legal action, as well as any downstream social consequences of automation. 

We need to account for the fact that there can be paradox legal and ethical cases in which a system might be both successful (such as fewer incorrect decisions overall) and a failure (may discriminate against certain groups) simultaneously. Which brings us to one of the main challenges of the question: the measurement *of* success is not isomorphic to success. The fact that *success* and the measure *of* success are often used interchangeably but are, in fact, very different from each other, will be a guiding principle when determining how to measure success of automated systems. The choice of measure is additionally important, because, as they are typically quantifiable, they are used by developers to implement the automated system. In this way, the choice of measure acts as a binding element between the intent of the law and the automated system, which interprets the law.

**What is a measurement?** 

Measurements allow us to compare different items - in our case, automated systems. It takes an abstract object, something we may not be able to compare trivially, and maps it to a real number which we can compare. The predictive accuracy of an automated decision making system (ADM) is one such measure, as well as a variety of fairness metrics.

If we have a measure, the comparison of two objects becomes straightforward, and, in particular, binary. It permits boolean statements such as “system A is more successful than system B” (using a “success” measure), or, similarly, “person A is more guilty than person B” (using a “guilt” measure). 

Some properties, such as success, are not trivially quantifiable, so we use proxy variables instead to obtain an approximate measurement of the reality. These proxies typically intuitively correlate with the more abstract property, yet remain subjective to the designers understanding of that abstract property.

We note here that this understanding of measurement comes from mathematics. In other fields, there are different approaches, with the most commonly known one by psychologist Stanley Stevens distinguishing four levels - nominal, ordinal, interval and ratio. Nominal and ordinal measures are means of categorization, and not quantifiable (unlike interval and ratio). Nonetheless, ordinal categories can be ranked.

**What is success (for an automated system)?**

Success, which determines whether a model is usable, is an abstract concept and highly context dependent. Cathy O’Neil even goes so far to describe the success of a model as “a matter of opinion. After all, a key component of every model […] is its definition of success”.

In the current literature, we observe some recurring themes of what is considered desirable in an automated system in legal practice, the weighting of which depends highly on the exact application. Especially for automation in administrative law, and legal practice in general, explainability is one of the greatest challenges [Cobbe, 2018] and can therefore be regarded as a key driver for success. According to the guidelines of the ICO and Alan Turing Institute, an automated system should not only be evaluated on the performance and quality of its decisions (e.g., accuracy), but also its explainability in six different dimensions: rationale, responsibility, data usage and origin, fairness, safety and performance, as well as its impact. A successful system should also satisfy existing legal requirements, depending on the jurisdiction, and it must be clarified who holds responsibility for the systems actions. Finally, an automated system used by public institutions in particular should limit downstream consequences and other forms of ethical harm. This is, by no means, an exhaustive definition of a successful ADM system.

---

**Can We Measure Success and Failure?**

The Banach-Tarski Paradox shows that one cannot define volume for example, without assuming the existence of non-measurable elements - otherwise, we could take a ball apart and re-assemble it into two balls of the same size. While the Banach-Tarski Paradox currently has no known practical implications, it shows that the fundamental concept of measure is not entirely without issues, even with otherwise trivial measurements (e.g., volume), and raises the interesting philosophical question for us what is even measurable in the first place. We discuss the challenges of measurement in three parts - the measure of success by comparison, the measure of explainability as criterion for success and contradictions between success measures.

Firstly, a frequent approach to measure success of automated systems is to run tests on historic data. These measurements, however, don’t tell us much about the success of ADM systems, but rather how they perform against humans. Especially for the automation in criminal law, we need to consider that there are wrongful convictions, caused by false accusations (more than half of wrongful convictions), false face identification (30%) and false confessions (12%)  [NYTimes, 2017], [National Registry of Exonerations, 2016]. Therefore, while accuracy of ADM is a highly relevant indicator, it is not a measure of success, but rather a measure with respect to human-level performance.

Secondly, to measure the success of a system, one component we will need to understand is the quality and accuracy of the automated decisions; there are many metrics we could use here. But in order to make this decision in the first place, an automated system or algorithm, in general, will need to have an understanding of its environment, which it obtains through other measurements. 

The question is, can we accurately measure the success of an automated system - which includes measuring its ability to explain its reasoning - if certain aspects of the environment required to reach a decision are not measurable? 

The fictional case proposed by Finkelstein and Fairley illustrates some of the limitations. In this case, a woman is found dead, and the murder weapon shows some palm prints that are similar to her boyfriend, who is known to have struck her. They come to the conclusion, using quantifiable parameters and Bayesian probabilities (similar to how an ADM might come to a conclusion), that the boyfriend is guilty of murder with 99.7% certainty [Tribe, 1971]. However, 

> “it is to say nothing at all about his state of mind at the time, nothing about whether he intended to cause death, nothing about whether the act was premeditated.” [Tribe, 1971]
> 

- all of which are non-quantifiable indicators. Indeed, making some assumptions about (admittedly) quantifiable, but unknown parameters, can bring the probability down to 75% [Tribe, 1971] and may result in a different verdict.

Of course, this does not prevent us from using common success metrics - we can easily measure the predictive accuracy of this system. But if a system cannot accurately measure its environment, then it is unable to provide reasoning about the real world, even if the system can reason using what it has measured. And that violates the duties of the court, “110 (1) (a) Where the court makes a relevant ruling it must state in open court […] its reasons for the ruling;” [Criminal Justice Act 2003]. 

A metric for an automated system should therefore also identify digressions from the measured input and the reality. But, due to the important role of vagueness in law, many things like “wreckless driving” are deliberately not measurable. And if a system cannot understand how it differs from the real world because it is measuring something unmeasurable, we will fail at measuring its explainability - a key component to measuring success in ADM systems.

Thirdly, success and the measure *of* success, are, as previously indicated, two very different things. That means we can design two different measures of success that, when considered independently, seem logically coherent, but produce contradictory outcomes. One of the most prominent examples is the discussion about the fairness of COMPAS, a software used by US courts to determine the risk of recidivism. While COMPAS fulfills the fairness metrics *callibration* and *predictive parity* across, it does not achieve *equal false positive* and *false negative rates* across ethnic groups. Considered individually, either appear to be reasonable measures of fairness - one might criticize that COMPAS did not satisfy all of them. But as [Chouldechova, 2017] shows, this is mathematically impossible:

> When the recidivism prevalence […] differs across groups, any instrument that satisfies predictive parity at a given threshold […] must have imbalanced false positive or false negative errors rates at that threshold. [Chouldechova, 2017]
> 

A system that is successful (at least, regarding fairness) must therefore necessarily also always be a failure. This contradicts the concept of success, hence the concept is not measurable. 

However, our inability to measure the concept of success does not invalidate the usefulness of metrics. In fact, the paradox ambiguity of measurement leaves room for interpretation, which can, in cases, be a desirable property as long as this room for interpretation is communicated clearly.

---

**Should We?**

Let us assume that we have identified reasonably good proxies to measure success of automation in legal practices which cover everything we deem to be important, and that we who defined this measure have a representative opinion on what is to be considered successful. This is likely to work splendidly - at first. After a short time though, there are several issues that will surface. 

Firstly, Goodhart’s Law will apply, causing our success measure to fail

> Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes. [Goodhart, 1981]
> 

This process can be easily seen in Machine Learning when trying to improve model performance. If accuracy becomes the primary indicator of success, a developer may overfit the model - resulting in a very accurate (on the training data), but useless model. 

In our case, the measurement creates a ranking system, one that can be gamed. This has been observed with other ranking systems, such as for colleges, where one university paid students to retake the SAT, and others simply submitted entirely false numbers to improve their ranking [O’Neil, 2017, p. 54]. And on social media, one can buy “views” or “followers” to appear more influential. This is due to the observation that

> “proxies are easier to manipulate than the complicated reality they represent.” [O’Neil, 2017, p. 55]
> 

The consequences for the fairness of the justice system would be severe, resulting in a false sense of security with ADMs. If a system is 99.99% accurate, according to our success metric, then a judge may be less likely to question the system. But as our metric can be gamed, we could easily be trusting a system which is likely to fail in practice, which is nicely captured by Campbell’s Law: 

> “The more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures” [Campbell, 1979].
> 

Secondly, by facilitating the existence of ranking systems, and since law is such a sensitive field where quality is likely to matter more than cost, we may inadvertently encourage monopolization [O’Neil, 2017]. Especially public bodies would likely need to get the best system to maintain public support for the usage, realistically creating a market for just a few players. A fault in one of these systems then goes far beyond the fault of a judge or a lawyer, but creates a systematic issue. 

However, the necessity for some form of quality assurance or success indicator for automated systems in legal practice is undeniable, and the fact that we cannot and should not measure success quantitatively does not change this. By rejecting any measure, we would realistically be rejecting the idea of ADM entirely, which is neither our objective nor useful. Instead, we propose the usage of nominal or ordinal measures, as well as guidelines on how quantitative measures can be used by taking the aforementioned issues into consideration.

---

**How?**

Nominal categories make rankings practically impossible, as they cannot be ordered by nature. And while ordinal categories can be ranked, they cannot be quantified, and their typically coarse granularity ensures that we should find sufficiently many ADM systems within a category that we can avoid, or at least, limit the aforementioned monopolization problem. Consider a measure for the explainability of a system: using an ordinal measure, we could create different ordered categories defined by a set of requirements, such as “No explanation provided”, “Can provide explanation” and “Can provide explanation which is provably correct and exhaustive”. Assume we reach a point where the strictest category can be more or less easily fulfilled by numerous competing systems - within this category, they are all treated equally, as they all satisfy the desired effect, rather than only considering the few at the top of a quantifiable scale. One might argue that this reduces competition among ADM providers, but it is simultaneously less likely to fall prey to Goodhart’s law [Goodhart, 1981]. A series of ordinal and nominal measures can similarly be used to capture other properties such as extent of capabilities, how the system deals with unmeasurable environmental factors and who is responsible for the systems decisions. 

Since performance, fairness and similar metrics are helpful (not absolute) quantifiable indicators, as long as they do not become targets, we argue that it is useful to include them as long as certain protective measures are taken. The decision on which automated system to use, or whether to use one in the first place, should be taken by a variety of stakeholders under careful consideration of the specific requirements of the use case. It should include an explanation as to how the available metrics influenced the decision, to discourage the usage of universal rankings and limit the downstream consequences that these have. Especially for ADM systems in court or other public institutions, the usage could be subject to approval by an independent interdisciplinary institution that ensures that the body in consideration fully comprehends all potential risks and has set up appropriate mitigation strategies.

---

**Conclusion**

We have identified five challenges that arise with the quantitative measurement of success, covering limitations of measurements as well as downstream consequences thereof. Firstly, measuring performance in comparison to historic cases is not a measurement of success, but one against human performance. Next, our inability to measure certain aspects of the law, due to its vagueness, affects a systems ability to reason, and our ability to measure how the measurement diverges from reality. Furthermore, contradictions can arise by measuring concepts such as success or fairness. 

If we do attempt to measure ADM systems, at least quantitatively, we create opportunity for the system to be gamed. Because the ranking suddenly becomes so important, only the few top players have a chance of even being considered by public bodies, as there needs to be public support, which can affect monopolization.

We do require standards, however, and a way of evaluating automated systems in legal practice, unless we prevent their usage entirely. Success of a legal automation system should not be quantified, at least not for applications in administrative law. That is not to say that the model cannot be transparent about certain metrics - indicators are still important, but they must remain indicators. So, instead of enabling the measurement of success on a scale, we propose to emphasize the usage of nominal and ordinal measures. In the same way that vagueness plays an important role in law, as we cannot be exhaustive about all ways driving could be considered “wreckless” for example, the measurement should be vague, as we cannot exhaustively measure all aspects of success.