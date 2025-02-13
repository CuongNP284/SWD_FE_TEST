"use client";

import CustomPagination from "@/components/CustomPagination";
import { useInstropectMutation } from "@/state/api/authApi";
import { cookieUtils } from "@/utils/cookies";
import { number } from "zod";

export default function Home() {
  const [instropect] = useInstropectMutation();

  const checkToken = async () => {
    const result = await instropect({ token: cookieUtils.getAccessToken() });
  };

  const onChange = (number: number) => {
    console.log(number);
  }

  return (
    <>
      <button onClick={checkToken}>Click</button>
      <CustomPagination pageNum={10} totalPage={20} onPageChange={onChange}/>
    </>
  );
}
