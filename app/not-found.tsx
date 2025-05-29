import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Animated 404 illustration */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 mx-auto">
          <Image
            src="/images/404-illustration.svg" 
            alt="Page not found"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Error message with responsive typography */}
        <div className="space-y-4">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl text-primary">
            404
          </h1>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl">
            Страница не найдена
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
            Извините, страница, которую вы ищете, не существует или была перемещена.
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/">
              <span className="flex items-center gap-2">
                <i className="fas fa-home"></i>
                На главную
              </span>
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#">
              <span className="flex items-center gap-2">
                <i className="fas fa-envelope"></i>
                Связаться с нами
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
