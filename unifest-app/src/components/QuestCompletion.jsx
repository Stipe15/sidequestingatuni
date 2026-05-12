import { useState } from 'react';
import Camera from './Camera';
import QuestProof from './QuestProof';
import Confetti from './Confetti';

export default function QuestCompletion({ quest, onComplete, onClose }) {
  const [step, setStep] = useState('camera');
  const [capturedImage, setCapturedImage] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCapture = (imageData) => {
    setCapturedImage(imageData);
    setStep('proof');
    setShowConfetti(true);
    onComplete(quest);
  };

  const handleClose = () => {
    setShowConfetti(false);
    onClose();
  };

  return (
    <>
      <Confetti active={showConfetti} />

      {step === 'camera' && (
        <Camera
          onCapture={handleCapture}
          onClose={onClose}
        />
      )}

      {step === 'proof' && capturedImage && (
        <QuestProof
          quest={quest}
          capturedImage={capturedImage}
          onClose={handleClose}
        />
      )}
    </>
  );
}
