---
title: ScenarioControl
fullTitle: "ScenarioControl: Vision-Language Controllable Vectorized Latent Scenario Generation"
headline: How AI can help create virtual worlds for training self-driving cars
description: "ScenarioControl turns a text prompt or a single dashcam frame into a controllable, simulation-ready 3D driving scene, and then into photorealistic video."
date: 2026-04-18
section: publications
featured: true
badge: ECCV 2026
venue: ECCV 2026
topic: Generative world models
summary: Vision-language controllable, vectorized latent scenario generation.
authors: Lili Gao*, Yanbo Xu*, William Koch*, Samuele Ruffino, Luke Rowe, Behdad Chalaki, Dmitriy Rivkin, Julian Ost, Roger Girgis, Mario Bijelic, Felix Heide
authorsShort: Lili Gao*, Yanbo Xu*, William Koch*, and collaborators
deck: Describe a driving scenario in words, or show a single image, and get back a structured, simulation-ready 3D scene that is both controllable and photorealistic.
aside:
  text: ScenarioControl generates an editable driving world first and pixels second, so the same scene can be simulated, inspected, and rendered under any conditions.
url: https://princeton-computational-imaging.github.io/ScenarioControl/
links:
  - { label: arXiv, url: "https://arxiv.org/abs/2604.17147" }
  - { label: GitHub, url: "https://github.com/princeton-computational-imaging/ScenarioControl/tree/main" }
card:
  type: video
  src: /assets/video/scenario-control-hero.mp4
  poster: /assets/scenario-control-hero-poster.webp
---

<p class="article-note">ScenarioControl was accepted to ECCV 2026, where we presented it as a poster in September. More results are on the <a href="https://princeton-computational-imaging.github.io/ScenarioControl/">project page</a>.</p>

Developing an autonomous vehicle means preparing it for a world where everything is unique. Roads differ in geometry, traffic changes from moment to moment, and the same intersection can present very different challenges depending on the weather, visibility, and behavior of nearby drivers and pedestrians. More importantly, errors in autonomous driving can have severe consequences, including the loss of life.

Research on autonomous driving can broadly be divided into three areas: the development of (a) hardware sensors for **measuring**, (b) algorithms for **understanding** (vision), and (c) algorithms for **acting upon** (driving policy) the environment. To develop (c), we need a lot of data, which is why modern autonomous driving stacks are trained on tens of millions of real-world miles. But the events most important for safety are often the hardest to collect. A wrong-way driver, a pedestrian emerging from behind a truck, or an unusual merge may occur only rarely, and a handful of recorded examples cannot capture every meaningful variation.

