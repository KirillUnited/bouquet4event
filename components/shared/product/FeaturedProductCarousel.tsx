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
// import { GridProduct } from '@/sanity.types';
import { useEffect, useState } from 'react';

interface FeaturedProductCarouselProps {
  products?: GridProductProps[] | null | undefined;
  className?: string;
}

export default function FeaturedProductCarousel({products, className}: FeaturedProductCarouselProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (products && products.length > 0) {
            setIsLoading(false);
        }
    }, [products]);

    if (isLoading) {
        return <div>Загрузка букетов...</div>;
    }

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
                        navigation: true
                    },
                    768: {
                        slidesPerView: 3,
                        freeMode: false,
                        navigation: true
                    },
                }}
                className="w-full"
            >
                {Array.isArray(products) && products.length > 0 && products?.map((product: GridProductProps) => (
                    <SwiperSlide key={product._id} className="h-full flex flex-col">
                        <FeaturedProduct product={product as any} color={product.color } _id={product._id} key={product._id} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}