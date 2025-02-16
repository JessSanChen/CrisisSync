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
                const data = await response.json();
                const text = data.message
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
        <div className="flex h-screen">
                {/* Location */}
            <p>{displayedText}</p>
        </div>
    );
};

export default DynamicScriptDisplay;
