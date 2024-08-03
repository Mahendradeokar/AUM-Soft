import { useState, useEffect, useCallback } from 'react';

type UseBarcodeScanner = {
  startScan: () => void;
  isScanning: boolean;
  isInit: boolean;
};

export function useBarcodeScanner(
  inputRef: React.RefObject<HTMLInputElement>,
  onScan: (barcode: string) => void,
): UseBarcodeScanner {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isInit, setIsInit] = useState<boolean>(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLInputElement;
      const barcodeValue = target.value.trim();
      if (event.key === 'Enter' && barcodeValue !== '') {
        onScan(barcodeValue);
        // Reset the input field for the next scan
        target.value = '';
        // Refocus the input field
        target.focus();
      }
    },
    [onScan],
  );

  const handleFocus = () => {
    setIsScanning(true);
  };

  const handleBlur = () => {
    setIsScanning(false);
  };

  useEffect(() => {
    const element = inputRef.current;
    if (element) {
      element.addEventListener('keydown', handleKeyDown);
      element.addEventListener('focus', handleFocus);
      element.addEventListener('blur', handleBlur);
    }

    return () => {
      if (element) {
        element.removeEventListener('keydown', handleKeyDown);
        element.removeEventListener('focus', handleFocus);
        element.removeEventListener('blur', handleBlur);
      }
    };
  }, [inputRef, handleKeyDown]);

  const startScan = (): void => {
    if (inputRef.current) {
      setIsInit(true);
      inputRef.current.focus();
    }
  };

  return {
    startScan,
    isScanning,
    isInit,
  };
}
