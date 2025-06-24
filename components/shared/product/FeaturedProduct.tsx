import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Product } from '@/sanity/types/product'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon } from 'lucide-react'
import PortableTextRenderer from '@/components/portable-text-renderer'
import { ColorVariant, PAGE_QUERYResult } from '@/sanity.types'

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type GridRow = Extract<Block, { _type: "grid-row" }>;
type GridColumn = NonNullable<NonNullable<GridRow["columns"]>>[number];
type GridProduct = Extract<GridColumn, { _type: "grid-product" }>;

interface GridProductProps extends Omit<NonNullable<GridProduct>, "_type" | "_key"> {
    color?: ColorVariant;
}

export default function FeaturedProduct({ color, product }: GridProductProps) {
    if (!product) return null;

    const { name, description, gallery, price, slug } = product;

    return (
        <Card className="overflow-hidden h-full group">
            {(gallery && gallery.length > 0) && (
                <div className="relative h-64 overflow-hidden">
                    <Image
                        src={gallery[0].url || ""}
                        alt={name || ""}
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
                {description && (
                    <article className='truncate line-clamp-1 text-sm'><PortableTextRenderer value={description} /></article>
                )}
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

export const FeaturedProductList = ({ products }: { products: GridProductProps[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product: any, index: number) => (
                <FeaturedProduct color={product.color} _id={product._id} key={index} product={product} />
            ))}
        </div>
    )
}
