"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Article } from "@/types/blog";
import { useEffect } from "react";
import { useBlogs } from "@/hooks/useBlogs";
import { formatDate } from "@/lib/formater";

interface Person {
  id: number;
  name: string;
  position: string;
  avatar: string;
}

const mockLikes: Person[] = [
  {
    id: 1,
    name: "Clarissa",
    position: "Frontend Developer",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Marco",
    position: "Frontend Developer",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Michael Sailor",
    position: "Frontend Developer",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Jessica Jane",
    position: "Frontend Developer",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Alexandra",
    position: "Frontend Developer",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

const mockComments: Person[] = [
  {
    id: 1,
    name: "John Doe",
    position: "Backend Developer",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "UI Designer",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
];

export default function StatisticButtons(item: Article) {
  const { fetchLikes, fetchComments, likes, comments } = useBlogs();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    fetchLikes({ id: item.id });
  }, [open]);

  useEffect(() => {
    fetchComments({ id: item.id });
  }, [open]);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 hover:underline transition-colors"
      >
        Statistic
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in w-full max-w-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Statistic {item.id}
                </DialogTitle>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Tabs */}
              <TabGroup
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
              >
                <TabList className="flex border-b border-gray-200 px-6">
                  <Tab
                    className={`py-4 px-4 font-medium transition-colors border-b-2 ${
                      selectedIndex === 0
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-600 border-transparent hover:text-gray-900"
                    }`}
                  >
                    👍 Like
                  </Tab>
                  <Tab
                    className={`py-4 px-4 font-medium transition-colors border-b-2 ${
                      selectedIndex === 1
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-600 border-transparent hover:text-gray-900"
                    }`}
                  >
                    💬 Comment
                  </Tab>
                </TabList>

                <TabPanels>
                  {/* Like Tab */}
                  <TabPanel className="py-4">
                    <div className="px-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Like ({likes.length})
                      </h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {likes.map((person) => (
                          <div
                            key={person.id}
                            className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-b-0"
                          >
                            <img
                              src={person.avatarUrl}
                              alt={person.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {person.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {person.headline}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabPanel>

                  {/* Comment Tab */}
                  <TabPanel className="py-4">
                    <div className="px-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Comment ({comments.length})
                      </h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="flex gap-2 items-start py-4"
                          >
                            <img
                              src={comment.author.avatarUrl}
                              width={32}
                              height={32}
                              alt={comment.author.name}
                              className="rounded-full"
                            />

                            <div>
                              <div className="font-medium">
                                {comment.author.name}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {formatDate(comment.createdAt)}
                              </div>
                              <div className="text-sm text-gray-600">
                                {comment.content}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
