'use client';

import { useRef } from 'react';
import { createContact } from './actions';

const Form = () => {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData: FormData) => {
        const res = await createContact(formData);
        res?.message && ref.current?.reset();
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="name" className="text-sm">
          Full name
        </label>
        <input
          name="name"
          type="text"
          placeholder=""
          className="w-full p-3 rounded text-black"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          name="email"
          type="email"
          className="w-full p-3 rounded text-black"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm">
          Message
        </label>
        <textarea
          name="message"
          rows={3}
          className="w-full p-3 rounded text-black"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-teal-400 text-gray-50"
      >
        Send Message
      </button>
    </form>
  );
};

export default Form;
