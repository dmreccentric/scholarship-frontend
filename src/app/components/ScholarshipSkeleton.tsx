import React from "react";

const ScholarshipSkeleton = () => {
  return (
    <article
      className="space-y-12 animate-pulse"
      aria-busy="true"
      aria-label="Loading scholarship details"
    >
      {/* Visually hidden text for screen readers */}
      <span className="sr-only">
        Scholarship content is loading, please wait.
      </span>

      {/* Cover Image Placeholder */}
      <div
        className="relative w-full aspect-[16/9] bg-gray-200 dark:bg-gray-700 rounded-2xl"
        role="img"
        aria-label="Scholarship cover image loading"
      />

      {/* Main Content */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 space-y-6">
        {/* Title & Institution */}
        <header className="space-y-3" aria-label="Scholarship header loading">
          <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </header>

        {/* Key info grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
          aria-label="Key scholarship info loading"
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-5 w-4/5 bg-gray-200 dark:bg-gray-700 rounded"
            />
          ))}
        </div>

        {/* Tags */}
        <div
          className="flex flex-wrap gap-3 pt-3"
          aria-label="Scholarship tags loading"
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"
            />
          ))}
        </div>

        {/* Eligible Countries */}
        <section aria-label="Eligible countries loading">
          <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"
              />
            ))}
          </div>
        </section>

        {/* Description */}
        <section aria-label="Description loading">
          <div className="h-5 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"
              />
            ))}
          </div>
        </section>

        {/* Back Button Placeholder */}
        <footer className="pt-6">
          <div className="h-9 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </footer>
      </section>

      {/* Related & Recent Section Skeleton */}
      <section
        className="mt-12 space-y-10"
        aria-label="Related and recent scholarships loading"
      >
        {[...Array(2)].map((_, sectionIndex) => (
          <div key={sectionIndex}>
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
            <div className="grid md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl"
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </article>
  );
};

export default ScholarshipSkeleton;
