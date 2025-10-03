import { CTAButton } from '../buttons'
import { CallBackDialog } from '../dialog'
import styles from './styles.module.css'
export default function CTASection() {
  return (
    <section className={styles['cta-section']}>
        <h2>Готовы начать?</h2>
        <p>Откройте мир цветов с нашим сервисом. Выберите подходящий вариант для вас.</p>
        <div className={styles['cta-buttons']}>
            <CTAButton title="Открыть цветочный счёт" href='#' />
            <CallBackDialog  title="Получить консультацию" buttonVariant='secondary'/>
        </div>
    </section>
  )
}
