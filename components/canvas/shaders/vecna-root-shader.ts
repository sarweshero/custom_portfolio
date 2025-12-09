// Vecna Root System GLSL Shaders
// Inspired by Stranger Things Season 4 Vecna aesthetics

export const vecnaRootVertexShader = `
  uniform float uTime;
  uniform float uScrollFactor;
  uniform float uHoverIntensity;
  uniform float uRootGrowth;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDisplacement;
  
  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vUv = uv;
    vNormal = normal;
    
    // Animated crawling distortion
    float crawl = snoise(vec3(position.x * 2.0, position.y * 2.0, uTime * 0.3)) * 0.15;
    crawl += snoise(vec3(position.x * 4.0, position.y * 4.0, uTime * 0.5)) * 0.08;
    
    // Root-thickness modulation with time
    float thickness = 1.0 + sin(uTime * 2.0 + position.y * 3.0) * 0.1 * uHoverIntensity;
    
    // Growth animation
    float growth = smoothstep(0.0, 1.0, uRootGrowth - (1.0 - uv.y));
    
    vec3 newPosition = position;
    newPosition.x += crawl * growth * thickness;
    newPosition.z += crawl * 0.5 * growth;
    
    vDisplacement = crawl;
    vPosition = newPosition;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

export const vecnaRootFragmentShader = `
  uniform float uTime;
  uniform float uScrollFactor;
  uniform float uHoverIntensity;
  uniform float uGlowStrength;
  uniform float uRootGrowth;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDisplacement;
  
  // FBM noise for organic patterns
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  float fbm(vec2 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); p *= 2.02;
    f += 0.2500 * noise(p); p *= 2.03;
    f += 0.1250 * noise(p); p *= 2.01;
    f += 0.0625 * noise(p);
    return f / 0.9375;
  }
  
  // Worley noise for vein patterns
  float worley(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    float minDist = 1.0;
    for (int x = -1; x <= 1; x++) {
      for (int y = -1; y <= 1; y++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = vec2(hash(i + neighbor), hash(i + neighbor + vec2(7.0, 3.0)));
        point = 0.5 + 0.5 * sin(uTime * 0.5 + 6.28 * point);
        vec2 diff = neighbor + point - f;
        float dist = length(diff);
        minDist = min(minDist, dist);
      }
    }
    return minDist;
  }
  
  void main() {
    // Base bark-like dark texture
    float bark = fbm(vUv * 15.0 + vDisplacement * 2.0);
    vec3 barkColor = mix(vec3(0.05, 0.02, 0.03), vec3(0.15, 0.05, 0.08), bark);
    
    // Glowing vein pattern using Worley noise
    float veinPattern = worley(vUv * 8.0);
    veinPattern = 1.0 - smoothstep(0.0, 0.15, veinPattern);
    
    // Red vein pulse using sin(time * intensity)
    float pulse = sin(uTime * 2.0 + vUv.y * 10.0) * 0.5 + 0.5;
    pulse = mix(0.5, 1.0, pulse * uHoverIntensity);
    
    // Vein glow color - crimson red
    vec3 veinColor = vec3(0.9, 0.1, 0.05) * pulse * uGlowStrength;
    
    // Secondary blue-ish vein accents
    float secondaryVein = worley(vUv * 12.0 + vec2(uTime * 0.1));
    secondaryVein = 1.0 - smoothstep(0.0, 0.1, secondaryVein);
    vec3 secondaryColor = vec3(0.2, 0.1, 0.3) * secondaryVein * 0.3;
    
    // Combine bark with glowing veins
    vec3 finalColor = barkColor;
    finalColor = mix(finalColor, veinColor, veinPattern * 0.8);
    finalColor += secondaryColor;
    
    // Add emission glow
    float emission = veinPattern * pulse * uGlowStrength;
    finalColor += vec3(0.8, 0.1, 0.1) * emission * 0.5;
    
    // Alpha mask for organic vine edges
    float edgeMask = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
    edgeMask *= smoothstep(0.0, 0.05, vUv.y) * smoothstep(1.0, 0.95, vUv.y);
    
    // Growth mask
    float growthMask = smoothstep(0.0, 0.1, uRootGrowth - (1.0 - vUv.y));
    
    float alpha = edgeMask * growthMask * (0.7 + veinPattern * 0.3);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`

export const vecnaCoreVertexShader = `
  uniform float uTime;
  uniform float uPulse;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    // Heartbeat distortion
    float heartbeat = sin(uTime * 1.5) * 0.5 + 0.5;
    heartbeat = pow(heartbeat, 3.0);
    
    vec3 newPosition = position;
    newPosition *= 1.0 + heartbeat * 0.08 * uPulse;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

export const vecnaCoreFragmentShader = `
  uniform float uTime;
  uniform float uPulse;
  uniform float uDistortion;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  
  void main() {
    vec2 uv = vUv - 0.5;
    float dist = length(uv);
    
    // Heartbeat animation
    float heartbeat = sin(uTime * 1.5) * 0.5 + 0.5;
    heartbeat = pow(heartbeat, 3.0);
    
    // Noise-driven distortion ripples
    float distortion = noise(uv * 5.0 + uTime * 0.3) * uDistortion;
    dist += distortion * 0.1;
    
    // Core glow - deep red center
    float core = 1.0 - smoothstep(0.0, 0.3, dist);
    vec3 coreColor = vec3(0.6, 0.05, 0.05) * core;
    
    // Pulsating vein rings
    float rings = sin(dist * 20.0 - uTime * 3.0) * 0.5 + 0.5;
    rings *= smoothstep(0.5, 0.1, dist);
    vec3 ringColor = vec3(0.9, 0.1, 0.05) * rings * heartbeat * uPulse;
    
    // Energy flicker
    float flicker = noise(vec2(uTime * 10.0, 0.0)) * 0.3 + 0.7;
    
    // Outer glow fade
    float outerGlow = 1.0 - smoothstep(0.1, 0.5, dist);
    vec3 glowColor = vec3(0.4, 0.02, 0.02) * outerGlow;
    
    vec3 finalColor = coreColor + ringColor * flicker + glowColor;
    
    // Alpha based on distance from center
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    alpha = max(alpha, outerGlow * 0.3);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`
