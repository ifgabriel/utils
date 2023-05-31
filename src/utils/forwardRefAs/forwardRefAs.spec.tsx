import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { createRef } from 'react'
import forwardRefAs, { AsProp } from '.'

describe('forwardRefAs', () => {
  test('should render a component using forwardRefAs', () => {
    const Component = forwardRefAs<{ as?: AsProp }, 'h1'>(
      ({ as: Tag = 'h1', ...props }, ref) => <Tag ref={ref} {...props} />
    )

    const { container } = render(<Component />)

    expect(container?.firstChild?.nodeName).toBe('H1')
  })

  test('should render a component using forwardRefAs with ref', () => {
    const ref = createRef<HTMLParagraphElement>()

    const Component = forwardRefAs<{ as?: AsProp }, 'p'>(
      ({ as: Tag = 'p', ...props }, _ref) => <Tag ref={_ref} {...props} />
    )

    const { container } = render(<Component ref={ref} />)

    expect(ref.current).toBe(container.firstChild)
  })

  test('should render a component with the root element tag using element received by As prop', () => {
    const Component = forwardRefAs<{ as: AsProp }, 'p'>(
      ({ as: Tag = 'p' }, _ref) => <Tag ref={_ref} />
    )

    const { container } = render(<Component as='div' />)

    expect(container?.firstChild?.nodeName).toBe('DIV')
  })

  test('should render a component with the root element using a component received by As prop', () => {
    const Foo = (props: { href: string }) => <a {...props}>anchor</a>

    const Component = forwardRefAs<{ as: AsProp }, 'p'>(
      ({ as: Tag = 'p', ...props }, ref) => <Tag ref={ref} {...props} />
    )

    const { container } = render(<Component as={Foo} href='foo' />)

    expect(container?.firstChild?.nodeName).toBe('A')
    expect(container?.firstChild).toHaveAttribute('href', 'foo')
  })

  test('should forwardRefAs infer type to component props based on As prop', () => {
    const Component = forwardRefAs<{ as: AsProp }, 'p'>(
      ({ as: Tag = 'p', ...props }, ref) => <Tag ref={ref} {...props} />
    )

    const { container } = render(<Component as='a' href='foo' />)

    expect(container?.firstChild?.nodeName).toBe('A')
    expect(container?.firstChild).toHaveAttribute('href', 'foo')
  })
})
