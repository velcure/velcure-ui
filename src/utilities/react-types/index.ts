export interface IdProps {
  id?: string;
}

export type As = React.ElementType;

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never
> = Omit<
  Target,
  'transition' | 'as' | 'color' | 'translate' | OmitAdditionalProps
> & {
  htmlTranslate?: 'yes' | 'no' | undefined;
};

export type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {}
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As
> = (
  | RightJoinProps<ComponentProps, AdditionalProps>
  | RightJoinProps<AsProps, AdditionalProps>
) & {
  as?: AsComponent;
};

export type ComponentWithAs<Component extends As, Props extends object = {}> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >
  ): JSX.Element;

  displayName?: string;
  propTypes?: React.WeakValidationMap<any>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<any>;
  id?: string;
};

export interface InputDOMEvents {
  onCopy?: React.ClipboardEventHandler<HTMLInputElement>;
  onCut?: React.ClipboardEventHandler<HTMLInputElement>;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  onCompositionStart?: React.CompositionEventHandler<HTMLInputElement>;
  onCompositionEnd?: React.CompositionEventHandler<HTMLInputElement>;
  onCompositionUpdate?: React.CompositionEventHandler<HTMLInputElement>;
  onSelect?: React.ReactEventHandler<HTMLInputElement>;
  onBeforeInput?: React.FormEventHandler<HTMLInputElement>;
  onInput?: React.FormEventHandler<HTMLInputElement>;
}

export interface InputDOMProps extends IdProps, InputDOMEvents {
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  name?: string;
  pattern?: string;
  placeholder?: string;
  type?:
    | 'text'
    | 'search'
    | 'url'
    | 'tel'
    | 'email'
    | 'password'
    | 'hidden'
    | (string & {});
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
}

interface DOMElement extends Element, HTMLOrSVGElement {}

type DataAttributes = {
  [dataAttr: string]: any;
};

export type DOMAttributes<T = DOMElement> = React.AriaAttributes &
  React.DOMAttributes<T> &
  DataAttributes & {
    id?: string;
    role?: React.AriaRole;
    tabIndex?: number;
    style?: React.CSSProperties;
  };

export type InputDOMAttributes = InputDOMProps &
  DOMAttributes<HTMLInputElement>;

type Merge<M, N> = N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

export type PropGetter<P = Record<string, unknown>, R = DOMAttributes> = (
  props?: Merge<DOMAttributes, P>,
  ref?: React.Ref<any>
) => R & React.RefAttributes<any>;

export type MaybeRenderProp<P> =
  | React.ReactNode
  | ((props: P) => React.ReactNode);

export type CollectionItem = string | object;
