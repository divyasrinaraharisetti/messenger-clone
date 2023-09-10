'use client';
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps{
    data: FullConversationType,
    selected?: boolean;
}

const ConversationBox:React.FC<ConversationBoxProps>=({
    data,
    selected
})=>{
    const otherUser = useOtherUser(data);
    const session=useSession();
    const router = useRouter();
    const handleClick = useCallback(()=>{
        router.push(`/conversations/${data.id}`);
    },[data.id,router]);

    // this has the last message sent to the current User by the other user
    const lastMessage= useMemo(()=>{
        const messages = data.messages|| [];
        return messages[messages.length-1];
    },[data.messages]);
    // stores the user email id and memorizes the result of it so that it does not calculate the code each time it renders unless untill the dependencies changes.
    const userEmail= useMemo(()=>{
        return session.data?.user?.email;
     },[session.data?.user?.email]);
    const hasSeen=useMemo(()=>{
        if(!lastMessage){
            return false;
        }

        const SeenArray= lastMessage.seen||[];
        if(!userEmail){
            return false;
        }
        return SeenArray.filter((user)=> user.email===userEmail).length!==0;
    },[userEmail,lastMessage]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
          return 'Sent an image';
        }
    
        if (lastMessage?.body) {
          return lastMessage?.body
        }
    
        return 'Started a conversation';
      }, [lastMessage]);
    
    return(
        <div 
        onClick={handleClick}
        className={clsx(`
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer`,
        selected ? 'bg-neutral-100': 'bg-white'
        )}
        >
            {data.isGroup ? (
                <AvatarGroup users={data.users}/>
            ):( 
            <Avatar user = {otherUser} />)}
           
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p>{data.name || otherUser.name }</p>
                        {lastMessage?.createdAt && (
                            <p className="
                            text-xs 
                            text-gray-400 
                            font-light
                          ">
                                {format(new Date(lastMessage.createdAt),'p')}
                            </p>
                        )}
                    </div>
                    <p  
                    className = {clsx(`
                        truncate 
                        text-sm `,
                        hasSeen ? 'text-gray-500' : 'text-black font-medium'
                        )}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox;