import { headers } from "next/headers";
// ADD THIS
import "@rainbow-me/rainbowkit/styles.css";
import "@scaffold-ui/components/styles.css";
// ADD THIS
import { cookieToInitialState } from "wagmi";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

// ADD THIS

export const metadata = getMetadata({
  title: "Scaffold-ETH 2 App",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const ScaffoldEthApp = async ({ children }: { children: React.ReactNode }) => {
  // ADD THIS - Read cookies on the server
  const headersObj = await headers();
  const cookieHeader = headersObj.get("cookie") ?? "";
  const initialState = cookieToInitialState(wagmiConfig, cookieHeader);

  return (
    <html suppressHydrationWarning className={``}>
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders initialState={initialState}>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
