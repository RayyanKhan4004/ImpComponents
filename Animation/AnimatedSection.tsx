import { motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
};

// 1. Fade + Slide Down
/**
 * 
 * @param param0 
 * @returns 
 */
export const FadeInDown = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// Fade In + Slide Up (Footer)
export const FadeInUp = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// 2. Scale-Up (Zoom in)
export const ScaleUp: React.FC<Props> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// 3. Rotate + Fade
export const RotateIn: React.FC<Props> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, rotate: -5 }}
    whileInView={{ opacity: 1, rotate: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// 4. Slide from Left
export const SlideInLeft: React.FC<Props> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// 5. Slide from Right
export const SlideInRight: React.FC<Props> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// 6. Staggered Reveal for multiple children
export const Staggered: React.FC<Props> = ({ children }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.2 }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.2 } },
    }}
  >
    {children}
  </motion.div>
);

export const StaggeredItem: React.FC<Props> = ({ children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);
