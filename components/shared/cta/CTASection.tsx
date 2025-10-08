import { CTAButton } from '../buttons'
import { CallBackDialog } from '../dialog'
import styles from './styles.module.css'
import {cn} from "@/lib/utils";
export default function CTASection() {
  return (
    <section className={cn(
        'after:bg-background/50 after:absolute after:inset-0 z-0',
        styles['cta-section']
    )}>
        <div className={styles['cta-section-container']}>
            <h2>Готовы начать?</h2>
            <p>Откройте мир цветов с нашим сервисом. Выберите подходящий вариант для вас.</p>
            <div className={styles['cta-buttons']}>
                <CTAButton title="Открыть цветочный счёт" href='#'/>
                <CallBackDialog title="Получить консультацию" buttonVariant='secondary'/>
            </div>
        </div>
    </section>
  )
}
