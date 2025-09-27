import { cn } from "@/lib/utils";
import SectionContainer from "@/components/layout/section-container";
import { stegaClean } from "next-sanity";
import { PAGE_QUERYResult } from "@/sanity.types";
import GridCard from "./grid-card";
import PricingCard from "./pricing-card";
import GridPost from "./grid-post";
import FeaturedProduct, {GridProductProps} from "@/components/shared/product/FeaturedProduct";
import FeaturedProductCarousel from "@/components/shared/product/FeaturedProductCarousel";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type ImageAsset = {
  asset: {
    _id: string;
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  alt?: string;
};

type Category = {
  _id: string;
  title: string;
  slug: string;
};

export type Product = {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  price: number;
  images: ImageAsset[];
  categories: Category[];
  description?: string;
};

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type GridRow = Extract<Block, { _type: "grid-row" }>;
type GridColumn = NonNullable<NonNullable<GridRow["columns"]>[number]>;

const componentMap: {
  [K in GridColumn["_type"]]: React.ComponentType<
    Extract<GridColumn, { _type: K }>
  >;
} = {
  "grid-card": GridCard,
  "pricing-card": PricingCard,
  "grid-post": GridPost,
  "grid-product": FeaturedProduct,
};

export default function GridRow({
  padding,
  colorVariant,
  gridColumns,
  columns,
  featuredProducts,
}: GridRow) {
  const color = stegaClean(colorVariant);
  const hasFeaturedProducts = Array.isArray(featuredProducts) && featuredProducts.length > 0;
  const hasColumns = columns && columns.length > 0;

  return (
    <SectionContainer color={color} padding={padding}>
      {hasFeaturedProducts && (
        <div className="mb-12">
          <FeaturedProductCarousel products={featuredProducts as any[]} />
        </div>
      )}
      
      {!hasFeaturedProducts && hasColumns && (
        <div
          className={cn(
            `grid grid-cols-1 gap-6`,
            `md:${stegaClean(gridColumns)}`,
            "lg:grid-cols-3"
          )}
        >
          {columns.map((column) => {
            const Component = componentMap[column._type];
            if (!Component) {
              // Fallback for development/debugging of new component types
              console.warn(
                `No component implemented for grid column type: ${column._type}`
              );
              return <div data-type={column._type} key={column._key} />;
            }
            return (
              <Component {...(column as any)} color={color} key={column._key} />
            );
          })}
        </div>
      )}
    </SectionContainer>
  );
}
