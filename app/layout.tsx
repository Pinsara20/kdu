import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Remembering The Longest Day",
  description: "A collection of stories and resources preserving the memory of D-Day.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
