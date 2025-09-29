'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, Zoom, FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import { cn } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import { ProductImage } from '@/sanity/types/product';
import Image from 'next/image';


interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  className?: string;
}

export default function ProductGallery({
  images,
  productName,
  className
}: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation for fullscreen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showFullscreen) return;

      switch (e.key) {
        case 'Escape':
          setShowFullscreen(false);
          break;
        case 'ArrowLeft':
          if (mainSwiper) mainSwiper.slidePrev();
          break;
        case 'ArrowRight':
          if (mainSwiper) mainSwiper.slideNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showFullscreen, mainSwiper]);

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (showFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showFullscreen]);

  if (!images || images.length === 0) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-gray-100 rounded-lg aspect-square",
        className
      )}>
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p>Нет изображений</p>
        </div>
      </div>
    );
  }

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  const openFullscreen = () => {
    setShowFullscreen(true);
  };

  const closeFullscreen = () => {
    setShowFullscreen(false);
  };

  return (
    <>
      <div className={cn("sticky top-0", className)}>
        {/* Main Swiper */}
        <div className="relative mb-4">
          <Swiper
            onSwiper={setMainSwiper}
            modules={[Navigation, Pagination, Thumbs, Zoom]}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            navigation={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            zoom={{
              maxRatio: 3,
              minRatio: 1,
            }}
            className="aspect-square rounded-lg overflow-hidden bg-gray-50"
            onSlideChange={handleSlideChange}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="relative">
                <div className="swiper-zoom-container">
                  <Image
                    src={image.url ? urlFor(image.url).url() : ''}
                    alt={image.alt || `${productName} - изображение ${index + 1}`}
                    className="w-full h-full object-cover cursor-zoom-in"
                    width={image.dimensions?.width}
                    height={image.dimensions?.height}
                    onClick={openFullscreen}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Zoom and Fullscreen Controls */}
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            <button
              onClick={openFullscreen}
              className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
              title="Полноэкранный режим"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Thumbnails Swiper */}
        {images.length > 1 && (
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Navigation, Thumbs]}
            spaceBetween={8}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            className="h-20"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <div className={cn(
                  "w-full h-full rounded-md overflow-hidden border-2 transition-all duration-200",
                  activeIndex === index
                    ? "border-primary border-3"
                    : "border-gray-200 hover:border-gray-300"
                )}>
                  <Image
                    src={image.url ? urlFor(image.url).url() : ''}
                    alt={image.alt || `${productName} - миниатюра ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={image.dimensions?.width}
                    height={image.dimensions?.height}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div
          ref={fullscreenRef}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Fullscreen Swiper */}
            <Swiper
              modules={[Navigation, Pagination, Zoom]}
              navigation={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              zoom={{
                maxRatio: 5,
                minRatio: 1,
              }}
              className="w-full h-full"
              initialSlide={activeIndex}
              onSlideChange={handleSlideChange}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <div className="swiper-zoom-container max-w-full max-h-full">
                    <Image
                      src={image.url ? urlFor(image.url).url() : ''}
                      alt={image.alt || `${productName} - изображение ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                      width={image.dimensions?.width}
                      height={image.dimensions?.height}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
          </div>
        </div>
      )}
    </>
  );
}
