"use client";
import React, { useState } from "react";
import axios from "axios";
import st from "./sectionMain.module.scss";
import { svgs } from "@/assets";
import Image from "next/image";
import { useIsMobile } from "../hooks";

export const Form = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setMessage(null); // Reset message when user starts typing again
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      // Set your JSONBin.io API endpoint and headers here
      const binId = "65db89aadc74654018a9b897"; // Replace with your actual Bin ID from JSONBin.io
      const masterKey =
        "$2a$10$4c7GiSM5.DoYMaCbJFt0n.4FWIRH0UPT/UdkiWmWtp7FK2eOTsD02"; // Replace with your actual Master Key from JSONBin.io
      const apiEndpoint = `https://api.jsonbin.io/v3/b/${binId}`;

      const response = await axios.put(
        apiEndpoint,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": masterKey,
            // 'X-Bin-Versioning': 'false', // Optional: Include if you want to turn off versioning
          },
        }
      );
      console.log("response", response);
      if (response.data && response.status === 200) {
        setMessage("Success! Your email has been saved.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={st.formContainer}>
      <input
        type="email"
        value={email}
        onChange={handleInputChange}
        placeholder="Enter your email address"
        className={st.inputEmail}
        required
      />
      <button type="submit" className={st.submitButton}>
        Get Referral Link
      </button>
      {message && (
        <p
          className={`${st.message} ${
            message.startsWith("Success") ? st.messageSuccess : st.messageError
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export const Step = ({ image, alt, title, children, forward }: any) => {
    const isMobile = useIsMobile(768);
  return (
    <div
      className={`${st.stepContainer} ${
        !isMobile ? (forward ? st.stepForward : st.stepBackward) : ""
      }`}
    >
      <Image src={image} alt={alt} className={st.stepImage} />
      <div className={st.stepContent}>
        <p className={st.stepTag}>{alt}</p>
        <h3 className={st.stepTitle}>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
};

export const SectionMain = () => {
  
  return (
    <main className={st.mainContainer}>
      <div className={st.contentMaxWidth}>
        <section className={`${st.flexColumnSection} ${st.flexRowLargeScreen}`}>
          <div className={st.card}>
            <div>
              <h2 className={st.cardTitle}>REFER FRIENDS AND GET REWARDS</h2>
              <p className={st.cardText}>
                Refer your friends to us and earn hotel booking vouchers. We'll
                give you 1 coin for each friend that installs our extension.
                Minimum cash-out at 20 coins.
              </p>
              <Form />
            </div>
            <p className={st.smallText}>Limits on max rewards apply.</p>
          </div>
          <div className={`${st.stepsWrapper}`}>
            <div className={st.stepsWrap}>
              <Step
                image={svgs.invite}
                alt="Step 1"
                forward
                title="INVITE FRIENDS"
              >
                Refer friends with your unique referral link.
              </Step>
              <Step image={svgs.collect} alt="Step 2" title="COLLECT COINS">
                Get 1 coin for each friend that installs our extension using
                your referral link.
              </Step>
              <Step
                image={svgs.voucher}
                alt="Step 3"
                forward
                title="GET VOUCHER"
              >
                Redeem for a $20 hotel booking voucher once you collect 20
                coins.
              </Step>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
