"use client";

type TApprovalInfoSectionProps = {
  approver?: string | null;
  updatedAt?: string | null;
  status: string;
  adminMessage?: string | null;
  formatDate: (dateString: string | undefined | null) => string;
  getStatusText: (status: string) => string;
};

export default function ApprovalInfoSection({
  approver,
  updatedAt,
  status,
  adminMessage,
  formatDate,
  getStatusText,
}: TApprovalInfoSectionProps) {
  return (
    <div className="self-stretch flex flex-col justify-start items-start">
      <div className="self-stretch py-3.5 border-b border-primary-800 inline-flex justify-start items-center gap-2 sm:pl-2">
        <div className="text-center justify-center text-primary-950 text-sm sm:text-base font-extrabold ">
          승인 정보
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-center items-start sm:flex sm:flex-row sm:justify-start sm:items-stretch">
        <div className="self-stretch inline-flex justify-start items-center sm:flex-1">
          <div className="w-36 h-12 p-2 border-r border-b border-primary-200 flex justify-start items-center gap-2">
            <div className="text-center justify-center text-primary-950 text-sm sm:text-base font-normal ">
              담당자
            </div>
          </div>
          <div className="flex-1 h-12 px-4 py-2 border-b border-primary-200 flex justify-start items-center gap-2 sm:border-r">
            <div className="text-center justify-center text-primary-900 text-sm sm:text-base font-bold ">
              {approver || "-"}
            </div>
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-center sm:flex-1">
          <div className="w-36 h-12 p-2 border-r border-b border-primary-200 flex justify-start items-center gap-2">
            <div className="text-center justify-center text-primary-950 text-sm sm:text-base font-normal ">
              승인 날짜
            </div>
          </div>
          <div className="flex-1 h-12 px-4 py-2 border-b border-primary-200 flex justify-start items-center gap-2">
            <div className="text-center justify-center text-primary-900 text-sm sm:text-base font-bold ">
              {updatedAt ? formatDate(updatedAt) : "-"}
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-center items-center sm:flex sm:flex-row sm:justify-start sm:items-stretch">
        <div className="self-stretch inline-flex justify-start items-center sm:flex-1">
          <div className="w-36 h-12 px-2 py-2 border-r border-b border-primary-200 flex justify-start items-center gap-2">
            <div className="text-center justify-center text-primary-950 text-sm sm:text-base font-normal ">
              상태
            </div>
          </div>
          <div className="flex-1 h-12 px-4 py-2 border-b border-primary-200 flex justify-start items-center gap-2 sm:border-r">
            <div className="text-center justify-center text-primary-900 text-sm sm:text-base font-bold ">
              {getStatusText(status)}
            </div>
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-center sm:flex-1">
          <div className="w-36 h-12 px-2 py-2 border-r border-b border-primary-200 flex justify-start items-center gap-2">
            <div className="text-center justify-center text-primary-950 text-sm sm:text-base font-normal ">
              결과 메시지
            </div>
          </div>
          <div className="flex-1 h-12 px-4 py-2 border-b border-primary-200 flex justify-start items-center gap-2">
            <div className="flex-1 justify-center text-primary-900 text-sm sm:text-base font-bold  leading-snug">
              {adminMessage || "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 