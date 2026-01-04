"use client";

import { useState } from "react";
import { Award, CheckCircle, Clock, TrendingUp, Users } from "lucide-react";

interface AthleteToRate {
  id: string;
  playerName: string;
  age: number;
  position: string;
  taskTitle: string;
  completedDate: string;
  status: "pending" | "rated";
}

interface RatingComparison {
  taskTitle: string;
  playerName: string;
  trainerRating: number;
  scoutRating: number;
  aiRating: number;
  variance: number;
  date: string;
}

const mockAthletesToRate: AthleteToRate[] = [
  {
    id: "rate-1",
    playerName: "Marcus Johnson",
    age: 15,
    position: "Forward",
    taskTitle: "1v1 Dribbling - Right Foot",
    completedDate: "2026-01-03",
    status: "pending",
  },
  {
    id: "rate-2",
    playerName: "Kai Williams",
    age: 14,
    position: "Midfielder",
    taskTitle: "Ball Mastery Circuit",
    completedDate: "2026-01-03",
    status: "pending",
  },
  {
    id: "rate-3",
    playerName: "Andre Baptiste",
    age: 16,
    position: "Striker",
    taskTitle: "Finishing Session",
    completedDate: "2026-01-02",
    status: "rated",
  },
];

const mockRatingHistory: RatingComparison[] = [
  {
    taskTitle: "Speed Training",
    playerName: "James Clarke",
    trainerRating: 8,
    scoutRating: 8.5,
    aiRating: 8.2,
    variance: 0.35,
    date: "2026-01-01",
  },
  {
    taskTitle: "Ball Control",
    playerName: "Sarah Lee",
    trainerRating: 7,
    scoutRating: 7.5,
    aiRating: 7.3,
    variance: 0.4,
    date: "2025-12-28",
  },
  {
    taskTitle: "Passing Accuracy",
    playerName: "David Chen",
    trainerRating: 9,
    scoutRating: 8.8,
    aiRating: 9.1,
    variance: 0.15,
    date: "2025-12-25",
  },
];

