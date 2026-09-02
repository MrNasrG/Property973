import AddListingFlow from "@/components/addListing/AddListingFlow";
import Footer from "@/components/footer";
import Header from "@/components/Header/Header";

export default function AddListingPage() {
  return (
    <main className="min-h-screen bg-[#f4f7f8]">
      <Header />
      <AddListingFlow />
      <Footer />
    </main>
  );
}
