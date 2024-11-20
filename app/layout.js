export const metadata = {
  title: "Gauss",
  description: "Gauss",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
