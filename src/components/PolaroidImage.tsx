"use client";

import React, { useState } from "react";
import Image from "next/image";

interface PolaroidImageProps {
  src: string;
  alt: string;
  id: string;
  priority?: boolean;
}

export default function PolaroidImage({ src, alt, id, priority = false }: PolaroidImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(`https://picsum.photos/seed/${id}/400/400`);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 128px, 192px"
      unoptimized={imgSrc.startsWith('https://')}
      onError={handleError}
      priority={priority}
    />
  );
}
