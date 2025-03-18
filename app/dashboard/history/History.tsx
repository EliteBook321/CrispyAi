'use client'; // Now this is purely a Client Component

import Templates from '@/app/(data)/Templates';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { TEMPLATE } from '../_components/TemplateListSection';

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string | null;
  createdAt: string | null;
}

function History({ historyList }: { historyList: HISTORY[] }) {
  const GetTemplateName = (slug: string) => {
    const template: TEMPLATE | undefined = Templates?.find((item) => item.slug === slug);
    return template || { name: 'Unknown', icon: '/default-icon.png' };
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className='m-5 p-5 border rounded-lg bg-white'>
      <h2 className='font-bold text-3xl'>History</h2>
      <p className='text-gray-500'>Search your previously generated AI content</p>

      <div className='grid grid-cols-6 font-bold bg-secondary mt-5 py-3 px-3'>
        <h2 className='col-span-2'>TEMPLATE</h2>
        <h2 className='col-span-2'>AI RESPONSE</h2>
        <h2>WORDS</h2>
        <h2>COPY</h2>
      </div>

      {historyList.length === 0 ? (
        <p className="text-center text-gray-500 mt-3">No history found.</p>
      ) : (
        historyList.map((item: HISTORY, index: number) => (
          <div className='grid grid-cols-6 items-center my-5 py-3 px-3 border-b' key={index}>
            <h2 className='col-span-2 flex gap-2 items-center'>
              <Image 
                src={GetTemplateName(item?.templateSlug)?.icon || '/default-icon.png'} 
                alt='Template Icon' width={25} height={25} 
              />
              <Link href={`/dashboard/history/${item.templateSlug}`} className="text-blue-600 hover:underline">
                {GetTemplateName(item?.templateSlug)?.name}
              </Link>
            </h2>

            <p className='col-span-2 line-clamp-3'>{item.aiResponse ?? 'No Response'}</p>
            <p>{item.aiResponse?.split(' ').length || 0}</p>

            <Button
              variant='ghost'
              className='text-primary'
              onClick={() => copyToClipboard(item.aiResponse || '')}
            >
              Copy
            </Button>
          </div>
        ))
      )}
      <hr />
    </div>
  );
}

export default History;