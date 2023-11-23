export type Question = {
  id: number;
  subject: string;
  content: string;
  createDate: Date;
  author: { username: string };
  answerList: Answer[];
  modifyDate: Date;
  voter: [];
};

export type Answer = {
  id: number;
  content: string;
  createDate: Date;
  author: { username: string };
  modifyDate: Date;
  voter: [];
};

export type Err = {
  error: boolean;
  message: string;
};
