"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDown, Menu, User, Wallet } from "lucide-react";

const AppHeader = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "DeFi Features", path: "/defi_features" },
    { name: "Fantasy Football", path: "/fantasy" },
    { name: "Community", path: "/community" },
  ];

  const profileItems = [
    { name: "Investor Profile", path: "/select_profile/investor_profile" },
    { name: "Athlete Profile", path: "/select_profile/athlete_profile" },
    { name: "Scout Profile", path: "/select_profile/scout_profile" },
    // { name: "Full Athlete NFT", path: "/athlete/1/nft" },
    { name: "Trainer Profile", path: "/select_profile/trainer_profile" },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#0066B3] to-[#E84142] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-2xl font-bold text-[#0066B3]">Prospex</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-[#E84142] ${
                  pathname === item.path ? "text-[#E84142] border-b-2 border-[#E84142] pb-1" : "text-gray-600"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Select Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-sm font-medium text-gray-600 hover:text-[#E84142] transition-colors bg-transparent border-none cursor-pointer flex items-center">
                  Select Profile
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200">
                {profileItems.map(profile => (
                  <DropdownMenuItem
                    key={profile.name}
                    asChild
                    className="focus:bg-gray-100 focus:text-gray-700 focus-visible:bg-gray-100"
                  >
                    <Link
                      href={profile.path}
                      className="w-full text-gray-700 hover:text-[#E84142] hover:bg-gray-100 cursor-pointer focus:outline-none focus-visible:outline-none"
                    >
                      {profile.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* RainbowKit Wallet Button */}
            <ConnectButton.Custom>
              {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <Button
                            onClick={openConnectModal}
                            className="bg-[#0066B3] hover:bg-[#0066B3]/90 text-white rounded-full"
                            size="sm"
                          >
                            <Wallet className="w-4 h-4 mr-2" />
                            Wallet
                          </Button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <Button
                            onClick={openChainModal}
                            className="bg-red-500 hover:bg-red-600 text-white rounded-full"
                            size="sm"
                          >
                            Wrong Network
                          </Button>
                        );
                      }

                      return (
                        <div className="flex gap-2">
                          <Button
                            onClick={openChainModal}
                            variant="outline"
                            size="sm"
                            className="rounded-full border-[#0066B3] text-[#0066B3] hover:bg-[#0066B3] hover:text-white"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 16,
                                  height: 16,
                                  borderRadius: 999,
                                  overflow: "hidden",
                                  marginRight: 8,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? "Chain icon"}
                                    src={chain.iconUrl}
                                    style={{ width: 16, height: 16 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </Button>

                          <Button
                            onClick={openAccountModal}
                            className="bg-[#0066B3] hover:bg-[#0066B3]/90 text-white rounded-full"
                            size="sm"
                          >
                            <Wallet className="w-4 h-4 mr-2" />
                            {account.displayName}
                          </Button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>

            {/* Sign In Button */}
            <Link href="/login">
              <Button className="bg-[#E84142] hover:bg-[#E84142]/90 rounded-full">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.path}
                className="block py-2 text-sm font-medium text-gray-600 hover:text-[#E84142]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Profile Links */}
            <div className="pt-2 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-800 mb-2">Select Profile:</p>
              {profileItems.map(profile => (
                <Link
                  key={profile.name}
                  href={profile.path}
                  className="block py-2 pl-4 text-sm font-medium text-gray-600 hover:text-[#E84142]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {profile.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <Link href="/wallet" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full rounded-full">
                  <Wallet className="w-4 h-4 mr-2" />
                  Wallet
                </Button>
              </Link>
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-[#E84142] hover:bg-[#E84142]/90 rounded-full">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppHeader;
