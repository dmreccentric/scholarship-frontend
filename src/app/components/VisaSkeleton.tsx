import React from "react";

export default function VisaSkeleton() {
  return (
    <article
      className="space-y-10 animate-pulse"
      aria-busy="true"
      aria-label="Loading visa details"
    >
      <span className="sr-only">Visa details are loading, please wait.</span>

      {/* Cover */}
      <div
        className="w-full h-[300px] md:h-[400px] bg-gray-200 dark:bg-gray-700 rounded-2xl"
        role="img"
        aria-label="Visa banner loading"
      />

      {/* Visa Info */}
      <section className="space-y-4" aria-label="Visa header loading">
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"
            />
          ))}
        </div>
      </section>

      {/* Related Visa Cards */}
      <section
        className="grid md:grid-cols-3 gap-4"
        aria-label="Related visas loading"
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"
          />
        ))}
      </section>
    </article>
  );
}
