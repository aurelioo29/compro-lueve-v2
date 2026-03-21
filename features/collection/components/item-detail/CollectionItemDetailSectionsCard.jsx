"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  GripVertical,
  Pencil,
  Plus,
  Rows3,
  Trash2,
} from "lucide-react";
import { useReorderCollectionDetailSections } from "../../hooks/useReorderCollectionDetailSections";
import { useReorderCollectionDetailItems } from "../../hooks/useReorderCollectionDetailItems";
import CollectionDetailSectionFormModal from "./CollectionDetailSectionFormModal";
import CollectionDetailSectionDeleteModal from "./CollectionDetailSectionDeleteModal";
import CollectionDetailItemFormModal from "./CollectionDetailItemFormModal";
import CollectionDetailItemDeleteModal from "./CollectionDetailItemDeleteModal";

import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function sortSections(sections = []) {
  return [...sections].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

function sortDetailItems(items = []) {
  return [...items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

function SortableSectionWrapper({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? "z-10 opacity-70" : ""}
    >
      {children({ dragHandleProps: { ...attributes, ...listeners } })}
    </div>
  );
}

function SortableDetailItemRow({
  detailItem,
  detailIndex,
  detailItemsLength,
  section,
  isReorderingDetailItems = false,
  onMoveUp = () => {},
  onMoveDown = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: detailItem.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`bg-white ${isDragging ? "opacity-70" : ""}`}
    >
      <td className="rounded-l-xl border-y border-l border-[#eef0f4] px-4 py-4 align-middle">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#6b7280] hover:bg-[#f9fafb] cursor-grab active:cursor-grabbing"
          aria-label="Drag detail item"
        >
          <GripVertical size={16} />
        </button>
      </td>

      <td className="border-y border-[#eef0f4] px-4 py-4 text-sm font-semibold text-[#111827]">
        {detailItem.label || "-"}
      </td>

      <td className="border-y border-[#eef0f4] px-4 py-4 text-sm text-[#4b5563]">
        {detailItem.value || "-"}
      </td>

      <td className="border-y border-[#eef0f4] px-4 py-4 text-sm text-[#6b7280]">
        {detailItem.sortOrder ?? 0}
      </td>

      <td className="rounded-r-xl border-y border-r border-[#eef0f4] px-4 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onMoveUp(section, detailIndex)}
            disabled={detailIndex === 0 || isReorderingDetailItems}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUp size={16} />
          </button>

          <button
            type="button"
            onClick={() => onMoveDown(section, detailIndex)}
            disabled={
              detailIndex === detailItemsLength - 1 || isReorderingDetailItems
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowDown size={16} />
          </button>

          <button
            type="button"
            onClick={() => onEdit(detailItem, section.id)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(detailItem)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#fee2e2] text-[#dc2626] hover:bg-[#fff5f5]"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function DetailItemsTable({
  item,
  section,
  detailItems = [],
  isReorderingDetailItems = false,
  sensors,
  onMoveUp = () => {},
  onMoveDown = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onAdd = () => {},
  onDragEnd = () => {},
}) {
  return (
    <div className="mt-5 rounded-[20px] border border-[#e5e7eb] bg-[#fafafa] p-4">
      <div className="flex flex-col gap-3 border-b border-[#e5e7eb] pb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Rows3 size={16} className="text-[#6b7280]" />
          <p className="text-sm font-semibold text-[#374151]">Detail Items</p>
          <span className="rounded-full border border-[#e5e7eb] bg-white px-2.5 py-1 text-xs font-medium text-[#6b7280]">
            {detailItems.length} rows
          </span>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#f3f4f6]"
        >
          <Plus size={15} />
          Add Detail Item
        </button>
      </div>

      {detailItems.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={detailItems.map((detailItem) => detailItem.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left">
                    {["", "Label", "Value", "Order", "Actions"].map((head) => (
                      <th
                        key={head}
                        className="border border-[#eef0f4] bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b7280] first:rounded-l-xl last:rounded-r-xl"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {detailItems.map((detailItem, detailIndex) => (
                    <SortableDetailItemRow
                      key={detailItem.id}
                      detailItem={detailItem}
                      detailIndex={detailIndex}
                      detailItemsLength={detailItems.length}
                      section={section}
                      isReorderingDetailItems={isReorderingDetailItems}
                      onMoveUp={onMoveUp}
                      onMoveDown={onMoveDown}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="mt-4 rounded-[16px] border border-dashed border-[#d1d5db] bg-white px-6 py-10 text-center">
          <p className="text-sm text-[#6b7280]">
            No detail items yet in this section.
          </p>
        </div>
      )}
    </div>
  );
}

export default function CollectionItemDetailSectionsCard({
  item,
  createOpenSignal = 0,
}) {
  const [sectionFormOpen, setSectionFormOpen] = useState(false);
  const [sectionDeleteOpen, setSectionDeleteOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const [detailItemFormOpen, setDetailItemFormOpen] = useState(false);
  const [detailItemDeleteOpen, setDetailItemDeleteOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState(null);

  const { mutateAsync: reorderSections, isPending: isReorderingSections } =
    useReorderCollectionDetailSections();

  const {
    mutateAsync: reorderDetailItems,
    isPending: isReorderingDetailItems,
  } = useReorderCollectionDetailItems();

  const sections = useMemo(
    () => sortSections(item?.detailSections || []),
    [item?.detailSections],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    if (createOpenSignal > 0) {
      setSelectedSection(null);
      setSectionFormOpen(true);
    }
  }, [createOpenSignal]);

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

  async function handleSectionDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((section) => section.id === active.id);
    const newIndex = sections.findIndex((section) => section.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const moved = arrayMove(sections, oldIndex, newIndex);

    const payload = moved.map((section, index) => ({
      id: section.id,
      sortOrder: index,
    }));

    await reorderSections({
      itemId: item.id,
      payload,
    });
  }

  async function handleDetailItemDragEnd(section, event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const detailItems = sortDetailItems(section.items || []);
    const oldIndex = detailItems.findIndex((row) => row.id === active.id);
    const newIndex = detailItems.findIndex((row) => row.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const moved = arrayMove(detailItems, oldIndex, newIndex);

    const payload = moved.map((detailItem, index) => ({
      id: detailItem.id,
      sortOrder: index,
    }));

    await reorderDetailItems({
      itemId: item.id,
      payload,
    });
  }

  async function handleMoveSectionUp(index) {
    if (index <= 0) return;
    await reorderSection(index, index - 1);
  }

  async function handleMoveSectionDown(index) {
    if (index >= sections.length - 1) return;
    await reorderSection(index, index + 1);
  }

  async function reorderItemsWithinSection(section, currentIndex, nextIndex) {
    const items = sortDetailItems(section.items || []);
    const updated = [...items];
    const [moved] = updated.splice(currentIndex, 1);
    updated.splice(nextIndex, 0, moved);

    const payload = updated.map((detailItem, index) => ({
      id: detailItem.id,
      sortOrder: index,
    }));

    await reorderDetailItems({
      itemId: item.id,
      payload,
    });
  }

  async function handleMoveDetailItemUp(section, index) {
    if (index <= 0) return;
    await reorderItemsWithinSection(section, index, index - 1);
  }

  async function handleMoveDetailItemDown(section, index) {
    const items = sortDetailItems(section.items || []);
    if (index >= items.length - 1) return;
    await reorderItemsWithinSection(section, index, index + 1);
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
              Structure technical information into sections and rows that are
              easy to scan and maintain.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedSection(null);
              setSectionFormOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#4f7df3] px-4 py-2.5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(79,125,243,0.22)] hover:bg-[#3e6ee8]"
          >
            <Plus size={16} />
            Create Section
          </button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleSectionDragEnd}
        >
          <SortableContext
            items={sections.map((section) => section.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="mt-6 space-y-5">
              {sections.length > 0 ? (
                sections.map((section, index) => {
                  const detailItems = sortDetailItems(section.items || []);

                  return (
                    <SortableSectionWrapper key={section.id} id={section.id}>
                      {({ dragHandleProps }) => (
                        <div className="rounded-[22px] border border-[#eef0f4] bg-white p-5 shadow-[0_6px_20px_rgba(17,24,39,0.03)]">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  {...dragHandleProps}
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#6b7280] hover:bg-[#f9fafb] cursor-grab active:cursor-grabbing"
                                  aria-label="Drag section"
                                >
                                  <GripVertical size={16} />
                                </button>

                                <h4 className="text-[20px] font-bold tracking-[-0.02em] text-[#111827]">
                                  {section.title || "-"}
                                </h4>

                                <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-semibold text-[#6b7280]">
                                  sort {section.sortOrder ?? 0}
                                </span>

                                <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-semibold text-[#1d4ed8]">
                                  {detailItems.length} rows
                                </span>
                              </div>

                              <p className="mt-2 text-sm text-[#6b7280]">
                                Organize the specification rows under this
                                section.
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleMoveSectionUp(index)}
                                disabled={index === 0 || isReorderingSections}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                <ArrowUp size={16} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleMoveSectionDown(index)}
                                disabled={
                                  index === sections.length - 1 ||
                                  isReorderingSections
                                }
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                <ArrowDown size={16} />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedSection(section);
                                  setSectionFormOpen(true);
                                }}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]"
                              >
                                <Pencil size={16} />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedSection(section);
                                  setSectionDeleteOpen(true);
                                }}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#fee2e2] text-[#dc2626] hover:bg-[#fff5f5]"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          <DetailItemsTable
                            item={item}
                            section={section}
                            detailItems={detailItems}
                            isReorderingDetailItems={isReorderingDetailItems}
                            sensors={sensors}
                            onMoveUp={handleMoveDetailItemUp}
                            onMoveDown={handleMoveDetailItemDown}
                            onEdit={(detailItem, sectionId) => {
                              setSelectedDetailItem(detailItem);
                              setActiveSectionId(sectionId);
                              setDetailItemFormOpen(true);
                            }}
                            onDelete={(detailItem) => {
                              setSelectedDetailItem(detailItem);
                              setDetailItemDeleteOpen(true);
                            }}
                            onAdd={() => {
                              setSelectedDetailItem(null);
                              setActiveSectionId(section.id);
                              setDetailItemFormOpen(true);
                            }}
                            onDragEnd={(event) =>
                              handleDetailItemDragEnd(section, event)
                            }
                          />
                        </div>
                      )}
                    </SortableSectionWrapper>
                  );
                })
              ) : (
                <div className="rounded-[20px] border border-dashed border-[#d1d5db] bg-[#fafafa] px-6 py-12 text-center">
                  <p className="text-sm text-[#6b7280]">
                    No detail sections yet. Create one to start structuring the
                    item specifications.
                  </p>
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <CollectionDetailSectionFormModal
        open={sectionFormOpen}
        onClose={() => {
          setSectionFormOpen(false);
          setSelectedSection(null);
        }}
        itemId={item?.id}
        section={selectedSection}
      />

      <CollectionDetailSectionDeleteModal
        open={sectionDeleteOpen}
        onClose={() => {
          setSectionDeleteOpen(false);
          setSelectedSection(null);
        }}
        section={selectedSection}
        itemId={item?.id}
      />

      <CollectionDetailItemFormModal
        open={detailItemFormOpen}
        onClose={() => {
          setDetailItemFormOpen(false);
          setSelectedDetailItem(null);
          setActiveSectionId(null);
        }}
        itemId={item?.id}
        sectionId={activeSectionId}
        detailItem={selectedDetailItem}
      />

      <CollectionDetailItemDeleteModal
        open={detailItemDeleteOpen}
        onClose={() => {
          setDetailItemDeleteOpen(false);
          setSelectedDetailItem(null);
        }}
        detailItem={selectedDetailItem}
        itemId={item?.id}
      />
    </>
  );
}
