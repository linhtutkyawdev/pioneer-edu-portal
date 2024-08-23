'use client';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { editClass } from './action';
import { Edit, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EditForm = ({
  class_id,
  fieldName,
  value,
  line,
}: {
  class_id: number;
  fieldName: string;
  value: string;
  line: number;
}) => {
  const [isValueCh, setIsValueCh] = useState(false);
  const { toast } = useToast();
  return (
    <form
      action={async (formData) => {
        if (confirm('Are you sure you want to edit class ' + fieldName + '?')) {
          toast({ title: (await editClass(formData)).message });
          setIsValueCh(false);
        }
      }}
    >
      {isValueCh ? (
        <div className="flex items-center w-full">
          <input
            type="number"
            hidden
            name="class_id"
            value={class_id}
            readOnly
          />
          <input
            type="text"
            hidden
            name="fieldName"
            value={fieldName}
            readOnly
          />
          <textarea
            className="bg-transparent outline-none w-full"
            name="value"
            defaultValue={value}
            rows={line}
          />
          <Button
            type="submit"
            variant="link"
            size="icon"
            className="text-white"
          >
            <Save className="ml-2" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="w-full">{value}</div>
          <Edit onClick={() => setIsValueCh(true)} className="ml-2" />
        </div>
      )}
    </form>
  );
};

export default EditForm;
