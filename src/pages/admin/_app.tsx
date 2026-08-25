import "../app/globals.css";

export default function App({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}) {
  return <Component {...pageProps} />;
}