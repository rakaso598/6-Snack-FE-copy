import React, { useState } from "react";
import Image from "next/image";

type TProductImageProps = {
  imageUrl: string;
};

export default function ProductImage({ imageUrl }: TProductImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="self-center relative w-full max-w-[328px] sm:max-w-[496px] md:max-w-[540px] aspect-square bg-primary-50 rounded-lg">
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">📦</div>
            <div className="text-lg">이미지를 불러올 수 없습니다</div>
          </div>
        </div>
      ) : (
        <Image
          src={imageUrl}
          alt="상품 이미지"
          fill
          className="object-contain"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
