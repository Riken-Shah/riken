import React from "react";
import styled from "styled-components";
import { useForm } from "@formspree/react";
import theme from "../theme";
import { defaultSectionStyling, device } from "../utils";
import SlidingHeading from "./SlidingHeading";
import ButtonElement from "./Button";

const ContactOuterWraper = styled.div`
  display: flex;
  flex-direction: column;
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
    font-size: 15px;
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

const Input = styled.input`
  background: transparent;
  border: none;
  font-size: 18px;
  width: 100%;
  border-bottom: solid 1px #8c8c8c;
  color: ${theme.primary};
  padding: 12px 0;
  font-weight: 400;
  font-size: 20px;
  text-transform: uppercase;
  margin-bottom: 30px;

  &:focus-visible {
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

  @media only screen and ${device.laptopS} {
    font-size: 12px;
    &::placeholder {
      font-size: 12px;
    }
  }
`;

const Option = styled.option``;

const InputItem = ({ type = "text", placeholder = "", ...extra }) => (
  <Input type={type} placeholder={placeholder} {...extra} />
);

function Contact() {
  const [state, handleSubmit] = useForm("xrgrnzyp");
  if (state.succeeded) {
    console.log("Success");
  }
  return (
    <ContactOuterWraper>
      <SlidingHeading word="CONTACT" />
      <ContactInnerWrapper>
        <Section>
          <Details>
            If you want to work together on a project or just have a chat,
            please don&#39;t hesitate to contact me. <br />
            <EmailLink href="mailto:rikenshah.02@gmail.com" target="_blank">
              rikenshah.02@gmail.com
            </EmailLink>
          </Details>
        </Section>
        <Section>
          <ContactForm onSubmit={handleSubmit}>
            <InputItem placeholder="Name" name="name" />
            <InputItem placeholder="Email" type="email" name="email" />
            <Input as="select" name="reason">
              <Option value="Why you want to connect with me?">
                Why you want to connect with me?{" "}
                <span role="img" aria-label="why">
                  🤔
                </span>
              </Option>
              <Option value="Regarding Project">
                Regarding Project{" "}
                <span role="img" aria-label="handshake">
                  🤝
                </span>
              </Option>
              <Option value="Regarding Job Enquiry">
                Regarding Job Enquiry{" "}
                <span role="img" aria-label="boy">
                  👨‍💼
                </span>
              </Option>
              <Option value="Just wanted to have quick chat">
                Just wanted to have quick chat{" "}
                <span role="img" aria-label="smile">
                  😃
                </span>
              </Option>
            </Input>
            <Input
              name="message"
              placeholder="Any message you want to leave for me? 📨"
            />
            <ButtonElement
              style={{ color: state.submitting && "red" }}
              type="submit"
              as="button"
            >
              {" "}
              Connect Now{" "}
              <span role="img" aria-label="hi">
                📩
              </span>
            </ButtonElement>
          </ContactForm>
        </Section>
      </ContactInnerWrapper>
    </ContactOuterWraper>
  );
}

export default Contact;
