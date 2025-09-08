import type { Metadata } from "next";
import { Spline_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });

const spline_Sans = Spline_Sans({
    variable: "--font-spline-sans",
    subsets: ["latin"],
});

const playfair_Display = Playfair_Display({
    variable: "--font-playfair-display",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Event RSVP",
    description:
        " Join us for a special event celebrating the launch of our new collection. We're excited to share this moment with you.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${spline_Sans.className} ${playfair_Display.variable} antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
