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
    <aside className="fixed left-0 top-0 flex h-screen w-52 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-5">
        <h1 className="text-sm font-bold text-gray-900">
          TaskReview
        </h1>
      </div>

      <nav className="flex-1 px-3 py-5">
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm ${
                item.href === "/"
                  ? "bg-[#eeedff] font-medium text-[#5146e5]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="border-t border-gray-200 px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5146e5] text-xs font-semibold text-white">
            AD
          </div>

          <div>
            <p className="text-xs font-medium text-gray-900">
              Arijit Ganguly
            </p>

            <p className="text-[10px] text-gray-500">
              ADMIN
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}