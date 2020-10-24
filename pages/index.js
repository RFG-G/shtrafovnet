import React, { useState, useEffect } from 'react';
import ReactLoading from "react-loading";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import getFine from './api/fines';

const MainLogo = ({ styles }) => (
  <svg className={styles.logo} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="34" height="34" rx="4" fill="#63C556"/>
    <path d="M8.33984 24V10H11.5598V21.24H15.2598V14H18.4798V21.24H22.1998V10H25.3998V24H8.33984Z" fill="white"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M44.7339 11.0101C43.7695 10.7876 42.8071 11.3877 42.5839 12.3521C42.3607 13.3165 42.9623 14.2795 43.9267 14.5027C48.3852 15.5331 52.4604 17.7968 55.711 21.0473C65.2674 30.6037 65.2674 46.1544 55.711 55.7108C46.1545 65.268 30.6038 65.268 21.0474 55.7108C11.4903 46.1544 11.4903 30.6037 21.0474 21.0473C23.7912 18.3036 27.0382 16.3024 30.6986 15.098C31.6384 14.7891 32.1501 13.7763 31.8413 12.8357C31.5318 11.8952 30.5182 11.3835 29.5784 11.693C25.3796 13.0737 21.6567 15.3682 18.5128 18.5127C7.55822 29.4673 7.55822 47.2915 18.5128 58.2461C23.9898 63.7231 31.1843 66.4619 38.3795 66.4619C45.5741 66.4612 52.7686 63.7231 58.2462 58.2461C69.2001 47.2915 69.2001 29.4673 58.2462 18.5127C54.5198 14.787 49.8479 12.1921 44.7339 11.0101Z" fill="black"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M89.5588 77.752L70.7758 58.9691C80.4073 43.8655 78.2981 24.0227 65.5171 11.241C58.2686 3.99243 48.6307 0 38.3794 0C28.1274 0 18.4896 3.99243 11.241 11.241C3.99173 18.4896 0 28.1274 0 38.3794C0 48.6307 3.99173 58.2686 11.241 65.5172C18.4896 72.7657 28.1267 76.7574 38.378 76.7574C45.7354 76.7574 52.8225 74.6938 58.9691 70.7758L77.752 89.5588C79.3236 91.131 81.4202 91.9965 83.6558 91.9965C85.8906 91.9965 87.9872 91.131 89.5595 89.5588C92.8135 86.3033 92.8135 81.0075 89.5588 77.752ZM87.0242 87.0242C86.1293 87.9184 84.9332 88.4112 83.6558 88.4112C82.3776 88.4112 81.1815 87.9184 80.2866 87.0242L60.4662 67.2038C60.1195 66.8564 59.6605 66.6788 59.1986 66.6788C58.8434 66.6788 58.4869 66.7834 58.1773 66.9982C52.3536 71.0376 45.5066 73.1728 38.378 73.1728C29.0841 73.1728 20.3468 69.5538 13.7756 62.9826C0.209167 49.4162 0.209167 27.342 13.7756 13.7756C20.3475 7.20364 29.0848 3.58463 38.3794 3.58463C47.6733 3.58463 56.4106 7.20364 62.9826 13.7756C74.8925 25.6862 76.582 44.3596 66.9982 58.1773C66.504 58.8898 66.5904 59.8528 67.2038 60.4662L87.0242 80.2866C88.8814 82.1439 88.8814 85.1663 87.0242 87.0242Z" fill="black"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M49.1992 27.5589C48.4994 26.8591 47.3651 26.8591 46.6646 27.5589L38.3793 35.8441L30.0934 27.5589C29.3936 26.8591 28.2586 26.8591 27.5588 27.5589C26.859 28.2587 26.859 29.3936 27.5588 30.0934L35.8441 38.3794L27.5588 46.6647C26.859 47.3645 26.859 48.4995 27.5588 49.1993C27.9083 49.5495 28.3674 49.7243 28.8257 49.7243C29.2848 49.7243 29.7431 49.5495 30.0934 49.1993L38.3786 40.914L46.6639 49.1993C47.0142 49.5495 47.4732 49.7243 47.9316 49.7243C48.3906 49.7243 48.8489 49.5495 49.1992 49.1993C49.899 48.4995 49.899 47.3645 49.1992 46.6647L40.9132 38.3794L49.1992 30.0934C49.899 29.3936 49.899 28.2587 49.1992 27.5589Z" fill="black"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M37.1911 13.8949C38.178 13.8949 38.9831 13.0898 38.9831 12.1022C38.9831 11.1154 38.178 10.3103 37.1911 10.3103C36.2035 10.3103 35.3984 11.1154 35.3984 12.1022C35.3984 13.0898 36.2035 13.8949 37.1911 13.8949Z" fill="black"/>
  </svg>
);

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState(null);

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    changeInputOption(e.target.value)
  }; 
  const handleClick = async (e) => {
    e.preventDefault();
    if (searchValue.length >= 20 && searchValue.length <= 25){
      const res = await getFine(searchValue, setLoading);
      setResult(res)
    }
  };

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

  const changeInputOption = (searchValue) => {
    const getSumWeight = (value, plus=0) => {
      if (value.length > 0) {
        let weights = [];
        let count = 1 + plus;
        value.split("").map((num) => {
          weights.push(num * count)
          count = count < 10 ? count + 1 : 1;
        });

        const weightsSum = weights.length > 0 && weights.reduce((a, b) => a + b);
        
        return weightsSum % 11
      }
    }

    let res = getSumWeight(searchValue);
    if (res === 10) {
      res = getSumWeight(searchValue, 2);
      if (res === 10) res = 0;
    }
    setOption(res)
  }

  useEffect(() => setResult(null), [searchValue])

  return (
    <>
      <Head>
        <title>ШТРАФОВ НЕТ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <MainLogo styles={styles} />
          <span>
            <strong>Штрафов</strong> нет
          </span>
        </header>
        <main className={styles.main}>
          <div>
            <span>Получение информации о штрафе по УИН</span>
            <form >
              <input type="text" placeholder="Введите УИН" list="uins"
                value={searchValue} onChange={handleSearch} required
                minLength="20" maxLength="25"
              />
              <datalist id="uins">
                {searchValue.length >= 19 && searchValue.length <= 24 && 
                  <option value={searchValue + option} />}
              </datalist>
              <button onClick={handleClick}>
                Найти
              </button>
              {loading &&
                <div className={styles.main__loading}>
                  <ReactLoading type="spinningBubbles" color="#000000"/>
                  <div className={styles.main__loading_text}>Загрузка</div>
                </div>
              }
            </form>
          </div>

          {result && result !== 'error' ?
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
          : result && searchValue &&
            <div className={styles.result__error}>
              <div className={styles.result__content}>
                <SearchIcon />
                <span>
                  Штраф {searchValue} не найден
                </span>  
              </div> 
            </div>
          }
        </main>
      </div>
    </>
  )
}


