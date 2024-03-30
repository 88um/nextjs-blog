import getCurrentUser from '@/actions/current-user';
import PostForm from '@/components/forms/PostForm';
import { redirect } from 'next/navigation';
import React from 'react';

interface CreatePageProps {
}

const CreatePage: React.FC<CreatePageProps> = async ({}) => {
  //check authed
  const curr_user = await getCurrentUser();
  
  if (!curr_user){
    redirect("/login")
  }
 return (

    <div className='container mx-auto lg:px-20'>
        <div className='p-4 w-fit'>
        <h1 className='text-3xl pb-4'>Create new post</h1>
        <hr/>
        </div>
        
      <PostForm/>
    </div>
 );
};

export default CreatePage;