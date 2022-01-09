import React from 'react'
import type { FC } from 'react'
import Header from 'app/components/header'

interface ILayoutProps {
  children: React.ReactNode
}

const Layout: FC<ILayoutProps> = (props: ILayoutProps) => { //eslint-disable-line
  const { children } = props

  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  )
}

export default Layout
