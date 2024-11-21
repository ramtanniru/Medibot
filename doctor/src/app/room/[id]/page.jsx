'use client';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useUser } from '@/context/UserContext';

const RoomPage = () => {
  const { id: roomId } = useParams();
  const { user } = useUser();
  const username = 'username';
  const url = 'https://backendmedibot.onrender.com/doctor/change-activity';
  const meetingContainerRef = useRef(null);

  useEffect(() => {
    const updateActivityStatus = () => {
      const data = new FormData();
      data.append('id', user);
      data.append('status', 'inactive');
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, data);
      } else {
        fetch(url, {
          method: 'POST',
          body: data,
        });
      }
    };

    const handleBeforeUnload = (event) => {
      // Update activity status
      updateActivityStatus();

      // Show a custom alert message (not displayed in modern browsers)
      event.preventDefault();
      event.returnValue = ''; // Required for modern browsers to show their default prompt
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user, url]);

  useEffect(() => {
    const setupMeeting = async () => {
      if (meetingContainerRef.current) {
        const appID = 544622674;
        const serverSecret = '2f026ccd2b949535ba490fc1ad0f5ccb';
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          Date.now().toString(),
          username
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
          container: meetingContainerRef.current,
          sharedLinks: [
            {
              name: 'Copy Link',
              url: `http://doctor-medibot/room/${roomId}`,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton: true,
        });
      }
    };

    setupMeeting();
  }, [roomId, username]);

  return (
    <div className="h-screen flex w-full justify-center items-center">
      <div className="w-full" ref={meetingContainerRef} />
    </div>
  );
};

export default RoomPage;
