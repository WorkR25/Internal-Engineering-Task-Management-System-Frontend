"use client";

import Sidebar from "@/components/admin-components/layout/sidebar";
import ReviewsQueue from "@/components/admin-components/reviews-components/reviews-queue";

export default function Reviews() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Sidebar
        activePage="reviews"
        onPageChange={() => {}}
      />

      <section className="ml-56 min-h-screen">
        <ReviewsQueue />
      </section>
    </main>
  );
}