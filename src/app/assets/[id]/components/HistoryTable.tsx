"use client";

import { formatCurrency } from "@/app/functions/currency";
import { Asset } from "../page";
import Image from "next/image";
import Link from "next/link";
import { deleteEntry, updateEntry } from "../../actions";
import Dialog from "@/app/components/ui/Dialog";
import { useState, useRef } from "react";

const inputClass =
  "appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

export default function HistoryTable({ asset }: { asset: Asset }) {
  const [deleteEntryId, setDeleteEntryId] = useState<number | null>(null);
  const [editEntryId, setEditEntryId] = useState<number | null>(null);

  // Refs for the input fields
  const valueInputRef = useRef<HTMLInputElement>(null);
  const updatedAtInputRef = useRef<HTMLInputElement>(null);

  function onDeleteClose() {
    setDeleteEntryId(null); // Reset deleteEntryId state when dialog is closed
  }

  function onEditClose() {
    setEditEntryId(null); // Reset deleteEntryId state when dialog is closed
  }

  function onDeleteOk(entryId: number | null) {
    // Call deleteEntry function with entryId
    if (entryId) {
      deleteEntry(entryId);
      setDeleteEntryId(null); // Reset deleteEntryId state after deletion
    }
  }

  function onEditEntryOk(entryId: number | null) {
    if (entryId !== null) {
      const editedValue = valueInputRef.current!.value;
      const editedDate = updatedAtInputRef.current!.value;
      const editedId = asset.value_history[entryId].id;

      updateEntry(editedId, parseFloat(editedValue), editedDate);

      setEditEntryId(null);
    }
  }

  return (
    <>
      {deleteEntryId && (
        <Dialog title="Delete Entry" onClose={onDeleteClose} onOk={() => onDeleteOk(deleteEntryId)}>
          <p>
            Are you sure you want to delete this entry? <br />
            THIS ACTION CANNOT BE UNDONE.
          </p>
        </Dialog>
      )}

      {editEntryId !== null && (
        <Dialog title="Edit Entry" onClose={onEditClose} onOk={() => onEditEntryOk(editEntryId)}>
          <div>
            <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="value">
              Value:
            </label>
            <input
              ref={valueInputRef}
              id="value"
              className={inputClass}
              type="number"
              defaultValue={asset.value_history[editEntryId].value!}
            />
          </div>
          <div>
            <label className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2" htmlFor="updated_at">
              Date:
            </label>
            <input
              ref={updatedAtInputRef}
              id="update_at"
              className={inputClass}
              type="date"
              max={new Date().toISOString().split("T")[0]}
              defaultValue={asset.value_history[editEntryId].updated_at?.toISOString().split("T")[0]}
            />
          </div>
        </Dialog>
      )}

      <table className="table table-zebra table-sm md:table-md">
        <thead>
          <tr>
            <th>Date</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {asset.value_history.map((entry, index) => (
            <tr key={index}>
              <td>{entry.updated_at?.toDateString()}</td>
              <td>{formatCurrency(entry.value).trim().slice(0, -3)}</td>
              <td className="flex justify-end text-right min-w-20">
                <div className="flex gap-3">
                  <Link href={`?showDialog=y`} onClick={() => setEditEntryId(index)}>
                    <Image alt="edit" width="20" height="20" src="/icons/edit.png" />
                  </Link>
                  <Link href={`?showDialog=y`} onClick={() => setDeleteEntryId(entry.id)}>
                    <Image alt="delete" width="20" height="20" src="/icons/recycle-bin.png" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
