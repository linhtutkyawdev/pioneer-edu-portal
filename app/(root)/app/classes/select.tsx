'use client';

export default function Select() {
  return (
    <select
      className="w-full min-w-28 p-2 rounded-md text-slate-800"
      onChange={(e) => {
        const showElements = document.getElementsByClassName(e.target.value);
        const hideElements = document.getElementsByClassName(
          e.target.value === 'unread' ? 'read' : 'unread',
        );
        for (let i = 0; i < showElements.length; i++) {
          showElements[i].classList.remove('hidden');
        }
        for (let i = 0; i < hideElements.length; i++) {
          hideElements[i].classList.add('hidden');
        }
      }}
    >
      <option value="unread" defaultChecked>
        Unread
      </option>
      <option value="read">Read</option>
    </select>
  );
}
