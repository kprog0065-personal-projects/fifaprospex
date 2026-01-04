"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { CheckCircle, Clock, PlayCircle, Star } from "lucide-react";

interface PendingReview {
  id: string;
  playerName: string;
  age: number;
  position: string;
  taskTitle: string;
  videoUrl: string;
  submittedDate: string;
  status: "pending" | "reviewed";
}

const mockPendingReviews: PendingReview[] = [
  {
    id: "review-1",
    playerName: "Marcus Johnson",
    age: 15,
    position: "Forward",
    taskTitle: "1v1 Dribbling - Right Foot",
    videoUrl: "https://www.youtube.com/embed/PMoHU4r1bjk",
    submittedDate: "2026-01-03",
    status: "pending",
  },
  {
    id: "review-2",
    playerName: "Kai Williams",
    age: 14,
    position: "Midfielder",
    taskTitle: "Ball Mastery Circuit",
    videoUrl: "https://www.youtube.com/embed/c_vXOcpxgh8",
    submittedDate: "2026-01-02",
    status: "pending",
  },
  {
    id: "review-3",
    playerName: "Andre Baptiste",
    age: 16,
    position: "Striker",
    taskTitle: "Finishing Session Video",
    videoUrl: "https://www.youtube.com/embed/c_vXOcpxgh8",
    submittedDate: "2026-01-01",
    status: "reviewed",
  },
];

export default function ScoutProfilePage() {
//   const router = useRouter();
  const [selectedReview, setSelectedReview] = useState<PendingReview | null>(null);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [blockchainHash, setBlockchainHash] = useState("");

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating < 1 || rating > 10) {
      alert("Please select a rating between 1-10");
      return;
    }

    if (!comments.trim()) {
      alert("Please provide feedback comments");
      return;
    }

    setIsSubmitting(true);

    // Simulate blockchain submission
    setTimeout(() => {
      const mockHash = "0x" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setBlockchainHash(mockHash);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setSelectedReview(null);
        setRating(0);
        setComments("");
        setSubmitSuccess(false);
        setBlockchainHash("");
      }, 3000);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Scout Dashboard</h1>
          <p className="text-slate-600">Review player submissions and provide verified on-chain ratings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">2</p>
                <p className="text-sm text-slate-600">Pending Reviews</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">47</p>
                <p className="text-sm text-slate-600">Completed Reviews</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">8.2</p>
                <p className="text-sm text-slate-600">Avg Rating Given</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Reviews List */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Player Submissions</h2>
            <div className="space-y-4">
              {mockPendingReviews.map(review => (
                <div
                  key={review.id}
                  onClick={() => setSelectedReview(review)}
                  className={`bg-white rounded-xl p-6 shadow-md cursor-pointer transition-all hover:shadow-lg ${
                    selectedReview?.id === review.id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{review.playerName}</h3>
                      <p className="text-sm text-slate-600">
                        {review.age} years • {review.position}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        review.status === "pending" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {review.status === "pending" ? "Pending" : "Reviewed"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <PlayCircle className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-medium text-slate-700">{review.taskTitle}</p>
                  </div>

                  <p className="text-xs text-slate-500">Submitted: {review.submittedDate}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Review Panel */}
          <div>
            {selectedReview ? (
              <div className="bg-white rounded-xl p-6 shadow-md sticky top-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Review Submission</h2>

                {/* Video Player */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">{selectedReview.taskTitle}</h3>
                  <div className="rounded-xl overflow-hidden border border-slate-200">
                    <iframe
                      className="w-full aspect-video"
                      src={selectedReview.videoUrl}
                      title={selectedReview.taskTitle}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                {!submitSuccess ? (
                  <form onSubmit={handleSubmitRating} className="space-y-4">
                    {/* Rating Selector */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Rating (1-10) <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setRating(num)}
                            className={`w-10 h-10 rounded-lg font-bold transition-all ${
                              rating === num
                                ? "bg-blue-600 text-white scale-110"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      {rating > 0 && <p className="text-sm text-blue-600 mt-2 font-medium">Selected: {rating}/10</p>}
                    </div>

                    {/* Comments */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Scout Feedback <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={comments}
                        onChange={e => setComments(e.target.value)}
                        placeholder="Provide detailed feedback on technique, strengths, and areas for improvement..."
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={5}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting ? "Submitting to Blockchain..." : "Submit Review On-Chain"}
                    </button>
                  </form>
                ) : (
                  /* Success Message */
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-900 mb-2">Review Submitted!</h3>
                    <p className="text-sm text-green-700 mb-4">Your rating has been recorded on-chain</p>
                    <div className="bg-white rounded-lg p-3 border border-green-300">
                      <p className="text-xs text-green-700 font-medium mb-1">Transaction Hash:</p>
                      <p className="text-xs font-mono break-all text-slate-600">{blockchainHash}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 shadow-md text-center">
                <PlayCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Select a player submission to review</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
