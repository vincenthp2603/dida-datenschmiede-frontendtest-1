import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import ControlBlock from './components/ControlBlock/ControlBlock';
import DisplayBlock from './components/DisplayBlock/DisplayBlock';
import { useState } from 'react';
import { examplesList } from './config/examples';


function App() {
  let [selectedExample, setSelectedExample] = useState(null);
  let [language, setLanguage] = useState('en');
  let [passage, setPassage] = useState("");
  let [question, setQuestion] = useState("");
  let [rate, setRate] = useState(null);
  let [answer, setAnswer] = useState(null);
  let [answerSegment, setAnswerSegment] = useState(null);
  let [loading, setLoading] = useState(false);

  const fetchAnswer = async (q, context) => {
    try {
      setLoading(true);
      let response = await fetch('https://api-inference.huggingface.co/models/deepset/roberta-base-squad2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {
            question: q,
            context: context
          }
        })
      })
    
      let result = await response.json();
      setLoading(false);
      setAnswer(result.answer);
      setAnswerSegment({
        context: context,
        segmentStart: result.start - 20 > 0 ? result.start - 20 : 0,
        segmentEnd: result.end + 20 < context.length ? result.end + 20 : context.length,
        answerStart: result.start,
        answerEnd: result.end
      })
      setRate(null);   
    } catch(err) {
      console.log(err);
    }
    
  }

  const clear = () => {
    setSelectedExample(null);
    setLanguage('en');
    setPassage("");
    setQuestion("");
    setAnswer(null);
    setRate(null);
  }

  return (
    <div className="App">
      <Header/>
      <ControlBlock 
        examples={examplesList}
        selectExample={setSelectedExample}
        selectedExample={selectedExample}
        lang={language}
        setLanguage={setLanguage}
        clear={clear}
      />
      <DisplayBlock
        lang={language}
        selectedExample={selectedExample}
        passage={passage}
        question={question}
        setPassage={setPassage}
        setQuestion={setQuestion}
        answer={answer}
        answerSegment={answerSegment}
        fetchAnswer={fetchAnswer}
        loading={loading}
        rate={rate}
        setRate={setRate}
      />
    </div>
  );
}

export default App;
