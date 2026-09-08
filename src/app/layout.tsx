import type { Metadata } from "next";
import "./globals.css";
import GoogleTranslator from "@/components/GoogleTranslator";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var s = localStorage.getItem('mahalaxmi_font_size');
                if (s) {
                  var n = parseInt(s, 10);
                  if (!isNaN(n) && n >= 12 && n <= 26) {
                    document.documentElement.style.fontSize = n + 'px';
                  }
                }
                var savedLang = localStorage.getItem('mahalaxmi_language');
                var c = document.cookie || '';
                var isHindi = savedLang === 'HI' || (savedLang !== 'EN' && (c.indexOf('googtrans=/en/hi') !== -1 || c.indexOf('googtrans=%2Fen%2Fhi') !== -1));

                if (isHindi) {
                  document.documentElement.classList.add('translating-hi');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <GoogleTranslator />
        {children}
      </body>
    </html>
  );
}
