'use client';

import { useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { createStudentApplication } from './action';

const Form = ({ classId, userId }: { classId: number; userId: string }) => {
  const { toast } = useToast();
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData: FormData) => {
        toast({ title: (await createStudentApplication(formData)).message });
      }}
      className="space-y-6"
    >
      <input type="number" name="class_id" hidden value={classId} />
      <input type="text" name="user_id" hidden value={userId} />

      <Button className="w-max mx-auto mb-4 transition-all duration-200 active:scale-100 bg-gradient-to-tl from-teal-400 to-blue-1 hover:from-emerald-300 hover:to-blue-500 hover:scale-110">
        Apply Now <Send className="ml-2" />
      </Button>
    </form>
  );
};

export default Form;