export default function TrainerProfilePage() {
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteToRate | null>(null);
  const [rating, setRating] = useState(0);
  const [observationNotes, setObservationNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [blockchainHash, setBlockchainHash] = useState("");

  // Calculate trainer reputation metrics
  const avgVariance = mockRatingHistory.reduce((acc, r) => acc + r.variance, 0) / mockRatingHistory.length;
  const accuracyScore = Math.max(0, 100 - avgVariance * 20); // Lower variance = higher accuracy
  const reputationLevel =
    accuracyScore >= 90 ? "Elite" : accuracyScore >= 75 ? "Verified" : accuracyScore >= 60 ? "Growing" : "New";

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating < 1 || rating > 10) {
      alert("Please select a rating between 1-10");
      return;
    }

    if (!observationNotes.trim()) {
      alert("Please provide observation notes");
      return;
    }

    setIsSubmitting(true);

    // Simulate blockchain submission
    setTimeout(() => {
      const mockHash = "0x" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setBlockchainHash(mockHash);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setSelectedAthlete(null);
        setRating(0);
        setObservationNotes("");
        setSubmitSuccess(false);
        setBlockchainHash("");
      }, 3000);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Reputation Badge */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Trainer Dashboard</h1>
              <p className="text-slate-600">Rate athlete drills you observed in-person</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-blue-500">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-xs text-slate-500">Reputation Level</p>
                  <p className="text-xl font-bold text-blue-600">{reputationLevel}</p>
                  <p className="text-xs text-slate-500">{accuracyScore.toFixed(0)}% Accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">2</p>
                <p className="text-sm text-slate-600">Pending Ratings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">156</p>
                <p className="text-sm text-slate-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">23</p>
                <p className="text-sm text-slate-600">Athletes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">+12%</p>
                <p className="text-sm text-slate-600">Accuracy Growth</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reputation Explainer */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-900 mb-1">How Reputation Works</p>
              <p className="text-xs text-blue-700">
                Your ratings are compared with Scout reviews and AI analysis. The closer your ratings align over time,
                the higher your reputation score and the more weight your ratings carry. Current weight:{" "}
                <span className="font-bold">0.7x</span> (will increase as you reach Elite level)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Athletes to Rate */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Athletes to Rate</h2>
            <div className="space-y-4">
              {mockAthletesToRate.map(athlete => (
                <div
                  key={athlete.id}
                  onClick={() => athlete.status === "pending" && setSelectedAthlete(athlete)}
                  className={`bg-white rounded-xl p-6 shadow-md transition-all ${
                    athlete.status === "pending" ? "cursor-pointer hover:shadow-lg" : "opacity-50 cursor-not-allowed"
                  } ${selectedAthlete?.id === athlete.id ? "ring-2 ring-blue-500" : ""}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{athlete.playerName}</h3>
                      <p className="text-sm text-slate-600">
                        {athlete.age} years • {athlete.position}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        athlete.status === "pending" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {athlete.status === "pending" ? "Needs Rating" : "Rated"}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-700 mb-2">{athlete.taskTitle}</p>
                  <p className="text-xs text-slate-500">Completed: {athlete.completedDate}</p>
                  <p className="text-xs text-blue-600 mt-2 font-medium">⏱️ In-person observation required</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Form or History */}
          <div>
            {selectedAthlete ? (
              <div className="bg-white rounded-xl p-6 shadow-md sticky top-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Submit Rating</h2>

                <div className="bg-slate-50 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-1">{selectedAthlete.playerName}</h3>
                  <p className="text-xs text-slate-600">{selectedAthlete.taskTitle}</p>
                  <p className="text-xs text-slate-500 mt-2">Observed: {selectedAthlete.completedDate}</p>
                </div>

                {!submitSuccess ? (
                  <form onSubmit={handleSubmitRating} className="space-y-4">
                    {/* Rating Selector */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Performance Rating (1-10) <span className="text-red-500">*</span>
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

                    {/* Observation Notes */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        In-Person Observations <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={observationNotes}
                        onChange={e => setObservationNotes(e.target.value)}
                        placeholder="Describe what you observed during the drill: technique, effort, improvement areas, form quality..."
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={5}
                      />
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-xs text-amber-800">
                        <span className="font-semibold">Note:</span> Your rating will be weighted at 0.7x and compared
                        with Scout + AI ratings. Consistent accuracy improves your reputation.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting ? "Submitting to Blockchain..." : "Submit Rating On-Chain"}
                    </button>
                  </form>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-900 mb-2">Rating Submitted!</h3>
                    <p className="text-sm text-green-700 mb-4">Your rating has been recorded on-chain</p>
                    <div className="bg-white rounded-lg p-3 border border-green-300">
                      <p className="text-xs text-green-700 font-medium mb-1">Transaction Hash:</p>
                      <p className="text-xs font-mono break-all text-slate-600">{blockchainHash}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Rating History */
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Rating History & Accuracy</h2>
                <div className="space-y-3">
                  {mockRatingHistory.map((record, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{record.playerName}</p>
                          <p className="text-xs text-slate-600">{record.taskTitle}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            record.variance < 0.3
                              ? "bg-green-100 text-green-700"
                              : record.variance < 0.5
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {record.variance < 0.3 ? "Excellent" : record.variance < 0.5 ? "Good" : "Fair"}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center bg-blue-50 rounded p-2">
                          <p className="font-semibold text-blue-900">{record.trainerRating}</p>
                          <p className="text-blue-600">You</p>
                        </div>
                        <div className="text-center bg-purple-50 rounded p-2">
                          <p className="font-semibold text-purple-900">{record.scoutRating}</p>
                          <p className="text-purple-600">Scout</p>
                        </div>
                        <div className="text-center bg-cyan-50 rounded p-2">
                          <p className="font-semibold text-cyan-900">{record.aiRating}</p>
                          <p className="text-cyan-600">AI</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">{record.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
