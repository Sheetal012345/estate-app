import React from 'react'
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function Slider({ imageList }) {
  console.log(imageList)

  return (
    <div className="mt-5">
      {imageList ? (
        <Carousel>
          <CarouselContent>
            {imageList.map((item, index) => (
              <CarouselItem key={index}>
                <Image
                  src={item.url}
                  width={1400}
                  height={700}
                  alt="image"
                  className="w-full h-[420px] md:h-[520px] object-cover rounded-none md:rounded-xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="w-full h-[200px] bg-slate-200 animate-pulse rounded-lg" />
      )}
    </div>
  )
}

export default Slider
