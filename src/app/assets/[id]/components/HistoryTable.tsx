"use client";

import { formatCurrency } from "@/app/functions/currency";
import { Asset } from "../page";
import Image from "next/image";
import Link from "next/link";
import { deleteEntry } from "../../actions";
import Dialog from "@/app/components/ui/Dialog";
import { useState } from "react";

export default function HistoryTable({ asset }: { asset: Asset }) {
  const [deleteEntryId, setDeleteEntryId] = useState<number | null>(null);

  function onClose() {
    setDeleteEntryId(null); // Reset deleteEntryId state when dialog is closed
  }

  function onOk(entryId: number | null) {
    // Call deleteEntry function with entryId
    if (entryId) {
      deleteEntry(entryId);
      setDeleteEntryId(null); // Reset deleteEntryId state after deletion
    }
  }

  return (
    <>
      <Dialog title="Delete Entry" onClose={onClose} onOk={() => onOk(deleteEntryId)}>
        <p>
          Are you sure you want to delete this entry? <br />
          THIS ACTION CANNOT BE UNDONE.
        </p>
      </Dialog>

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
                  <Link href={`#`}>
                    <Image alt="edit" width="20" height="20" src="/icons/edit.png" />
                  </Link>
                  <Link href={`?showDialog=y&entryId=${entry.id}`} onClick={() => setDeleteEntryId(entry.id)}>
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
