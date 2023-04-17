export const metadata = {
  title: 'Anime',
  description: 'Information about anime',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
