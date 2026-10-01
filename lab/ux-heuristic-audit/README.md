# UX Heuristic Audit (n8n workflow)

An n8n workflow that takes any public web page URL and returns a prioritised UX audit scored against Nielsen's 10 usability heuristics. Point it at a screen, get a ranked design critique back.

I built this as a hands-on companion to my AI-evaluation work: the same idea (a clear rubric, applied consistently, output as a prioritised brief rather than a raw dump), rebuilt as a running automation in n8n.

![Workflow canvas](canvas.png)
<!-- Replace canvas.png with a screenshot of the workflow open in n8n. -->

## What it does

```
When clicked → Fetch page → Build audit request → Score with Claude → Parse + prioritise
```

1. **Fetch page** - pulls the target page's HTML.
2. **Build audit request** - strips scripts/styles, truncates to ~15k chars, and assembles the LLM prompt with the heuristic rubric.
3. **Score with Claude** - sends it to the Anthropic Messages API; the model scores all 10 heuristics (0-3), rates severity (0-4), and gives evidence + one fix each, as strict JSON.
4. **Parse + prioritise** - sorts findings by severity, computes an overall score, and renders a Markdown report (see [sample-report.md](sample-report.md)).

## Run it

1. Import `workflow.json` into n8n (Workflows → Import from File). n8n may offer to update node versions on import; accept.
2. Add your API key. Either paste it into the **Score with Claude** node's `x-api-key` header (replace `YOUR_ANTHROPIC_API_KEY`), or, better, create an n8n **Header Auth** credential and reference it so the key never lives in the workflow JSON.
3. Set the model id in **Build audit request** (`model:`) to one your key can access.
4. Edit the URL in the **Fetch page** node (defaults to `news.ycombinator.com`).
5. Click **Execute Workflow**. Read the `report` field on the final node.

## Customise

- **Swap the rubric.** The prompt lives in the **Build audit request** node. Replace Nielsen's 10 with my 6-dimension agent-output rubric (Value Alignment, Output Completeness, Format Accuracy, Cognitive Load, Trust Calibration, Interaction Efficiency) to audit AI responses instead of pages.
- **Add a screenshot pass.** Swap the HTML fetch for a screenshot API and a vision-capable model for a visual audit.
- **Change the output.** Add a node to post the report to Slack, append to a Google Sheet, or open a GitHub issue per critical finding.
- **Batch it.** Replace the manual trigger with a Google Sheet of URLs and a Loop node to audit many pages in one run.

## Honest limitations

A heuristic review is an expert-inspection method, not usability testing: it surfaces likely problems, it does not prove them. It reads the DOM text, so canvas-rendered or heavily-scripted UIs need the screenshot variant. Treat the output as a prioritised starting point for a human reviewer, which is why critical findings are meant to be flagged for a person, not auto-actioned.

## Next step

Extract this into its own public repo and submit it to the [n8n community templates](https://n8n.io/workflows/) so others can run it. That is the "support in the open" part.
