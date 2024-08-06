import Profile from '../profile';

export default function TeacherProfile({
  params,
  noBg,
}: {
  params: { id: string };
  noBg?: boolean;
}) {
  return noBg ? (
    <Profile id={params.id} title="title" />
  ) : (
    <div className="flex items-center justify-center w-full h-96 bg-gradient-to-br from-blue-1 to-indigo-300 rounded-lg shadow-lg">
      <Profile id={params.id} title="title" />
    </div>
  );
}
