'use client';

export default function Search() {
  return (
    <input
      type="search"
      className="w-full min-w-40 p-2 rounded-md text-slate-800"
      placeholder="Search"
      onChange={(e) => {
        const value = e.target.value.toLowerCase();
        const elements = document.getElementsByClassName('user-row');
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
    />
  );
}
