"use client";

import { useState, useEffect } from "react";
import { Scenario, User, ACTIVE_USER_ID } from "@/components/data/constant";
import { useRouter } from "next/navigation";
import useDashboard from "@/app/dashboard/useDashboard";

interface ScenarioClientProps {
  scenario: Scenario;
}

export default function ScenarioClient({ scenario }: ScenarioClientProps) {
  const router = useRouter();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    explanation: string;
  } | null>(null);
  const [points, setPoints] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [animating, setAnimating] = useState(false);

  const [passed, setPassed] = useState(false);

  const currentStep = scenario.steps[currentStepIndex];

  const { activeUser, setActiveUser } = useDashboard();

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);

    const option = currentStep.options.find((opt) => opt.id === optionId);
    if (option) {
      setFeedback({
        isCorrect: option.isCorrect,
        explanation: option.explanation,
      });

      if (option.isCorrect) {
        setPoints((prev) => prev + Math.floor(scenario.points / scenario.steps.length));
        setCorrectAnswers((prev) => prev + 1);
      }
    }
  };

  const handleNextStep = () => {
    setAnimating(true);
    setTimeout(() => {
      if (currentStepIndex < scenario.steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        const passingThreshold = Math.ceil(scenario.steps.length * 0.7); // 70% correct to pass
        const hasPassed = correctAnswers >= passingThreshold;
        setPassed(hasPassed);
        setCompleted(true);

        if (hasPassed && activeUser) {
          fetch("/api/update-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: activeUser.id,
              points,
              completedScenarios: [...activeUser.completedScenarios, scenario.id],
              badge: scenario.badge,
            }),
          })
            .then(async (response) => {
              if (!response.ok) {
                const errorText = await response.text(); // catch error message as plain text
                throw new Error(`Server error: ${response.status} - ${errorText}`);
              }
              return response.json(); // safe to call now
            })
            .then((data) => {
              console.log("User updated:", data);
              setActiveUser(data.user);
            })
            .catch((error) => {
              console.error("Error updating user:", error);
            });
          // Scenario passed, update user data on backend
          
        }
      }
      setAnimating(false);
    }, 300);
  };

  const handleFinish = () => {
    // Navigate back to dashboard
    router.push("/dashboard");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "phishing":
        return "from-blue-500 to-blue-700";
      case "social":
        return "from-purple-500 to-purple-700";
      case "data-protection":
        return "from-green-500 to-green-700";
      default:
        return "from-cyan-500 to-blue-500";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "from-green-400 to-emerald-500";
      case "intermediate":
        return "from-yellow-400 to-amber-500";
      case "advanced":
        return "from-red-400 to-rose-500";
      default:
        return "from-cyan-500 to-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Scenario Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10 shadow-lg">
        <div className="container mx-auto p-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="mb-2 text-sm flex items-center hover:underline text-cyan-300 hover:text-cyan-400 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            {scenario.title}
          </h1>
          <div className="flex items-center mt-2 space-x-2">
            <span
              className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(
                scenario.category
              )} text-white`}
            >
              {scenario.category.charAt(0).toUpperCase() + scenario.category.slice(1)}
            </span>
            <span
              className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(
                scenario.difficulty
              )} text-white`}
            >
              {scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1)}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300">
              {scenario.estimatedTime} min
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
              {scenario.points} points
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        {!completed ? (
          <div
            className={`backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10 overflow-hidden max-w-3xl mx-auto transition-opacity duration-300 ${
              animating ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Progress Bar */}
            <div className="w-full bg-gray-800/50 h-1">
              <div
                className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{
                  width: `${((currentStepIndex + 1) / scenario.steps.length) * 100}%`,
                }}
              ></div>
            </div>

            <div className="p-6">
              {/* Step Content */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-white">{currentStep.title}</h2>
                <p className="text-gray-300">{currentStep.description}</p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                <h3 className="font-medium text-cyan-300">Select the best response:</h3>
                {currentStep.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={feedback !== null}
                    className={`w-full text-left p-4 rounded-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                      selectedOption === option.id
                        ? option.isCorrect
                          ? "bg-green-500/20 border border-green-500/50 shadow-lg shadow-green-500/20"
                          : "bg-red-500/20 border border-red-500/50 shadow-lg shadow-red-500/20"
                        : feedback !== null
                        ? "bg-white/5 border border-white/10 opacity-60"
                        : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/20"
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {feedback && (
                <div
                  className={`p-5 rounded-xl mb-6 shadow-lg backdrop-blur-md ${
                    feedback.isCorrect
                      ? "bg-green-500/10 border border-green-500/30 shadow-green-500/20"
                      : "bg-red-500/10 border border-red-500/30 shadow-red-500/20"
                  }`}
                >
                  <h3 className={`font-semibold ${feedback.isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {feedback.isCorrect ? "Correct!" : "Not quite right"}
                  </h3>
                  <p className="mt-2 text-gray-300">{feedback.explanation}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center">
              <div className="text-gray-400">
                  Step {currentStepIndex + 1} of {scenario.steps.length}
                </div>
                {feedback && (
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-cyan-500 text-white rounded-xl font-semibold hover:bg-cyan-600 transition-colors"
                  >
                    {currentStepIndex < scenario.steps.length - 1 ? "Next" : "Finish"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center p-8 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md">
            <h2 className="text-3xl font-bold mb-4 text-white">
              {passed ? "Scenario Completed!!!" : "Scenario Incomplete"}
            </h2>
            <p className="mb-4 text-gray-300">
              {passed
                ? `Well done! You earned ${points} points and unlocked the badge: ${scenario.badge}.`
                : `You didn’t pass this time. Review the answers and try again.`}
            </p>
            <button
              onClick={handleFinish}
              className="px-6 py-3 mt-4 bg-cyan-500 text-white rounded-xl font-semibold hover:bg-cyan-600 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
