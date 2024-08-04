const Hero = () => {
  return (
    <div className="container -mb-20 flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
      <div className="flex flex-col justify-center p-2 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
        <h1 className="text-5xl font-bold leading-none sm:text-6xl">
          E-learning and Online Classes are now in your hand!!
        </h1>
        <p className="mt-6 mb-8 text-lg sm:mb-12">
          Here is where students become pioneers with the help of great mentors.
        </p>
        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start text-sm">
          <a
            rel="noopener noreferrer"
            href="/teachers/register"
            className="px-8 py-3 text-lg font-semibold rounded underline"
          >
            Become a Tacher
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              className="inline-block ml-2"
            >
              <path
                fillRule="evenodd"
                d="M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z"
              />
              <path
                fillRule="evenodd"
                d="M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 10.708.708L15 1.707V5.5a.5.5 0 001 0v-5z"
              />
            </svg>
          </a>
          <a
            rel="noopener noreferrer"
            href="/courses"
            className="px-8 py-3 text-lg font-semibold rounded bg-white text-black"
          >
            View Courses
            <svg
              fill="none"
              className="inline-block ml-2"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18.319 14.433A8.001 8.001 0 006.343 3.868a8 8 0 0010.564 11.976l.043.045 4.242 4.243a1 1 0 101.415-1.415l-4.243-4.242a1.116 1.116 0 00-.045-.042zm-2.076-9.15a6 6 0 11-8.485 8.485 6 6 0 018.485-8.485z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
        <img
          src="icons/undraw_online_learning_re_qw08.svg"
          alt=""
          className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
        />
      </div>
    </div>
  );
};

export default Hero;
