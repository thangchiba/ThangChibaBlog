// Type definition for the props
import React, { type ReactNode } from 'react'

interface FlexContainerProps {
  children: ReactNode
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
}

// The FlexContainer functional component
const FlexContainer: React.FC<FlexContainerProps> = ({
  children,
  justifyContent = 'flex-start',
}) => {
  return <div style={{ display: 'flex', justifyContent: justifyContent }}>{children}</div>
}

export default FlexContainer
