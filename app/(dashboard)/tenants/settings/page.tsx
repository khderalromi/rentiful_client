"use client"
import SettingsForm from '@/components/SettingsForm'
import { SettingsFormData } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { useGetUserQuery, useUpdateAuthUserMutation } from '@/state/Auth/AuthSlice'
import { LoaderIcon } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import React from 'react'
import { email } from 'zod';
/*initialData,
    onSubmit,
    userType*/
const TenantSettings = () => {
  const { data: authUser,isLoading :isUserLoading } = useGetUserQuery();
  const [editUser, { isLoading :isUpdateLoading, isError, error }] = useUpdateAuthUserMutation();
  const initialData = {
    name: authUser?.user?.name,
    email: authUser?.user?.email,
    phoneNumber: authUser?.user?.phoneNumber,


  }

  if (isUpdateLoading || isUserLoading) {
    
            <div className='w-full h-svh items-center justify-center content-center '>
              <LoaderIcon
                  role="status"
                  aria-label="Loading"
                  className={cn("size-32 place-self-center animate-spin")}
                />
            </div>
          
  }

  if(isError){
      toast.error("Error" , {autoClose:2000})
    const erroerMessage = error;
    //toast.error("error", { autoClose: 2000 });
  
  }
  
  console.log(authUser)
  // ✅ الخطوة 3: دالة معالجة إرسال النموذج
  const handleSubmit = async (data: typeof initialData) => {
    try {
      // البيانات المُتحققة من صحتها تلقائياً بواسطة Zod
      console.log("البيانات المُرسلة:", data);

      // إرسال الطلب للسيرفر
      const response = await editUser({
        email: data.email,
        name: data.name,
        phoneNumber: data.phoneNumber
      }).unwrap();

      console.log("استجابة الباك إند:", response);


      //toast.success("Log In Seuccessfully", { autoClose: 2000 });
      //router.push("/");
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.data?.message ||
        error?.message

      //toast.error(errorMessage, { autoClose: 2000 });}
    };
  }
  return (
    <div>
      {authUser && <SettingsForm initialData={initialData} onSubmit={handleSubmit} userType={authUser?.user?.role} />}
      <ToastContainer/>
    </div>
  )
}

export default TenantSettings
