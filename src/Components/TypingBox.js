import React from 'react';
import { useState, useRef, useEffect, useMemo, createRef } from 'react';
import UpperMenu from './UpperMenu';
import { useTestMode } from '../Context/TestModeContex';
import Stats from './Stats';

var randomwords = require('random-words')
const TypingBox = () => {
  const inputRef = useRef(null);
  const { testTime } = useTestMode();
  const [intervalId, setIntervalId] = useState(null);
  const [countDown, setCountDown] = useState(testTime);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [wordsArray, setWordsArray] = useState(() => {
    return randomwords(50);
  });

  const [currwordIndex, setCurrwordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [graphData, setGraphData] = useState([])


  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length).fill(0).map((i) => createRef(null))
  }, [wordsArray])



  const startTimer = () => {

    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);

    function timer() {

      setCountDown((latestCountDown) => {
        setCorrectChars((correctChars)=>{
          setGraphData((graphData)=>{
            return [...graphData, [
              testTime-latestCountDown+1,
              (correctChars/5)/((testTime-latestCountDown+1)/60)
            ]]
          })
          return correctChars;
        })
        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
        }
        return latestCountDown - 1;
      });
    }
  }

  const resetTest = () => {
    clearInterval(intervalId);
    setCountDown(testTime);
    setCurrwordIndex(0);
    setCurrCharIndex(0);
    setWordsArray(randomwords(50));
    setTestEnd(false);
    setTestStart(false);
    resetwordSpanRefClassname()
    focusInput();
  }

  const resetwordSpanRefClassname = () => {
    wordsSpanRef.map(i => {
      Array.from(i.current.childNodes).map(j => {
        j.className = '';
      })
    })
    wordsSpanRef[0].current.childNodes[0].className = 'current';
  }


  const handleUserInput = (e) => {

    if (!testStart) {
      startTimer();
      setTestStart(true);
    }
    const allCurrChars = wordsSpanRef[currwordIndex].current.childNodes;

    if (e.keyCode === 32) {

      let correctCharsInWord = wordsSpanRef[currwordIndex].current.querySelectorAll('.correct');

      if (correctCharsInWord.length === allCurrChars.length) {
        setCorrectWords(correctWords + 1);
      }

      if (allCurrChars.length <= currCharIndex) {
        allCurrChars[currCharIndex - 1].classList.remove('current-right');
      }
      else {
        allCurrChars[currCharIndex].classList.remove('current');
        setMissedChars(missedChars + (allCurrChars.lenght - currCharIndex));
      }

      wordsSpanRef[currwordIndex + 1].current.childNodes[0].className = "current";
      setCurrwordIndex(currwordIndex + 1);
      setCurrCharIndex(0);
      return;
    }

    if (e.keyCode === 8) {

      if (currCharIndex !== 0) {
        // allCurrChars[currCharIndex-1].classList.remove('incorrect');
        // allCurrChars[currCharIndex].classList.remove('current');
        // allCurrChars[currCharIndex-1].className='current';
        if (currCharIndex === allCurrChars.length) {
          if (allCurrChars[currCharIndex - 1].className.includes('extra')) {
            allCurrChars[currCharIndex - 1].remove();
            allCurrChars[currCharIndex - 2].className += ' current-right';
          }
          else {
            allCurrChars[currCharIndex - 1].className = 'current';
          }
          setCurrCharIndex(currCharIndex - 1);
          return;
        }

        allCurrChars[currCharIndex].className = '';
        allCurrChars[currCharIndex - 1].className = 'current';
        setCurrCharIndex(currCharIndex - 1);
      }

      return;
    }

    if (currCharIndex === allCurrChars.length) {
      let newSpan = document.createElement('span');
      newSpan.innerText = e.key;
      newSpan.className = 'incorrect extra current-right';
      wordsSpanRef[currwordIndex].current.append(newSpan);
      allCurrChars[currCharIndex - 1].classList.remove('current-right')
      setCurrCharIndex(currCharIndex + 1);
      setExtraChars(extraChars + 1);
      return;
    }


    if (e.key === allCurrChars[currCharIndex].innerText) {
      allCurrChars[currCharIndex].className = 'correct';
      setCorrectChars(correctChars + 1);
    }
    else {
      allCurrChars[currCharIndex].className = 'incorrect';
      setIncorrectChars(incorrectChars + 1);

    }

    if (currCharIndex + 1 === allCurrChars.length) {
      allCurrChars[currCharIndex].className += ' current-right';
    }
    else {
      allCurrChars[currCharIndex + 1].className = 'current';
    }

    setCurrCharIndex(currCharIndex + 1);


  }

  const calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  }

  const calculateAcc = () => {
    return Math.round((correctWords/currwordIndex)*100);
  }

  const focusInput = () => {
    inputRef.current.focus()
  }

  useEffect(() => {
    resetTest();
  }, [testTime])


  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = 'current';
  }, [])




  return (
    <div>
      <UpperMenu countDown={countDown} />
      {
        (testEnd) ? (
          <Stats
            wpm={calculateWPM()}
            accuracy={calculateAcc()}
            correctChars={correctChars}
            incorrectChars={incorrectChars}
            extraChars={extraChars} 
            missedChars={missedChars}
            graphData={graphData}
          />)
          : (<div className='typing-box' onClick={focusInput}>
            <div className='words'>
              {
                wordsArray.map((word, index) => {
                  return <span className='word' ref={wordsSpanRef[index]}>
                    {
                      word.split('').map((char) => {
                        return <span>{char}</span>
                      })
                    }
                  </span>
                })
              }
            </div>
          </div>)
      }
      <input className="hidden-input" ref={inputRef} type="text" onKeyDown={handleUserInput} />
    </div>
  )
}

export default TypingBox
