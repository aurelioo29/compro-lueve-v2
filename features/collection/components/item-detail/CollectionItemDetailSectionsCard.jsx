"use client";

import { useMemo, useState } from "react";
import { ArrowUp, ArrowDown, Pencil, Plus, Trash2 } from "lucide-react";
import { useReorderCollectionDetailSections } from "../../hooks/useReorderCollectionDetailSections";
import CollectionDetailSectionFormModal from "./CollectionDetailSectionFormModal";
import CollectionDetailSectionDeleteModal from "./CollectionDetailSectionDeleteModal";

function sortSections(sections = []) {
  return [...sections].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export default function CollectionItemDetailSectionsCard({ item }) {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const { mutateAsync: reorderSections, isPending: isReordering } =
    useReorderCollectionDetailSections();

  const sections = useMemo(
    () => sortSections(item?.detailSections || []),
    [item?.detailSections],
  );

  async function reorderSection(currentIndex, nextIndex) {
    const updated = [...sections];
    const [moved] = updated.splice(currentIndex, 1);
    updated.splice(nextIndex, 0, moved);

    const payload = updated.map((section, index) => ({
      id: section.id,
      sortOrder: index,
    }));

    await reorderSections({
      itemId: item.id,
      payload,
    });
  }

  async function handleMoveUp(index) {
    if (index <= 0) return;
    await reorderSection(index, index - 1);
  }

  async function handleMoveDown(index) {
    if (index >= sections.length - 1) return;
    await reorderSection(index, index + 1);
  }

  return (
    <>
      <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
        <div className="flex flex-col gap-4 border-b border-[#eef0f4] pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-[20px] font-bold text-[#111827]">
              Detail Sections
            </h3>
            <p className="mt-1 text-sm text-[#6b7280]">
              Create and organize detail blocks such as Centre Diamond, Metal,
              or Side Diamond.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedSection(null);
              setFormOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#4f7df3] px-4 py-2.5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(79,125,243,0.22)] hover:bg-[#3e6ee8]"
          >
            <Plus size={16} />
            Create Section
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {sections.length > 0 ? (
            sections.map((section, index) => (
              <div
                key={section.id}
                className="rounded-[22px] border border-[#eef0f4] bg-white p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-[#111827]">
                      {section.title || "-"}
                    </p>
                    <p className="mt-2 text-sm text-[#6b7280]">
                      Sort Order: {section.sortOrder ?? 0}
                    </p>
                    <p className="mt-1 text-sm text-[#9ca3af]">
                      Detail Items: {section.items?.length ?? 0}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0 || isReordering}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowUp size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === sections.length - 1 || isReordering}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowDown size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSection(section);
                        setFormOpen(true);
                      }}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSection(section);
                        setDeleteOpen(true);
                      }}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#fee2e2] text-[#dc2626] hover:bg-[#fff5f5]"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[20px] border border-dashed border-[#d1d5db] bg-[#fafafa] px-6 py-12 text-center">
              <p className="text-sm text-[#6b7280]">
                No detail sections yet. Create one to start structuring the item
                specifications.
              </p>
            </div>
          )}
        </div>
      </div>

      <CollectionDetailSectionFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedSection(null);
        }}
        itemId={item?.id}
        section={selectedSection}
      />

      <CollectionDetailSectionDeleteModal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedSection(null);
        }}
        section={selectedSection}
        itemId={item?.id}
      />
    </>
  );
}
