import IFormDraft from "../types/FormDraft";

const lollapaloozaTicketForm: IFormDraft = {
  title: "Formulário de Inscrição para Ingressos do Lollapalooza",
  objective:
    "Coletar informações para a compra de ingressos para o Lollapalooza",
  fields: [
    {
      id: "0",
      name: "fullName",
      type: "text",
      description: "Qual é o seu nome completo?",
      answer: null,
    },
    {
      id: "1",
      name: "email",
      type: "email",
      description: "Qual é o seu melhor endereço de e-mail para contato?",
      answer: null,
    },
    {
      id: "2",
      name: "age",
      type: "number",
      description: "Qual é a sua idade?",
      answer: null,
    },
    {
      id: "3",
      name: "ticketType",
      type: "text",
      description:
        "Selecione o tipo de ingresso desejado: Pista, Pista Premium, VIP, Camarote",
      answer: null,
    },
    {
      id: "4",
      name: "numberOfTickets",
      type: "number",
      description: "Quantos ingressos você gostaria de comprar?",
      answer: null,
    },
    {
      id: "5",
      name: "promoCode",
      type: "text",
      description:
        "Você possui algum código promocional? Se sim, por favor insira-o aqui.",
      answer: null,
    },
  ],
};

export default lollapaloozaTicketForm;
