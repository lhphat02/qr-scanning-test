import { useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

// eslint-disable-next-line react/prop-types
const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const [errorOccured, setErrorOccured] = useState(false);
  const [QrData, setQrData] = useState(null);
  const [toggleScanner, setToggleScanner] = useState(false);

  const activateQRScanner = async () => {
    try {
      //Gọi hàm getUserMedia để lấy stream từ camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
        },
      });

      //Tạo một đối tượng scanner mới với stream vừa lấy được
      const scanner = new QrScanner(videoRef.current, (result) => {
        console.log('QR code scanned:', result);
        setQrData(result);
        scanner.stop();
        onScan(result);
        console.log('QR code data scanned:', QrData);
      });

      //Gán stream cho video
      videoRef.current.srcObject = stream;

      //Bắt đầu quét
      scanner.start();

      //Trả về một hàm để dừng quét
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
      <h1 className="my-5 text-3xl font-bold text-center">QR code Scanner</h1>
      {!errorOccured ? (
        <div className="flex flex-col items-center justify-center w-full sm:p-10">
          {!toggleScanner ? (
            <button
              className="text-2xl"
              onClick={() => {
                setToggleScanner(true);
                activateQRScanner();
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
              <p className="text-2xl font-semibold">Your QR Code Data: </p>
              {QrData.slice(0, 4) === 'http' ? (
                <a
                  href={QrData}
                  target="_blank"
                  rel="noreferrer"
                  className="w-4/5 p-3 text-center break-all border-2 rounded-lg sm:p-5 sm:w-full"
                >
                  {QrData}
                </a>
              ) : (
                <p className="w-4/5 p-3 text-center break-all border-2 rounded-lg sm:p-5 sm:w-full">
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
              activateQRScanner();
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
