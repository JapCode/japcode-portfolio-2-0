import { motion } from 'framer-motion';
import { useState } from 'react';

const InitialLoadScreen = (): JSX.Element => {
  const [firstAnimationComplete, setFirstAnimationComplete] = useState(false);

  const handleFirstAnimationComplete = (): void => {
    setFirstAnimationComplete(true);
  };
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: firstAnimationComplete ? 'none' : 'block',
        }}
      >
        <div
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: '#1A1222',
            borderRadius: '50%',
          }}
        />
      </div>

      <motion.div
        initial={{ height: '0%' }}
        animate={{ height: '50%' }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={handleFirstAnimationComplete}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#1A1222',
          width: '2px',
          display: firstAnimationComplete ? 'none' : 'block',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {firstAnimationComplete && (
          <motion.div
            animate={{ x: '-100%' }}
            style={{
              background: 'white',
              width: '50%',
              height: '100vh',
            }}
            transition={{ ease: 'linear' }}
          />
        )}
        {firstAnimationComplete && (
          <motion.div
            animate={{ x: '100%' }}
            style={{
              background: 'white',
              width: '50%',
              height: '100vh',
            }}
            transition={{ ease: 'linear' }}
            // transition={{ ease: [0.6, 0.01, -0.05, 0.95] }}
          />
        )}
      </div>
    </>
  );
};

export default InitialLoadScreen;
