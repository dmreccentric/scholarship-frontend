import React from "react";

const ScholarshipSkeleton = () => {
  return (
    <div className="space-y-12 animate-pulse">
      {/* Cover Image Placeholder */}
      <div className="relative w-full aspect-[16/9] bg-gray-200 dark:bg-gray-700 rounded-2xl" />

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 space-y-6">
        {/* Title & Institution */}
        <div className="space-y-3">
          <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Key info grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-5 w-4/5 bg-gray-200 dark:bg-gray-700 rounded"
            />
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 pt-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"
            />
          ))}
        </div>

        {/* Eligible Countries */}
        <div>
          <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="h-5 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"
              />
            ))}
          </div>
        </div>

        {/* Back Button Placeholder */}
        <div className="pt-6">
          <div className="h-9 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>

      {/* Related & Recent Section Skeleton */}
      <div className="mt-12 space-y-10">
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
      </div>
    </div>
  );
};

export default ScholarshipSkeleton;
