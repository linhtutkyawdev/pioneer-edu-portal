/* eslint-disable camelcase */
'use client';

import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useGetCallById } from '@/hooks/useGetCallById';

const RecordingButtons = ({ id }: { id: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { call, isCallLoading } = useGetCallById(id);

  if (isCallLoading || !call)
    return (
      <Button className="transition-all duration-200 active:scale-100 bg-gradient-to-tl from-teal-400 to-blue-1 hover:from-emerald-300 hover:to-blue-500 hover:scale-110">
        Loading...
      </Button>
    );
  //   const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/app/meeting/id`;

  return (
    <Button
      onClick={async () => {
        const result = (await call.queryRecordings())?.recordings;
        if (result.length === 0) {
          toast({
            title: 'No recordings found',
          });
        }
        result[0] && router.push(result[0].url);
      }}
      className="transition-all duration-200 active:scale-100 bg-gradient-to-tl from-teal-400 to-blue-1 hover:from-emerald-300 hover:to-blue-500 hover:scale-110"
    >
      Play Recording{' '}
      <img src="/icons/recordings.svg" className="w-4 h-4 ml-2" alt="play" />
    </Button>
  );
};

export default RecordingButtons;
