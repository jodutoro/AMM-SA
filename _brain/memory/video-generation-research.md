---
name: Video Generation Research 2026
description: 2026 video gen research — model comparison, 8-layer prompt system, full camera vocabulary, lighting temps, character consistency fixes, failure modes, full production workflow
type: reference
---

# Video Generation Research (2026)

> **⚠️ Partially reconstructed** — specific model benchmark scores, full camera vocabulary list, exact lighting temperature table, and failure mode remediation details need to be re-added by Jonathan.

## Model Comparison (2026)

| Model | Strengths | Weaknesses | Best for |
|-------|-----------|------------|---------|
| **Higgsfield** | Character consistency, cinematic quality, motion control | Slower generation | Hero shots, character-driven |
| **Kling** | Motion quality, fast | Less character consistency | B-roll, abstract motion |
| **Runway Gen-3** | Stylized, artistic | Less photorealistic | Creative/stylized content |
| **Sora** | Long-form, coherent | Limited access | Long sequences |

<!-- TODO: restore specific benchmark scores and detailed model notes -->

## 8-Layer Prompt System (Video)

1. **Character/Subject** — detailed description, clothing, expression, posture
2. **Action/Motion** — what is happening, movement direction and quality
3. **Environment** — location, time of day, weather, atmosphere
4. **Lighting** — key light source, fill, practical lights, color temperature
5. **Camera movement** — static/pan/tilt/dolly/crane/handheld + speed
6. **Lens/Framing** — focal length equivalent, shot size (ECU/CU/MS/WS/EWS)
7. **Style/Aesthetic** — director reference, era, grade look
8. **Technical** — frame rate, duration, aspect ratio

## Camera Vocabulary
<!-- TODO: restore full camera vocabulary list -->
The original contained a comprehensive camera vocabulary list. Key terms:
- **Shot sizes:** ECU (extreme close-up), CU, MCU, MS, MWS, WS, EWS
- **Camera movement:** static, pan, tilt, dolly in/out, truck, pedestal, crane, handheld, steadicam, whip pan
- **Lens language:** shallow DOF (85mm+), deep focus (24mm), anamorphic flare, rack focus

## Lighting Temperature Reference
<!-- TODO: restore full table -->
| Source | Color Temp |
|--------|-----------|
| Candle | 1800K |
| Tungsten/Incandescent | 3200K |
| Golden hour | 3500–4500K |
| Fluorescent | 4000–5000K |
| Daylight/Flash | 5500–6500K |
| Overcast | 6500–7500K |
| Blue sky shade | 9000–12000K |

## Character Consistency Fixes
- **Problem:** Character appearance drifts between shots
- **Fix 1:** Use same seed + style reference image across all shots
- **Fix 2:** Lock clothing, hair, lighting setup in system prompt
- **Fix 3:** Keep shots of same character in same generation session
- **Fix 4:** Use consistent camera distance per character (don't mix ECU and WS of same char)
- **Fix 5:** Avoid regenerating characters — use video-to-video for variations

## Common Failure Modes
<!-- TODO: restore specific failure mode remediation details -->
- **Temporal incoherence** (objects appear/disappear): reduce motion complexity, simplify scene
- **Face distortion on motion**: reduce camera movement speed, use more static framing
- **Wrong lighting continuity**: lock lighting description across shot sequence
- **Anatomy errors on close-ups**: use medium shots, add "anatomically correct" to prompt
- **Text generation**: avoid text in frame entirely — composite in post

## Production Workflow
1. **Pre-production:** mood board → storyboard → shot list with prompt drafts
2. **Character reference:** generate hero images first (Midjourney/FLUX) → use as reference for video
3. **Generation:** batch shots of same character together, same session
4. **Review:** watch for consistency issues, flag failures for regeneration
5. **Post:** CapCut assembly → color grade → ElevenLabs audio → final export

## Integration with Web Projects
- Compress for web: H.264 for broad compatibility, max 10MB for hero videos
- Always provide poster image fallback
- Autoplay: muted only, loop for background/ambient
- Mobile: consider reduced motion preference (`prefers-reduced-motion`)
