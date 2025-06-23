   export default function DotBounceLoader() {
  return (
    <div className="flex items-center justify-center space-x-2 h-16">
      <span
        className="w-3 h-3 rounded-full bg-gray-800 dark:bg-gray-800 animate-bounce"
        style={{ animationDelay: "0s" }}
      ></span>
      <span
        className="w-3 h-3 rounded-full bg-gray-800 dark:bg-gray-500 animate-bounce"
        style={{ animationDelay: "0.3s" }}
      ></span>
      <span
        className="w-3 h-3 rounded-full bg-gray-800 dark:bg-gray-300  animate-bounce"
        style={{ animationDelay: "0.6s" }}
      ></span>
    </div>
  );
}
