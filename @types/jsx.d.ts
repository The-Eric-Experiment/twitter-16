declare namespace JSX {
  type BasicElement<TExtended = {}> = TExtended & {
    id?: string;
    width?: string;
    height?: string;
    bgcolor?: string;
    fgcolor?: string;
    name?: string;
  };

  type BodyElement = {
    bgcolor?: string;
    text?: string;
    topmargin?: number;
    leftmargin?: number;
    rightmargin?: number;
  };

  type InputElement = {
    type?: string;
    value?: string;
  };

  type TableElement = {
    border?: number;
    cellspacing?: number;
    cellpadding?: number;
  };

  type FormElement = {
    action?: string;
    method?: "POST";
  };

  type TdElement = {
    valign?: "top" | "bottom" | "center";
    colspan?: number;
    rowspan?: number;
  };

  type TextAreaElement = {
    maxlength: number;
    cols: number;
    rows: number;
  };

  type FontElement = {
    face?: string;
    size?: number;
    color?: string;
  };

  type AreaElement = {
    shape?: string;
    coords?: string;
    href?: string;
  };

  type ImgElement = {
    src?: string;
    border?: number;
    usemap?: string;
    alt?: string;
  };

  type AElement = {
    href?: string;
    target?: string;
  };

  type LabelElement = {
    for?: string;
  };

  interface IntrinsicElements {
    html: BasicElement;
    head: BasicElement;
    body: BasicElement<BodyElement>;
    title: BasicElement;
    h1: BasicElement;
    h2: BasicElement;
    h3: BasicElement;
    form: BasicElement<FormElement>;
    textarea: BasicElement<TextAreaElement>;
    br: BasicElement;
    table: BasicElement<TableElement>;
    tr: BasicElement;
    td: BasicElement<TdElement>;
    input: BasicElement<InputElement>;
    font: BasicElement<FontElement>;
    marquee: BasicElement;
    map: BasicElement;
    area: BasicElement<AreaElement>;
    img: BasicElement<ImgElement>;
    a: BasicElement<AElement>;
    b: BasicElement;
    hr: BasicElement;
    p: BasicElement;
    label: BasicElement<LabelElement>;
  }
}
