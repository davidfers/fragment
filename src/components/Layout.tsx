import React from "react";
import Navbar from "./nav/Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="p-2"> {children}</main>
    </>
  );
}