The standard response has been to build simulators. Tools like [CARLA](https://carla.org/) and [MetaDrive](https://github.com/metadriverse/metadrive) let engineers hand-design the exact situations they want to stress-test. But creating handcrafted worlds is costly, hard to tweak, and – as anyone who has compared a simulator with real dashcam footage knows – they look nothing like reality. We can broadly split this into two problems: creating the traffic agents and layout, and creating a photorealistic synthetic dashcam video (and other synthetic sensor data) that corresponds to this layout.

For the first problem, generative systems such as [SLEDGE](https://arxiv.org/abs/2403.17933) and [Scenario Dreamer](https://openaccess.thecvf.com/content/CVPR2025/html/Rowe_Scenario_Dreamer_Vectorized_Latent_Diffusion_for_Generating_Driving_Simulation_Environments_CVPR_2025_paper.html) can synthesize lane graphs and traffic participants. However, the scenes they generate are sampled from the real-world distribution. They do not offer the fine-grained controls needed to systematically create challenging edge cases.

For the second problem, diffusion-based world models have made significant progress in recent years. Systems such as [GAIA-2](https://arxiv.org/abs/2503.20523) and [Cosmos-Drive-Dreams](https://research.nvidia.com/labs/toronto-ai/cosmos_drive_dreams/) can generate realistic driving videos, even conditioned on layouts. But those layout controls, such as the road layout and vehicles, need to be specified first. The models can render a *specified* scenario convincingly; they do not themselves *provide* that scenario.

What we want is a tool that lets researchers describe a driving scenario in natural language – or show it a single image – and get back a structured, simulation-ready 3D scene that is both controllable and photorealistic. That is the core of what we worked on.

## ScenarioControl: a latent space of roads, agents, and signals

Our paper, *ScenarioControl: Vision-Language Controllable Vectorized Latent Scenario Generation*, introduces the first vision-language control mechanism for learned driving scenario generation. Given a text prompt or a single RGB frame, ScenarioControl produces a full vectorized 3D scenario: lane centerlines, traffic lights, static infrastructure, and the 3D bounding boxes of reactive agents over time. The same scene can then be rolled out by an off-the-shelf behavior simulator and rendered into photorealistic video.

<figure>
  <video autoplay muted loop playsinline controls preload="metadata" poster="/assets/scenario-control/overview-poster.webp" width="1280" height="460">
    <source src="/assets/video/scenario-control-overview.mp4" type="video/mp4" />
  </video>
  <figcaption><strong>ScenarioControl in action.</strong> From a single text prompt or image, ScenarioControl creates a full 3D driving scenario – lanes, signals, reactive agents, and a camera rollout – in one forward pass of a latent diffusion model.</figcaption>
</figure>

The core idea that allows for control and simulation is to keep the scene *vectorized*. That is, instead of generating a grid of pixels or voxels, ScenarioControl works on a sparsely connected graph of lane segments and agents inside a 64-by-64-meter bird's-eye-view patch. Each element carries an elevation and height term, so that the layout can be projected back into camera space (i.e., what the scene looks like from the car, rather than from above). A transformer-based vectorized autoencoder compresses this graph to a latent of about sixteen tokens per element, and a latent diffusion model learns to denoise those tokens conditioned on control signals.

<figure>
  <a href="/assets/scenario-control.webp"><img src="/assets/scenario-control.webp" alt="ScenarioControl pipeline: image or prompt conditioning feeds a latent diffusion model with a cross-global control mechanism, whose output is decoded into a vectorized scenario" width="4602" height="1066" loading="lazy" /></a>
  <figcaption><strong>The ScenarioControl pipeline.</strong> Text or image conditioning enters a latent diffusion model that operates over a vectorized scene graph. A cross-global control block fuses dense conditioning features with sparse scene tokens, while a count-injection head decides how many lanes and agents should be generated.</figcaption>
</figure>

## The technical challenge: connecting dense evidence to a sparse graph

At first glance, conditioning a diffusion model on text or images is a solved problem – that is what Stable Diffusion and the rest of the generation literature do every day. ScenarioControl has a different alignment problem. A prompt or image produces a dense sequence of features, while the output consists of a variable number of lane and agent elements. A single lane may depend on several distant image regions; an intersection type may depend on the scene as a whole; and some agents may be occluded or outside the camera's field of view.

Standard cross-attention can, in principle, learn these relationships. The issue is not that it is mathematically incapable of doing so. Rather, it provides little built-in structure for summarizing global context and can be data-inefficient for this dense-to-sparse mapping. We created a modified version, a cross-global control mechanism, that addresses this. One branch is standard cross-attention between scene tokens and conditioning features. A second, lightweight branch introduces a small number of learned latent tokens that aggregate global context from the conditioning; the scene tokens then cross-attend to these compressed summaries. The two branches are mixed with a *learned gate*, initialized so that the global branch contributes nothing at the start of training and the model behaves like plain cross-attention. During training, the gate learns to open exactly as far as global context helps.

Two other ingredients matter. A small **count-injection head** predicts how many lanes and agents a scene should contain from the conditioning alone, removing an important degree of freedom at inference time. And a **differentiable collision penalty** decodes intermediate latents and penalizes overlapping agent boxes during denoising, discouraging the model from generating cars inside one another when prompts are ambiguous.

## What you can do with ScenarioControl

### Image-conditioned generation

Given a single forward-facing dashcam frame, ScenarioControl infers a plausible vectorized driving scene: the right number of lanes, a matching intersection type, and agent placements consistent with what is visible in the image – while filling in coherent structure for the parts of the world the camera cannot see.

<figure>
  <a href="/assets/scenario-control/image-conditioned.webp"><img src="/assets/scenario-control/image-conditioned.webp" alt="Rows of real dashcam frames, each followed by four generated top-down vectorized scenes with lanes, traffic lights and vehicles" width="2400" height="885" loading="lazy" /></a>
  <figcaption><strong>Image-conditioned generation.</strong> Each row starts from a single real dashcam frame (left) and shows the vectorized scenes that ScenarioControl produces (right). Different samples vary, especially in areas that are invisible to the camera.</figcaption>
</figure>

### Prompt-conditioned generation

Alternatively, scenes can be created from natural language. The prompt doesn't have to be elaborate: even a short description is enough to generate a variety of scenes.

<figure>
  <a href="/assets/scenario-control/prompt-conditioned.webp"><img src="/assets/scenario-control/prompt-conditioned.webp" alt="Short text prompts describing intersections and roads, each followed by three generated top-down scenes" width="2400" height="860" loading="lazy" /></a>
  <figcaption><strong>Prompt-conditioned generation.</strong> Three samples per prompt show how ScenarioControl varies fine-grained detail while keeping the requested global structure – intersection type, lane count, and whether pedestrians appear.</figcaption>
</figure>

### Outpainting to neighborhood-sized layouts

Although the diffusion model is trained on local 64-meter patches, iteratively outpainting new patches around a generated seed produces coherent road networks that span entire city blocks, with consistent topology across block boundaries. A single prompt becomes an entire drivable map.

<figure>
  <a href="/assets/scenario-control/outpainting.webp"><img src="/assets/scenario-control/outpainting.webp" alt="A large outpainted road network with several intersections, traffic lights and vehicles, grown from a single generated patch" width="1400" height="659" loading="lazy" /></a>
  <figcaption><strong>Outpainting.</strong> A scene generated from the prompt “The scene depicts a multi-lane road intersection with a dedicated right-turn lane. The ego vehicle is positioned in the center, moving upward along a lane that merges into the right-turn path. To the left of the ego vehicle, there is a lane with multiple vehicles traveling in the same direction. To the right, there is a lane with multiple vehicles also traveling in the same direction, adjacent to the dedicated right-turn lane. There are pedestrians on the sidewalks and static objects such as road signs and barriers present.”</figcaption>
</figure>

### Control improves the realism of video generation

Because ScenarioControl produces structured bird's-eye-view (BEV, i.e., top-down) scenes, we can hand them to an existing traffic behavior simulator, roll the agents forward in time, and project the resulting trajectories into any camera in the scene as wireframe control signals. We fine-tune a video model to accept these control signals using LoRA (low-rank adaptation, an efficient method for fine-tuning large models). This model can then render the rollout, conditioned either on the original dashcam frame or on a text description of appearance. The same underlying scenario can be re-rendered as “a partly cloudy afternoon,” “an overcast rainy morning,” or “a snow-covered rural road.”

<figure>
  <video autoplay muted loop playsinline controls preload="metadata" poster="/assets/scenario-control-hero-poster.webp">
    <source src="/assets/video/scenario-control-hero.mp4" type="video/mp4" />
  </video>
  <figcaption><strong>Same traffic scenario, different settings.</strong> One rolled-out BEV scenario rendered under four text prompts: slightly overcast, rainy, snow, and night.</figcaption>
</figure>

Video generation models do not strictly need a wireframe control signal (i.e., where to place agents) to generate driving videos – we use it for controllability. However, one interesting observation from our experiments was that wireframe control improves the realism of the generated videos, regardless of whether we condition the video on an initial frame or on a description. We measure this using FID and FVD (Fréchet Inception Distance and Fréchet Video Distance). These standard metrics capture how closely generated images and videos resemble real data in terms of visual appearance and, for FVD, temporal dynamics. With wireframe control, FID improves by 2.1% and 70.2%, and FVD by 43.6% and 69.8%, for the first-frame- and prompt-conditioned variants, respectively. The gains are largest for the prompt-conditioned model, where the wireframe provides explicit geometric grounding that text alone underspecifies. These results show that grounding generation in the reprojected vectorized scene improves both appearance and motion realism, rather than trading realism for controllability.

## How well does it work?

Beyond visual appeal, we assessed whether generated global layouts, lanes, and agents change in the intended way when the conditioning input changes. Across three complementary controllability metrics, ScenarioControl improves over the primary baseline, [Scenario Dreamer](https://arxiv.org/abs/2503.22496) (a prior generative simulator that uses latent diffusion to generate vectorized driving scenes), in both text- and image-conditioned experiments on [nuPlan](https://www.nuplan.org/), a large-scale autonomous driving dataset.

For prompt-conditioned generation, we created a new dataset that aligns traffic scenes with text descriptions (see below). Here, ScenarioControl improved all nine reported control measures over Scenario Dreamer, with relative gains of up to 143% on individual control-adherence measures.

In a separate, narrower comparison, we held the road map fixed and only generated agent placement. On 14,688 Waymo test scenes, the text-conditioned model achieved 26.8% precision, compared with 5.5% for the TrafficGen baseline.

## A new dataset for conditional generation research

One practical blocker for this line of work has been the lack of vision-language-aligned driving data: most public datasets either have no captions or have captions tied to raw images rather than vectorized maps. We release a curated set of roughly 500,000 scene-level captions aligned with the vectorized maps of nuPlan, generated by rendering BEV visualizations and prompting a GPT-4.1-mini captioner for scene descriptions that mention intersection type, lane structure, signals, and pedestrians. We hope this dataset is useful well beyond our paper. It can be downloaded [here](https://drive.google.com/file/d/1V8Koo8LkKDFXFE_SHr-ar0XkTvfi_zK-/view?usp=sharing).

## The bigger picture

ScenarioControl shortens the path from a human idea to a testable virtual world: describe a situation, generate an explicit scene graph, simulate its participants, and render what different actors might observe.

That workflow could make it easier to create targeted sets of scenarios instead of waiting for them to appear in a driving log or authoring each variant by hand. It could also support research on completing partially observed scenes and imagining multiple plausible situations beyond an agent's line of sight.

The broader lesson is that useful generative systems do not always need to choose between structure and realism. By generating an editable world first and pixels second, ScenarioControl offers a route toward simulations that are both easier for people to specify and more useful to downstream autonomy tools.

## Acknowledgments

The work on ScenarioControl was conducted by Lili Gao<sup>1*</sup>, Yanbo Xu<sup>2*</sup>, William Koch<sup>2*</sup>, Samuele Ruffino<sup>1</sup>, Luke Rowe<sup>3</sup>, Behdad Chalaki<sup>1</sup>, Dmitriy Rivkin<sup>1</sup>, Julian Ost<sup>1,2</sup>, Roger Girgis<sup>1,3</sup>, Mario Bijelic<sup>1,2</sup>, and Felix Heide<sup>1,2</sup>. <sup>1</sup>Torc Robotics, <sup>2</sup>Princeton University, <sup>3</sup>Mila; <sup>*</sup> denotes equal contribution.

Felix Heide was supported by an NSF CAREER Award (2047359), a Packard Foundation Fellowship, a Sloan Research Fellowship, a Sony Young Faculty Award, a Project X Innovation Award, an Amazon Science Research Award, and a Bosch Research Award. Felix Heide is a co-founder of Algolux (now Torc Robotics), Head of AI at Torc Robotics, and a co-founder of Cephia AI.
