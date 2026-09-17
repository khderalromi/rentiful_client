"use client";

import { useState } from "react";
import { useLoginUserMutation } from "../../../state/Auth/AuthSlice";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react"

import Link from "next/dist/client/link";
import { toast, ToastContainer } from "react-toastify";

// ✅ الخطوة 1: تعريف Validation Schema باستخدام Zod
const formSchema = z.object({
  name: z.string().min(5, "يجب أن يكون الاسم من 5 حروف على الأقل"),
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  password: z.string().min(8, "يجب أن تكون كلمة المرور من 8 أحرف على الأقل"),
});

// ✅ تحديد نوع البيانات من Zod
type FormData = z.infer<typeof formSchema>;

export default function LoginCard() {
  const router = useRouter();
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

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
    },
  });

  // ✅ الخطوة 3: دالة معالجة إرسال النموذج
  const onSubmit = async (data: FormData) => {
    try {
      // البيانات المُتحققة من صحتها تلقائياً بواسطة Zod
      console.log("البيانات المُرسلة:", data);

      // إرسال الطلب للسيرفر
      const response = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      console.log("استجابة الباك إند:", response);

      // تخزين التوكن
      if (response?.token) {
        localStorage.setItem("token", response.token);
      }
      
       toast.success("Logged in successfully!", { autoClose: 2000 });
      router.push("/landing");
    } catch (error: any) 
    {console.log(error);
      const errorMessage =
        error?.data?.message ||
        error?.message

      toast.error(errorMessage, { autoClose: 2000 });
    }
  };

return (
  <div className="w-1/3 self-center">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <p>RENT<span className="text-red-500">IFul</span></p>
        </CardTitle>
        <CardDescription>
          Welcome to our platform! Please log in to continue.
        </CardDescription>
        <CardAction>
          <Link href="/signup">Sign Up</Link>
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
          </div>

          {/* ✅ زر الإرسال */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading} // تعطيل الزر أثناء الإرسال
          >
            {isLoading ? <LoaderIcon
              role="status"
              aria-label="Loading"
              className={cn("size-4 animate-spin")}
            /> : "Log in"}
          </Button>
        </form>
      </CardContent>
    </Card>
    <ToastContainer />
    
  </div>
);
}
