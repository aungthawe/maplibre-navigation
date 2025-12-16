import "./globals.css";

export const metadata = {
  title: "Navigation App",
  description: "MapLibre Navigation App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white">{children}</body>
    </html>
  );
}
