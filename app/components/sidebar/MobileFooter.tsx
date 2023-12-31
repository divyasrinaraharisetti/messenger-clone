'use client';
import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoute';
import React from 'react'
import MobileItem from './MobileItem';

const MobileFooter = () => {
    const routes= useRoutes();
    const { isOpen } = useConversation();
    //hide the mobile footer if the user is having active conversatiopn going on
    if (isOpen){
        return null;
    }
  return (
    <div className="
    fixed 
    justify-between 
    w-full 
    bottom-0 
    z-40 
    flex 
    items-center 
    bg-white 
    border-t-[1px] 
    lg:hidden
  ">
     {routes.map((route) => (
        <MobileItem
            key={route.href}
            href={route.href}
            onClick={route.onClick}
            active={route.active}
            icon={route.icon}
            />
     ))}
    </div>
  );
}

export default MobileFooter;
