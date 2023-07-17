import { useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

const QRScanner = () => {
  const videoRef = useRef(null);
  const [errorOccured, setErrorOccured] = useState(false);
  const [QrData, setQrData] = useState(null);
  const [toggleScanner, setToggleScanner] = useState(false);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
        },
      });
      const scanner = new QrScanner(videoRef.current, (result) => {
        console.log('QR code scanned:', result);
        setQrData(result);
        scanner.stop();
      });
      videoRef.current.srcObject = stream;

      scanner.start();

      return () => {
        scanner.destroy();
        stream.getTracks().forEach((track) => track.stop());
      };
    } catch (error) {
      console.error('Camera permission denied:', error);
      setErrorOccured(true);
    }
  };

  return (
    <div>
      {!errorOccured ? (
        <div className="flex flex-col items-center justify-center w-full sm:p-10">
          {!toggleScanner ? (
            <button
              className="text-2xl"
              onClick={() => {
                setToggleScanner(true);

                requestCameraPermission();
              }}
            >
              Start Scanning
            </button>
          ) : (
            <video
              ref={videoRef}
              playsInline
              className={`rounded-lg ${QrData && 'hidden'}`}
            />
          )}

          {QrData && (
            <div className="flex flex-col items-center justify-center w-full gap-5 text-2xl">
              <p className="font-semibold text-2xl">Your QR Code Data: </p>
              {QrData.slice(0, 4) === 'http' ? (
                <a
                  href={QrData}
                  target="_blank"
                  rel="noreferrer"
                  className="sm:p-5 p-3 border-2 w-4/5 sm:w-full break-all rounded-lg"
                >
                  {QrData}
                </a>
              ) : (
                <p className="sm:p-5 p-3 border-2 w-4/5 sm:w-full break-all rounded-lg">
                  {QrData}
                </p>
              )}
              <button
                className="text-2xl"
                onClick={() => {
                  setToggleScanner(false);
                  setQrData(null);
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full sm:p-20">
          <p className="text-2xl">Camera permission denied</p>
          <button
            className="text-2xl"
            onClick={() => {
              setToggleScanner(true);
              requestCameraPermission();
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
