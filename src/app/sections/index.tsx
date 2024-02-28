"use client";
import { svgs } from "@/assets";
import Image from "next/image";

export const NavBar = () => {
  return (
    <nav>
      <h1><Image src={svgs.logo} alt="Logo" /></h1>
    </nav>
  );
};
export const SectionMain = () => {
  return (
    <nav>
      <h1>section main</h1>
    </nav>
  );
};
export const SectionStore = () => {
  return (
    <nav>
      <h1>navb=</h1>
    </nav>
  );
};
export const Footer = () => {
  return (
    <nav style={{border: '1px solid gray', borderColor: 'red'}}>
      <h1>navb=</h1>
    </nav>
  );
};
