export default function VisaSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="w-full h-[300px] md:h-[400px] bg-gray-200 dark:bg-gray-700 rounded-2xl" />

      <div className="space-y-4">
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
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}
