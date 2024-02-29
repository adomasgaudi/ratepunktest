"use client";
import { svgs } from "@/assets";
import Image from "next/image";
import st from "./sections.module.sass";
import { useEffect, useState } from "react";

type NavItemProps = {
  text: string;
  active: boolean;
  onClick: () => void;
};

export const NavItem = ({ text, active, onClick }: NavItemProps) => (
  <li
    className={st.navLi}
    onClick={onClick}
    style={{ color: active ? "#4EB3E3" : "#434A54" }}
  >
    <a href="#">{text}</a>
  </li>
);
export const ModalNavItem = ({ text, active, onClick }: NavItemProps) => (
  <li
    className={st.modalNavLi}
    onClick={onClick}
    style={{ color: active ? "#4EB3E3" : "#434A54" }}
  >
    <a href="#">{text}</a>
  </li>
);

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => (
  <div onClick={onClose} className={st.modal}>
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

export const NavBar = () => {
  const navItems = ["Chrome Extension", "Price Comparison", "Blog"];
  const [activeItem, setActiveItem] = useState<string>(navItems[0]);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 800);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <header className={st.header}>
        <a href="/" className={st.navbarAnchor}>
          <Image src={svgs.logo} alt="Logo" />
        </a>
        <nav className={st.navbar}>
          {isMobile ? (
            <button onClick={handleMenuClick} className={st.navButton}>
              <Image src={svgs.menu} alt="Menu" />
            </button>
          ) : (
            <ul className={st.navUl}>
              {navItems.map((item) => (
                <NavItem
                  key={item}
                  text={item}
                  active={activeItem === item}
                  onClick={() => setActiveItem(item)}
                />
              ))}
            </ul>
          )}
        </nav>
      </header>
      {isModalOpen && (
        <Modal onClose={handleMenuClick}>
          <div className={st.modalWrap}>
            <header className={st.header}>
              <a href="/" className={st.navbarAnchor}>
                <Image src={svgs.logo} alt="Logo" />
              </a>
              <nav className={st.navbar}>
                <button onClick={handleMenuClick} className={st.navButton}>
                  <Image src={svgs.close} alt="Menu" />
                </button>
              </nav>
            </header>
            <ul className={st.modalNavUl}>
              {navItems.map((item) => (
                <ModalNavItem
                  key={item}
                  text={item}
                  active={activeItem === item}
                  onClick={() => {
                    setActiveItem(item);
                    setIsModalOpen(false);
                  }}
                />
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </>
  );
};