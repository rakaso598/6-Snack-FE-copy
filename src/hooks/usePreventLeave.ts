"use client";

import { useEffect } from "react";

export function usePreventLeave(orderId: string) {
  // 취소 API 호출
  async function cancel(orderId: string) {
    const response = await fetch(
      process.env.NODE_ENV === "production"
        ? "https://api.snackk.store/payments/cancel"
        : "http://localhost:8080/payments/cancel",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
        credentials: "include",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  const confirmLeave = () => {
    const confirmed = window.confirm("정말 이 페이지를 떠나시겠습니까?");
    return confirmed;
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault(); // 페이지 이동을 멈추기 위한 설정

      // 페이지를 떠나기 전에 실행할 코드 (예: cancel API 호출)
      const shouldRunCancel = window.confirm("정말 페이지를 떠나시겠습니까?");

      if (shouldRunCancel) {
        // 사용자가 "확인"을 누르면 취소 API 호출
        cancel(orderId) // 예: `orderId`를 넘겨서 취소 API 호출
          .then(() => console.log("취소 완료"))
          .catch((error) => console.error("취소 실패:", error));
      }

      // `beforeunload` 이벤트에서의 경고 메시지 표시
      e.returnValue = ""; // 이 부분으로 경고 메시지 발생
    };

    // 창 닫기 및 새로고침, 페이지 이동 방지
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 브라우저 뒤로가기/앞으로가기 감지
    const handlePopState = () => {
      if (confirmLeave()) {
        cancel(orderId)
          .then(() => console.log("취소 완료"))
          .catch((error) => console.error("취소 실패:", error));
      } else {
        history.pushState(null, "", location.href); // 현재 페이지 유지
      }
    };

    window.addEventListener("popstate", handlePopState);

    // 이전 페이지 상태 저장
    history.pushState(null, "", location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [orderId]);
}
