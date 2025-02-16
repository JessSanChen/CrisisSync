import React, { useEffect, useState } from "react";

const DynamicScriptDisplay = () => {
    const [script, setScript] = useState("");
    const [displayedText, setDisplayedText] = useState("");
    const [words, setWords] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fetchScript = async () => {
            try {
                const response = await fetch("http://localhost:8000/call_911/0");
                const text = await response.text();
                console.log(text)
                setScript(text);
                setWords(text.split(" "));
            } catch (error) {
                console.error("Error fetching script:", error);
            }
        };
        fetchScript();
    }, []);

    useEffect(() => {
        if (words.length === 0 || index >= words.length) return;

        const randomDelay = Math.random() * 300 + 100; // Random delay between 100ms and 400ms
        const timeout = setTimeout(() => {
            setDisplayedText((prev) => prev + (prev ? " " : "") + words[index]);
            setIndex((prev) => prev + 1);
        }, randomDelay);

        return () => clearTimeout(timeout);
    }, [index, words]);

    return (
        <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
                {/* Location */}
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <p>{displayedText}</p>
                </div>
            </dl>
        </div>
    );
};

export default DynamicScriptDisplay;
