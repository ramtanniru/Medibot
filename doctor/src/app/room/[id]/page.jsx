'use client'
import React from 'react'
import { useParams } from 'next/navigation';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
const RoomPage = () => {
    const {id:roomId} = useParams();
    const username = "username";
    const myMeeting = async (element) => {
        const appID = 544622674;
        const serverSecret = "2f026ccd2b949535ba490fc1ad0f5ccb";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(),username);
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom(
            {
                container: element,
                sharedLinks: [
                    {
                        name: 'Copy Link',
                        url: `http://localhost:3000/room/${roomId}`,
                    }
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showScreenSharingButton: true,
            }
        )
    };
    
  return (
    <div className='h-screen flex w-full justify-center items-center'>
        <div className='w-full' ref={myMeeting}/>
    </div>
  )
}

export default RoomPage