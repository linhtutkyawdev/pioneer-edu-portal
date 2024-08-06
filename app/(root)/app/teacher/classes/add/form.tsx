'use client';

import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { createClass } from './action';
import Tags from './Tags';
import ImageUpload from './ImgaeUpload';
import DateTimePicker from './DateTimePicker';
import { Save } from 'lucide-react';
const Form = () => {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) return null;
  return (
    <form
      action={(formData) => {
        confirm('Are you sure you want to add this class?') &&
          createClass(formData);
      }}
    >
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label className="text-white" htmlFor="title">
            Title <span className="-mb-2">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="HTML/CSS Basic"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
          />
        </div>

        <div className="opacity-80">
          <label className="text-white" htmlFor="teacher_id">
            Teacher <span className="-mb-2">*</span>
          </label>
          <input
            name="teacher_id"
            id="teacher_id"
            type="text"
            value={user.id}
            hidden
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
          />
          <div className="flex items-center justify-start gap-2 p-2 text-white rounded-md">
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 my-1 ring-white"
              src={user.imageUrl}
              alt="author_img"
            />
            {user.fullName}
          </div>
        </div>

        <div>
          <label className="text-white" htmlFor="description">
            Description <span className="-mb-2">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            typeof="textarea"
            placeholder="HTML/CSS Basic is a basic course for beginners to learn HTML and CSS."
            rows={5}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
          ></textarea>
        </div>

        <ImageUpload />

        <DateTimePicker />

        <div>
          <label className="text-white" htmlFor="student-limit">
            Student Limit <span className="-mb-2">*</span>
          </label>
          <input
            id="student-limit"
            name="student-limit"
            type="number"
            min={10}
            max={100}
            step={5}
            defaultValue={50}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
          />
        </div>

        <Tags />
      </div>

      <Button className="flex mt-6 text-center w-full py-2 leading-5 text-lg text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
        Save <Save className="ml-2" />
      </Button>
    </form>
  );
};

export default Form;
