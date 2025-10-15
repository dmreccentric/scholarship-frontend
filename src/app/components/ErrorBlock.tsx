export default function ErrorBlock({
  message = "Something went wrong.",
}: {
  message?: string;
}) {
  return (
    <div className="py-6">
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
        {message}
      </div>
    </div>
  );
}
