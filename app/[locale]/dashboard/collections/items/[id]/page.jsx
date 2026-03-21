import CollectionItemDetailPageContent from "@/features/collection/components/item-detail/CollectionItemDetailPageContent";

export default async function CollectionItemDetailPage({ params }) {
  const resolvedParams = await params;

  return <CollectionItemDetailPageContent id={resolvedParams.id} />;
}
