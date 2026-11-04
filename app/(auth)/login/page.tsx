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
import { getErrorMessage } from "@/lib/error/errorHandler";

const formSchema = z.object({
  name: z.string().min(5, "يجب أن يكون الاسم من 5 حروف على الأقل"),
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  password: z.string().min(8, "يجب أن تكون كلمة المرور من 8 أحرف على الأقل"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginCard() {
  const router = useRouter();
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log("البيانات المُرسلة:", data);

      const response = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      console.log("استجابة الباك إند:", response);

      if (response?.token) {
        localStorage.setItem("token", response.token);
      }

      toast.success("Logged in successfully!", { autoClose: 2000 });
      router.push("/landing");
    } catch (error: any) {
      console.log(error);

      toast.error(getErrorMessage(error), {
        autoClose: 3000
      });
    };
  }
    return (
      <main className="min-h-screen w-full flex items-center justify-center px-4 py-8 sm:px-6">
      <div  className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader  className="space-y-2">
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-6">
                {/*  حقل الاسم */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name")}
                  />
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
                disabled={isLoading}
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
      </main>
    );
  }
