'use client'

import Link from "next/link";
import { easeInOut, motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex h-[100%] min-h-screen flex-col items-center justify-center p-24" onContextMenu={e => e.preventDefault()}>
      <motion.span
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut"
        }}
        key={0}
        className=" text-white font-mono text-[5rem] m-40 max-sm:text-[1rem] font-bold"
      > Welcome to Quiz-a-Mania</motion.span>
      <motion.button
        className="h-fit w-auto m-0 p-0 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          onClick={() => {
            var ele = document.documentElement;
            if (ele.requestFullscreen) {
              document.documentElement.requestFullscreen();
            } else if (ele.webkitRequestFullscreen) { /* Safari */
              ele.webkitRequestFullscreen();
            } else if (ele.msRequestFullscreen) { /* IE11 */
              ele.msRequestFullscreen();
            }
          }}
          href={"/quiz"}
          id="toggle" className="border w-full h-full cursor-pointer px-32 text-white py-2 whitespace-nowrap text-xl rounded-full border-white bg-[#152042] shadow-lg shadow-blue-500/50 hover:bg-white hover:shadow-black transition-all ease-in-out duration-700 hover:text-black">
          Start Quiz
        </Link>
      </motion.button>

    </main>
  );
}
