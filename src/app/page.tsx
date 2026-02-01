import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/article/ArticleCard";
import ArticleCompact from "@/components/article/ArticleCompact";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16">
        <div className="w-full max-w-5xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Recommend For You */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Recommend For You</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <ArticleCard key={item} item={item.toString()} />
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-end mt-6 gap-2">
              <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-100">
                Previous
              </button>
              <button className="px-3 py-1 rounded border bg-blue-600 text-white">
                1
              </button>
              <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-100">
                3
              </button>
              <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
          {/* Right: Most Liked */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Most Liked</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <ArticleCompact key={item} item={item.toString()} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
