"use client"; // Required for Next.js App Router

import { createContext, useContext, useState } from "react";

// Create context
const SidebarContext = createContext();

// Create provider
export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar function
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook to use context
export const useSidebar = () => useContext(SidebarContext);
