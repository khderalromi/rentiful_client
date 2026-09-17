"use client"
import { SettingsFormData, settingsSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Label } from './ui/label';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';

/*
//قواعد التحقق validation schema
export const settingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

//تعريف أنواع البيانات (TypeScript Types)
export type SettingsFormData = z.infer<typeof settingsSchema>;
*/

const SettingsForm = ({
    initialData,
    onSubmit,
    userType
}: SettingsFormProps) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    console.log(initialData)
    //3. تهيئة النموذج باستخدام الـ Hook (useForm)
    const form = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema),
        defaultValues: initialData,
        
    });
    const router = useRouter()
    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (editMode) {
            form.reset(initialData)
        }
    }

    const handleSubmit = async (data: SettingsFormData) => {
        console.log(data)
        await onSubmit(data);
        setEditMode(false);
        //router.push("/landing")
    }
    return (
        <div className='pt-8 pb-5 px-8'>
            <div className='mb-5'>
                <h1 className='text-xl font-semibold'>
                    {`${userType?.charAt(0).toUpperCase() + userType?.slice(1)} Settings`}
                </h1>
                <p className='text-sm text-gray-500 mt-1'>
                    Manage your account perferences and personal information
                </p>
            </div>

            <div className='bg-white rounded-xl p-6'>
                    <form 
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className='space-y-6'
                    >

                        {/* ✅ حقل الاسم */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                disabled={!editMode}
                                {...form.register("name")}
                            />
                            {/* عرض رسالة الخطأ إن وجدت */}
                          
                        </div>

                        {/* ✅ حقل البريد الإلكتروني */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                disabled={!editMode}
                                {...form.register("email")}
                            />
                            
                        </div>


                        {/* ✅ حقل رقم الهاتف */}
                        <div className="grid gap-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                type="text"
                                placeholder="Enter your phone number"
                                disabled={!editMode}
                                {...form.register("phoneNumber")}
                            />
                        </div>

                        <div className='pt-4 flex justify-between'>
                            <Button
                                type='button'
                                onClick={toggleEditMode}
                                className= ' bg-secondary-500 text-white hover:bg-secondary-600'
                            >
                                {editMode ? "Cancel" : "Edit"}

                            </Button>

                            
                            {editMode && (
                            <Button
                                type='submit'
                                //onClick={toggleEditMode}
                                className=  ' bg-primary-700 text-white hover:bg-secondary-600 '
                            >
                                Save Changes

                            </Button>)}
                        </div>
                    </form>
            </div>

        </div>
    )
}

export default SettingsForm
