# Diagnosing Website Studio Push Failures
> Common blocker for agencies building sites with AI website builders connected to cloud publishing

## The Problem

You run a site build workflow, Claude confirms the push succeeded, but the live site never updates. Or the SA MCP reports a successful publish but the Website Studio dashboard shows the old version. This happens consistently enough that some agencies abandon the tool entirely — which is a mistake, because the root cause is usually a fixable configuration issue.

The most common underlying causes, in order of frequency:

1. **Wrong target directory** — the file structure the tool builds locally doesn't match what the cloud publisher expects. Claude writes to the right path locally but the connector maps to a different path on the SA side.
2. **Broken file structure** — generated HTML references assets (CSS, images, JS) using absolute or wrong relative paths, so the push succeeds but the page renders broken or blank.
3. **Account-level site cap** — you've hit the plan's auto-generated site limit. New pushes silently fail rather than raising an error you'd notice.
4. **MCP output ≠ direct-Claude output** — prompts that produce clean HTML in a direct Claude session produce inconsistent HTML through the SA MCP connector. This is a platform-side rendering difference, not a prompt problem.

## Recommended Approach

### Step 1: Confirm the file structure before pushing

Before running any push command, verify that the locally generated HTML uses relative asset paths:

```bash
# Check for absolute paths that will break on the CDN
grep -rn 'href="/' . --include="*.html"
grep -rn 'src="/' . --include="*.html"
```

Any `href="/"` or `src="/static/..."` path will 404 after deployment. Fix with:

```bash
# Replace absolute paths with relative ones
sed -i 's|href="/|href="./|g' index.html
sed -i 's|src="/|src="./|g' index.html
```

### Step 2: Validate the target directory mapping

In your SA MCP config, confirm the `site_root` or equivalent parameter matches the directory containing your `index.html`:

```yaml
# Correct: points to the folder with index.html
site_root: ./output/my-client-site/

# Wrong: points to a parent folder — connector may push the wrong level
site_root: ./output/
```

### Step 3: Check your account's site count

If you are on a plan with an auto-generated site limit, new pushes silently succeed (no error) but no site is created. Check the SA dashboard for your current site count against your plan limit. If you are at the cap:
- Delete or archive unused test sites before creating new ones
- Or escalate to support to request a temporary increase (see gap note in Alternatives)

### Step 4: Run a push with verbose logging

```bash
# Add verbose output to see exactly what the SA MCP connector is doing
# Replace with your actual push command + verbose flag
run-seo website-studio publish --site ./output/my-site --verbose 2>&1 | tee /tmp/ws-push.log
```

Review `/tmp/ws-push.log` for the actual path being targeted and the response from the SA backend.

### Step 5: Confirm site is live after push

Don't rely on the success message. Check:
1. Open the published URL in an incognito tab
2. Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
3. Check SA dashboard for updated timestamp

## Alternatives

**If push failures persist despite correct file structure:** Build HTML locally via Claude Code and deploy to your own hosting (Netlify, Railway, Vercel) instead of using the SA publisher. This bypasses the connector entirely. Netlify deploys directly from a GitHub push and is free for static sites. Once SA launches HTML ingestion (in progress as of April 2026), you'll be able to upload locally-built sites to the SA backend directly.

**If you're hitting account site limits regularly:** Consolidate satellite sites under the CloudStacks feature rather than creating individual auto-generated sites. CloudStacks has a higher slot count and is designed for satellite networks.

**If MCP output is inconsistent vs. direct Claude output:** Run your build prompt in a direct Claude session (not through the MCP), then use the SA MCP only for the publish step — not the generation step. This gives you Claude's full context window for generation while still using SA's publisher.

## Related Resources

- [Choosing Between Website Studio and Claude Code for HTML](./choosing-website-studio-vs-claude-code.md)
- [Getting Consistent Design Output from AI Website Builders](./getting-consistent-design-output.md)
- SA Website Studio documentation (in-platform help)
