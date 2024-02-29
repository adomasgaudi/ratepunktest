"use client";
import { svgs } from "@/assets";
import Image from "next/image";
import st from "./sections.module.sass";
import { useState } from "react";
import { useIsMobile } from "../hooks";
import { NavItemProps } from "../types";
import { Modal } from "../components";

const NAVITEMS = ["Chrome Extension", "Price Comparison", "Blog"];

export const NavItem = ({ text, active, onClick, modal }: NavItemProps) => (
  <li
    className={modal ? st.modalNavLi : st.navLi}
    onClick={onClick}
    style={{ color: active ? "#4EB3E3" : "#434A54" }}
  >
    <a href="#">{text}</a>
  </li>
);

type HeaderProps = {
  children: React.ReactNode;
  border?: boolean;
};

const Header = ({ children, border }: HeaderProps) => (
  <header className={border ? st.border : ""}>
    <div className={st.headerContainer}>
      <a href="/" className={st.navbarAnchor}>
        <Image src={svgs.logo} alt="Logo" />
      </a>
      <nav className={st.navbar}>{children}</nav>
    </div>
  </header>
);

export const NavBar = () => {
  const [activeItem, setActiveItem] = useState<string>(NAVITEMS[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isMobile = useIsMobile(1050);

  const handleMenuClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Header border>
        {isMobile && (
          <button onClick={handleMenuClick} className={st.navButton}>
            <Image src={svgs.menu} alt="Menu" />
          </button>
        )}
        {!isMobile && (
          <ul className={st.navUl}>
            {NAVITEMS.map((item) => (
              <NavItem
                key={item}
                text={item}
                active={activeItem === item}
                onClick={() => setActiveItem(item)}
              />
            ))}
          </ul>
        )}
      </Header>
      {isModalOpen && (
        <Modal onClose={handleMenuClick}>
          <div className={st.border}>
            <Header>
              <button onClick={handleMenuClick} className={st.navButton}>
                <Image src={svgs.close} alt="Close" />
              </button>
            </Header>
            <ul className={st.modalNavUl}>
              {NAVITEMS.map((item) => (
                <NavItem
                  key={item}
                  text={item}
                  active={activeItem === item}
                  onClick={() => {
                    setActiveItem(item);
                    setIsModalOpen(false);
                  }}
                  modal
                />
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </>
  );
};
