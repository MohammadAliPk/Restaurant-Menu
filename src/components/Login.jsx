import React from "react";
import { Button } from "antd";
import styles from "./Login.module.css";
import { Input } from "antd";
import Logo from "../assets/images/logo.png";

const Login = () => {
  return (
    <>
      <div className={styles.container}>
        <img className={styles.logoImg} src={Logo} alt="logo" />
        <h4>نام کاربری</h4>
        <Input placeholder="نام کاربری" />
        <h4>رمز عبور</h4>
        <Input placeholder="رمز عبور" />
        <Button className={styles.loginBtn}>ورود</Button>
      </div>
    </>
  );
};

export default Login;
