import QRScanner from './QRScanner';

function App() {
  return (
    <div className="flex flex-col justify-center items-center w-full p-5 sm:p-10">
      <h1 className="text-center text-3xl font-bold mb-10"> QR Scanner</h1>
      <QRScanner />
    </div>
  );
}

export default App;
