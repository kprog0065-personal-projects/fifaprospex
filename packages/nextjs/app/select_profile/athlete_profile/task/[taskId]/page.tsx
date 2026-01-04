"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";

const mockTaskDetails = {
  "task-1": {
    title: "1v1 Dribbling - Right Foot",
    description:
      "Beat a defender in a 1v1 using your right foot. Focus on quick touches, change of pace, and protecting the ball.",
    exampleVideoUrl: "https://www.youtube.com/embed/c_vXOcpxgh8",
    coachingPoints: [
      "Start slowly, then explode past the cone/defender.",
      "Keep the ball close with the outside of your right foot.",
      "Use a feint or body fake before accelerating.",
    ],
  },
  "task-2": {
    title: "U10 Match vs. Point Fortin",
    description: "Full match recording for scout review.",
    exampleVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    coachingPoints: [
      "Focus on positioning and decision-making.",
      "Communicate with teammates.",
      "Show effort and tactical awareness.",
    ],
  },
  "task-3": {
    title: "Ball Mastery Circuit",
    description: "Complete a 30-second ball mastery circuit focusing on both feet and control in tight spaces.",
    exampleVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    coachingPoints: [
      "Stay on your toes and keep your head up as much as possible.",
      "Use both feet and all surfaces of the boot.",
      "Keep the ball within one step at all times.",
    ],
  },
  "task-4": {
    title: "Upload Finishing Session Video",
    description: "Show 5 shots from different angles: volley, half-volley, first touch finish, chip, and driven shot.",
    exampleVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    coachingPoints: [
      "Use both feet for variety.",
      "Hit target 80% accuracy minimum.",
      "Full speed execution - game-like intensity.",
    ],
  },
} as const;

type TaskId = keyof typeof mockTaskDetails;

interface PageProps {
  params: { taskId: string };
}

export default function TaskDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { taskId } = params;
  const task = mockTaskDetails[taskId as TaskId];

  // Upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [blockchainHash, setBlockchainHash] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [scoutFeedback, setScoutFeedback] = useState<any>(null);

  if (!task) {
    notFound();
  }

  const isYouTube = task.exampleVideoUrl.includes("youtube.com");

  // Mock upload function
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a video file first");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress [web:143]
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate blockchain + AI analysis after 3 seconds
    setTimeout(() => {
      // Mock blockchain transaction
      const mockHash = "0x" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setBlockchainHash(mockHash);

      // Mock AI computer vision analysis [file:141]
      setAiAnalysis({
        overallScore: 87,
        technique: 85,
        speed: 90,
        ballControl: 88,
        bodyPosition: 84,
      });

      // Mock scout feedback
      setScoutFeedback({
        scoutName: "Coach Maria",
        rating: 8.5,
        comments:
          "Excellent right-foot control and change of pace. Work on protecting the ball with your body. Ready for U12 trials.",
        timestamp: new Date().toISOString(),
      });

      setIsUploading(false);
      setUploadComplete(true);
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadComplete(false);
      setUploadProgress(0);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <button onClick={() => router.back()} className="mb-4 text-xs font-medium text-slate-500 hover:text-slate-700">
          ← Back to Athlete Profile
        </button>

        <h1 className="text-2xl font-bold text-slate-900">{task.title}</h1>
        <p className="mt-2 text-sm text-slate-600">{task.description}</p>

        {/* Example video */}
        <section className="mt-6">
          <h2 className="text-sm font-semibold text-slate-800">Example Drill Video</h2>
          <p className="mt-1 text-xs text-slate-500">Watch this example, then record and upload your own version.</p>
          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-black">
            {isYouTube ? (
              <iframe
                className="w-full aspect-video"
                src={task.exampleVideoUrl}
                title={task.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video controls className="w-full aspect-video object-cover">
                <source src={task.exampleVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </section>

        {/* Upload area */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-slate-800">Upload Your Training Video</h2>
          <p className="mt-1 text-xs text-slate-500">
            Record the drill and upload a clip (max 90 seconds). AI + Scout will review this session on-chain.
          </p>

          {!uploadComplete ? (
            <form
              onSubmit={handleUpload}
              className="mt-3 rounded-xl border border-dashed border-slate-300 bg-white p-4"
            >
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500 hover:bg-slate-100">
                <span className="font-medium text-slate-700">
                  {selectedFile ? selectedFile.name : "Click to choose a file or drag & drop"}
                </span>
                <span className="text-xs text-slate-400">MP4 / MOV up to 200 MB</span>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>

              {/* Progress Bar [web:143][web:148] */}
              {isUploading && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Uploading to IPFS + Blockchain...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedFile || isUploading}
                className="mt-4 w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {isUploading ? "Processing..." : "Upload & Submit for Review"}
              </button>
            </form>
          ) : (
            /* Results Display */
            <div className="mt-3 space-y-4">
              {/* Blockchain Confirmation */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="font-semibold text-green-800">Video Submitted to Blockchain</h3>
                </div>
                <p className="text-xs text-green-700 mb-1">Transaction Hash:</p>
                <p className="text-xs font-mono bg-white px-2 py-1 rounded border border-green-300 break-all">
                  {blockchainHash}
                </p>
              </div>

              {/* AI Analysis [file:141] */}
              {aiAnalysis && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <span className="text-lg">🤖</span> AI Computer Vision Analysis
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600">{aiAnalysis.overallScore}</p>
                      <p className="text-xs text-slate-600">Overall Score</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600">{aiAnalysis.technique}</p>
                      <p className="text-xs text-slate-600">Technique</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600">{aiAnalysis.speed}</p>
                      <p className="text-xs text-slate-600">Speed</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600">{aiAnalysis.ballControl}</p>
                      <p className="text-xs text-slate-600">Ball Control</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Scout Feedback */}
              {scoutFeedback && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                    <span className="text-lg">👤</span> Scout Review - {scoutFeedback.scoutName}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-orange-600">{scoutFeedback.rating}/10</span>
                    <div className="flex-1">
                      <div className="w-full bg-orange-200 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full"
                          style={{ width: `${scoutFeedback.rating * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 italic">&ldquo;{scoutFeedback.comments}&rdquo;</p>
                  <p className="text-xs text-slate-500 mt-2">
                    Recorded on blockchain at {new Date(scoutFeedback.timestamp).toLocaleString()}
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  setUploadComplete(false);
                  setSelectedFile(null);
                  setBlockchainHash("");
                  setAiAnalysis(null);
                  setScoutFeedback(null);
                }}
                className="w-full bg-slate-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-slate-700"
              >
                Upload Another Video
              </button>
            </div>
          )}
        </section>

        {/* Coaching points */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-slate-800">Key Coaching Points</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            {task.coachingPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
