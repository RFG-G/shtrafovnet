import React from 'react'
import styles from '../styles/Main.module.css'

const UINTable = ({result}) => {
    const formatData = {
        doc_number: 'Свидетельство о регистрации',
        bill_at: 'Дата поставления',
        koap_code: 'Нарушение',
        payee_username: 'Получатель платежа',
        payee_inn: 'ИНН',
        payee_kpp: 'КПП',
        payee_bank_account: 'Расчетный счет',
        payee_bank_name: 'Банк получателя',
        payee_bank_bik: 'БИК',
        payee_oktmo: 'ОТКМО',
        kbk: 'КБК',
        amount: 'Сумма штафа',
        discount_size: 'Скидка',
        amount_to_pay: 'К оплате'
    }

    return (
        <div className={styles.result__success}>
            <div className={styles.title}>
                Постановление #{result.number}
            </div> 
            <div className={styles.result__content}>
                {
                    Object.keys(formatData).map((item, id) => 
                        <React.Fragment key={id}>
                            <div className={styles.result__content_text}>
                                {formatData[item]}:
                            </div>
                            <div className={styles.result__content_text}>
                                {result[item] || 'Неизвестно'}
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
        </div>   
    )
}

export default UINTable