export type Question = {
  id: number;
  subject: string;
  content: string;
  createDate: string;
  answerList: Answer[];
};

export type Answer = {
  id: number;
  content: string;
  createDate: string;
};
