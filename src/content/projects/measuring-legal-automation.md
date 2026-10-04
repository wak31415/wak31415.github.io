---
title: How should we measure the success of automated systems in legal practice?
shortTitle: Measuring legal automation
summary: An essay arguing that the success of automated decision-making in law cannot, and should not, be measured quantitatively, and what to do instead.
meta: Essay · Law and technology · 2023
badge: Essay
section: earlier
article: true
order: 4
deck: We cannot, and should not, measure the success or failure of automation in legal practice, at least not quantitatively.
aside:
  text: Quantitative success metrics for legal automation run into unmeasurable concepts, contradictory definitions and Goodhart's law; nominal and ordinal measures are a safer basis for comparing systems.
hero:
  type: image
  src: /assets/projects/legal-automation.webp
  alt: Old drafting tools, compasses and scissors on a table beside a map
  width: 1600
  height: 1067
media:
  type: image
  src: /assets/projects/legal-automation.webp
  alt: Old drafting tools, compasses and scissors on a table beside a map
  width: 1600
  height: 1067
---

This essay takes a step back and argues that we cannot, and should not, measure the success or failure of automation in legal practice, at least not quantitatively. We start by introducing the importance of this question and defining the concepts of success and measure. Once we have established a common understanding, we investigate three main areas. Throughout the essay, we focus on automated decision-making (ADM) systems used by public judicial bodies, as these require particular due diligence. Furthermore, we focus on measuring success rather than failure, as it is more challenging to identify. To show that a system is a failure, it is sufficient to find one dimension in which it fails. But showing that a system is successful requires more rigor.

Firstly, in order to understand how we should measure success or failure, we need to know whether measuring automation in legal practice is even possible in the first place. We argue that not only is not everything in law measurable, but that attempting to measure it may lead to contradictions.

Secondly, assuming we *can* develop sufficiently good metrics to capture the abstract concept of "success", we need to investigate whether we *should*. We discuss the ethical, technical and legal consequences of introducing a measure of success for automated systems, and the downstream effect it has on legal practice.

However, since automation will beyond doubt continue to play an increasingly important role in legal practice, we need the ability to distinguish between automated systems, not least because public institutions will need to justify choosing one system over another. In the final part, we therefore attempt to develop design considerations for measuring automated systems in legal practice, taking the previous challenges into account.

## Relevance and concepts

Which measures of success the legal industry and regulators finally agree on will ultimately affect whether, and to what extent, automation exists in legal practice in the future. It therefore affects the cost and accessibility of legal action, as well as any downstream social consequences of automation.

We need to account for the fact that there can be paradoxical legal and ethical cases in which a system is simultaneously successful (e.g., fewer incorrect decisions overall) and a failure (e.g., it discriminates against certain groups). This brings us to one of the main challenges of the question: the measurement *of* success is not isomorphic to success. That *success* and the measure *of* success are often used interchangeably but are, in fact, very different will be a guiding principle when determining how to measure the success of automated systems. The choice of measure is additionally important because, as measures are typically quantifiable, developers use them to implement the automated system. In this way, the choice of measure acts as a binding element between the intent of the law and the automated system that interprets the law.

### What is a measurement?

Measurements allow us to compare different items; in our case, automated systems. A measurement takes an abstract object, something we may not be able to compare trivially, and maps it to a real number which we can compare. The predictive accuracy of an ADM system is one such measure, as are a variety of fairness metrics.

If we have a measure, comparing two objects becomes straightforward and, in particular, binary. It permits boolean statements such as "system A is more successful than system B" (using a "success" measure) or, similarly, "person A is more guilty than person B" (using a "guilt" measure).

Some properties, such as success, are not trivially quantifiable, so we use proxy variables instead to obtain an approximate measurement of reality. These proxies typically correlate intuitively with the more abstract property, yet remain subject to the designer's understanding of that property.

We note here that this understanding of measurement comes from mathematics. Other fields take different approaches, the best known being psychologist Stanley Stevens' four levels: nominal, ordinal, interval and ratio. Nominal and ordinal measures are means of categorization and are not quantifiable (unlike interval and ratio). Nonetheless, ordinal categories can be ranked.

### What is success (for an automated system)?

Success, which determines whether a model is usable, is an abstract and highly context-dependent concept. Cathy O'Neil even goes so far as to describe the success of a model as "a matter of opinion. After all, a key component of every model […] is its definition of success".

