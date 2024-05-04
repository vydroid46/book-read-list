export interface BookInterface {
  title: string;
  author: string;
  pages: number;
  read: boolean;
  id: number;
  remove: HTMLButtonElement;
  toggle: HTMLButtonElement;
  book?: HTMLDivElement;
  bookTitle: HTMLHeadingElement;
  titleLabel: HTMLSpanElement;
  authorLabel: HTMLSpanElement;
  pageLabel: HTMLSpanElement;
  statusValue: HTMLSpanElement;
  bookAuthor: HTMLHeadingElement;
  bookPages: HTMLHeadingElement;
  statusLabel: HTMLParagraphElement;
  children?: NodeListOf<Element>;
}
