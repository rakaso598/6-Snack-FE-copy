import React, { ChangeEvent } from "react";
import { FormProvider } from "react-hook-form";
import FormInput from "./FormInput";
import Dropdown from "./DropDown";
import photoIcon from "@/assets/icons/ic_photo.svg";
import Image from "next/image";
import { useProductRegistrationForm } from "@/hooks/useProductRegistrationForm";
import XIconSvg from "../svg/XIconSvg";
import Button from "../ui/Button";

type TProductData = {
  productName: string;
  price: string;
  productLink: string;
  parentCategory: string;
  childrenCategory: string;
  imageUrl?: string;
};

type TProductRegistrationFormProps = {
  onSubmitSuccess?: () => void;
  onClose?: () => void;
  initialData?: TProductData;
};

export default function ProductRegistrationForm({
  onSubmitSuccess,
  onClose,
  initialData,
}: TProductRegistrationFormProps) {
  const {
    form,
    imagePreviewUrl,
    createProductMutation,
    parentCategoryOptions,
    childrenCategoryOptions,
    handleImageChange,
    handleImageRemove,
    handleParentCategoryChange,
    handleChildrenCategoryChange,
    onSubmit,
  } = useProductRegistrationForm({
    onSubmitSuccess,
    onClose,
    initialData,
  });

  const { formState } = form;
  const imageFileError = formState.errors.imageFile?.message;

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0]);
    }
  };

  return (
    <FormProvider {...form}>
      <div className="w-full h-full sm:w-[512px] sm:max-h-[750px] sm:fixed sm:inset-0 sm:top-1/2 sm:left-1/2 sm:-translate-1/2 rounded-[6px] sm:p-[30px] bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.14)] flex flex-col sm:gap-[36px] items-center">
        <div className="w-full h-full flex flex-col p-6 sm:p-0">
          <div className="flex justify-center items-center p-2 -m-6 sm:mt-0 sm:p-0 mb-[30px] font-bold text-lg/[22px] tracking-tight">
            상품 등록
          </div>
          <div className="flex flex-col items-center mb-[30px]">
            <div className="flex justify-center items-center relative">
              {!imagePreviewUrl ? (
                <label
                  htmlFor="imageUpload"
                  className="w-[140px] h-[140px] flex flex-col items-center justify-center border border-primary-200 rounded-[2px] text-primary-400 cursor-pointer hover:bg-primary-100"
                >
                  <div className="relative w-[30px] h-[30px]">
                    <Image src={photoIcon} fill alt="사진 아이콘" className="object-contain" />
                  </div>
                  <input id="imageUpload" type="file" accept="image/*" onChange={onImageChange} className="hidden" />
                </label>
              ) : (
                <>
                  <div className="w-[140px] h-[140px] flex flex-col items-center justify-center border border-primary-200 rounded-[2px]">
                    <div className="relative w-[75%] h-[75%]">
                      <Image src={imagePreviewUrl} alt="Product Preview" fill className="object-contain" />
                    </div>
                  </div>
                  <button
                    onClick={handleImageRemove}
                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary-50 rounded-full p-1 border-1 border-primary-100"
                    aria-label="Remove image"
                  >
                    <XIconSvg className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            {imageFileError && <div className="mt-2 text-sm text-red-500 text-center">{imageFileError}</div>}
          </div>
          <form onSubmit={onSubmit} className="w-full flex flex-col gap-[20px] sm:gap-[32px]">
            <div className="flex gap-4 w-full">
              <div className="flex-1">
                <Dropdown
                  options={parentCategoryOptions}
                  placeholder="대분류"
                  onChange={handleParentCategoryChange}
                  className="w-full"
                  height="h-14"
                />
              </div>
              <div className="flex-1">
                <Dropdown
                  options={childrenCategoryOptions}
                  placeholder="소분류"
                  onChange={handleChildrenCategoryChange}
                  className="w-full"
                  height="h-14"
                  disabled={!parentCategoryOptions.includes(form.watch("parentCategory"))}
                />
              </div>
            </div>
            <div className="w-full">
              <FormInput name="productName" placeholder="상품명을 입력해주세요" label="상품명" />
            </div>
            <div className="w-full">
              <FormInput name="price" type="text" placeholder="가격을 입력해주세요" label="가격" />
            </div>
            <div className="w-full">
              <FormInput name="productLink" type="text" placeholder="제품 링크를 입력해주세요" label="제품 링크" />
            </div>
          </form>
        </div>

        <div className="flex justify-between w-full p-6 sm:p-0 gap-5">
          <Button
            type="white"
            label="취소"
            onClick={() => {
              if (onClose) {
                onClose();
              }
            }}
            disabled={createProductMutation.isPending}
            className="w-full sm:w-[216px] h-[64px]"
          />
          <Button
            type={createProductMutation.isPending || !formState.isValid ? "grayDisabled" : "black"}
            label={createProductMutation.isPending ? "등록중..." : "등록하기"}
            onClick={onSubmit}
            disabled={createProductMutation.isPending || !formState.isValid}
            className="w-full sm:w-[216px] h-[64px]"
          />
        </div>
      </div>
    </FormProvider>
  );
}
