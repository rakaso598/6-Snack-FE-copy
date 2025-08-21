"use client";

type TRequestInfoSectionProps = {
  requester?: string;
  userName?: string;
  createdAt?: string | null;
  requestMessage?: string | null;
  formatDate: (dateString: string | undefined | null) => string;
};

export default function RequestInfoSection({
  requester,
  userName,
  createdAt,
  requestMessage,
  formatDate,
}: TRequestInfoSectionProps) {
  // requester 또는 userName 중 존재하는 값 사용
  const displayName = requester || userName || "-";

  return (
    <div className="self-stretch flex flex-col justify-start items-start">
      <div className="self-stretch py-3.5 border-b border-primary-800 inline-flex justify-start items-center gap-2 sm:pl-2">
        <div className="text-center justify-center text-primary-950 text-sm sm:text-base font-extrabold ">
          요청 정보
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-center items-start sm:flex sm:flex-row sm:justify-start sm:items-stretch">
        <div className="self-stretch inline-flex justify-start items-center sm:flex-1">
          <div className="w-36 h-12 p-2 border-r border-b border-primary-200 flex justify-start items-center gap-2">
            <div className="text-center justify-center text-primary-950 text-sm sm:text-base font-normal ">
              요청인
            </div>
          </div>
          <div className="flex-1 h-12 px-4 py-2 border-b border-primary-200 flex justify-start items-center gap-2 sm:border-r">
            <div className="text-center justify-center text-primary-900 text-sm sm:text-base font-bold ">
              {displayName}
            </div>
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-center sm:flex-1">
          <div className="w-36 h-12 p-2 border-r border-b border-primary-200 flex justify-start items-center gap-2">
            <div className="text-center justify-center text-primary-950 text-sm sm:text-base font-normal ">
              요청 날짜
            </div>
          </div>
          <div className="flex-1 h-12 px-4 py-2 border-b border-primary-200 flex justify-start items-center gap-2">
            <div className="text-center justify-center text-primary-900 text-sm sm:text-base font-bold ">
              {formatDate(createdAt)}
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex justify-start items-center">
        <div className="w-36 h-12 px-2 py-2 border-r border-b border-primary-200 flex justify-start items-center gap-2">
          <div className="text-center justify-center text-primary-950 text-sm sm:text-base font-normal ">
            요청 메시지
          </div>
        </div>
        <div className="flex-1 h-12 px-4 py-2 border-b border-primary-200 flex justify-start items-center gap-2">
          <div className="flex-1 justify-center text-primary-900 text-sm sm:text-base font-bold  leading-snug">
            {requestMessage || "요청 메시지가 없습니다."}
          </div>
        </div>
      </div>
    </div>
  );
} 