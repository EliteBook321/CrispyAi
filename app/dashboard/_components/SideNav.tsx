"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { BookAIcon, BookCheck, DownloadCloud, FileClock, Home, PersonStandingIcon, Settings, SpeechIcon, Hand, BadgeCheck } from 'lucide-react' // Added new icons
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {
    const MenuList = [
        {
            name: 'Home',
            icon: Home,
            path: '/dashboard'
        },
        {
            name: 'History',
            icon: FileClock,
            path: '/dashboard/history'
        },
        {
            name: 'Document summary',
            icon: DownloadCloud,
            path: '/dashboard/document-summarization'
        },
        {
            name: 'Sign Language',
            icon: Hand,
            path: '/dashboard/sign-language'
        },
        {
            name: 'Credential Generation',
            icon: BadgeCheck,
            path: '/dashboard/credential-generation'
        },
        {
            name: 'Personalization',
            icon: PersonStandingIcon,
            path: '/dashboard/personalization'
        },
        {
            name: 'Dyslexia',
            icon: SpeechIcon,
            path: '/dashboard/dyslexia'
        },
        {
            name: 'InterviewPrep',
            icon: BookCheck,
            path: '/dashboard/InterviewPrep'
        },
        {
            name: 'LessonPlanner',
            icon: BookAIcon,
            path: '/dashboard/LessonPlanner'
        },
        {
            name: 'Settings',
            icon: Settings,
            path: '/dashboard/settings'
        },
    ]

    const path = usePathname();

    useEffect(() => {
        console.log(path)
    }, [path]);

    return (
        <div className='h-screen relative p-5 shadow-sm border bg-white'>
            <div className='flex justify-center'>
                <Image src={'/logo.svg'} alt='logo' width={90} height={90} />
            </div>
            <hr className='my-2 border' />

            <div className='mt-3'>
                {MenuList.map((menu, index) => (
                    <Link key={index} href={menu.path} className="block">
                        <div
                            className={`flex gap-2 mb-2 p-3 
                            hover:bg-primary hover:text-white rounded-lg 
                            cursor-pointer items-center transition-all
                            ${path === menu.path ? 'bg-primary text-white' : ''}`}
                        >
                            <menu.icon className='h-6 w-6' />
                            <h2 className='text-md'>{menu.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideNav;