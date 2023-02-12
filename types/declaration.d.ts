type IClassNames = Record<string, string>;

declare module "*.css" {
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.scss" {
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.sass" {
  const classNames: IClassNames;
  export = classNames;
}
