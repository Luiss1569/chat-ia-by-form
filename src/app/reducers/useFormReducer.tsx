import React, { useReducer } from "react";
import { IFormDraft, IField } from "@/app/types/FormDraft";

interface IState {
  currentQuestionIndex: number;
  currentQuestion: IField;
  form: IFormDraft;
}

const ACTIONS = {
  ADD_ANSWER: "ADD_ANSWER",
  NEXT_QUESTION: "NEXT_QUESTION",
};

const reducer = (state: IState, action: any) => {
  switch (action.type) {
    case ACTIONS.ADD_ANSWER: {
      const updatedFields: IField[] = state.form.fields.map((field, index) => {
        if (index === state.currentQuestionIndex) {
          // Atualiza a resposta do campo atual
          return { ...field, answer: action.payload };
        }
        return field;
      });
      return {
        ...state,
        form: { ...state.form, fields: updatedFields },
      };
    }
    case ACTIONS.NEXT_QUESTION: {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex >= state.form.fields.length) {
        // Se a próxima questão for a última do formulário, não faça nada
        return {
          ...state,
          status: "finished",
        };
      }
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        currentQuestion: state.form.fields[nextIndex],
      };
    }
    default:
      return state;
  }
};

const useFormReducer = ({
  form,
}: {
  form: IFormDraft;
}): {
  state: IState;
  addAnswer: (answer: string) => void;
  nextQuestion: () => void;
} => {
  // Define o estado inicial
  const initialState: IState = {
    currentQuestionIndex: 0,
    currentQuestion: form.fields[0], // Define a primeira questão como a questão atual
    form: form,
  };

  // Usa useReducer para criar o estado e a função dispatch
  const [state, dispatch] = useReducer(reducer, initialState);

  // Função para adicionar uma resposta
  const addAnswer = (answer: string) => {
    dispatch({ type: ACTIONS.ADD_ANSWER, payload: answer });
    dispatch({ type: ACTIONS.NEXT_QUESTION });
  };

  // Função para avançar para a próxima questão
  const nextQuestion = () => {
    dispatch({ type: ACTIONS.NEXT_QUESTION });
  };

  return {
    state,
    addAnswer,
    nextQuestion,
  };
};

export default useFormReducer;
