import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ArticleDetail() {
  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto pt-20 pb-10 px-4">
        <h1 className="text-2xl font-bold mb-2">5 Reasons to Learn Frontend Development in 2025</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span>Programming</span>
          <span>•</span>
          <span>Frontend</span>
          <span>•</span>
          <span>Coding</span>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" width={32} height={32} alt="author" className="rounded-full" />
          <span className="text-sm font-medium">John Doe</span>
          <span className="text-xs text-gray-400">2 May 2025</span>
        </div>
        <div className="mb-6">
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=600&h=300&q=80" width={600} height={300} alt="cover" className="rounded w-full object-cover" />
        </div>
        <div className="prose max-w-none mb-8">
          <p>Frontend development is more important today thanks to user interfaces! In this article you’ll get five reasons why you should learn frontend development in 2025.</p>
          <ol>
            <li><b>High Industry Demand</b><br />
              There is a huge need for skilled frontend developers, and companies are looking for talented designers to help them build beautiful, efficient, and accessible web applications.
            </li>
            <li><b>Powerful Beginner-Friendly Tools</b><br />
              JavaScript frameworks and libraries make it easier than ever to start your frontend career. The growing ecosystem means you can build amazing things quickly and easily.
            </li>
            <li><b>Creative Freedom</b><br />
              Frontend development lets you bring your visual ideas to life. For artistic expression or UX, your imagination is the only limit!
            </li>
            <li><b>Rapid Career Growth</b><br />
              Frontend skills are in demand. You can move up quickly, find a variety of project types and even work remotely.
            </li>
            <li><b>Essential for Fullstack Development</b><br />
              Understanding the frontend is crucial if you want to become a fullstack developer. It complements backend knowledge for a more complete skillset.
            </li>
          </ol>
          <p><b>Conclusion:</b> Frontend development is a valuable investment of your time and effort. If you want to build beautiful, interactive, and modern web applications, start learning frontend development today!</p>
        </div>
        {/* Comments */}
        <div className="mb-8">
          <h3 className="font-semibold mb-2">Comments(3)</h3>
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
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=120&h=120&q=80" width={120} height={120} alt="cover" className="rounded object-cover" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-semibold mb-1">5 Reasons to Learn Frontend Development in 2025</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded">Programming</span>
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded">Frontend</span>
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded">Coding</span>
                </div>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">Frontend development is crucial for building beautiful and interactive user experiences. Here are five key reasons why you should consider learning frontend development this year.</p>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                <div className="flex items-center gap-2">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" width={24} height={24} alt="author" className="rounded-full" />
                  <span>John Doe</span>
                </div>
                <span>2 May 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
