'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import { cn } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

import { FeaturedProduct } from "@/components/shared/product";
import {GridProductProps} from "@/components/shared/product/FeaturedProduct";

interface FeaturedProductCarouselProps {
  products?: GridProductProps[] | null | undefined;
  className?: string;
}

export default function FeaturedProductCarousel({products, className}: FeaturedProductCarouselProps) {
    console.log('FeaturedProductCarousel',products)

    return (
        <div className={cn('relative w-full', className)}>
            <Swiper
                modules={[Navigation, Pagination, FreeMode]}
                spaceBetween={24}
                slidesPerView={1}
                autoHeight={true}
                freeMode={{
                    enabled: true,
                    sticky: false,
                    momentumBounce: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        freeMode: false,
                    },
                    768: {
                        slidesPerView: 3,
                        freeMode: false,
                    },
                }}
                className="w-full"
            >
                {Array.isArray(products) && products.length > 0 && products?.map((product: GridProduct) => (
                    <SwiperSlide key={product._id || product._key} className="h-full flex flex-col">
                        <FeaturedProduct product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}