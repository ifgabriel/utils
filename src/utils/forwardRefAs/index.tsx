import {
    ComponentProps,
    ComponentPropsWithRef,
    ElementType,
    ForwardRefRenderFunction,
    PropsWithRef,
    forwardRef
} from 'react'

type AsProp = ElementType

type PropsOf<E extends AsProp> = JSX.LibraryManagedAttributes<E, ComponentPropsWithRef<E>>

type ForwardRef<Props, DefaultAs extends AsProp> = <E extends AsProp = DefaultAs>(
    props: Props & { as?: E } & Omit<PropsOf<E>, keyof Props>,
    ref: PropsWithRef<ComponentProps<E>>['ref']
) => JSX.Element

function forwardRefAs<Props, DefaultAs extends AsProp>(
    render: ForwardRefRenderFunction<ElementType<DefaultAs>, Props>
) {
    return forwardRef<ElementType<DefaultAs>, Props>(render) as ForwardRef<Props, DefaultAs>
}

export type { AsProp }
export default forwardRefAs
