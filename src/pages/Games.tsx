import React, { useState } from "react";
import { Brain, Puzzle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Games() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const quizQuestions = [
    {
      question: "Combien d'espèces disparaissent chaque année ?",
      options: ["1,000", "10,000", "50,000", "200,000"],
      correct: 2,
      fact: "Environ 50,000 espèces disparaissent chaque année, soit 1,000 fois plus que le taux naturel.",
    },
    {
      question:
        "Quel pourcentage de la biodiversité mondiale se trouve en France ?",
      options: ["5%", "10%", "15%", "20%"],
      correct: 1,
      fact: "La France abrite 10% de la biodiversité mondiale, grâce à ses territoires variés et ses DOM-TOM.",
    },
    {
      question:
        "Quelle part des émissions de CO2 est absorbée par les forêts ?",
      options: ["10%", "20%", "30%", "40%"],
      correct: 2,
      fact: "Les forêts absorbent 30% des émissions de CO2, jouant un rôle crucial dans la lutte contre le changement climatique.",
    },
  ];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowAnswer(true);
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % quizQuestions.length);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition flex items-center gap-2"
      >
        ← Retour
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Brain className="h-8 w-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-emerald-800">
            Mini-jeux Biodiversité
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Puzzle className="h-6 w-6 text-emerald-600" />
              <h2 className="text-xl font-semibold text-emerald-800">
                Quiz Biodiversité
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-emerald-700">
                  Question {currentQuestion + 1}/{quizQuestions.length}
                </h3>
                <span className="text-emerald-600 font-semibold">
                  Score: {score}/{quizQuestions.length}
                </span>
              </div>

              <p className="text-xl mb-4">
                {quizQuestions[currentQuestion].question}
              </p>

              <div className="grid gap-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showAnswer}
                    className={`p-4 rounded-lg text-left transition ${
                      showAnswer
                        ? index === quizQuestions[currentQuestion].correct
                          ? "bg-green-100 text-green-800"
                          : index === selectedAnswer
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-50 text-gray-500"
                        : "bg-emerald-50 hover:bg-emerald-100 text-emerald-900"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showAnswer && (
                <div className="mt-4">
                  <p className="text-emerald-700 mb-4">
                    {quizQuestions[currentQuestion].fact}
                  </p>
                  {currentQuestion === quizQuestions.length - 1 ? (
                    <button
                      onClick={resetQuiz}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition"
                    >
                      Recommencer le quiz
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition"
                    >
                      Question suivante
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">
              À venir bientôt !
            </h2>
            <p className="text-gray-600">
              De nouveaux mini-jeux sur la biodiversité seront ajoutés
              prochainement. Restez à l'écoute !
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Games;
