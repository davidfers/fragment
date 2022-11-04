/* eslint-disable react/jsx-props-no-spreading */
import type { Dispatch } from "react";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { SignInResponse } from "next-auth/react";
import { signIn } from "next-auth/react";
import Button from "../Button";

const schema = z.object({
  email: z.string().email(),
});

type SchemaType = z.infer<typeof schema>;

function SigninForm({ setIsOpen }: { setIsOpen: Dispatch<boolean> }) {
  const [signInResponse, setSignInResponse] = useState<SignInResponse>();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SchemaType> = async ({
    email,
  }: {
    email: string;
  }) => {
    const res = await signIn("email", { email, redirect: false });
    setSignInResponse(res);
  };

  return (
    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
      {!signInResponse?.ok && (
        <>
          <h3 className="mb-10 text-xl font-medium text-gray-900">
            Sign in to fragment
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col pb-1">
              <div className="mb-6">
                <input
                  type="email"
                  className={`rounded-sm border p-2 ${
                    errors.email && "border-red-500"
                  }`}
                  placeholder="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="my-2 rounded-md bg-fuchsia-700 p-2 text-white hover:bg-fuchsia-800"
              >
                Log in
              </button>
            </div>
          </form>
        </>
      )}
      {signInResponse?.ok && (
        <div className="text-center">
          <h3 className="mb-3">
            An email has been sent to <b>{getValues().email}</b>
          </h3>
          <Button text="OK" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default SigninForm;
