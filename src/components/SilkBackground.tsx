import React, { useEffect, useRef } from 'react';

interface SilkBackgroundProps {
  isLight: boolean;
  speed?: number;
  scale?: number;
  noiseIntensity?: number;
  rotation?: number;
}

const SilkBackground: React.FC<SilkBackgroundProps> = React.memo(({
  isLight,
  speed = 1.0,
  scale = 1.5,
  noiseIntensity = 0.5,
  rotation = 0.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const stateRef = useRef({ isLight, program: null as WebGLProgram | null, gl: null as WebGLRenderingContext | null, uBgColorLoc: null as WebGLUniformLocation | null, uPrimaryColorLoc: null as WebGLUniformLocation | null, uSecondaryColorLoc: null as WebGLUniformLocation | null, uAlphaLoc: null as WebGLUniformLocation | null });

  // Update theme reference instantly
  stateRef.current.isLight = isLight;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn("WebGL not supported, falling back to static background.");
      return;
    }
    stateRef.current.gl = gl;

    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uSpeed;
      uniform float uScale;
      uniform float uRotation;
      uniform float uNoiseIntensity;

      uniform vec3 uBgColor;
      uniform vec3 uPrimaryColor;
      uniform vec3 uSecondaryColor;
      uniform float uAlpha;

      const float e = 2.718281828459045;

      float noise(vec2 texCoord) {
        float G = e;
        vec2 r = (G * sin(G * texCoord));
        return fract(r.x * r.y * (1.0 + texCoord.x));
      }

      vec2 rotateUvs(vec2 uv, float angle) {
        float c = cos(angle);
        float s = sin(angle);
        mat2 rot = mat2(c, -s, s, c);
        return rot * uv;
      }

      void main() {
        float rnd = noise(gl_FragCoord.xy);
        vec2 uv = rotateUvs((vUv - 0.5) * uScale, uRotation) + 0.5;
        vec2 tex = uv * uScale;
        float tOffset = uSpeed * uTime;
        
        tex.y += 0.06 * sin(3.0 * tex.x - tOffset * 0.8);
        tex.x += 0.04 * cos(2.0 * tex.y + tOffset * 0.5);

        float pattern = 0.5 + 0.5 * sin(2.5 * (tex.x + tex.y + 
                          cos(1.5 * tex.x + 2.5 * tex.y) + 0.1 * tOffset) + 
                          sin(10.0 * (tex.x - tex.y - 0.05 * tOffset)));
        
        float pattern2 = 0.5 + 0.5 * cos(4.0 * (tex.y - tex.x * 0.5 + 0.08 * tOffset));
        
        vec3 waveColor = mix(uPrimaryColor, uSecondaryColor, pattern);
        waveColor = mix(waveColor, vec3(0.5, 0.4, 0.6), pattern2 * 0.15);
        
        float distFromCenter = length(vUv - 0.5);
        float vignette = smoothstep(0.8, 0.2, distFromCenter);
        
        vec3 finalColor = mix(uBgColor, waveColor, pattern * uAlpha * vignette);
        
        finalColor += (rnd - 0.5) * 0.012 * uNoiseIntensity;
        finalColor = clamp(finalColor, 0.0, 1.0);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error: ", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error: ", gl.getProgramInfoLog(program));
      return;
    }
    stateRef.current.program = program;

    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const uSpeedLoc = gl.getUniformLocation(program, 'uSpeed');
    const uScaleLoc = gl.getUniformLocation(program, 'uScale');
    const uRotationLoc = gl.getUniformLocation(program, 'uRotation');
    const uNoiseIntensityLoc = gl.getUniformLocation(program, 'uNoiseIntensity');

    stateRef.current.uBgColorLoc = gl.getUniformLocation(program, 'uBgColor');
    stateRef.current.uPrimaryColorLoc = gl.getUniformLocation(program, 'uPrimaryColor');
    stateRef.current.uSecondaryColorLoc = gl.getUniformLocation(program, 'uSecondaryColor');
    stateRef.current.uAlphaLoc = gl.getUniformLocation(program, 'uAlpha');

    gl.uniform1f(uSpeedLoc, speed);
    gl.uniform1f(uScaleLoc, scale);
    gl.uniform1f(uRotationLoc, rotation);
    gl.uniform1f(uNoiseIntensityLoc, noiseIntensity);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let startTime = performance.now();
    let isAnimated = !prefersReducedMotion;

    const render = (now: number) => {
      // Dynamic colors based on theme
      // Dark mode values: bg=#030712, primary=#3B82F6, secondary=#8B5CF6, alpha=0.15
      // Light mode values: bg=#f3f4f6, primary=#2563EB, secondary=#7C3AED, alpha=0.04
      const curLight = stateRef.current.isLight;
      
      if (curLight) {
        gl.uniform3f(stateRef.current.uBgColorLoc, 0.9529, 0.9568, 0.9647);      // #f3f4f6
        gl.uniform3f(stateRef.current.uPrimaryColorLoc, 0.145, 0.388, 0.922);     // #2563EB
        gl.uniform3f(stateRef.current.uSecondaryColorLoc, 0.486, 0.227, 0.929);   // #7C3AED
        gl.uniform1f(stateRef.current.uAlphaLoc, 0.045);
      } else {
        gl.uniform3f(stateRef.current.uBgColorLoc, 0.0117, 0.0274, 0.0706);      // #030712
        gl.uniform3f(stateRef.current.uPrimaryColorLoc, 0.2314, 0.5098, 0.9647);  // #3B82F6
        gl.uniform3f(stateRef.current.uSecondaryColorLoc, 0.5451, 0.3608, 0.9647); // #8B5CF6
        gl.uniform1f(stateRef.current.uAlphaLoc, 0.16);
      }

      if (!isAnimated) {
        gl.uniform1f(uTimeLoc, 0.0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        return;
      }

      const elapsed = (now - startTime) / 1000.0;
      gl.uniform1f(uTimeLoc, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionListener = (e: MediaQueryListEvent) => {
      isAnimated = !e.matches;
      if (!isAnimated && requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        gl.uniform1f(uTimeLoc, 0.0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } else {
        startTime = performance.now();
        requestRef.current = requestAnimationFrame(render);
      }
    };
    
    mediaQuery.addEventListener('change', motionListener);

    return () => {
      window.removeEventListener('resize', resize);
      mediaQuery.removeEventListener('change', motionListener);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, [speed, scale, noiseIntensity, rotation]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-lightBg dark:bg-darkBg transition-colors duration-300 pointer-events-none"
      style={{ backfaceVisibility: 'hidden', transform: 'translate3d(0,0,0)' }}
    />
  );
});

SilkBackground.displayName = 'SilkBackground';

export default SilkBackground;
