import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-[#f5d64b]" style={{ scaleX }} />;
}
