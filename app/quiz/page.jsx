'use client'
import React, { useEffect, useState } from 'react';
import { MdOutlineRestartAlt } from "react-icons/md";
import { quiz } from '../data.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  if (typeof (window) !== "undefined") {
    const [activeQuestion, setActiveQuestion] = useState(window.localStorage.getItem("activeQuestion") ? parseInt(window.localStorage.getItem("activeQuestion")) : 0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [checked, setChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [Alert, setAlert] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(window.localStorage.getItem("result") ? JSON.parse(window.localStorage.getItem("result")) : {
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    const { questions } = quiz;
    const { question, answers, correctAnswer } = questions[activeQuestion];


    //   Select and check answer
    const onAnswerSelected = (answer, idx) => {
      setChecked(true);
      setSelectedAnswerIndex(idx);
      if (answer === correctAnswer) {
        setSelectedAnswer(true);
      } else {
        setSelectedAnswer(false);
      }
    };

    // Calculate score and increment to next question
    const nextQuestion = () => {
      setSelectedAnswerIndex(null);
      setResult((prev) =>
        selectedAnswer
          ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
          : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
      );
      if (activeQuestion !== questions.length - 1) {
        setActiveQuestion((prev) => prev + 1);
      } else {
        setActiveQuestion(0);
        setShowResult(true);
      }
      setChecked(false);
    };


    useEffect(() => {
      window.localStorage.setItem("result", JSON.stringify(result));
    }, [result])


    useEffect(() => {
      window.localStorage.setItem("activeQuestion", activeQuestion);
    }, [activeQuestion]);

    useEffect(() => {
      if (!document.fullscreenElement) {
        window.location.href = "/";
      }
    }, []);

    useEffect(() => {
      document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
          alert("Quiz-a-Mania not allows you to continue without FullScreen Mode");
          window.location.href = "/";
        }
      });
    }, []);


    useEffect(() => {
      var count = 0;
      window.addEventListener("visibilitychange", function (event) {
        count += 0.5;
        if(count >= 10){
          alert(`You had reached maximum limit of changing your screen `)
          window.location.href = "/";
        }
        else{
          setAlert(`Warning , ${count}/10 don't change the tab/browser during quiz attempt `)
        }
      });
    }, [])


    return (
      <>
        <ToastContainer />
        <a href="/" className={`text-white pl-5 mt-5 w-full ${showResult ? "hidden" : "block"}`}>Close</a>
        <div className='container' id='container'>
          <h1>Quiz Page</h1>
          <div>
            {!showResult ? (
              <>
                <div>
                  <h2>
                    Question: {activeQuestion + 1}
                    <span>/{questions.length}</span>
                  </h2>
                </div>
                <div className='quiz-container'>
                  <h3>{questions[activeQuestion].question}</h3>
                  {answers.map((answer, idx) => (
                    <li
                      key={idx}
                      onClick={() => onAnswerSelected(answer, idx)}
                      className={
                        selectedAnswerIndex === idx ? 'li-selected' : 'li-hover'
                      }
                    >
                      <span>{answer}</span>
                    </li>
                  ))}
                  <div className='w-full flex justify-end'>
                    {checked ? (
                      <button onClick={nextQuestion} className='btn w-1/3'>
                        {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                      </button>
                    ) : (
                      <button onClick={nextQuestion} disabled className='btn-disabled w-1/3'>
                        {' '}
                        {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className='quiz-container'>
                <h3>Results</h3>
                <h3>Overall {(result.score / questions.length) * 100}%</h3>
                <p>
                  Total Questions: <span>{questions.length}</span>
                </p>
                <p>
                  Total Score: <span>{result.score}</span>
                </p>
                <p>
                  Correct Answers: <span>{result.correctAnswers}</span>
                </p>
                <p>
                  Wrong Answers: <span>{result.wrongAnswers}</span>
                </p>
                <button className='bg-blue-600 flex justify-center gap-3 content-center align-middle' onClick={() => {
                  setResult({ score: 0, correctAnswers: 0, wrongAnswers: 0 }); window.location.href = "/";
                }}>Go to homepage <MdOutlineRestartAlt size={25} /></button>
              </div>
            )}
          </div>
        </div>
        <h2 className=' text-red-600 w-fit right-0 m-5'>{Alert}</h2>
      </>
    );
  }
};

export default page;