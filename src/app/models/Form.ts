import IFormDraft, { IField } from "../types/FormDraft";
import template from "../db/form";
import { z } from "zod";

const FieldSchemas = {
  text: z.string().min(1).max(100),
  email: z.string().email(),
  url: z.string().url(),
  number: z.number(),
};

export default class Form {
  form: IFormDraft;
  currentQuestionIndex: number;
  status: "inProgress" | "finished" | "start";
  currentQuestion: IField | null;

  constructor() {
    this.form = template;
    this.currentQuestionIndex = 0;
    this.currentQuestion = this.form.fields[0];
    this.status = "start";
  }

  addAnswer(answer: string): { success: boolean; message: string } {
    if (this.status === "finished") {
      return {
        success: false,
        message: "Form is already finished",
      };
    }

    if (!this.currentQuestion) {
      return {
        success: false,
        message: "No current question",
      };
    }

    const { type } = this.currentQuestion;
    const fieldSchema = FieldSchemas[type];

    const parsedAnswer = fieldSchema.safeParse(answer);
    if (!parsedAnswer.success) {
      return {
        success: false,
        message: `Invalid answer for ${type}`,
      };
    }

    this.status = "inProgress";

    const updatedFields = this.form.fields.map((field, index) => {
      if (index === this.currentQuestionIndex) {
        return { ...field, answer };
      }
      return field;
    });
    this.form = { ...this.form, fields: updatedFields };

    return { success: true, message: "Answer added" };
  }

  nextQuestion() {
    const nextIndex = this.currentQuestionIndex + 1;
    if (nextIndex >= this.form.fields.length) {
      this.status = "finished";
      this.currentQuestion = null;
      return;
    }
    this.currentQuestion = this.form.fields[nextIndex];
    this.currentQuestionIndex = nextIndex;
  }

  getCurrentQuestion() {
    return this.currentQuestion;
  }

  isFinished() {
    return this.status === "finished";
  }

  getCurrentQuestionIndex() {
    return this.currentQuestionIndex;
  }

  formDraft() {
    return this.form;
  }
}
