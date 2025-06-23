import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Product } from '@/sanity/types/product'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CTAButton } from '../buttons'

export default function FeaturedProduct({ product }: { product: Product }) {
    return (
        <Card className="overflow-hidden h-full group">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={product.gallery[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    width={500}
                    height={500}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="outline" className="bg-white text-gray-800 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                        Просмотр
                    </Button>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">{product.name}</h3>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <span className="text-2xl font-semibold text-foreground/90 truncate">{product.price} ₽</span>
                    <CTAButton title="Подробнее" href={`/products/${product.slug}`} buttonVariant='outline' target={true} />
                </div>
            </div>
        </Card>
    )
}

export const FeaturedProductList = ({ products }: { products: Product[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, index) => (
                <FeaturedProduct key={index} product={product} />
            ))}
        </div>
    )
}
