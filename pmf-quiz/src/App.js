import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const questions = [
  {
    text: "How do your customers feel about the problem your product solves?",
    options: [
      { text: "They’re desperate for a solution and actively searching.", points: "hairOnFire" },
      { text: "They don’t think about it much, just accept it.", points: "hardFact" },
      { text: "They don’t even know it’s a problem, or they think it’s impossible to solve.", points: "futureVision" }
    ]
  },
  {
    text: "How urgent is the need for your product?",
    options: [
      { text: "They want a solution immediately and compare options.", points: "hairOnFire" },
      { text: "They’d switch if a clear benefit was proven.", points: "hardFact" },
      { text: "They don’t believe they need it (yet).", points: "futureVision" }
    ]
  },
  // Add more questions in the same format...
];

export default function PMFQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ hairOnFire: 0, hardFact: 0, futureVision: 0 });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (points) => {
    setScores((prevScores) => ({ ...prevScores, [points]: prevScores[points] + 1 }));
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const highestScore = Object.entries(scores).reduce((max, curr) => (curr[1] > max[1] ? curr : max));
    switch (highestScore[0]) {
      case "hairOnFire":
        return "🔥 Hair on Fire: Focus on speed and differentiation.";
      case "hardFact":
        return "🧱 Hard Fact: Educate the market and change behavior.";
      case "futureVision":
        return "🚀 Future Vision: Build long-term trust and ecosystem.";
      default:
        return "Take the quiz to find your PMF archetype!";
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Card className="w-full max-w-lg p-6 text-center">
        <CardContent>
          {!showResult ? (
            <>
              <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].text}</h2>
              {questions[currentQuestion].options.map((option, index) => (
                <Button key={index} className="w-full my-2" onClick={() => handleAnswer(option.points)}>
                  {option.text}
                </Button>
              ))}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">Your PMF Archetype:</h2>
              <p className="mt-4 text-lg">{getResult()}</p>
              <Button className="mt-6" onClick={() => { setCurrentQuestion(0); setScores({ hairOnFire: 0, hardFact: 0, futureVision: 0 }); setShowResult(false); }}>
                Retake Quiz
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
