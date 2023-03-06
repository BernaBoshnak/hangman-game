import styles from './ErrorMessage.module.scss'

type ErrorMessageProps = {
  children: React.ReactNode
}

const ErrorMessage = ({ children }: ErrorMessageProps) => (
  <div className={styles.alert} role="alert">
    {children}
  </div>
)

export default ErrorMessage
