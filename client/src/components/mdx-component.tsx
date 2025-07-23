'use client'

import { CodeBlock } from './code-block'

export const mdxComponents = {
  pre: (props: any) => <CodeBlock>{props.children}</CodeBlock>,
  code: (props: any) => {
    return (
      <code className={props.className}>
        {props.children}
      </code>
    )
  }
}

