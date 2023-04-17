interface CustomLiProps {
  children: React.ReactNode
  padding?: string
  borderRadius?: string
  backgroundColor?: string
}

export default function CustomLi({ children, padding, borderRadius, backgroundColor }: CustomLiProps) {
  const style = {
    padding: padding || '5px 10px',
    borderRadius: borderRadius || '10px',
    backgroundColor: backgroundColor || '#ffffff2c'
  }

  return (
    <li style={style}>
      {children}
    </li>
  )
}