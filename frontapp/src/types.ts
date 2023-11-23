export type Question = {
  id: number;
  subject: string;
  content: string;
  createDate: Date;
  author: { username: string };
  answerList: Answer[];
  modifyDate: Date;
};

export type Answer = {
  id: number;
  content: string;
  createDate: Date;
  author: { username: string };
  modifyDate: Date;
};

export type Err = {
  error: boolean;
  message: string;
};
