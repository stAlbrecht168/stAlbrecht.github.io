# n8n Portfolio Alignment

Mapping of portfolio content to n8n's culture and builder-mindset criteria, for the `portfolio/n8n` branch variant.

Internal reference document, not published. Mirrors `google-portfolio-alignment.md`.

---

## Positioning shift (Google variant -> n8n variant)

The `portfolio/google-strategic-lead` branch leads with strategy, scale, and governance ("Strategic UX & Product Design Lead", "operating models", "quality gates", "design at scale"). That is the right register for a strategic-lead filter and should stay on that branch.

n8n rewards the opposite register: builder, hands-on, bias for shipping, AI-first automation, community. This branch re-leads with the hands-on builder and lets the seniority (six teams, 17 years, operating model) land as proof that he ships at scale, rather than as the headline. No strategic depth is deleted; it is re-voiced and re-ordered.

Guiding rule: builder-voiced seniority, not junior cosplay.

---

## n8n value -> portfolio evidence -> gap

### WE ARE BUILDERS (prototypes, bias for shipping, technical empathy)

- **Evidence now:** hero re-led on "I design and build AI experiences with my own hands"; new **Lab / How I build** section links the public source and names the hand-coded, no-framework, no-build-step site; Joule case = a framework he built; CALM case = a synthesis workflow he built.
- **Gap:** the single strongest proof (a working n8n workflow) does not yet exist. See TODO in the Lab section markup. This is close to table stakes given n8n nudges applicants to build a workflow before applying.

### WE ARE WELCOMING (humility, care, community, support in the open)

- **Evidence now:** the Joule reflection ("the most useful thing I did was not build a better rubric, it was identify the rubric was not the missing piece"); the site source is public on GitHub and GitLab.
- **Gap:** largest honest gap. Every substantive collaboration signal is internal to SAP (chapter Skills Registry, mentoring). No OSS artifact or public community presence. Close by shipping one genuinely open thing (an OSS Claude skill, or the n8n workflow) and linking it. Do not dress up internal chapter work as community work.

### WE DO THE RIGHT THING EVEN WHEN IT'S HARD (integrity under cost)

- **Evidence now:** trust-first patterns make automation "visible, reversible, and appropriately supervised"; the trust-signalling cut (pushing back on a well-intentioned but counterproductive instinct); the "confidential product details removed" disclaimers; BAUR's honest-but-expensive roadmap answer.
- **Gap:** present but not named as an ethics stance. Optional: frame one decision explicitly as "the harder, right call." Also keep claims honest: the eval work is called a "framework", not a "harness", because the case body supports "used in reviews", not "software run over a batch".

### WE ARE EARLY (posture, saw it coming, comfortable with change)

- **Evidence now:** Zeiss SmartZoom "an early exploration of automation UX challenges that inform current AI work"; "by 2023, AI assistants were appearing faster than teams could develop a coherent UX position"; 17+ years across shifting domains.
- **Gap:** the through-line is scattered. Optionally make it explicit in About: automation UX (Zeiss) -> agent-quality evaluation before the field had criteria -> personal AI tooling now.

### WE ARE MULTIPLIERS (ecosystem, everyone has a stake)

- **Evidence now:** Leadership re-voiced to "turn what I build into how teams ship"; Skills Registry as reusable chapter assets; the CALM leverage insight (a PM can make a low-stakes call without escalating); six teams led + four designers mentored kept as **distinct** hero stat tiles.
- **Gap:** multiplier behaviour is bounded inside SAP. Close with one externally usable artifact (OSS skill, shared n8n workflow).

---

## Changes applied on this branch

- Hero: title, meta, role line, descriptor, both bios, primary CTA ("See what I've built").
- Hero stats re-ordered maker-first (Fiori apps + eval framework lead); both leadership tiles kept distinct.
- Featured Work: eyebrow + heading + body re-voiced; cards re-ordered so the Joule AI case is first; CALM and Joule cards re-voiced to lead with building/shipping; tags updated ("AI & Automation", "Built for scale").
- Leadership + AI section headings and bodies re-voiced; AI section + nav relabelled "AI & Automation".
- New **Lab / How I build** section (id `#lab`) with a GitHub source link and a TODO slot for the n8n workflow.
- Source link added to nav and footer.
- About paragraphs and availability line re-voiced; "remote-friendly across Europe" added.
- Three identical "reconstructed" captions varied.
- Case studies: Joule retitled "Building an AI-output evaluation framework for SAP Joule" and set as entry point; CALM "governance, not craft" box reframed to "build the plumbing" (leverage insight preserved); prev/next nav re-sequenced Joule -> CALM -> BAUR.

---

## Honest gaps still open (do before sending the link)

| Gap | Action | Owner |
|-----|--------|-------|
| No n8n workflow | Build one (e.g. a flow running the 6-dimension agent-eval scoring over a batch), publish it, link it in the Lab section (TODO marker is in place) | Stephan |
| No public/OSS artifact beyond the site | Open-source one Claude skill or the n8n workflow, with a short write-up | Stephan |
| CV register mismatch | The CV is a real, enabled PDF (NOT a placeholder; commit 84dc5c4 enabled it). But it is strategy-voiced. Produce a builder-voiced CV variant for this branch, or re-voice its summary line | Stephan |
| Repo visibility assumption | The Lab/footer/nav links point to `github.com/stAlbrecht168/stAlbrecht.github.io`. Confirm that repo is public before sending; if private, make it public or point the link at the GitLab mirror | Stephan |

Note: the Google alignment doc's gap table still lists "CV PDF not yet attached". That line is stale: the CV exists and is enabled. Do not carry it over.

---

## Deployment note

Keep this on a separate branch (`portfolio/n8n`), mirroring the existing per-application tuning pattern. Do not merge into the Google variant or `master`. One deployed URL should not try to serve both audiences.
