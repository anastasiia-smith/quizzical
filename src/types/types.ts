export interface TriviaData {
  response_code: string;
  results: [{
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  }]
}

export interface ExtractedCategories {
  id: number;
  question: string;
  correct_answer: string;
  options: string[];
}

export interface Props {
  questionId?: any;
  option?: any;
  checked?: any;
  answers: any;
  onSelect?: any;
  check: any;
  id?: any;
  question?: any;
  options?: any;
  triviaData?: any;
  handleSetAnswers?: any;
}