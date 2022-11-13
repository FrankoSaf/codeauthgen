import styled from "styled-components";
import React, { useContext } from "react";
import { Context } from "../../../store/Context.js";
import {
  GettingStartedData,
  errorCodes,
  templateLogics,
} from "../../../assets/documentationData/documentationData.js";

export default function Documentation() {
  const { darkTheme } = useContext(Context);
  return (
    <DocumentationContainer>
      <OverviewContainer className={darkTheme ? "dark-theme" : "light-theme"}>
        <div>
          <h2>
            <span>L</span>AZY <span>D</span>EVS - OVERVIEW
          </h2>
          <p>
            Lazy Devs is an authentication tool for developers. It will create
            for you all the authentication backend and front-end forms that are
            necessary for a user to log in, register, and log out from your
            website.
          </p>
        </div>
        <div>
          <h2>INTRODUCTION:</h2>
          <p>
            Lazy Devs is an authentication tool for websites. Usually,
            developers spend 1 - 2 days on their authentication code, both on
            the front end and back end. This tool will create all the code for
            you. In our tool, we choose the most used packages and approaches by
            developers to create user authentication for their websites. In just
            a few clicks you can get it done, copy or download a zip folder, and
            you are all set! :D
          </p>
        </div>
        <div>
          <h2>
            ADVANTAGES OF THE <span>L</span>AZY <span>D</span>EVS TOOL:
          </h2>
          <ul>
            <li>
              save time: usually, it takes 1-2 days of work to write an
              authentication backend and frontend code, with lazy devs you get
              it in less than a minute.
            </li>
            <li>
              Freedom to choose the best approach: As developers, we know that
              each and one of us has his own way of writing the code. After some
              research we’ve made, we chose the 3 most used approaches for
              authentication in a website and let you choose them.
            </li>
            <li>
              It's easy: instead of investing lots of time and energy in
              researching and implementing packages and methods, just a few
              clicks and you have it.
            </li>
            <li>
              Easy for beginners: Our tool is perfect for beginners. First, it
              will help them to get their website authentication fast and
              perfect, and also by doing that they can learn the most used
              methods of creating a user authentication and look deep into the
              code with small explanation comments that we added.
            </li>
          </ul>
        </div>
      </OverviewContainer>
      <GettingStartedContainer
        className={darkTheme ? "dark-theme" : "light-theme"}
      >
        <h2>GETTING STARTED</h2>

        {GettingStartedData.map((step, i) => {
          if (step.links) {
            return (
              <div>
                {" "}
                <p>{step.step}</p>
                <p>{step.content}</p>
                <p>dotenv link : {step.links.dotenv}</p>
                <p>nodemailer link : {step.links.nodemailer}</p>
              </div>
            );
          } else if (step.image) {
            return (
              <div>
                <h3>{step.step}</h3>
                <p>{step.content}</p>
                <ol>
                  {step.steps?.map((innerStep, i) => {
                    if (i === 0) {
                      return <li>{innerStep?.text}</li>;
                    } else if (i === 1 && innerStep.link) {
                      return (
                        <li>
                          {innerStep?.link?.jwt} & {innerStep?.link?.cookie}{" "}
                          {innerStep.text}
                        </li>
                      );
                    } else if (i === 2 && innerStep.link) {
                      return (
                        <li>
                          {innerStep?.link?.jwt} & {innerStep?.link?.axios}{" "}
                          {innerStep?.text}
                        </li>
                      );
                    }
                    return <li>{innerStep.text}</li>;
                  })}
                </ol>
                <img src={step.image} alt="description" />
              </div>
            );
          }
          return (
            <div>
              <h3>{step.step}</h3>
              <p>{step.content}</p>
              <ol>
                {step.steps?.map((innerStep, i) => {
                  if (i === 0) {
                    return <li>{innerStep?.text}</li>;
                  } else if (i === 1 && innerStep.link) {
                    return (
                      <li>
                        {innerStep?.link?.jwt} & {innerStep?.link?.cookie}{" "}
                        {innerStep.text}
                      </li>
                    );
                  } else if (i === 2 && innerStep.link) {
                    return (
                      <li>
                        {innerStep?.link?.jwt} & {innerStep?.link?.axios}{" "}
                        {innerStep?.text}
                      </li>
                    );
                  }
                  return <li>{innerStep.text}</li>;
                })}
              </ol>
            </div>
          );
        })}
      </GettingStartedContainer>
      <MoreContent className={darkTheme ? "dark-theme" : "light-theme"}>
        <div>
          <h2>Some Template Logic</h2>
          <ul>
            {templateLogics.map((el, i) => {
              return <li>{el}</li>;
            })}
          </ul>
        </div>
        <div>
          <h2>Error Code For Running The Template</h2>
          <ul>
            {errorCodes.map((errorCode, i) => {
              return <li>{errorCode}</li>;
            })}
          </ul>
        </div>
      </MoreContent>
    </DocumentationContainer>
  );
}

