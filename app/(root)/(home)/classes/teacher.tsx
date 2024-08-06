import { Button } from '@/components/ui/button';
import { clerkClient } from '@clerk/nextjs/server';

const Teacher = async ({ teacher_id }: { teacher_id: string }) => {
  const teacherName = (await clerkClient.users.getUser(teacher_id)).fullName;
  return (
    <a href={`/teachers/${teacher_id}`}>
      <Button
        variant="link"
        className="text-blue-1 p-1 font-semibold rounded-sm"
      >
        {teacherName}
      </Button>
    </a>
  );
};

export default Teacher;
