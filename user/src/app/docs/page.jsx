'use client'
import React,{ useEffect, useState } from 'react';
import Doc from './docs';
import useFetch from '@/hooks/useFetch';

const DocsPage = () => {
    const {data} = useFetch("/doctor/all-doctors");
    return (
        <div className='pt-25 pb-15 mx-5 md:mx-20 md:pt-40 md:pb-30 flex flex-col '>
            <h3>These are Your Docs</h3>
            <div className='py-5 flex flex-wrap gap-10 justify-start'>
                {data?.doctors?.map((doctor, index) => (
                    <Doc key={index} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};

export default DocsPage;
