import Link from "next/link";

const navigation = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Task Board",
    href: "/task-board",
  },
  {
    label: "Reviews",
    href: "/reviews",
  },
  {
    label: "Performance",
    href: "/performance",
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <div>
          <h1 className="text-sm font-bold text-gray-900">
            TaskReview
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Internal Engineering Task Management System
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <div className="mb-4 px-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
          Workspace
        </div>

        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2.5 text-sm ${
                item.href === "/task-board"
                  ? "bg-[#eeedff] font-medium text-[#5146e5]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="border-t border-gray-200 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5146e5] text-xs font-semibold text-white">
            AG
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900">
              Arijit Ganguly
            </p>

            <p className="text-xs text-gray-500">
              ADMIN
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}