In the current literature, we observe some recurring themes of what is considered desirable in an automated system in legal practice, the weighting of which depends heavily on the exact application. Especially for automation in administrative law, and legal practice in general, explainability is one of the greatest challenges [Cobbe, 2018] and can therefore be regarded as a key driver of success. According to the guidelines of the ICO and the Alan Turing Institute, an automated system should be evaluated not only on the performance and quality of its decisions (e.g., accuracy), but also on its explainability in six dimensions: rationale, responsibility, data usage and origin, fairness, safety and performance, and impact. A successful system should also satisfy existing legal requirements, depending on the jurisdiction, and it must be clear who holds responsibility for the system's actions. Finally, an automated system used by public institutions in particular should limit downstream consequences and other forms of ethical harm. This is by no means an exhaustive definition of a successful ADM system.

## Can we measure success and failure?

The Banach–Tarski paradox shows that one cannot define volume, for example, without assuming the existence of non-measurable sets; otherwise, we could take a ball apart and reassemble it into two balls of the same size. While the paradox currently has no known practical implications, it shows that the fundamental concept of measure is not without issues, even for otherwise trivial measurements such as volume. It raises the interesting philosophical question of what is even measurable in the first place. We discuss the challenges of measurement in three parts: measuring success by comparison, measuring explainability as a criterion for success, and contradictions between success measures.

Firstly, a frequent approach to measuring the success of automated systems is to run tests on historic data. These measurements, however, don't tell us much about the success of ADM systems, but rather how they perform against humans. Especially for automation in criminal law, we need to consider that there are wrongful convictions, caused by false accusations (more than half of wrongful convictions), false face identification (30%) and false confessions (12%) [NYTimes, 2017], [National Registry of Exonerations, 2016]. Therefore, while the accuracy of ADM is a highly relevant indicator, it is not a measure of success, but rather a measure relative to human-level performance.

Secondly, to measure the success of a system, one component we need to understand is the quality and accuracy of the automated decisions, and there are many metrics we could use here. But in order to make a decision in the first place, an automated system needs an understanding of its environment, which it obtains through other measurements.

The question is: can we accurately measure the success of an automated system, which includes measuring its ability to explain its reasoning, if certain aspects of the environment required to reach a decision are not measurable?

The fictional case proposed by Finkelstein and Fairley illustrates some of the limitations. In this case, a woman is found dead, and the murder weapon bears palm prints similar to those of her boyfriend, who is known to have struck her. Using quantifiable parameters and Bayesian probabilities (similar to how an ADM system might reach a conclusion), they conclude that the boyfriend is guilty of murder with 99.7% certainty [Tribe, 1971]. However,

> "it is to say nothing at all about his state of mind at the time, nothing about whether he intended to cause death, nothing about whether the act was premeditated." [Tribe, 1971]

All of these are non-quantifiable indicators. Indeed, making some assumptions about (admittedly quantifiable, but unknown) parameters can bring the probability down to 75% [Tribe, 1971], which may result in a different verdict.

Of course, this does not prevent us from using common success metrics: we can easily measure the predictive accuracy of this system. But if a system cannot accurately measure its environment, it is unable to provide reasoning about the real world, even if it can reason using what it has measured. And that violates the duties of the court: "110 (1) (a) Where the court makes a relevant ruling it must state in open court […] its reasons for the ruling;" [Criminal Justice Act 2003].

A metric for an automated system should therefore also identify divergences between the measured input and reality. But due to the important role of vagueness in law, many things, like "reckless driving", are deliberately not measurable. And if a system cannot understand how it differs from the real world because it is measuring something unmeasurable, we will fail at measuring its explainability, a key component of measuring success in ADM systems.

Thirdly, success and the measure *of* success are, as previously indicated, two very different things. That means we can design two different measures of success that each seem logically coherent when considered independently, but produce contradictory outcomes. One of the most prominent examples is the debate about the fairness of COMPAS, software used by US courts to assess the risk of recidivism. While COMPAS fulfills the fairness metrics *calibration* and *predictive parity* across ethnic groups, it does not achieve *equal false positive* and *false negative rates* across them. Considered individually, either appears to be a reasonable measure of fairness, and one might criticize COMPAS for not satisfying all of them. But as [Chouldechova, 2017] shows, this is mathematically impossible:

> When the recidivism prevalence […] differs across groups, any instrument that satisfies predictive parity at a given threshold […] must have imbalanced false positive or false negative errors rates at that threshold. [Chouldechova, 2017]

A system that is successful (at least with regard to fairness) must therefore necessarily also be a failure. This contradicts the concept of success, hence the concept is not measurable.

However, our inability to measure the concept of success does not invalidate the usefulness of metrics. In fact, the paradoxical ambiguity of measurement leaves room for interpretation, which can in some cases be a desirable property, as long as this room for interpretation is communicated clearly.

## Should we?

Let us assume that we have identified reasonably good proxies for measuring the success of automation in legal practice, covering everything we deem important, and that those of us who defined this measure hold a representative opinion of what counts as successful. This is likely to work splendidly, at first. After a short time, though, several issues will surface.

