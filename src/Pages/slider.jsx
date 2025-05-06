import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

export default function ThreePositionSlider() {
  const slides = [
    { swiper: '/pictures/LV1.jpg', bg: '/pictures/LV1.jpg' },
    { swiper: '/pictures/LVGate.jpg', bg: '/pictures/LVGate.jpg' },
    { swiper: '/pictures/LVBG.jpg', bg: '/pictures/LVBG.jpg' },
  ];

  const [activeBg, setActiveBg] = useState(slides[0].bg);

  return (
    <div className="relative h-[1000px] flex items-center justify-end transition-all duration-500">
      {/* Background image layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${activeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* 60% black overlay */}
        <div className="w-full h-full bg-opacity-60"></div>
      </div>

      {/* Swiper carousel (on top) */}
      <div className="relative z-10 rounded-xl w-[900px] mr-12">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          slidesPerView={3}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          className="w-full"
          onSlideChange={(swiper) => {
            const realIndex = swiper.realIndex;
            setActiveBg(slides[realIndex].bg);
          }}
        >
          {slides.map((item, i) => (
            <SwiperSlide
              key={i}
              className="overflow-hidden relative cursor-pointer"
              onClick={() => setActiveBg(item.bg)}
            >
              <img
                src={item.swiper}
                alt={`Slide ${i + 1}`}
                className="w-full h-64 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
