"use client";

import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/aceternity/3d-card";
import { FlipWords } from "@/components/aceternity/flip-words";

export default function ProfileTemplate() {
  const words = ["Cloud Computing", "UPNVJ", "Sistem Informasi"];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="shrink-0 w-full lg:w-auto flex justify-center">
        <CardContainer className="inter-var">
          <CardBody className="bg-white/95 backdrop-blur-sm relative group/card hover:shadow-2xl hover:shadow-purple-500/20 border-white/30 w-full sm:w-96 h-auto rounded-xl p-4 sm:p-6 border-2">
            <CardItem translateZ="100" className="w-full">
              <Image
                src="/Haikal.png"
                alt="Muhammad Haikal Bintang"
                width={400}
                height={500}
                className="w-full h-auto object-contain rounded-xl border-4 border-purple-500 shadow-2xl"
              />
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-sm sm:text-base font-semibold text-gray-700 mt-4 text-center"
            >
              NIM: 2210512020
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      {/* Bagian Kanan - Teks dengan Flip Animation */}
      <div className="flex-1 flex flex-col justify-center space-y-6 lg:space-y-9 w-full">
        <div className="space-y-3 sm:space-y-4 px-4 sm:px-8 lg:px-9 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-white leading-tight drop-shadow-lg">
            Muhammad Haikal Bintang
          </h1>
          <div className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-200 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 flex-wrap">
            <span>Student:</span>
            <FlipWords words={words} className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