Firstly, Goodhart's law will apply, causing our success measure to fail:

> Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes. [Goodhart, 1981]

This process can easily be seen in machine learning when trying to improve model performance. If accuracy becomes the primary indicator of success, a developer may overfit the model, resulting in a model that is very accurate on the training data but useless.

In our case, the measurement creates a ranking system, one that can be gamed. This has been observed with other ranking systems, such as those for colleges, where one university paid students to retake the SAT and others simply submitted false numbers to improve their ranking [O'Neil, 2017, p. 54]. And on social media, one can buy "views" or "followers" to appear more influential. This is due to the observation that

> "proxies are easier to manipulate than the complicated reality they represent." [O'Neil, 2017, p. 55]

The consequences for the fairness of the justice system would be severe, resulting in a false sense of security with ADM systems. If a system is 99.99% accurate according to our success metric, a judge may be less likely to question it. But since our metric can be gamed, we could easily be trusting a system that is likely to fail in practice, which is nicely captured by Campbell's law:

> "The more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures" [Campbell, 1979].

Secondly, by facilitating ranking systems, and since law is such a sensitive field where quality is likely to matter more than cost, we may inadvertently encourage monopolization [O'Neil, 2017]. Public bodies in particular would likely need to procure the best system to maintain public support for its use, realistically creating a market for just a few players. A fault in one of these systems then goes far beyond the fault of a single judge or lawyer: it creates a systematic issue.

However, the need for some form of quality assurance or success indicator for automated systems in legal practice is undeniable, and the fact that we cannot and should not measure success quantitatively does not change this. By rejecting any measure, we would realistically be rejecting the idea of ADM entirely, which is neither our objective nor useful. Instead, we propose using nominal or ordinal measures, together with guidelines on how quantitative measures can be used, taking the aforementioned issues into consideration.

## How?

Nominal categories make rankings practically impossible, as they cannot be ordered by nature. And while ordinal categories can be ranked, they cannot be quantified, and their typically coarse granularity ensures that we should find sufficiently many ADM systems within a category to avoid, or at least limit, the aforementioned monopolization problem.

Consider a measure for the explainability of a system. Using an ordinal measure, we could create ordered categories defined by a set of requirements, such as "no explanation provided", "can provide an explanation" and "can provide an explanation which is provably correct and exhaustive". Suppose we reach a point where the strictest category can be fulfilled more or less easily by numerous competing systems. Within this category, they are all treated equally, as they all achieve the desired effect, rather than only the few at the top of a quantifiable scale being considered. One might argue that this reduces competition among ADM providers, but it is also less likely to fall prey to Goodhart's law [Goodhart, 1981]. A series of ordinal and nominal measures can similarly capture other properties, such as the extent of a system's capabilities, how it deals with unmeasurable environmental factors, and who is responsible for its decisions.

Since performance, fairness and similar metrics are helpful (not absolute) quantifiable indicators as long as they do not become targets, we argue that it is useful to include them, provided certain protective measures are taken. The decision on which automated system to use, or whether to use one at all, should be taken by a variety of stakeholders under careful consideration of the specific requirements of the use case. It should include an explanation of how the available metrics influenced the decision, to discourage universal rankings and limit their downstream consequences. Especially for ADM systems in courts or other public institutions, use could be subject to approval by an independent interdisciplinary institution that ensures that the body in question fully comprehends all potential risks and has set up appropriate mitigation strategies.

## Conclusion

We have identified five challenges that arise with the quantitative measurement of success, covering the limitations of measurement as well as its downstream consequences. Firstly, measuring performance against historic cases is not a measurement of success, but one against human performance. Next, our inability to measure certain aspects of the law, due to its vagueness, affects a system's ability to reason, and our ability to measure how the measurement diverges from reality. Furthermore, contradictions can arise when measuring concepts such as success or fairness.

If we do attempt to measure ADM systems quantitatively, we create opportunities for the systems to be gamed. Because the ranking suddenly becomes so important, only the few top players have a chance of even being considered by public bodies, which need public support; this can lead to monopolization.

We do, however, require standards and a way of evaluating automated systems in legal practice, unless we prevent their use entirely. The success of a legal automation system should not be quantified, at least not for applications in administrative law. That is not to say that the system cannot be transparent about certain metrics: indicators are still important, but they must remain indicators. So, instead of enabling the measurement of success on a scale, we propose emphasizing nominal and ordinal measures. In the same way that vagueness plays an important role in law (we cannot exhaustively list all the ways driving could be considered "reckless", for example), the measurement should be vague, as we cannot exhaustively measure all aspects of success.
