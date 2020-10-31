import React, { useState, useEffect } from 'react';
import ReactLoading from "react-loading";
import Head from 'next/head'

import Input from '../components/Input';  
import UINTable from '../components/UINTable';
import MainLogo from '../components/MainLogo';
import SearchIcon from '../components/SearchIcon';

import styles from '../styles/Main.module.css'
import getFine from '../api/fines';

const Main = () => {
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
            <form>
              <Input searchValue={searchValue} handleSearch={handleSearch} option={option} />
              <button onClick={handleClick}>
                Найти
              </button>
              {loading &&
                <div className={styles.main__loading}>
                  <ReactLoading className={styles.main__loading_img} type="spinningBubbles" color="#000000"/>
                  <div className={styles.main__loading_text}>Загрузка</div>
                </div>
              }
            </form>
          </div>

          {result && result !== 'error' ?
            <UINTable result={result} />
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

export default Main;
