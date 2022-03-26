import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useForm } from "@formspree/react";
import { defaultSectionStyling, device } from "../utils";
import SlidingHeading from "./SlidingHeading";
import ButtonElement from "./Button";
import { Context, sections } from "../store";
import { ADD_SECTION_ELEMENT, APP_STATE, SET_CURSOR_SCALE } from "../reducer";

const ContactOuterWraper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContactInnerWrapper = styled(defaultSectionStyling)`
  display: flex;
  padding: 10vh 0;
  width: 90vw;
  align-self: center;

  @media only screen and ${device.tablet} {
    flex-direction: column;
  }
`;

const Section = styled.div`
  flex: 1;
  &:first-child {
    padding-right: 6vw;
  }

  @media only screen and ${device.tablet} {
    margin-bottom: 5vh;
  }

  @media only screen and ${device.laptop} {
    &:first-child {
      padding-right: 3vw;
    }
  }
`;

const ContactForm = styled.form`
  //   background: red;
`;

const Details = styled.div`
  font-size: 17px;
  font-weight: 200;
  line-height: 35px;
  letter-spacing: 1px;
  max-width: 600px;

  @media only screen and ${device.laptop} {
    font-size: 16px;
  }

  @media only screen and ${device.tablet} {
    line-height: 30px;
  }
`;

const EmailLink = styled.a`
  font-family: "Druk Wide Bold";
  padding-top: 25px;
  display: block;
  font-size: 20px;
  letter-spacing: 2px;
  text-decoration: none;

  @media only screen and ${device.laptop} {
    font-size: 15px;
  }

  @media only screen and ${device.mobileM} {
    font-size: 4vw;
  }
`;
const InputOuterWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  z-index: 0;
  margin-bottom: 13px;

  &:focus-within .wave {
    opacity: 1 !important;
    transform: translateX(0%);
    transition-duration: 1s, 1s;
  }
`;

const InputInnerWrapper = styled.div`
  margin-bottom: 4px;
  z-index: 2;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  font-size: 18px;
  width: 100%;
  color: ${({ theme }) => theme.primary};
  padding: 12px 0;
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 20px;
  text-transform: uppercase;
  transition: border-color 0.5s ease;

  &:focus-visible {
    outline: none;
  }

  &:focus {
    border-color: ${({ theme }) => theme.primary} !important;
    outline: none;
  }

  &::placeholder {
    color: #8c8c8c;
    font-weight: 400;
    font-family: "Montserrat";
    font-size: 18px;
    text-transform: none;
  }

  @media only screen and ${device.laptop} {
    font-size: 15px;
    &::placeholder {
      font-size: 14px;
    }
  }
`;

const Option = styled.option``;

const ErrorMessage = styled.span`
  color: #ff3d3d;
  font-size: 13px;
  // padding: 15px 0;
  min-height: 17px;
  display: block;
  font-weight: 400;
`;

const Wave = styled.div`
  width: 300%;
  height: 60px;
  mask-image: url(static/curve.svg);
  background: ${({ theme }) => theme.primary};
  background-position: center bottom;
  transition: transform 1000ms cubic-bezier(0, 0.25, 0.5, 1) 0ms,
    opacity 0s ease;
  transform: translateX(-66%);
  position: absolute;
  top: -10px;
  left: -1px;
  right: 0;
  opacity: 0.5;
  z-index: -1;

  &:not(:focus) {
    transition: all 0s ease;
  }

  @media only screen and ${device.laptop} {
    top: -12px;
  }
`;

const Success = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${({ theme }) => theme.background};
  position: absolute;
  transition: top 0.5s ease-in-out, opacity 0.5s ease-in;
  padding: 0 30px;
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 10px;
  overflow-y: scroll;
`;

const SuccessOuterWrapper = styled.div`
  max-width: 600px;
  width: 100%;
`;

const SuccessInnerWrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  margin: 0px 0 150px;
  text-align: center;

  @media only screen and ${device.tablet} and ${device.landscape} {
    margin-top: 50px;
    margin-bottom: 0;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 150%;
  font-size: 30px;
  left: 45%;
  border: solid 0.5px;
  padding: 10px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  text-align: center;

  @media only screen and ${device.mobileL} {
    font-size: 6vw;
    width: 12vw;
    height: 12vw;
    left: 40%;
    padding: 2vw;
  }
`;

const SuccessTitle = styled.span`
  font-size: 50px;
  font-family: "Druk Wide Bold";
  @media only screen and ${device.tabletS} {
    font-size: 35px;
  }

  @media only screen and ${device.mobileL} {
    font-size: 8vw;
  }
`;

const SuccessSpan = styled.span`
  font-size: 20px;
  padding-left: 12px;
  padding-top: 10px;
  display: block;
  @media only screen and ${device.tabletS} {
    padding-left: 7px;
    font-size: 15px;
    padding-top: 5px;
  }

  @media only screen and ${device.mobileL} {
    font-size: 4vw;
  }
`;

const InputItem = ({ type = "text", errorMessage = "", ...extra }) => (
  <InputOuterWrapper>
    <InputInnerWrapper>
      <Input
        type={type}
        {...extra}
        style={{ ...extra?.style, borderColor: errorMessage && "#e14747" }}
      />
    </InputInnerWrapper>
    {extra?.placeholder && (
      <Wave
        className="wave"
        style={{
          background: errorMessage && "red",
        }}
      />
    )}
    <ErrorMessage> {errorMessage}</ErrorMessage>
  </InputOuterWrapper>
);

function Contact() {
  const [globalState, dispatch] = useContext(Context);
  const { mainScrollBar } = globalState;
  const [state, handleSubmit] = useForm("xrgrnzyp");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [message, setMessage] = useState("");
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [didFormFail, setDidFormFail] = useState(false);

  const refCallback = useCallback(
    (node) => {
      if (node) {
        dispatch({
          type: ADD_SECTION_ELEMENT,
          elementType: sections.contact,
          element: node,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.appState]
  );

  const checkEmail = (alert = true) => {
    const emailRe =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.trim() === "") {
      setEmailError("Please enter your mail");
    } else if (!emailRe.test(email.toLowerCase())) {
      if (alert) {
        setEmailError("Email seems to be incorrect");
      }
      return false;
    }
    return true;
  };

  const handleChange = (value, setValue, setError, emptyErrorMessage) => {
    setValue(value);
    if (value.trim() === "") {
      setError(emptyErrorMessage);
      return;
    }
    setError("");
    setDidFormFail(false);
  };

  const allGood = name && email && reason && checkEmail(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setNameError("Please enter your name");
    }
    if (!reason) {
      setReasonError("Please select a reason");
    }
    if (checkEmail() && allGood) {
      handleSubmit(e);
    }
  };

  const handleBlur = (e) => {
    if (globalState.appState === APP_STATE.MOBILE) {
      setTimeout(() => e.target.scrollIntoViewIfNeeded(), 500);
    }
  };

  const resetState = () => {
    setName("");
    setEmail("");
    setReason("");
    setMessage("");
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (state.succeeded) {
      setIsFormSuccess(true);
      resetState();
      document.body.style.overflow = "hidden";
      mainScrollBar?.updatePluginOptions("stopScroll", { stop: true });
      const timeout = setTimeout(() => {
        mainScrollBar?.updatePluginOptions("stopScroll", { stop: false });
        setIsFormSuccess(false);
        document.body.style.overflow = "inherit";
      }, 9999000);

      return () => clearTimeout(timeout);
    }
    if (state.errors.length) {
      setDidFormFail(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.succeeded, state.errors]);

  return (
		<ContactOuterWraper ref={refCallback} data-index={sections.contact}>
			<SlidingHeading word="CONTACT" />
			<ContactInnerWrapper>
				<Section>
					<Details>
						If you want to work together on a project or just have a chat,
						please don&#39;t hesitate to contact me. <br />
						<EmailLink
							href="mailto:rikenshah.02@gmail.com"
							target="_blank"
							onMouseEnter={() => {
								dispatch({ type: SET_CURSOR_SCALE, cursorScale: 2 });
							}}
							onMouseLeave={() => {
								dispatch({ type: SET_CURSOR_SCALE, cursorScale: 1 });
							}}
						>
							rikenshah.02@gmail.com
						</EmailLink>
					</Details>
				</Section>
				<Section>
					<ContactForm onSubmit={handleFormSubmit} autoComplete="off">
						<InputItem
							placeholder="Name"
							type="text"
							name="name"
							value={name}
							onChange={(e) =>
								handleChange(
									e.target.value,
									setName,
									setNameError,
									"I feel left out :("
								)
							}
							errorMessage={nameError}
						/>
						<InputItem
							placeholder="Email"
							type="text"
							name="email"
							value={email}
							errorMessage={emailError}
							onChange={(e) =>
								handleChange(
									e.target.value,
									setEmail,
									setEmailError,
									"You forgot about me!"
								)
							}
							onBlur={checkEmail}
						/>
						<InputItem
							as="select"
							name="reason"
							value={reason}
							errorMessage={reasonError}
							style={{ borderBottom: "solid 1px #7f7f7f" }}
							onBlur={handleBlur}
							onFocus={handleBlur}
							onChange={(e) =>
								handleChange(
									e.target.value,
									setReason,
									setReasonError,
									"Please select a reason"
								)
							}
						>
							{/* eslint-disable jsx-a11y/accessible-emoji */}
							<Option value="">Why you want to connect with me? 🤔</Option>
							<Option value="Regarding Project">Regarding Project 🤝</Option>
							<Option value="Regarding Job Enquiry">Regarding Job 👨‍💼</Option>
							<Option value="Just wanted to have quick chat">
								Just wanted to have quick chat 😃
							</Option>
						</InputItem>
						<InputItem
							name="message"
							placeholder="Any message you want to leave for me? 📨"
							value={message}
							onChange={(e) =>
								handleChange(e.target.value, setMessage, () => {}, "")
							}
						/>
						<ErrorMessage>
							{didFormFail ? "Something went wrong! Try again later" : ""}
						</ErrorMessage>
						<ButtonElement
							style={{
								width: "185px",
								opacity: allGood ? "1" : ".5",
								transition: "opacity .5s ease-in"
							}}
							buttonStyle={{
								height: "43px",
								width: "170px",
								paddingRight: "30px"
							}}
							type="submit"
							as="button"
						>
							Connect Now{" "}
							<img
								src={
									state.submitting ? "static/rocket.gif" : "static/rocket.png"
								}
								width={20}
								alt=""
								style={{ position: "absolute", right: "30px" }}
							/>
						</ButtonElement>
					</ContactForm>
				</Section>
			</ContactInnerWrapper>
			<Success
				style={{
					top: isFormSuccess
						? globalState.scrollingPosition.y
						: globalState.scrollingPosition.y - globalState.windowSize.height,
					left: globalState.scrollingPosition.x,
					opacity: isFormSuccess ? 1 : 0,
					zIndex: isFormSuccess ? 1 : -1
				}}
				onClick={() => {
					mainScrollBar?.updatePluginOptions("stopScroll", { stop: false });
					setIsFormSuccess(false);
				}}
			>
				<SuccessOuterWrapper>
					<SuccessInnerWrapper>
						<SuccessTitle>Thank You 🤗</SuccessTitle>
						<br />
						<SuccessSpan>I&#39;ll reach out to you soon 🚀</SuccessSpan>
						<CloseButton
							onMouseEnter={() => {
								dispatch({ type: SET_CURSOR_SCALE, cursorScale: 2 });
							}}
							onMouseLeave={() => {
								dispatch({ type: SET_CURSOR_SCALE, cursorScale: 1 });
							}}
						>
							x
						</CloseButton>
					</SuccessInnerWrapper>
				</SuccessOuterWrapper>
			</Success>
		</ContactOuterWraper>
	);
}

export default Contact;
