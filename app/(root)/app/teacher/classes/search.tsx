'use client';

export default function Search() {
  return (
    <div className="max-w-md">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative min-w-72">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            const elements = document.getElementsByClassName('class-card');
            for (let i = 0; i < elements.length; i++) {
              const name = elements[i].getAttribute('data-name')?.toLowerCase();
              if (!name) return;
              if (name.includes(value)) {
                elements[i].classList.remove('hidden');
              } else {
                elements[i].classList.add('hidden');
              }
            }
          }}
          className="block w-full p-4 ps-10 text-sm text-slate-900 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Teacher, Class or Tag Name"
          required
        />
      </div>
    </div>
  );
}
