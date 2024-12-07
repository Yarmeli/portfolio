"use client";

import { Media } from "@/payload-types";
import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
  thumbnail: Media;
  images: Media[];
  title: string;
}

export function ImageGallery({ thumbnail, images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Media>(thumbnail);
  const allImages = [thumbnail, ...(images || [])];

  return (
    <div className="mb-12">
      <div className="relative mb-4 h-[500px] w-full overflow-hidden rounded-lg">
        <Image
          src={selectedImage.url!}
          alt={selectedImage.alt || title}
          fill
          className="h-full w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-6 gap-4">
        {allImages.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`relative aspect-video cursor-pointer overflow-hidden rounded-lg transition-all ${
              selectedImage.id === image.id
                ? "ring-2 ring-primary ring-offset-2"
                : "hover:ring-2 hover:ring-primary hover:ring-offset-2"
            }`}
          >
            <Image
              src={image.url!}
              alt={image.alt || title}
              fill
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
