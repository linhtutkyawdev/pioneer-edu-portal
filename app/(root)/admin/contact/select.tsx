'use client';

export default function Select({ values }: { values: string[] }) {
  return (
    <select
      className="w-full min-w-28 p-2 rounded-md text-slate-800 capitalize"
      onChange={(e) => {
        const showElements = document.getElementsByClassName(e.target.value);
        const hideElementCollections = values
          .filter((v) => v !== e.target.value)
          .map((v) => document.getElementsByClassName(v));

        for (let i = 0; i < showElements.length; i++) {
          showElements[i].classList.remove('hidden');
        }
        hideElementCollections.forEach((hideElements) => {
          for (let i = 0; i < hideElements.length; i++) {
            hideElements[i].classList.add('hidden');
          }
        });
      }}
    >
      {values.map((v, index) => (
        <option value={v} defaultChecked={index === 0} className="capitalize">
          {v}
        </option>
      ))}
    </select>
  );
}
