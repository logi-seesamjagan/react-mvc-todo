import { HTMLAttributes } from "react";
import "./Form.css";

interface IContainer<T> extends HTMLAttributes<T> {
  children?:
    | JSX.Element
    | JSX.Element[]
    | JSX.IntrinsicElements
    | JSX.IntrinsicElements[]
    | string
    | HTMLElement
    | number;
}

interface IForm extends IContainer<HTMLFormElement> {}

export function Form(props: IForm) {
  const { title, children, className = "", ...rest } = props;
  return (
    <form className={"Form " + className} title={title} {...rest}>
      {title && <header className="FormHeader">{title}</header>}
      {children}
    </form>
  );
}

interface IFormItem extends IContainer<HTMLDivElement> {
  error?: string;
  warning?: string;
  info?: string;
  htmlFor?: string;
}

export function FormItem({
  title,
  children,
  error,
  warning,
  info,
  htmlFor,
  className = "",
  ...rest
}: IFormItem) {
  return (
    <div className={"FormItem " + className} {...rest}>
      <label className="FormItemTitle" htmlFor={htmlFor}>
        {title}
      </label>
      {children}
      {error && <div className="FormItemError">{error}</div>}
      {warning && <div className="FormItemWarning">{warning}</div>}
      {info && <div className="FormItemInfo">{info}</div>}
    </div>
  );
}

interface IFormFooter extends IContainer<HTMLDivElement> {}

export function FormFooter({ className, children, ...rest }: IFormFooter) {
  return (
    <footer className={"FormFooter " + className} {...rest}>
      {children}
    </footer>
  );
}
