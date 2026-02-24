'use client';

import { copy, idea, magic, message, tutor } from "@/lib/icons";
import { useEffect, useState } from "react";
import { getCurrentLocation } from "@/lib/data";
import { useRouter } from 'next/navigation';
import TypingText from "@/components/ui/typing-text";
import PopUp from "@/components/modal/pop-up";

export default function Home() {

  const [input, setInput] = useState('');
  const [result, setResult] = useState();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    var isFirstTime = localStorage.getItem('isFirst');
    if (!isFirstTime) {
      setOpen(true);
      localStorage.setItem('isFirst', true);
    } else {
      setOpen(false);
    }
  }, [])


  // async function handleButtonClick(text = '') {
  //   setIsGenerating(true);
  //   const loc = await getCurrentLocation();
  //   const area = loc.area;
  //   const city = loc.city;

  //   try {
  //     // ✅ disable button and show generating

  //     const payload = {
  //       service: text != '' ? text : input,
  //       location: `${area}, ${city}`,
  //     };

  //     const res = await fetch("/api/ask", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!res.ok) throw new Error("API failed");

  //     const data = await res.json();
  //     setResult(data.result)
  //   } catch (error) {
  //     console.error(error);
  //     setIsGenerating(false);
  //   } finally {
  //     setIsGenerating(false); // ✅ enable button again
  //   }
  // }

  async function handleButtonClick(text = '') {
    setIsGenerating(true);

    try {
      // Start getting location, but don't "await" it yet if you want to be safe
      // Or better: wrap it in a timeout so it doesn't hang Safari
      const locationPromise = getCurrentLocation().catch(() => ({ area: 'Unknown', city: 'Unknown' }));

      const loc = await locationPromise;
      const area = loc?.area || 'Unknown';
      const city = loc?.city || 'Unknown';

      const payload = {
        service: text !== '' ? text : input,
        location: `${area}, ${city}`,
      };

      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      console.error("Safari Error:", error);
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSuggestionClick(text) {
    setInput(text);
    await handleButtonClick(text);
  }

  return (
    <>
      <PopUp isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-semibold mb-2">Hello 👋</h2>
        <p>This is your modal with backdrop blur.</p>
      </PopUp>
      <div className="flex flex-col items-center text-muted-text ">
        <div className="w-full max-w-5xl flex flex-col items-centre p-4 min-h-[90lvh]">
          <div className="w-full text-center pt-25 md:pt-30 flex-col items-center flex gap-4">
            <h1 className="text-2xl md:text-5xl font-semibold text-secondary-text px-5 md:px-0">
              Enhance Your Requests with AI
            </h1>
            <div className="px-2 md:px-40">
              <p className="inline-block mx-auto text-muted-text/70 text-xs md:text-sm">
                Enter your task or service, and get AI-generated professional variations to help you communicate clearly and effectively.
              </p>
            </div>
          </div>
          <div className="grow flex flex-col gap-4 pt-5 md:pt-10">
            <div className="w-full shadow-lg rounded-2xl bg-white-bg border border-muted-text/10">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a service or request (e.g., Plumber, Tutor, Grocery Delivery)…"
                maxLength={2000}
                className="w-full text-sm md:text-lg h-20 resize-none outline-none bg-transparent p-4 "
              />
              <div className="w-full hidden md:flex justify-end bg-nav-gray/50 border-t border-muted-text/10 rounded-b-2xl px-4 py-2">
                <div>
                  <button
                    className="bg-primary-button/80 px-4 py-2 rounded-full text-white font-semibold flex gap-2"
                    onClick={() => handleButtonClick('')}
                    disabled={isGenerating || input.trim() === ''} // ✅ disable if generating or input empty
                  >
                    {magic} {isGenerating ? 'Generating...' : 'Generate AI Suggestions'}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex w-full md:hidden">
              <button className="w-full bg-primary-button/80 px-4 py-2 rounded-full text-white font-semibold flex justify-center items-center gap-2"
                onClick={() => handleButtonClick('')}
                disabled={isGenerating || input.trim() === ''}
              >
                {magic} {isGenerating ? 'Generating...' : 'Generate AI Suggestions'}
              </button>
            </div>
            <div>
              {
                (Array.isArray(result) && result.length === 1) && (
                  <TypingText text={result && result[0] ? result[0] : ""} />
                )
              }
            </div>
            {(!result || result.length === 1) && (
              <div className="w-full flex flex-col gap-1">
                <span className="text-secondary-text font-semibold">
                  Try these suggections:
                </span>
                <div className="flex flex-col gap-2">
                  <div className=" text-xs md:text-1xl flex gap-2">
                    <button className="px-4 py-2 border border-muted-text/10 bg-muted-text/5 rounded-full"
                      onClick={() => handleSuggestionClick('Find a tutor')}>
                      Find a tutor
                    </button>
                    <button className="px-4 py-2 border border-muted-text/10 bg-muted-text/5 rounded-full"
                      onClick={() => handleSuggestionClick('Order Groceries')}>
                      Order Groceries
                    </button>
                    <button className="px-4 py-2 border border-muted-text/10 bg-muted-text/5 rounded-full"
                      onClick={() => handleSuggestionClick('Barber')}>
                      Barber
                    </button>
                  </div>
                  <div className=" text-xs md:text-1xl flex gap-2">

                    <button className="px-4 py-2 border border-muted-text/10 bg-muted-text/5 rounded-full"
                      onClick={() => handleSuggestionClick('Book a cleaner')}>
                      Book a cleaner
                    </button>

                    <button className="px-4 py-2 border border-muted-text/10 bg-muted-text/5 rounded-full"
                      onClick={() => handleSuggestionClick(' Private chef')}>
                      Private chef
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ------------------------- */}
          <div className='w-full flex justify-between items-center text-sm py-4'>
            {(Array.isArray(result) && result.length > 1) && (
              <>
                <div className="flex flex-col md:flex-row gap-4">
                  <span className='flex items-center gap-2 text-lg font-semibold text-secondary-text'>
                    <span className="text-primary-button" >{idea}</span>
                    AI-Enhanced Suggestions
                  </span>
                  <div className='flex gap-2'>
                    <span className="px-2 py-1 text-xs font-bold rounded-full text-red-400/80 bg-red-400/20">
                      Urgent
                    </span>
                    <span className="px-2 py-1 text-xs font-bold rounded-full text-primary-button/80 bg-primary-button/20">
                      Location Aware
                    </span>
                    <span className="px-2 py-1 text-xs font-bold rounded-full text-green-400/80 bg-green-400/20">
                      Price Aware
                    </span>
                  </div>
                </div>

                <span className='hidden md:flex text-xs text-muted-text/40 '>
                  {result.length} Suggestions generated
                </span>
              </>
            )}

          </div>

          <div className='w-full grow flex flex-col gap-4 pb-10'>
            {(Array.isArray(result) && result.length > 1) && result.map((query, index) => (
              <Card key={index} query={query} />
            ))}

          </div>

          <div className='bg-muted-text/10 p-4 text-center text-sm w-full border border-dashed border-gray-400/50 rounded-2xl flex flex-col gap-2'>
            <span className='text-primary-button font-semibold text-lg'>
              Pro Tip: Choose the Right Tone
            </span>
            <p>Selecting an appropriate tone (Professional, Friendly, Direct) can help your request get faster and more accurate responses from service providers.</p>
          </div>
          {/* --------------------- */}
        </div>
      </div >
    </>
  );
}



function Card({ query }) {

  function redirectToWhatsApp(phoneNumber, text) {
    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(url, "_blank"); // opens in a new tab
  }

  function handleCopy() {
    // Use navigator.clipboard
    navigator.clipboard.writeText(query)
      .then(() => {
        alert("Query copied!"); // optional feedback
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  }

  return (
    <div className='w-full bg-white-bg rounded-2xl p-4 border border-muted-text/10'>
      <div className='flex flex-col md:flex-row h-full gap-4 items-center'>
        <div className='flex flex-col gap-2'>
          <div className='flex md:flex-row flex-col gap-4'>
          </div>
          <p className='md:pr-10'><i>"{query}"</i> <button className='pl-2' onClick={handleCopy}>{copy}</button></p>
        </div>
        <div className='ml-auto w-full md:w-auto flex flex-col justify-end'>
          <button className='w-full md:w-40 flex justify-center items-center gap-4 w-full rounded-full bg-green-400 text-white font-semibold py-2 h-10'
            onClick={() => redirectToWhatsApp("919800081110", query)}>
            {message} Send to Bino
          </button>
        </div>
      </div>
    </div>
  )
}