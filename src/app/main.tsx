"use client";

import { FC } from "react";
import { Poppins } from "next/font/google";
import { motion, Variants } from "framer-motion";
import DeptronLogo from "@/components/DeptronLogo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15, // sequential reveal
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
      mass: 0.6,
    },
  },
};

const Main: FC = () => {
  return (
    <section
      className={`flex items-center justify-center min-h-[calc(100vh-130px)] px-4 sm:px-6 lg:px-8 ${poppins.className} dark:bg-black bg-white`}
    >
      <motion.div
        className="w-full max-w-3xl mx-auto text-center"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="mx-auto mb-5 w-[150px] flex items-center justify-center rounded-xl light:border border-gray-200 shadow-sm dark:border-gray-700"
        >
          <DeptronLogo width={150} />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl text-gray-900 dark:text-white"
        >
          Not Just Robotics. It’s Deptron.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-3 max-w-2xl text-sm text-gray-700 sm:text-base dark:text-white"
        >
          <strong>Deptron</strong> is a warehouse robot startup founded by a
          team of engineers from <strong>Yıldız Technical University.</strong>
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-base font-medium text-gray-900 sm:text-2xl dark:text-gray-200"
        >
          Coming soon.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Main;
