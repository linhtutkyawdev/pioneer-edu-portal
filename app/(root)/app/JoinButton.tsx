/* eslint-disable camelcase */
'use client';

import { useRouter } from 'next/navigation';

import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { useToast } from '@/components/ui/use-toast';
import { Loader, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const JoinButton = ({
  dateTime,
  meetingId,
  description,
  isTeacher,
}: {
  dateTime: Date;
  meetingId: string;
  description: string;
  isTeacher?: boolean;
}) => {
  const router = useRouter();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;
    if (!isTeacher) return router.push(`/app/meeting/${meetingId}`);

    try {
      //   const meetingId = crypto.randomUUID();

      const call = client.call('default', meetingId);
      if (!call) throw new Error('Failed to create meeting');
      if (!call) throw new Error('Failed to create meeting');
      const startsAt = dateTime.toISOString();
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      router.push(`/app/meeting/${call.id}`);
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to create Meeting' });
    }
  };

  if (!client || !user) return <Loader />;

  //   const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/app/meeting/id`;

  return (
    <Button
      onClick={() => createMeeting()}
      className="transition-all duration-200 active:scale-100 bg-gradient-to-tl from-teal-400 to-blue-1 hover:from-emerald-300 hover:to-blue-500 hover:scale-110"
    >
      Join Now <Plus />
    </Button>
  );
};

export default JoinButton;
