---
name: Visual Creation Spec
description: AI image & video system — 7-layer prompt structure, tool stack (Higgsfield/Kling/ElevenLabs/CapCut), aesthetic-to-prompt translation, web integration rules
type: reference
---

# AI Image & Video Creation System

> **⚠️ Partially reconstructed** — specific aesthetic-to-prompt translation table entries and web integration rules need to be re-added by Jonathan.

## Tool Stack

| Tool | Purpose | Tier |
|------|---------|------|
| **Higgsfield** | AI video generation — cinematic, character consistency | Primary video |
| **Kling** | AI video generation — alternative, motion quality | Secondary video |
| **ElevenLabs** | Voice synthesis + audio | Audio |
| **CapCut** | Video editing + assembly | Post-production |
| **Midjourney / FLUX** | Still image generation | Images |

## 7-Layer Prompt Structure (Images)

1. **Subject** — who/what is in the frame (character description, pose, expression)
2. **Environment** — location, setting, atmosphere, time of day
3. **Lighting** — quality, direction, color temperature, mood
4. **Camera** — lens, angle, distance, depth of field
5. **Style** — aesthetic reference, art direction, era
6. **Technical** — resolution, format, rendering engine notes
7. **Negative** — what to exclude

## Aesthetic-to-Prompt Translation Table
<!-- TODO: restore specific translation entries -->
The original spec included a table mapping Jonathan's named aesthetic modes (from design-spec.md) to specific AI prompt language. E.g., "Brutalist Editorial" → specific prompt keywords, lighting terms, camera instructions. Needs to be restored.

## Web Integration Rules
<!-- TODO: restore web integration rules -->
Rules for how AI-generated images/videos are integrated into web projects. Aspect ratios, compression settings, fallback handling, etc. Need to be restored.

## Character Consistency (Video)
- Establish character reference image first (same seed/style)
- Use consistent lighting conditions across shots
- Lock in camera distance for each character type
- Avoid mixing generation models for the same character

## Prompt Building Pattern
```
[Subject with specific detail], [environment/setting], [lighting: quality + direction + temp],
[camera: lens/angle/distance], [style: aesthetic reference], [technical specs]
--no [negative terms]
```

## Output Formats
- Hero images: 16:9 or 21:9 for web banners
- Portraits: 4:5 or 1:1 for social
- Video: 16:9 at minimum 1080p, 24fps for cinematic
- Always export source + web-optimized versions
