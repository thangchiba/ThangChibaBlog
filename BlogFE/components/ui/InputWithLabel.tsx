import React from 'react'

interface InputWithLabelProps {
  label: string
  labelWidth?: number // Optional width for the label
  value: string
  onChange: (value: string) => void
  placeholder: string
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  value,
  onChange,
  placeholder,
  labelWidth,
}) => {
  const labelStyle = labelWidth ? { width: `${labelWidth}px` } : {}

  return (
    <div className="flex">
      <span
        className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
        style={labelStyle}
      >
        <span>{label}</span>
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  )
}

export default InputWithLabel
