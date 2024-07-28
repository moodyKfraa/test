import React from "react";
import { motion } from "framer-motion";
import home from "./home.module.css";
import { NavLink } from "react-router-dom";

function HomeYears() {
  const animate = {
    hidden: {
      y: "-100px",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: "0.3",
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
  };
  return (
    <motion.div
      variants={animate}
      initial="hidden"
      animate="visible"
      className={home.years}
    >
      <NavLink to="years/1">
        <h1>اولى ثانوي</h1>
      </NavLink>
      <NavLink to="years/2">
        <h1>ثانية ثانوي</h1>
      </NavLink>
      <NavLink to="years/3">
        <h1>ثالثة ثانوي</h1>
      </NavLink>
    </motion.div>
  );
}

export default HomeYears;
