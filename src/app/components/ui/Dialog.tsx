"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";

type Props = {
  title: string;
  onClose: () => void;
  onOk: () => void;
  children: React.ReactNode;
};

import React from "react";

export default function Dialog({ title, onClose, onOk, children }: Props) {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("showDialog");
  const router = useRouter();

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose();
    router.back();
  };

  const clickOk = () => {
    onOk();
    closeDialog();
  };

  const dialog: JSX.Element | null =
    showDialog === "y" ? (
      <dialog
        ref={dialogRef}
        className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-xl border backdrop:bg-gray-800/50"
      >
        <div className="w-[500px] max-w-fullbg-gray-200 flex flex-col">
          <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-gray-400 p-3">
            <h1 className="text-2xl">{title}</h1>
          </div>
          <div className="px-5 pb-6">
            {children}
            <div className="flex flex-row justify-end mt-4">
              <button onClick={closeDialog} className="btn btn-neutral btn-outline me-2">
                Cancel
              </button>
              <button onClick={clickOk} className="btn btn-primary btn-outline">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </dialog>
    ) : null;

  return dialog;
}
