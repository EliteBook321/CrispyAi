"use client"
import React, { useState } from 'react'
import { useParams } from "next/navigation";
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/utils/AIModel';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/clerk-react';
import moment from 'moment';
import { Result } from 'postcss';
import Result_ from 'postcss/lib/result';

interface PROPS {
    params: {
        'template-slug': string
    }
}

function CreateNewContent(props: PROPS) {
    const params = useParams();

    const selectedTemplate: TEMPLATE | undefined = Templates?.find((item) => item.slug == params['template-slug']);
    const [loading,setLoading]=useState(false);
    const [aiOutput,setAiOutput]=useState<string>('');
    const {user}=useUser(); 

    const GenerateAIContent = async(formData: any) => {
        setLoading(true);
        const SelectedPrompt=selectedTemplate?.aiPrompt;
        const FinalAIPrompt=JSON.stringify(formData)+", "+SelectedPrompt;
        const result=await chatSession.sendMessage(FinalAIPrompt);
        
        setAiOutput(result?.response.text());
        await SaveInDb(formData,selectedTemplate?.slug,result?.response.text())
        setLoading(false);

    }

    const SaveInDb = async (formData: any, slug: string | undefined, aiResp: string | undefined) => {
        if (!slug) {
            console.error("Missing slug");
            return;
        }
        if (!aiResp || aiResp.trim() === "") {
            console.error("AI response is empty");
            return;
        }
        if (!formData || Object.keys(formData).length === 0) {
            console.error("formData is empty");
            return;
        }
        if (!user?.primaryEmailAddress?.emailAddress) {
            console.error("User email is missing. Is the user logged in?");
            return;
        }
    
        await db.insert(AIOutput).values({
            formData:formData,
            templateSlug:slug,
            aiResponse:aiResp,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD/MM/YYYY'),
        });

        console.log(Result);
    }

    return (
        <div className='p-10'>
            <Link href={"/dashboard"}>
            <Button>
                <ArrowLeft/> Back
            </Button>
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
                {/* FormSection */}
                <FormSection
                    selectedTemplate={selectedTemplate}
                    userFormInput={(v: any) => GenerateAIContent(v)}
                    loading={loading}
                />

                {/* OutputSection */}
                <div className='col-span-2'>
                    <OutputSection aiOutput={aiOutput}/>
                </div>
            </div>
        </div>
    )
}

export default CreateNewContent