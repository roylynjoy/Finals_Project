import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function ThreePositionSlider() {
  const images = [
    '/pictures/LVGate.jpg',
    '/pictures/LVGate.jpg',
    '/pictures/LVGate.jpg',
  ];

  return (
    <div className="py-12 bg-gray-50">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        className="w-full max-w-5xl mx-auto"
      >
        {images.map((src, i) => (
          <SwiperSlide
            key={i}
            className="rounded-xl overflow-hidden relative transition-all duration-300 ease-in-out"
          >
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="w-full h-64 object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}