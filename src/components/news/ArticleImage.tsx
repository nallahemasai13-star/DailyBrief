import { useState } from "react";
import { Newspaper } from "lucide-react";

export function ArticleImage({ src, alt, className }: { src: string | null; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-accent text-accent-foreground ${className}`}>
        <Newspaper className="h-10 w-10 opacity-60" aria-hidden />
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}
