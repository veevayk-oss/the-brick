
export const metadata = {
  title: "THE BRICK",
  description: "Luxury restaurant experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
