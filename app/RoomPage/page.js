'use client'
import Navbar from '@/Components/Navbar'
import { SessionContext } from '@/Components/SessionContextProvider'
import React, { useContext, useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function Page() {
  const { authState } = useContext(SessionContext);
  const elementRef = useRef(null);

  useEffect(() => {
    const mymeeting = async () => {
      const appID = 1111594725;
      const severSecret = "ec2fa5419f25ddf5c6942c1f7d6e08df";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, severSecret, '1', Date.now().toString(), "Jigs");
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: elementRef.current,
        maxUsers: 2,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall
        },
        showScreenSharingButton: false,
      });
    };

    if (elementRef.current) {
      mymeeting();
    }
  }, []);

  return (
    <>
      <Navbar UserMode={authState.USER_MODE} />
      <div className='w-100 h-10 rounded-3xl m-10 p-10'>
        <div ref={elementRef} />
      </div>
    </>
  );
}

export default Page;


