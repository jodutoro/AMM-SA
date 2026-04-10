---
name: AI Video Hyperrealism Spec
description: Hyperrealism techniques for AI video — camera vocabulary, lighting temps, character consistency, failure mode fixes
type: reference
---

# AI Video Hyperrealism Spec

> **⚠️ Partially reconstructed** — specific prompt formulas and production examples need to be re-added by Jonathan.

## What Makes AI Video Look Hyperreal

Hyperrealism in AI video requires removing all signals of AI generation. The goal is footage indistinguishable from cinema or high-end commercial production.

## The Hyperrealism Stack

### 1. Lighting Precision
- Specify color temperature numerically: "3200K tungsten key light, 5600K daylight fill, 1:3 ratio"
- Add practical lights: "neon sign rim light, monitor glow, candle flicker"
- Specify shadow quality: "hard shadows, single source" or "soft wrap light, overcast"
- Avoid generic terms like "dramatic lighting" — be specific about source + direction + temp

### 2. Lens Simulation
- Reference real lenses: "Zeiss Master Prime 50mm T1.5", "anamorphic 35mm, 1.33x squeeze"
- Specify aperture behavior: "shallow depth of field, background bokeh, subject sharp"
- Add lens artifacts purposefully: "subtle chromatic aberration on edges", "minimal lens flare from practical"
- Film grain: "16mm film grain, slightly underexposed"

### 3. Camera Physics
- Handheld signals realism: "slight handheld, natural breathing movement"
- Micro-movements: "subtle camera shake, not stabilized"
- Realistic dolly: "slow push in, imperceptible movement"
- Avoid: perfectly static, perfectly smooth — these signal digital

### 4. Character Grounding
- Spatial: characters must interact with environment (shadows fall on them, lights reflect on skin)
- Micro-expressions: "natural eye movement, slight eyebrow micro-expression"
- Clothing physics: "fabric responds naturally to movement"
- Avoid: characters floating, disconnected from environment

### 5. Environment Depth
- Atmospheric haze/depth: "volumetric light, dust particles in air"
- Reflections and secondary lights
- Foreground elements: "slightly out-of-focus foreground elements for depth"
- Real-world imperfection: "worn textures, ambient occlusion in corners"

## Hyperrealism Prompt Template
```
[Character description with skin texture/age/ethnicity], [specific action with micro-detail],
[location with material specifics], [lighting: source + temp + direction + ratio],
[camera: specific lens focal length + aperture], [movement: specific micro-movement],
[film look: grain + grade], [atmospheric: particles/haze/reflections]
--no CGI look, no smooth skin, no perfect lighting, no animation artifacts
```

## Failure Mode Remediation
| Failure | Fix |
|---------|-----|
| Plastic-looking skin | Add: "pores visible, skin texture, natural imperfections, subsurface scattering" |
| Floating/disconnected characters | Add: "contact shadows, light wrapping around subject, environment reflections on skin" |
| Too smooth/clean movement | Add: "natural weight, slight hesitation, micro-expressions, human imperfection" |
| CGI environment | Add: "photogrammetry texture, real-world wear, aged materials, ambient occlusion" |
| Wrong scale/proportion | Add: reference scale objects, be specific about object sizes in scene |
| Temporal flicker | Reduce: motion complexity, simplify background, reduce parallax |

## Character Consistency Protocol
1. Generate character "bible" — 5-10 reference images from same session
2. Lock these attributes across all shots: face structure, skin tone, eye color, hair, clothing
3. Keep same lighting setup per scene — don't mix warm/cool sources within a scene
4. Use video-to-video for variations, not regeneration from scratch
5. Batch all shots of one character together in one generation session
