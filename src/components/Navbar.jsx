import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-scroll";
import { Link as LinkRouter } from "react-router-dom";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./Navbar.module.css";
import icon from "../assets/icons/pizza.png";
import LogoImg from "../assets/images/logo.png";

const Navbar = () => {
  const swiperRef = useRef(null);

  const handleItemClick = (item) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(item - 1);
    }
  };

  const testArray = [1, 2, 3, 4];

  return (
    <nav>
      <div className={styles.cartHeader}>
        <div className={styles.logoContainer}>
          <img src={LogoImg} alt="logo" />
          <p>
            Game
            <span>Republic</span>
          </p>
        </div>
        <LinkRouter to="/cart">یادداشت سفارش</LinkRouter>
      </div>
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={20}
        modules={[Pagination]}
        className="mySwiper"
        id={styles.swiper}
        ref={swiperRef}
      >
        {testArray.map((item) => (
          <SwiperSlide key={item} className={styles.swiperItem}>
            <Link
              className={styles.link}
              activeClass={styles.active}
              onSetActive={() => handleItemClick(item)}
              smooth
              spy
              to={item}
              duration={500}
              // onClick={() => handleItemClick(item)}
            >
              <img src={icon} alt="icon" />
              <div className={styles.info}>پیتزا</div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </nav>
  );
};

export default Navbar;
