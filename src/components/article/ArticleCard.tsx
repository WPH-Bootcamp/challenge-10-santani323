"use client";

type ArticleCardProps = {
  item: string;
};

export default function ArticleCard({ item }: ArticleCardProps) {
  return (
    <div
      key={item}
      className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4"
    >
      <img
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=120&h=120&q=80"
        alt="cover"
        className="w-full md:w-32 h-32 object-cover rounded"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold mb-1">
            5 Reasons to Learn Frontend Development in 2025
          </h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-gray-100 text-xs px-2 py-1 rounded">
              Programming
            </span>
            <span className="bg-gray-100 text-xs px-2 py-1 rounded">
              Frontend
            </span>
            <span className="bg-gray-100 text-xs px-2 py-1 rounded">
              Coding
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            Frontend development is crucial for building beautiful and
            interactive user experiences. Here are five key reasons why you
            should consider learning frontend development this year.
          </p>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
          <div className="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="author"
              className="w-6 h-6 rounded-full"
            />
            <span>John Doe</span>
          </div>
          <span>2 May 2025</span>
        </div>
      </div>
    </div>
  );
}
