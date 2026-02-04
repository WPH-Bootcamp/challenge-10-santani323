"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import SuccessAlert from "@/components/ui/SuccessAlert";
import { useBlogs } from "@/hooks/useBlogs";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { addPost, loading, error } = useBlogs();

  useEffect(() => {
    if (!coverFile) {
      setCoverPreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(coverFile);
    setCoverPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [coverFile]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!coverFile) {
      setFormError("Please upload a cover image");
      return;
    }

    setFormError(null);

    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      await addPost({
        title,
        content,
        tags: tagsArray,
        image: coverFile,
      });

      setSubmitted(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      setFormError(err?.message || "Failed to create post");
      setSubmitted(false);
    }
  };

  return (
    <>
      <Navbar back={true} title="Write" />
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-gray-900">
                Write Your Post
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Buat postingan baru dengan judul, konten, cover image, dan tag.
              </p>
            </div>

            {submitted && (
              <div className="mb-6">
                <SuccessAlert message="Postingan berhasil disimpan. Redirecting..." />
              </div>
            )}

            {(formError || error) && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {formError || error}
              </div>
            )}

            <Form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Title"
                name="title"
                placeholder="Enter your title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Content
                </label>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 px-3 py-2 text-gray-500">
                    <select
                      aria-label="Heading"
                      className="text-sm bg-transparent outline-none"
                    >
                      <option>Heading 1</option>
                      <option>Heading 2</option>
                      <option>Heading 3</option>
                    </select>
                    <div className="h-5 w-px bg-gray-200" />
                    {[
                      "B",
                      "I",
                      "S",
                      "\u2022",
                      "1.",
                      "\u2190",
                      "\u2192",
                      "\u{1F517}",
                    ].map((tool) => (
                      <button
                        key={tool}
                        type="button"
                        className="text-sm font-medium px-2 py-1 rounded hover:bg-blue-50 hover:text-blue-600"
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your content"
                    className="w-full min-h-[200px] px-4 py-3 text-sm text-gray-700 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cover"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Cover Image
                </label>
                <input
                  id="cover"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setCoverFile(file);
                  }}
                />
                <label
                  htmlFor="cover"
                  className="border-2 border-dashed border-gray-200 rounded-lg w-full h-44 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors overflow-hidden bg-gray-50"
                >
                  {coverPreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={coverPreview}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm">
                        Click to change image
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-500">
                      <p className="text-blue-600 font-medium">
                        Click to upload
                      </p>
                      <p>or drag and drop</p>
                      <p className="text-xs mt-1">PNG or JPG (max. 5MB)</p>
                    </div>
                  )}
                </label>
              </div>

              <InputField
                label="Tags"
                name="tags"
                placeholder="Enter your tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-40"
                  disabled={!title || !content || !coverFile || loading}
                >
                  {loading ? "Publishing..." : "Finish"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
