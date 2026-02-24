'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; //

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    // Redirect to /ask on page load
    router.replace("/ask"); // or router.push("/ask") if you want it in history
  }, [router]);

  const [result, setResult] = useState();

  function parseResponse(text) {
    return text
      .split(/\n?\d+[\.\)]\s+/)
      .filter(item => item.trim().length > 0)
      .map(item => item.replace(/"/g, "").trim());
  }

  const sendRequest = async () => {
    try {
      const payload = {
        service: "Plumber",
        location: "Indiranagar",
        urgency: "within 2 hours"
      };

      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("API failed");
      }

      const data = await res.json();

      // data = { result: "1. ...\n2. ..." }

      const parsedQueries = parseResponse(data.result);

      setResult(parsedQueries);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(result);

  return (
    <div className="w-full h-screen flex flex-col justify-between items-centre p-10">
      {/* <div className="w-full text-center">
        <h1> Enhance Your query to get better result with Bino.</h1>
      </div>
      <div className="grow bg-blue-100">

      </div>
      <div className="flex justify-center items-center bg-gray-200 gap-2">
        <input type="text" className="bg-gray-200 border"></input>
        <button onClick={sendRequest}>
          Generate Enhanced query
        </button>
      </div> */}
    </div>
  );
}
