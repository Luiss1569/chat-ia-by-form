export type IField = {
  id: string;
  name: string;
  type: "email" | "url" | "text" | "number";
  description: string;
  answer: string | null;
};

export type IFormDraft = {
  title: string;
  objective: string;
  fields: IField[];
};

export default IFormDraft;
