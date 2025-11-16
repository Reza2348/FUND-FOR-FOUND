import React, { useState } from "react";
import { FiChevronDown, FiEdit } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
interface FAQData {
  id: number;
  question: string;
  answer: string;
  isHighlighted: boolean;
}
interface FAQItemProps {
  question: string;
  answer: string;
  isHighlighted: boolean;
}
const faqData: FAQData[] = [
  {
    id: 1,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?",
    answer:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus amet aperiam obcaecati aspernatur corporis tenetur, sunt debitis voluptatum dolores excepturi?",
    isHighlighted: false,
  },
  {
    id: 2,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?",
    answer:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus amet aperiam obcaecati aspernatur corporis tenetur, sunt debitis voluptatum dolores excepturi?",
    isHighlighted: false,
  },
  {
    id: 3,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?",
    answer:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus amet aperiam obcaecati aspernatur corporis tenetur, sunt debitis voluptatum dolores excepturi?",
    isHighlighted: true,
  },
  {
    id: 4,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?",
    answer:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus amet aperiam obcaecati aspernatur corporis tenetur, sunt debitis voluptatum dolores excepturi?",
    isHighlighted: false,
  },
];

const initialAnswerText: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isHighlighted,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerClasses: string = `
    w-full flex justify-between items-center p-4 cursor-pointer transition-colors duration-200 border-b border-gray-200
    ${
      isHighlighted
        ? "bg-purple-100 hover:bg-purple-200 text-purple-800"
        : "bg-white hover:bg-gray-50 text-gray-800"
    }
  `;

  const editIconClasses: string = `
    text-purple-600 transition-colors duration-200 hover:text-purple-800
  `;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className={containerClasses} onClick={() => setIsOpen(!isOpen)}>
        <span className="font-medium text-sm sm:text-base">{question}</span>

        <div className="flex items-center space-x-3">
          <FiEdit
            className={`w-5 h-5 ${editIconClasses}`}
            onClick={(e) => {
              e.stopPropagation();
              alert("Edit button clicked!");
            }}
          />
          <FiChevronDown
            className={`w-6 h-6 transition-transform duration-300 ${
              isOpen ? "transform rotate-180 text-purple-600" : "text-gray-500"
            }`}
          />
        </div>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-white border-t border-gray-200">
          <p className="text-gray-600 leading-relaxed text-sm">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8 flex items-center text-gray-800">
        <span className="w-4 h-4 bg-purple-600 inline-block mr-2"></span>
        FAQ
      </h2>
      <div className="space-y-3">
        {faqData.map((item) => (
          <FAQItem
            key={item.id}
            question={item.question}
            answer={item.answer}
            isHighlighted={item.isHighlighted}
          />
        ))}
      </div>

      <div className="mt-8 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
        <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
          {initialAnswerText}
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <button className="flex items-center px-4 py-2 text-purple-600 border border-purple-600 rounded-full hover:bg-purple-50 transition duration-150 shadow-sm">
          <IoIosAdd className="w-5 h-5 ml-1" />
          Add question
        </button>
      </div>
    </div>
  );
};

export default FAQSection;
