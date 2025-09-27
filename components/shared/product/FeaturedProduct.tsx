import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { SparklesIcon } from 'lucide-react'
import PortableTextRenderer from '@/components/portable-text-renderer'
import { ColorVariant, PAGE_QUERYResult } from '@/sanity.types'

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type GridRow = Extract<Block, { _type: "grid-row" }>;
type GridColumn = NonNullable<NonNullable<GridRow["columns"]>>[number];
type GridProduct = Extract<GridColumn, { _type: "grid-product" }>;

export interface GridProductProps extends Omit<NonNullable<GridProduct>, "_type" | "_key"> {
    color?: ColorVariant;
    slug?: {
        current: any;
    };
}

export default function FeaturedProduct({ color, product }: GridProductProps) {
    if (!product) return null;

    const { name, description, gallery, price, slug, specifications } = product;
    console.log(product)

    return (
        <Card className="flex flex-col overflow-hidden h-full flex-1 group">
            {(gallery && gallery.length > 0) && (
                <div className="relative h-64 overflow-hidden">
                    {gallery[0].url && (
                        <Image
                            src={gallery[0].url || ""}
                            alt={name || ""}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            width={500}
                            height={500}
                            blurDataURL={gallery[0].url || ""}
                            placeholder={gallery[0].url ? "blur" : undefined}
                            quality={50}
                        />
                    )}
                    <div
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button variant="outline" size='sm'>
                            Просмотр
                        </Button>
                    </div>
                </div>
            )}
            <Link className="flex flex-col gap-4 group p-4 flex-1"
                href={`/products/${slug as any || slug || ''}`}
            >
                <div className='flex flex-col gap-2'>
                    <h3 className="text-xl font-serif font-semibold text-foreground/80">{name}</h3>
                    {description && (
                        <article className='truncate line-clamp-1 text-sm'>
                            <PortableTextRenderer value={description} />
                        </article>
                    )}
                </div>
                {Array.isArray(specifications) && specifications.length > 0 && (
                    <ul className="flex flex-col gap-1 text-foreground/70 font-light">
                        {specifications.map((specification) => (
                            <li key={specification.name} className="flex text-sm gap-2">
                                <span>{specification.name}:</span>
                                <span className="font-bold">{specification.value}</span>
                            </li>
                        ))}
                    </ul>
                )
                }
            </Link>
            <footer className="flex flex-col md:flex-row justify-between gap-4 mt-4 border-t-1 p-4">
                {price && (
                    <span className="text-2xl font-semibold text-foreground/90 truncate">{price} ₽</span>
                )}
                {slug && (
                    <Button
                        size='lg'
                    >
                        <Link href={`/products/${slug as any || slug || ''}`} className='flex items-center gap-2'>
                            {"Хочу такой"}
                            <SparklesIcon
                                className="group-hover:scale-125 transition-transform"
                                size={18}
                            />
                        </Link>
                    </Button>
                )}
            </footer>
        </Card>
    )
}

export const FeaturedProductList = ({ products }: { products: GridProductProps[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product: any, index: number) => (
                <FeaturedProduct color={product.color} _id={product._id} key={product._id} product={product} />
            ))}
        </div>
    )
}
