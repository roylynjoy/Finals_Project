import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

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

  //Navigate to homepage after loading
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        navigate('/homepage');
      }, 500); // Delay before navigating to homepage
    }
  }, [progress, navigate]);

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