//Styled components

const DocumentationContainer = styled.section`
  width: 90vw;
  height: 100%;
  margin: 0 auto;
  @media screen and (max-width: 500px) {
    width: 95vw;
  }
`;

const OverviewContainer = styled.div`
  min-height: 100vh;
  width: 70%;
  margin: 4rem auto;
  div {
    margin-bottom: 8rem;
    h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-weight: 300;
      font-size: 2rem;
      letter-spacing: 2px;
      word-spacing: 2px;
      span {
        color: var(--warningColor);
      }
    }
    p {
      margin-bottom: 2rem;
      text-align: justify;
      letter-spacing: 2px;
      line-height: 25px;
      text-align: center;
      font-size: 1.1rem;
      font-weight: 300;
      word-spacing: 2px;
    }
    &:nth-of-type(1) {
      h2 {
        font-size: 3rem;
      }
    }
    &:nth-of-type(3) {
      ul {
        margin: 0 auto;
        li {
          margin-bottom: 2rem;
          text-align: justify;

          letter-spacing: 2px;
          line-height: 25px;
          font-weight: 300;
          font-size: 1.1rem;
          word-spacing: 2px;
          @media screen and (max-width: 500px) {
            text-align: left;
          }
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    width: 90%;
    div {
      p {
        text-align: center;
      }
    }
  }
`;

const GettingStartedContainer = styled.div`
  min-height: 100vh;
  width: 70%;
  margin: 4rem auto;
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 300;
    font-size: 3rem;
    letter-spacing: 2px;
    word-spacing: 2px;
  }
  div {
    margin-bottom: 2rem;
    position: relative;
    width: 90%;

    img {
      margin: 1rem auto;
      border: solid 1px white;
      border-radius: 0.2rem;
    }
    h3 {
      font-size: 1.5rem;
      font-weight: 300;
      margin-bottom: 1rem;
    }
    p {
      letter-spacing: 2px;
      line-height: 20px;
      font-size: 1.1rem;
      font-weight: 300;
      line-height: 25px;
      margin-bottom: 0.5rem;
      a {
        color: dodgerblue;
        text-decoration: none;
      }
    }
    ol {
      margin-left: 3rem;
      li {
        letter-spacing: 2px;
        line-height: 20px;
        font-size: 1.1rem;
        font-weight: 300;
        line-height: 25px;
        a {
          color: dodgerblue;
          text-decoration: none;
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    width: 90%;
    div {
      ol {
        li {
          text-align: left;
        }
      }
    }
  }
`;

const MoreContent = styled.div`
  min-height: 100vh;
  width: 70%;
  margin: 4rem auto;
  div {
    margin-bottom: 4rem;
    h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-weight: 300;
      font-size: 3rem;
      letter-spacing: 2px;
      word-spacing: 2px;
    }
    ul {
      li {
        margin: 0.3rem 0;
        list-style-type: square;
        letter-spacing: 2px;
        line-height: 20px;
        font-size: 1.1rem;
        font-weight: 300;
        line-height: 25px;
        a {
          color: dodgerblue;
          text-decoration: none;
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;
