import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Product } from '@/sanity/types/product'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon } from 'lucide-react'
import PortableTextRenderer from '@/components/portable-text-renderer'

export default function FeaturedProduct({ product }: { product: Product }) {
    const { name, description, gallery, price, slug } = product;

    return (
        <Card className="overflow-hidden h-full group">
            {(gallery && gallery.length > 0) && (
                <div className="relative h-64 overflow-hidden">
                    <Image
                        src={gallery[0].url}
                        alt={name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        width={500}
                        height={500}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button variant="outline" size={'sm'}>
                            Просмотр
                        </Button>
                    </div>
                </div>
            )}
            <Link className="flex flex-col group p-4"
                href={`/products/${slug}`}
                target={"_blank"}
                rel={"noopener"}
            >
                <h3 className="text-xl font-serif font-semibold text-foreground/80 mb-2">{name}</h3>
                <article className='truncate line-clamp-1 text-sm'><PortableTextRenderer value={description} /></article>
                <p className="flex flex-col md:flex-row justify-between gap-4 mt-4">
                    {price && (
                        <span className="text-2xl font-semibold text-foreground/90 truncate">{price} ₽</span>
                    )}
                    {slug && (
                        <Button
                            size={'sm'}
                            variant={'secondary'}
                        >
                            {"Подробнее"}
                            <ArrowUpRightIcon
                                className="group-hover:translate-x-1 transition-transform"
                                size={16}
                            />
                        </Button>
                    )}
                </p>
            </Link>
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
