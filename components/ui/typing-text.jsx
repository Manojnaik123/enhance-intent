import { useEffect, useState } from "react";

export default function TypingText({ text }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText(""); // reset if text changes
        if (!text) return;

        let index = -1;

        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + (text[index] || ""));
            index++;
            if (index === text.length) clearInterval(interval);
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return <p className="bg-muted-text/5 rounded-2xl p-4 border border-muted-text/10">
        {displayedText}
    </p>;
}