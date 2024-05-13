'use client'
import useSidebarStore from '@/store/sideBarStore'
import Link from 'next/link'
import React from 'react'

const SidebarTab = (tab) => {
    const {setTabSelected} = useSidebarStore()

  return (
    <Link
    className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
    href="#"
    onClick={()=>setTabSelected(tab)}
  >
    {tab}
  </Link>
  )
}

export default SidebarTab