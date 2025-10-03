import { bn } from '@/lib/i18n';

export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bangla-display text-blue-600">
        {bn.home}
      </h1>
      <p className="mt-4 text-bangla-base">
        বালবুক-এ আপনাকে স্বাগতম। এটি বাংলাদেশের মানুষের জন্য একটি নতুন সামাজিক মাধ্যম।
      </p>
      <div className="mt-8 space-y-4">
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          {bn.post}
        </button>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-blue-500">{bn.like}</button>
          <button className="text-gray-600 hover:text-blue-500">{bn.comment}</button>
          <button className="text-gray-600 hover:text-blue-500">{bn.share}</button>
        </div>
      </div>
    </main>
  );
}