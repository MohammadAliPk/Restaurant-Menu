import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./Navbar.module.css";
import icon from "../assets/icons/icons.png";

SwiperCore.use([Pagination]);

const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const swiperRef = useRef(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(item - 1);
    }
  };

  return (
    <>
      <div className={styles.upperHeader}>
        <div className={styles.logo}>logo</div>
        <Link to="/cart">سفارشات</Link>
      </div>
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        id={styles.swiper}
        ref={swiperRef}
      >
        {[1, 2, 3, 4].map((item) => (
          <SwiperSlide
            key={item}
            className={`${styles.swiperItem} ${
              selectedItem === item ? styles.redBorder : styles.selectedItem
            }`}
            onClick={() => handleItemClick(item)}
          >
            <img src={icon} alt="icon" />
            <div className={styles.info}>تخم ها</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Navbar;
