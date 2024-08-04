import Form from './form';

const Contact = () => {
  return (
    <div className="bg-slate-700 grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32">
      <div className="flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
            Let's talk!
          </h2>
          <div className="dark:text-gray-600">
            Do you have any problem? Just tell us.
          </div>
        </div>
        <img
          src="icons/undraw_active_support_re_b7sj.svg"
          alt=""
          className="p-6 h-52 md:h-64"
        />
      </div>
      <Form />
    </div>
  );
};

export default Contact;
