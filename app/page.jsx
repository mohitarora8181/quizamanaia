'use client'

import Link from "next/link";

export default function Home() {
  const fullScreen = () => {
    var ele = document.documentElement;
    if (ele.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (ele.webkitRequestFullscreen) { /* Safari */
      ele.webkitRequestFullscreen();
    } else if (ele.msRequestFullscreen) { /* IE11 */
      ele.msRequestFullscreen();
    }
  }
  return (
    <main className="flex h-[100%] min-h-screen flex-col items-center justify-center p-24"  onContextMenu={e=>e.preventDefault()}>
      <h1 className=" text-white font-mono text-[5rem] m-40 max-sm:text-[1rem] font-bold">Welcome to Quiz-a-Mania</h1>
      <Link href={"/quiz"} id="toggle" className="border px-32 text-white py-2 whitespace-nowrap text-xl rounded-full border-white bg-[#152042] shadow-lg shadow-blue-500/50 hover:bg-white hover:shadow-black transition-all ease-in-out duration-700 hover:text-black"
      onClick={fullScreen}>
        Start Quiz
      </Link>
    </main>
  );
}
