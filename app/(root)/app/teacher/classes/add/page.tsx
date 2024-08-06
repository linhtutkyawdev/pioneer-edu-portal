import { auth } from '@clerk/nextjs/server';
import Form from './form';

const AddClass = async () => {
  const { userId } = auth();
  if (!userId) return null;
  return (
    <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md my-4">
      <h1 className="text-xl font-bold text-white capitalize">
        Create The Best Class Ever
      </h1>
      <Form />
    </section>
  );
};

export default AddClass;
