export type Question = {
  id: number;
  subject: string;
  content: string;
  createDate: Date;
  answerList: Answer[];
};

export type Answer = {
  id: number;
  content: string;
  createDate: Date;
};
