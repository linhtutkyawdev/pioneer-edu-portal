'use client';
import { useToast } from '@/components/ui/use-toast';
import { deleteClass } from './action';
import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';

const DeleteForm = ({ id }: { id: number }) => {
  const { toast } = useToast();
  return (
    <form
      action={async (formData) => {
        if (confirm('Are you sure you want to delete this class?')) {
          toast({ title: (await deleteClass(formData)).message });
        }
      }}
    >
      <input type="number" hidden name="class_id" value={id} readOnly />
      <Button className="transition-all duration-200 active:scale-100 bg-gradient-to-tl from-rose-400 to-red-400 hover:from-rose-300 hover:to-red-500 hover:scale-110">
        Delete <Delete className="ml-2" />
      </Button>
    </form>
  );
};

export default DeleteForm;
