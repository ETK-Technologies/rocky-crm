import "./globals.css";

export const metadata = {
  title: "Rocky CRM - Customer Relationship Management",
  description: "Modern CRM system built with Next.js and Laravel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
