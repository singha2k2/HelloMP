import React, { useEffect } from 'react';
import Quagga from 'quagga';

const Scanner = (props) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 299,
            facingMode: 'environment',
            radius: 0.5,
          },
        },
        locator: {
          halfSample: true,
          patchSize: 'large',
          debug: {
            showCanvas: true,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: true,
              showTransformedBox: true,
              showBB: true,
            },
          },
        },
        numOfWorkers: 4,
        decoder: {
          readers: ['code_128_reader'],
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true,
          },
        },
        locate: true,
      },
      function (err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(_onDetected);
    return () => {
      Quagga.offDetected(_onDetected);
    };
  }, []);

  const _onDetected = (result) => {
    props.onDetected(result);
  };

  return <div id="interactive" className="viewport" />;
};

export default Scanner;
