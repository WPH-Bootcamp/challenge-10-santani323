import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type ArticleDetailResponse = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  imagePublicId: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

async function getArticleDetail(): Promise<ArticleDetailResponse> {
  const response = await fetch("https://be-blg-production.up.railway.app/posts/1", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch article detail");
  }

  return response.json();
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function ArticleDetail() {
  const article = await getArticleDetail();

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto pt-20 pb-10 px-4">
        <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
          {article.tags.map((tag, index) => (
            <span key={`${tag}-${index}`}>
              {tag}
              {index < article.tags.length - 1 ? " •" : ""}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-6">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            width={32}
            height={32}
            alt={article.author.name}
            className="rounded-full"
          />
          <span className="text-sm font-medium">{article.author.name}</span>
          <span className="text-xs text-gray-400">{formatDate(article.createdAt)}</span>
        </div>
        <div className="mb-6">
          <img
            src={article.imageUrl}
            width={600}
            height={300}
            alt={article.title}
            className="rounded w-full object-cover"
          />
        </div>
        <div className="prose max-w-none mb-8">
          <p>{article.content}</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <span>Likes: {article.likes}</span>
          <span>Comments: {article.comments}</span>
        </div>
        {/* Comments */}
        <div className="mb-8">
          <h3 className="font-semibold mb-2">Comments({article.comments})</h3>
          <form className="mb-4">
            <input type="text" placeholder="Add your comment..." className="w-full border rounded px-3 py-2 mb-2" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
          </form>
          <div className="space-y-4">
            <div className="flex gap-2 items-start">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" width={32} height={32} alt="user" className="rounded-full" />
              <div>
                <div className="font-medium">James</div>
                <div className="text-sm text-gray-600">Great article, thanks for sharing!</div>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" width={32} height={32} alt="user" className="rounded-full" />
              <div>
                <div className="font-medium">Chitra</div>
                <div className="text-sm text-gray-600">Very informative, I like the roadmap!</div>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <img src="https://randomuser.me/api/portraits/men/45.jpg" width={32} height={32} alt="user" className="rounded-full" />
              <div>
                <div className="font-medium">Michael</div>
                <div className="text-sm text-gray-600">Thanks for the insights, looking forward to more posts!</div>
              </div>
            </div>
          </div>
        </div>
        {/* Another Post */}
        <div className="mt-10">
          <h3 className="font-semibold mb-3">Another Post</h3>
          <div className="flex gap-4 bg-white rounded-lg shadow p-4">
            <img src={article.imageUrl} width={120} height={120} alt={article.title} className="rounded object-cover" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-semibold mb-1">{article.title}</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {article.tags.map((tag, index) => (
                    <span key={`${tag}-${index}`} className="bg-gray-100 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">{article.content}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                <div className="flex items-center gap-2">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" width={24} height={24} alt={article.author.name} className="rounded-full" />
                  <span>{article.author.name}</span>
                </div>
                <span>{formatDate(article.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
