import styles from './Loading.module.scss'

const Loading = () => (
  <div className={styles.loader}>
    Loading<span className={styles.loader__dot}>.</span>
    <span className={styles.loader__dot}>.</span>
    <span className={styles.loader__dot}>.</span>
  </div>
)

export default Loading
