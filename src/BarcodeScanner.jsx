import { useState } from 'react';
import Quagga from 'quagga';

// eslint-disable-next-line react/prop-types
const Scanner = ({ turnOff }) => {
  const [scannerActive, setScannerActive] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState(null);

  const activateBarcodeScanner = async () => {
    setScannerActive(true);

    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#scanner-container'),
          constraints: {
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: ['ean_reader', 'code_128_reader'], // or other formats you want to scan
        },
      },
      function (err) {
        if (err) {
          console.error(err);
          return;
        }

        Quagga.onDetected((result) => {
          if (result && result.codeResult && result.codeResult.code) {
            setScannedBarcode(result.codeResult.code);
            Quagga.stop();
          }
        });

        Quagga.start();
      }
    );

    // Cleanup
    return () => {
      Quagga.stop();
    };
  };

  if (turnOff) {
    Quagga.stop();
  }

  return (
    <div className="flex flex-col w-full p-5">
      <h1 className="mb-5 text-3xl font-bold text-center">Barcode Scanner</h1>
      {!scannerActive ? (
        <button
          className="text-2xl"
          onClick={() => {
            activateBarcodeScanner();
          }}
        >
          Start Scanning
        </button>
      ) : null}

      {!scannedBarcode ? (
        <div id="scanner-container" className="w-full mt-10 rounded-xl h-3/5">
          <video
            autoPlay={true}
            preload="auto"
            src=""
            muted={true}
            playsInline={true}
          ></video>
          <canvas
            id="scanner-canvas"
            className="w-0 h-0 drawingBuffer"
            width="0"
            height="0"
          ></canvas>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="mb-5 text-2xl font-semibold">Your Barcode Data: </p>
          <p className="w-3/5 p-3 text-xl font-semibold text-center break-all border-2 rounded-lg sm:p-5 sm:w-full">
            {scannedBarcode}
          </p>
        </div>
      )}
    </div>
  );
};

export default Scanner;
