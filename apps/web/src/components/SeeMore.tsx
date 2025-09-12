'use client'
import React, { useState } from 'react'

type ExpandableTextProps = {
  text: string
  limit?: number
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  limit = 500,
}) => {
  const [expanded, setExpanded] = useState(false)

  if (!text) return null

  const isLongText = text.length > limit
  const displayText =
    expanded || !isLongText ? text : text.slice(0, limit) + '...'

  return (
    <p className='text-sm leading-relaxed text-gray-600 tracking-wide'>
      {displayText}{' '}
      {isLongText && (
        <button
          onClick={() => setExpanded(!expanded)}
          className='text-blue-600 font-medium hover:underline ml-1 cursor-pointer'
        >
          {expanded ? 'Voir moins' : 'Voir plus'}
        </button>
      )}
    </p>
  )
}

export default ExpandableText
