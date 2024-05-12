"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

const UpcomingMeetingDate = () => {
  const router = useRouter();
  const { upcomingCalls, isLoading } = useGetCalls();
  const upcomingMeeting: (string | undefined)[] = upcomingCalls.map(
    (meeting: Call) => {
      return (meeting as Call).state?.startsAt?.toLocaleString();
    }
  );

  upcomingMeeting?.sort((a, b) => {
    if (!a || !b) return 0;

    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

  const upcomingMeetingTime = upcomingMeeting[0]?.substring(11, 15);
  const AMOrPM = upcomingMeeting[0]?.substring(19, 23);

  return (
    <div className="cursor-pointer" onClick={() => router.push("/upcoming")}>
      {!isLoading && upcomingMeetingTime && (
        <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
          Upcoming Meeting at: {upcomingMeetingTime!}&nbsp;{AMOrPM!}
        </h2>
      )}
    </div>
  );
};

export default UpcomingMeetingDate;
