import Link from 'next/link'
import React from 'react'

interface Props {
  children?: React.ReactNode
  className?: string
}

const Logo = ({ children, className }: Props) => {
  return (
    <Link href='/' className={className}>
      {children}
    </Link>
  )
}

export default Logo
