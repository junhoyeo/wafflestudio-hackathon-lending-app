import ConfettiGenerator from 'confetti-js';
import { useEffect } from 'react';

type ConfettiBackgroundProps = {
  enabled: boolean;
};

export const ConfettiBackground: React.FC<ConfettiBackgroundProps> = ({
  enabled,
}) => {
  useEffect(() => {
    const confettiSettings = {
      target: 'confetti',
      max: 30,
      size: 3,
      animate: true,
      props: ['square'],
      colors: [
        [255, 201, 0],
        [230, 61, 135],
        [0, 199, 228],
        [253, 214, 126],
      ],
      clock: 40,
      rotate: false,
      width: 1400,
    };

    const confettiCanvas = document.getElementById('confetti');
    if (!confettiCanvas) {
      return;
    }

    confettiCanvas.style.opacity = '0.1';
    const confetti = new ConfettiGenerator(confettiSettings);

    let confettiIntervalID: NodeJS.Timeout;
    if (enabled) {
      confetti.render();

      let confettiOpacity = 0.1;
      confettiIntervalID = setInterval(function () {
        confettiCanvas.style.opacity = confettiOpacity.toString();

        if (confettiOpacity >= 0.5) {
          clearInterval(confettiIntervalID);
        }
        confettiOpacity += 0.07;
      }, 100);
    } else {
      confetti.clear();
    }

    return () => {
      if (confettiIntervalID) {
        clearInterval(confettiIntervalID);
      }
      confetti.clear();
    };
  }, [enabled]);

  return (
    <canvas
      id="confetti"
      className="absolute top-0 bottom-0 left-0 right-0 w-full h-full -z-10"
    />
  );
};
