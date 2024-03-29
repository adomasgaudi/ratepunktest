"use client";
import React, { useState } from "react";
import axios from "axios";
import st from "./sectionMain.module.scss";
import { svgs } from "@/assets";
import Image from "next/image";
import { useIsMobile } from "../hooks";
import * as Yup from "yup";

const BIN_ID = process.env.NEXT_PUBLIC_BIN_ID;
const MASTER_KEY = `$2a$10$4c7GiSM5.DoYMaCbJFt0n.${process.env.NEXT_PUBLIC_MASTER_KEY_END}`;
const API_ENDPOINT = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const emailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
});
export const Form = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);

  const handleInputChange = (e: any) => {
    setEmail(e.target.value);
    setMessage(null);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    emailSchema
      .validate({ email }, { abortEarly: false })
      .then(async () => {
        try {
          const response = await axios.put(
            API_ENDPOINT,
            { email },
            {
              headers: {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY,
              },
            }
          );

          if (response.data && response.status === 200) {
            setMessage("Your email is confirmed!");
            setReferralLink("https://ratepunk.com/referral"); 
          } else {
            setMessage("An error occurred. Please try again.");
          }
        } catch (error: any) {
          console.error("Error submitting form:", error);
          setMessage(
            error.response?.data?.message ||
              "An error occurred. Please try again."
          );
        }
      })
      .catch((err) => {
        const errorMessage = err.errors
          ? err.errors[0]
          : "An error occurred. Please try again.";
        setMessage(errorMessage);
      });
  };

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link).then(
      () => {
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <form onSubmit={handleFormSubmit} className={st.formContainer}>
      {!referralLink && (
        <>
          {message && <p className={st.errorMessage}>{message}</p>}
          <div className={st.emailInputWrapper}>
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className={st.inputEmail}
              required
            />
            <Image src={svgs.email} alt="email" className={st.emailIcon} />
          </div>
          <button type="submit" className={st.submitButton}>
            Get Referral Link
          </button>
        </>
      )}
      {referralLink && (
        <div className={st.successContainer}>
          <div className={st.successIconText}>
            <Image
              src={svgs.success}
              alt="success"
              className={st.successIcon}
            />
            <p className={st.successMessage}>{message}</p>
          </div>
          <div className={st.referralLinkContainer}>
            <input
              type="text"
              value={referralLink}
              readOnly
              className={st.referralLink}
            />
            <button
              onClick={() => copyToClipboard(referralLink)}
              className={st.copyButton}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export const Step = ({ image, alt, title, children, forward }: any) => {
  const isMobile = useIsMobile(1050);
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
                Refer your friends to us and earn hotel booking vouchers.
                We&apos;ll give you 1 coin for each friend that installs our
                extension. Minimum cash-out at 20 coins.
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
