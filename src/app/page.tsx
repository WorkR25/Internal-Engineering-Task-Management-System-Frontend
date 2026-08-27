"use client";

// import Dashboard from "@/pages/admin/dashboard-admin/dashboard";

// export default function Home() {
//   return <Dashboard />;
// }

// import MyTask from "@/pages/developer/my-task/my-task";

// export default function Home() {
//   return <MyTask />;
// }

// import Dashboard from "@/pages/admin/dashboard-admin/dashboard";

// export default function Home() {
//   return <Dashboard />;
// }
// // import Dashboard from "../pages/dashboard";

// export default function Home() {
//   return <Dashboard />;
// }

// import Performance from "../pages/performance";

// export default function Home() {
//   return <Performance />;
// }

// import Performance from "../pages/performance";

// export default function Home() {
//   return <Performance />;
// }

// import CreateRole from "@/components/admin-components/role-components/create-role";

// export default function Home() {
//     return <CreateRole />;
// }
//
// import Dashboard from "@/pages/admin/dashboard-admin/dashboard";
//  export default function Home() {
//    return <Dashboard />;
//  }
// import ReassignTask from "@/components/admin-components/task-assign-components/reassign-task";
// export default function Page() {
//   return <ReassignTask />;
// }

// import Dashboard from "@/pages/developer/dashboard-developer/dashboard";

// export default function Page() {
//   return <Dashboard />;
// }


//  import Performance from "@/pages/developer/performance-developer/performance";

//  export default function Page() {
//    return <Performance />;
//  }

// import SubmitForReview from "@/components/developer-components/submit-for-review/submit-for-review";

// export default function Page() {
//   return <SubmitForReview />;
// }
// import ReviewsQueue from "@/components/admin-components/reviews-components/reviews-queue";

// export default function Page() {
//   return <ReviewsQueue />;
// }

// import AssignTask from "@/components/admin-components/task-assign-components/assign-task";
// export default function Page() {
//    return <AssignTask />;
//  }

"use client";

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/signin");
}