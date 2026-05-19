import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/utils';

export interface CarouselSlide {
  id: string;
  src: string;
  title: string;
  caption: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlayMs?: number;
  className?: string;
  aspectClassName?: string;
}

/**
 * Editorial-style carousel: large image with overlay caption, dot pagination
 * underneath, prev/next controls on the sides, and an optional autoplay.
 * Pauses on hover; respects reduced motion (no autoplay).
 */
export const Carousel = ({
  slides,
  autoPlayMs = 6500,
  className,
  aspectClassName = 'aspect-[16/9]',
}: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const total = slides.length;
  const timerRef = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    if (total === 0) return;
    setIndex(((next % total) + total) % total);
  }, [total]);

  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  // Autoplay
  useEffect(() => {
    if (total <= 1 || hovered || autoPlayMs <= 0) return;
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    timerRef.current = window.setTimeout(() => go(index + 1), autoPlayMs);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, go, autoPlayMs, hovered, total]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  if (total === 0) return null;

  return (
    <div
      className={cn('relative group select-none', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Frame */}
      <div className={cn('relative overflow-hidden border border-line bg-surface-2', aspectClassName)}>
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-out',
              i === index ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
            aria-hidden={i !== index}
          >
            <img
              src={s.src}
              alt={s.title}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />
            {/* Caption */}
            <div className="absolute left-0 right-0 bottom-0 p-6 md:p-10 lg:p-14 text-white">
              <div className="max-w-2xl">
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/70 mb-3">
                  {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </div>
                <h3 className="font-display text-2xl md:text-4xl lg:text-5xl tracking-tight leading-[1.05]">
                  {s.title}
                </h3>
                {s.caption && (
                  <p className="mt-3 text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
                    {s.caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11
                         inline-flex items-center justify-center bg-surface/85 hover:bg-surface
                         border border-line text-ink backdrop-blur transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11
                         inline-flex items-center justify-center bg-surface/85 hover:bg-surface
                         border border-line text-ink backdrop-blur transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Indicator row */}
      {total > 1 && (
        <div className="mt-4 flex items-center gap-2 justify-between flex-wrap">
          <div className="flex items-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={cn(
                  'h-[3px] transition-all duration-300',
                  i === index ? 'w-10 bg-accent' : 'w-6 bg-line-strong hover:bg-ink-muted',
                )}
              />
            ))}
          </div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            {slides[index].title}
          </div>
        </div>
      )}
    </div>
  );
};
