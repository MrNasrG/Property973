import PropertyDetail from "@/components/propertyDetail";

const PropertyDetailPage = async ({ params }) => {
  const { id } = await params;

  return <PropertyDetail listingId={id} />;
};

export default PropertyDetailPage;
