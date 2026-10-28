import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
export type GalleryImage = { image: string; title: string; detail: string };
export function GalleryViewer({
  images,
  index,
  onChange,
  onClose,
  returnFocus,
}: {
  images: GalleryImage[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
  returnFocus: React.RefObject<HTMLButtonElement | null>;
}) {
  const startX = useRef<number | null>(null);
  const item = index === null ? null : images[index];
  const move = (delta: number) => {
    if (index !== null && images.length > 1)
      onChange((index + delta + images.length) % images.length);
  };
  return (
    <Dialog
      open={!!item}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="gap-0 p-0 sm:max-w-5xl"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocus.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        <DialogTitle className="sr-only">{item?.title || "Event gallery"}</DialogTitle>
        <DialogDescription className="sr-only">
          Use the previous and next buttons or arrow keys to browse. Press Escape to close.
        </DialogDescription>
        {item && (
          <>
            <div
              className="bg-hero-ink"
              onTouchStart={(event) => {
                startX.current = event.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                const end = event.changedTouches[0]?.clientX;
                if (
                  startX.current !== null &&
                  end !== undefined &&
                  Math.abs(end - startX.current) > 60
                )
                  move(end < startX.current ? 1 : -1);
                startX.current = null;
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                width={1200}
                height={900}
                className="h-[52svh] w-full object-contain sm:h-[65svh]"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground" aria-live="polite">
                  Photo {(index ?? 0) + 1} of {images.length}
                </p>
                <h2 className="mt-1 font-display text-2xl">{item.title}</h2>
                {item.detail && <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => move(-1)}
                    aria-label="Previous photo"
                  >
                    <ArrowLeft />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => move(1)}
                    aria-label="Next photo"
                  >
                    <ArrowRight />
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
