import './globals.css';

export const metadata = {
  title: 'Password Strength Checker',
  description: 'Check your password strength',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
