"use client";

import { useState } from "react";
import { useSignUpUserMutation } from "../../../state/Auth/AuthSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
  import { ToastContainer, toast } from 'react-toastify';

// ✅ الخطوة 1: تعريف Validation Schema باستخدام Zod
const formSchema = z.object({
  name: z.string().min(5, "يجب أن يكون الاسم من 5 حروف على الأقل"),
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  password: z.string().min(8, "يجب أن تكون كلمة المرور من 8 أحرف على الأقل"),
  phoneNumber: z.string().regex(/^\+963[0-9]{9}$/, "رقم الهاتف غير صحيح يجب ان يبدأ ب +963"),
  passwordConfirm: z.string().min(8, "يجب أن تكون كلمة المرور من 8 أحرف على الأقل"),
  role: z.enum(["Tenant", "Manager"], { message: "يرجى اختيار الدور" }),  

}).refine((data) => data.password === data.passwordConfirm, {
  message: "كلمات المرور غير متطابقة",
  path: ["passwordConfirm"], 
});

// ✅ تحديد نوع البيانات من Zod          /^\+963[0-9]{9}$/
type FormData = z.infer<typeof formSchema>;

export default function LoginCard() {
  const router = useRouter();
  const [signUpUser, { isLoading, isError, error }] = useSignUpUserMutation();

  // ✅ الخطوة 2: إنشاء Form باستخدام React Hook Form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema), // ربط Zod مع React Hook Form
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phoneNumber:"",
      role: "Tenant",
    },
  });

  // ✅ الخطوة 3: دالة معالجة إرسال النموذج
  const onSubmit = async (data: FormData) => {
    try {
      // البيانات المُتحققة من صحتها تلقائياً بواسطة Zod
      console.log("البيانات المُرسلة:", data);

      // إرسال الطلب للسيرفر
      const response = await signUpUser({
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        name: data.name,
        phoneNumber: data.phoneNumber,
        role: data.role,
      }).unwrap();

      console.log("استجابة الباك إند:", response);

      // تخزين التوكن
      if (response?.token) {
        localStorage.setItem("token", response.token);
      }
      toast.success("Log In Seuccessfully", { autoClose: 2000 });
      router.push("/");
    } catch (error: any) {
      console.log(error);
      const errorMessage = 
        error?.data?.message || 
        error?.message 
      
      toast.error(errorMessage, { autoClose: 2000 });}
  };

  return (
    <div className="w-1/3 self-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <p>RENT<span className="text-red-500">IFul</span></p>
          </CardTitle>
          <CardDescription>
            welcome, please sign in to continue
          </CardDescription>
          <CardAction>
            <Link href="/login">Log In</Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          {/* ✅ الخطوة 4: ربط handleSubmit مع الدالة onSubmit */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-6">
              {/* ✅ حقل الاسم */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name")} 
                />
                {/* عرض رسالة الخطأ إن وجدت */}
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* ✅ حقل البريد الإلكتروني */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")} 
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>


              {/* ✅ حقل رقم الهاتف */}
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber")} 
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* ✅ حقل كلمة المرور */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")} 
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              
              {/* ✅ حقل تأكيد كلمة المرور */}
              <div className="grid gap-2">
                <Label htmlFor="passwordConfirm">Confirm Password</Label>
                <Input
                  id="passwordConfirm"
                  type="password"
                  placeholder="Enter your password again"
                  {...register("passwordConfirm")} 
                />
                {errors.passwordConfirm && (
                  <p className="text-red-500 text-sm">{errors.passwordConfirm.message}</p>
                )}
              </div>


              {/* ✅ حقل تأكيد كلمة المرور */}
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                
              <RadioGroup defaultValue="Tenant" className="w-fit">
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="Tenant" id="r1" />
                        <Label htmlFor="r1">Tenant</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="Manager" id="r2" />
                        <Label htmlFor="r2">Manager</Label>
                    </div>
                    
                </RadioGroup>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}
              </div>
              
            </div>


            {/* ✅ زر الإرسال */}
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading} // تعطيل الزر أثناء الإرسال
            >
              {isLoading ?  <LoaderIcon
                  role="status"
                  aria-label="Loading"
                  className={cn("size-4 animate-spin")}
                /> : " Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}
