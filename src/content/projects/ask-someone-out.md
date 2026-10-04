---
title: How to safely ask someone out
shortTitle: Safely asking someone out
summary: A playful introduction to secure multi-party computation — find out whether you like each other without revealing your own answer.
meta: Cryptography explainer · 2023
badge: "2023"
section: earlier
article: true
order: 3
deck: What if you could find out whether someone likes you back, without ever revealing that you like them?
aside:
  text: Two people can compute whether they are both interested using a few slips of paper and Beaver triples, so a "no" never reveals how the other person felt.
hero:
  type: image
  src: /assets/projects/ask-someone-out.webp
  alt: A red heart painted on a yellow wall
  width: 1600
  height: 1067
media:
  type: image
  src: /assets/projects/ask-someone-out.webp
  alt: A red heart painted on a yellow wall
  width: 1600
  height: 1067
---

If you're reading this, you're probably planning on asking that special someone out on a date, or want to figure out if a good friend might be more than a good friend. Also, you're most likely afraid of asking them out, or you would have done so already.

If you could just know whether the other person liked you as well, it would be so much easier! If they like you, well, great 🙂. If they don't like you, then you don't need to ask them out in the first place, saving yourself from potential gossip and embarrassment.

But don't worry: mathematicians, maybe due to their lack of social skills and confidence, have invented a way to ask people out without embarrassing themselves!

There is a method for both of you to determine whether you like each other without needing to reveal your individual preferences. That is, the other person only learns that you like them if they also like you; if they don't like you, they never find out whether you like them or not. Sorry, that's a bit of a mouthful.

How can we translate this mathematically? Let $p^a$ and $p^b$ be the intentions of you (Alice) and the other person (Bob), respectively. If a person $i$ is interested in moving towards a romantic (casual, …) relationship, they set $p^i = 1$, or $p^i=0$ otherwise. You end up going out together if $p^a=p^b=1$, and you don't otherwise. This function can be expressed either as $p^a\land p^b$ (logical AND) or as $p^a\cdot p^b$.

Obviously, this can be easily computed if you both reveal your preferences, but then you might as well just ask the person out normally. Alternatively, you could ask a friend to help you: both of you tell your friend whether you are interested in the other person, and your friend then just tells you the result. But then both of you would need to trust this friend not to tell anyone about your individual preferences or use that information for personal gain. Note that if you write a piece of software to return the answer, and you both just enter your value into the software, it's the same problem: both of you need to trust the software with your personal preferences.

There are two ways this can be solved, but we'll only cover the simple method here. The other is more secure, but it is more advanced and requires far too many computations: you'll lose the person 20% of the way through because they'll get bored, unless they really love math. If you're interested, check out *multi-party computation for Boolean circuits*. You'll also need to read up on *oblivious transfer*.

The simpler method can be done with just a few slips of paper, and it is easy enough to understand for someone who didn't study mathematics. Unfortunately, it still requires your friend, but unlike before, they'll never learn either of your individual preferences in the process: the friend just gives you some numbers, and you don't reveal anything to your friend.

## The protocol

**Step 1 (friend): prepare a Beaver triple.** Your friend prepares six numbers $a_1, a_2, b_1, b_2, c_1, c_2$ such that the following holds:

$$
\begin{aligned}
c &= a\cdot b \\
c_1 + c_2 &= (a_1+a_2)\cdot (b_1+b_2)
\end{aligned}
$$

Suggestion: randomly choose some $a, b$, and pick random numbers $a_1, b_1, c_1$ such that $a_2=a - a_1$, $b_2=b-b_1$ and $c_2=ab-c_1$.

Give $a_1, b_1, c_1$ to Alice, and $a_2, b_2, c_2$ to Bob. For future notation: variables subscripted with 1 are for Alice, those with 2 are for Bob.

**Step 1 (Alice): split your preference.** Your preference $p^a$ is itself sensitive and cannot be shared with Bob. We therefore split it randomly, in a way that the pieces individually reveal no information about your preference. Simply pick some random number $r$, and set $p^a_1 = r$ and $p^a_2 = p^a - r$. Note how $p^a = p^a_1 + p^a_2$. Keep $p^a_1$ and share $p^a_2$ with Bob.

**Step 1 (Bob): split your preference.** You do the exact same step as Alice, but with different numbers of course. Keep $p^b_2$ and share $p^b_1$ with Alice.

**Step 2 (Alice).** Alice just received $p^b_1$ from Bob, and $a_1, b_1$ from the friend. She computes

$$
\epsilon_1 = p^a_1 - a_1, \quad \delta_1 = p^b_1 - b_1
$$

**Step 2 (Bob).** Bob just received $p^a_2$ from Alice, and $a_2, b_2$ from the friend. He computes

$$
\epsilon_2 = p^a_2 - a_2, \quad \delta_2 = p^b_2 - b_2
$$

**Step 3: reveal $\epsilon$ and $\delta$.** Alice reveals $\epsilon_1, \delta_1$, and Bob reveals $\epsilon_2, \delta_2$. These values reveal nothing about the preferences, $a$ or $b$. Both of you compute

$$
\epsilon = \epsilon_1 + \epsilon_2, \quad \delta=\delta_1 + \delta_2
$$

**Step 4 (Alice).** Compute $z_1 = c_1 + \epsilon \cdot b_1 + \delta \cdot a_1 + \epsilon \cdot \delta$.

**Step 4 (Bob).** Compute $z_2 = c_2 + \epsilon \cdot b_2 + \delta \cdot a_2$.

**Step 5: get the result.** Both of you reveal your share $z_1$ or $z_2$; the result of the function is $z = z_1 + z_2$. If you did everything correctly, you should have $z=1$ if and only if you both set your preferences to 1, and $z = 0$ otherwise.

You can verify that these steps make sense by replacing the variables with their definitions; after simplifying, you should find $z=p^a\cdot p^b$.

> **Warning:** Please do not use these steps in a production setting, or in any other scenario where confidentiality is business-critical.

## A variation for polygamous relationships

Assume you wanted to know how many people in a given group were interested in starting a polygamous relationship. (An alternative would be to check whether **everyone** was interested, revealing no information if a single person is not, but we skip that scenario here.) This boils down to computing the sum of preferences, assuming the same preference values as before: 1 if interested and 0 if not.

This is, in fact, easier than the previous setting. Say we have four people $a, b, c, d$ with preferences $p^i$, $i\in\{a,b,c,d\}$. Everyone creates random numbers $p^i_1, p^i_2, p^i_3, p^i_4$ such that $p^i=p^i_1+p^i_2+p^i_3+p^i_4$, and shares the 1s with $a$, the 2s with $b$, …, and the 4s with $d$. In the end, the $j$-th person holds the values $p^a_j, p^b_j, p^c_j, p^d_j$, from which they compute the temporary value $z_j = p^a_j + p^b_j + p^c_j + p^d_j$. Everyone reveals their $z_j$, which lets them compute the result $z = z_1 + z_2 + z_3 + z_4$. Substituting the variables shows that this is indeed the sum of all preferences.

> **Warning:** It is very easy for a person to choose a preference that is not 0 or 1, allowing them to skew the result (by choosing negative values, or values greater than 1).

You might ask why we didn't use this method for the monogamous setting. Whatever the final result, both people would instantly know the other person's preference (the other person's preference is the result minus your own). With more people there are more unknowns, so these deductions can no longer be made deterministically.
