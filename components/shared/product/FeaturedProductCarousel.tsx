'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode, Autoplay } from 'swiper/modules';
import { cn } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';

import { FeaturedProduct } from "@/components/shared/product";
import {GridProductProps} from "@/components/shared/product/FeaturedProduct";
// import { GridProduct } from '@/sanity.types';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

interface FeaturedProductCarouselProps {
  products?: GridProductProps[] | null | undefined;
  className?: string;
  mobileBreakpoint?: number;
}

export default function FeaturedProductCarousel({products, className, mobileBreakpoint=768}: FeaturedProductCarouselProps) {
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
        <div className={cn('relative w-full', styles.container, className)}>
            {/* TODO: Implement native carousel */}
            {/* {isMobile && (
				<div className={styles.nativeCarousel}>
					<div className={styles.carouselTrack}>
						{products?.map((product) => (
							<div key={product._id} className={styles.carouselSlide}>
								<FeaturedProduct product={product as any} color={product.color } _id={product._id} key={product._id} />
							</div>
						))}
					</div>
				</div>
			)} */}
            <Swiper
                className="w-full"
                wrapperClass={styles.wrapper}
                modules={[Navigation, Pagination, FreeMode, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={false}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {Array.isArray(products) && products.length > 0 && products?.map((product: GridProductProps) => (
                    <SwiperSlide key={product._id} className={cn(styles.swiperSlide)}>
                        <FeaturedProduct product={product as any} color={product.color } _id={product._id} key={product._id} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}