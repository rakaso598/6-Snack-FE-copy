import React, { useState } from "react";
import Image from "next/image";

type TProductImageProps = {
  imageUrl: string;
};

export default function ProductImage({ imageUrl }: TProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    console.warn(`🖼️ 이미지 로딩 실패: ${imageUrl}`);
    console.warn('🔧 CloudFront/S3 연결 문제로 이미지를 표시할 수 없습니다.');
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className="self-center relative w-full max-w-[328px] sm:max-w-[496px] md:max-w-[540px] aspect-square bg-primary-50 rounded-lg">
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">📦</div>
            <div className="text-lg">이미지를 불러올 수 없습니다</div>
            <div className="text-sm mt-2 text-gray-400">
              이미지 서버 연결에 문제가 있습니다
            </div>
          </div>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          )}
          <Image
            src={imageUrl}
            alt="상품 이미지"
            fill
            className="object-contain"
            onError={handleImageError}
            onLoad={() => setIsLoading(false)}
          />
        </>
      )}
    </div>
  );
}
