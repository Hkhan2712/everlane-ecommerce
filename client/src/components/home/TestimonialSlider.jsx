import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./TestimonialSlider.module.css";

const testimonials = [
  {
    id: 1,
    rating: 5,
    quote: "Love this shirt! Fits perfectly and the fabric is thick without being stiff.",
    author: "JonSnSF",
    product: "The Heavyweight Overshirt",
    image: "/images/testimonial1.jpg",
  },
  {
    id: 2,
    rating: 5,
    quote: "So cozy and warm. Perfect for chilly days.",
    author: "Alex P.",
    product: "Winter Knit Sweater",
    image: "/images/testimonial2.jpg",
  },
  {
    id: 3,
    rating: 5,
    quote: "Excellent quality. My go-to piece this season.",
    author: "Maria L.",
    product: "The Everyday Cardigan",
    image: "/images/testimonial3.jpg",
  },
];

const TestimonialSlider = () => {
  return (
    <section className={styles.testimonialSection}>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        className={styles.swiperContainer}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id} className={styles.slide}>
            <div className={styles.slideContent}>
              <div className={styles.textContent}>
                <p className={styles.label}>People Are Talking</p>
                <div className={styles.stars}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <blockquote className={styles.quote}>
                  “{item.quote}”
                </blockquote>
                <p className={styles.author}>
                  -- {item.author},{" "}
                  <span className={styles.product}>{item.product}</span>
                </p>
              </div>
              <div className={styles.imageWrapper}>
                <img
                  src={item.image}
                  alt={item.product}
                  className={styles.image}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialSlider;
