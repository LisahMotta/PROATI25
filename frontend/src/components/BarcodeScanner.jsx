import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './BarcodeScanner.css';

function BarcodeScanner({ onScan, onClose }) {
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 2,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.CODABAR
        ]
      }
    );

    html5QrcodeScanner.render(
      (decodedText) => {
        onScan(decodedText);
        html5QrcodeScanner.clear();
      },
      (error) => {
        // Ignorar erros de leitura
      }
    );

    setScanner(html5QrcodeScanner);

    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear();
      }
    };
  }, [onScan]);

  return (
    <div className="scanner-container">
      <div className="scanner-header">
        <h2>Escanear Código de Barras</h2>
        <button onClick={onClose} className="close-button">Fechar</button>
      </div>
      <div id="reader" className="scanner-view"></div>
      <div className="scanner-instructions">
        <p>Posicione o código de barras dentro da área de leitura</p>
        <p>Certifique-se de que a iluminação está adequada</p>
      </div>
    </div>
  );
}

export default BarcodeScanner; 