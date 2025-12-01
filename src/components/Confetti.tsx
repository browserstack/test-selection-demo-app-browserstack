import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const confettiColors = [
  '#34d399', '#60a5fa', '#fbbf24', '#f87171', '#a78bfa', '#f472b6', '#38bdf8', '#facc15', '#4ade80', '#f43f5e'
];

const Confetti: React.FC<{ show: boolean }> = ({ show }) => {
  const [confetti, setConfetti] = useState<Array<{x:number,y:number,rotate:number,scale:number,yEnd:number,rotateEnd:number}>>([]);

  useEffect(() => {
    if (show) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setConfetti(
        Array.from({ length: 30 }).map(() => ({
          x: Math.random() * width - width / 2,
          y: -100,
          rotate: Math.random() * 360,
          scale: 0.7 + Math.random() * 0.6,
          yEnd: height / 2 + Math.random() * height / 2,
          rotateEnd: Math.random() * 360,
        }))
      );
    } else {
      setConfetti([]);
    }
  }, [show]);

  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      {confetti.map((c, i) => (
        <motion.div
          key={i}
          initial={{ x: c.x, y: c.y, rotate: c.rotate, scale: c.scale }}
          animate={{ y: c.yEnd, rotate: c.rotateEnd }}
          transition={{ duration: 1.2 + Math.random(), ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '10%',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: confettiColors[i % confettiColors.length],
            zIndex: 100,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
