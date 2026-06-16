import { useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from 'tsparticles-slim';
import './ParticleBackground.css';

export const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await loadSlim(engine as any);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      background: {
        color: { value: 'transparent' },
      },
      particles: {
        number: {
          value: 60,
          density: { enable: true, area: 1000 },
        },
        color: { value: '#00E5A0' },
        links: {
          enable: true,
          color: '#00E5A0',
          distance: 160,
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none' as const,
          outModes: { default: 'bounce' as const },
        },
        opacity: {
          value: { min: 0.15, max: 0.4 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
          },
        },
        size: {
          value: { min: 1, max: 2.5 },
        },
        shape: {
          type: 'circle',
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab',
          },
        },
        modes: {
          grab: {
            distance: 180,
            links: {
              opacity: 0.35,
              color: '#00E5A0',
            },
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <div className="particles-container">
      <Particles id="hero-particles" options={options} />
    </div>
  );
};
