import localFont from 'next/font/local';

// Define Financier Display font
export const financierDisplay = localFont({
  variable: '--font-financier-display',
  src: [
    {
      path: '../fonts/financier_display/financier-display-web-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/financier_display/financier-display-web-regular-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/financier_display/financier-display-web-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/financier_display/financier-display-web-medium-italic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/financier_display/financier-display-web-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/financier_display/financier-display-web-semibold-italic.woff2',
      weight: '600',
      style: 'italic',
    },
  ],
  display: 'swap',
});

// Define Calibre font
export const calibre = localFont({
  variable: '--font-calibre',
  src: [
    {
      path: '../fonts/calibre/calibre-web-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/calibre/calibre-web-light-italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/calibre/calibre-web-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/calibre/calibre-web-regular-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/calibre/calibre-web-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/calibre/calibre-web-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/calibre/calibre-web-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
}); 