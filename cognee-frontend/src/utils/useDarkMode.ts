import { useEffect, useState } from "react";

export function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check localStorage for saved preference
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode !== null) {
            const isDark = savedMode === "true";
            setIsDarkMode(isDark);
            if (isDark) {
                document.documentElement.classList.add("dark");
            }
        } else {
            // Check system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setIsDarkMode(prefersDark);
            if (prefersDark) {
                document.documentElement.classList.add("dark");
            }
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem("darkMode", String(newMode));
            if (newMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            return newMode;
        });
    };

    return { isDarkMode, toggleDarkMode };
}
