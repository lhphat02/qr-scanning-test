import { useState } from 'react';
import AutofillForm from './AutoFillForm';
import QRScanner from './QRScanner';
import BarcodeScanner from './BarcodeScanner';

function App() {
  const [deviceId, setDeviceId] = useState(null);
  const [toggleQRScanner, setToggleQRScanner] = useState(true);
  const [toggleBarcodeScanner, setToggleBarcodeScanner] = useState(false);

  const handleScanner = (qrData) => {
    console.log('Passed data: ', qrData);
    setDeviceId(qrData);
  };

  console.log('Passed deviceId: ', deviceId);

  return (
    <div className="flex flex-col items-center justify-center w-full p-5 sm:p-10">
      <div className="flex justify-between w-4/5 p-3 border-2 rounded-lg">
        <button
          onClick={() => {
            setToggleQRScanner(true);
            setToggleBarcodeScanner(false);
          }}
        >
          Scan QR
        </button>
        <button
          onClick={() => {
            setToggleQRScanner(false);
            setToggleBarcodeScanner(true);
          }}
        >
          Scan Barcode
        </button>
      </div>

      {toggleQRScanner ? (
        <QRScanner onScan={handleScanner} />
      ) : (
        <BarcodeScanner turnOff={toggleQRScanner} />
      )}
    </div>
  );
}

export default App;
