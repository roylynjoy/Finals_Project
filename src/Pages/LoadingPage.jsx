import { useState, useEffect } from 'react';

function LoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 400); 
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <img
        src="pictures/LVBG.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover opacity-40 brightness-75"
      />

      {/* Overlay and content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img
          src="pictures/logo.png"
          alt="Logo"
          className="w-[30rem] mb-6 z-10"
        />
        <div className="w-[430px] h-[14px] bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-[#556689] transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
