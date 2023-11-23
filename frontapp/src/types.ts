export type Question = {
  id: number;
  subject: string;
  content: string;
  createDate: Date;
  author: { username: string };
  answerList: Answer[];
};

export type Answer = {
  id: number;
  content: string;
  createDate: Date;
  author: { username: string };
};

export type Err = {
  error: boolean;
  message: string;
};
