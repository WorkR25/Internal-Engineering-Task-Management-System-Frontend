"use client";

import Sidebar from "../components/layout/sidebar";
import ReviewsQueue from "../components/reviews/reviews-queue";

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