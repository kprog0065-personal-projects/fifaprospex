// app/select_profile/athlete_profile/page.tsx
"use client";

import Link from "next/link";

// app/select_profile/athlete_profile/page.tsx

interface TrainingTask {
  id: string;
  title: string;
  type: "drill" | "match" | "fitness" | "video";
  status: "pending" | "completed" | "overdue";
  dueDate: string;
  assignedBy: string;
  videoUploaded?: boolean;
}

const mockTasks: TrainingTask[] = [
  {
    id: "task-1",
    title: "1v1 Dribbling - Right Foot",
    type: "drill",
    status: "pending",
    dueDate: "Dec 30",
    assignedBy: "Coach Jamal",
  },
  {
    id: "task-2",
    title: "U10 Match vs. Point Fortin",
    type: "match",
    status: "completed",
    dueDate: "Dec 25",
    assignedBy: "Trinidad FC",
  },
  {
    id: "task-3",
    title: "Ball Mastery Circuit",
    type: "drill",
    status: "overdue",
    dueDate: "Dec 28",
    assignedBy: "Coach Jamal",
  },
  {
    id: "task-4",
    title: "Upload Finishing Session Video",
    type: "video",
    status: "pending",
    dueDate: "Jan 5",
    assignedBy: "Scout Maria",
    videoUploaded: false,
  },
];

export default function AthleteProfilePage() {
  const totalTasks = mockTasks.length;
  const pendingTasks = mockTasks.filter(t => t.status === "pending").length;
  const benefits = [
    "Foundation Pool: 12 hours/month small-group training",
    "Free equipment (boots, ball, shin guards)",
    "Monthly nutrition stipend ($50 CAD)",
    "Visa support pathway to Canada academies",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-red-400 to-orange-400 flex items-center justify-center text-2xl font-bold text-white">
              JD
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Jaden Dyer</h1>
              <p className="text-sm text-slate-500">U11 Forward | Trinidad FC Pathway</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="rounded-lg bg-red-500 px-6 py-2 text-sm font-semibold text-white hover:bg-red-600">
              Upload Video
            </button>
            <button className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              View Scout Report
            </button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Training Tasks */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Training Tasks</h2>
              <span className="text-sm text-slate-500">
                {pendingTasks}/{totalTasks} pending
              </span>
            </div>

            <div className="space-y-3">
              {mockTasks.map(task => {
                const isVideoTask = task.type === "video";
                const statusColor =
                  task.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : task.status === "overdue"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800";

                return (
                  <Link key={task.id} href={`/select_profile/athlete_profile/task/${task.id}`} className="block">
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}>
                              {task.status.toUpperCase()}
                            </span>
                            {isVideoTask && !task.videoUploaded && (
                              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                                Needs Video
                              </span>
                            )}
                          </div>
                          <h3 className="font-medium text-slate-900">{task.title}</h3>
                          <p className="mt-1 text-sm text-slate-500">Assigned by {task.assignedBy}</p>
                          <p className="mt-1 text-xs text-slate-400">Due {task.dueDate}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-slate-400">{task.type === "video" ? "📹" : "⚽"}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Progress */}
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Your Benefits</h2>
              <div className="space-y-2">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <p className="text-xs text-slate-500 mb-1">Scout Score</p>
                <p className="text-2xl font-bold text-slate-900">87</p>
                <p className="text-xs text-slate-500">/100</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <p className="text-xs text-slate-500 mb-1">Human Scout</p>
                <p className="text-2xl font-bold text-slate-900">84</p>
                <p className="text-xs text-slate-500">/100</p>
              </div>
            </div>

            {/* Next Milestone */}
            <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white p-4 rounded-xl">
              <h3 className="font-semibold mb-1">Next Milestone</h3>
              <p className="text-sm mb-2">U12 Trinidad FC Academy Selection Camp</p>
              <p className="text-xs opacity-90">Jan 15-17 • Complete 3 video tasks first</p>
              <button className="w-full mt-3 bg-white text-emerald-600 py-2 px-4 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors">
                View Camp Details
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
