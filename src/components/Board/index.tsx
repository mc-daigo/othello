"use client";
import styles from "./Board.module.css"

export const Board = () => {
  return (
    <div className={styles.board}>
      <ul className={styles.squares}>
        <li className={styles.dot}></li>
        <li className={styles.dot}></li>
        <li className={styles.dot}></li>
        <li className={styles.dot}></li>
        <li className={styles.row}>
          <ul className={styles.column}>
            <li className={styles.square} role="button" data-row="0" data-column="0">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="0" data-column="1">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="0" data-column="2">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="0" data-column="3">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="0" data-column="4">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="0" data-column="5">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="0" data-column="6">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="0" data-column="7">
              <p className={styles.none} data-stone="none"></p>
            </li>
          </ul>
        </li>
        <li className={styles.row}>
          <ul className={styles.column}>
            <li className={styles.square} role="button" data-row="1" data-column="0">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="1" data-column="1">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="1" data-column="2">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="1" data-column="3">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="1" data-column="4">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="1" data-column="5">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="1" data-column="6">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="1" data-column="7">
              <p className={styles.none} data-stone="none"></p>
            </li>
          </ul>
        </li>
        <li className={styles.row}>
          <ul className={styles.column}>
            <li className={styles.square} role="button" data-row="2" data-column="0">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="2" data-column="1">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="2" data-column="2">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="2" data-column="3">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="2" data-column="4">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="2" data-column="5">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="2" data-column="6">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="2" data-column="7">
              <p className={styles.none} data-stone="none"></p>
            </li>
          </ul>
        </li>
        <li className={styles.row}>
          <ul className={styles.column}>
            <li className={styles.square} role="button" data-row="3" data-column="0">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="3" data-column="1">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="3" data-column="2">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="3" data-column="3">
              <p className={styles.white} data-stone="white"></p>
            </li>
            <li className={styles.square} role="button" data-row="3" data-column="4">
              <p className={styles.black} data-stone="black"></p>
            </li>
            <li className={styles.square} role="button" data-row="3" data-column="5">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="3" data-column="6">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="3" data-column="7">
              <p className={styles.none} data-stone="none"></p>
            </li>
          </ul>
        </li>
        <li className={styles.row}>
          <ul className={styles.column}>
            <li className={styles.square} role="button" data-row="4" data-column="0">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="4" data-column="1">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="4" data-column="2">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="4" data-column="3">
              <p className={styles.black} data-stone="black"></p>
            </li>
            <li className={styles.square} role="button" data-row="4" data-column="4">
              <p className={styles.white} data-stone="white"></p>
            </li>
            <li className={styles.square} role="button" data-row="4" data-column="5">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="4" data-column="6">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="4" data-column="7">
              <p className={styles.none} data-stone="none"></p>
            </li>
          </ul>
        </li>
        <li className={styles.row}>
          <ul className={styles.column}>
            <li className={styles.square} role="button" data-row="5" data-column="0">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="5" data-column="1">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="5" data-column="2">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="5" data-column="3">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="5" data-column="4">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="5" data-column="5">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="5" data-column="6">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="5" data-column="7">
              <p className={styles.none} data-stone="none"></p>
            </li>
          </ul>
        </li>
        <li className={styles.row}>
          <ul className={styles.column}>
            <li className={styles.square} role="button" data-row="6" data-column="0">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="6" data-column="1">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="6" data-column="2">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="6" data-column="3">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="6" data-column="4">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="6" data-column="5">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="6" data-column="6">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="6" data-column="7">
              <p className={styles.none} data-stone="none"></p>
            </li>
          </ul>
        </li>
        <li className={styles.row}>
          <ul className={styles.column}>
            <li className={styles.square} role="button" data-row="7" data-column="0">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="7" data-column="1">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="7" data-column="2">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="7" data-column="3">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="7" data-column="4">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="7" data-column="5">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="7" data-column="6">
              <p className={styles.none} data-stone="none"></p>
            </li>
            <li className={styles.square} role="button" data-row="7" data-column="7">
              <p className={styles.none} data-stone="none"></p>
            </li>
          </ul>
        </li>
        <li className={styles.columnScale}>
          <ul>
            <li>a</li>
            <li>b</li>
            <li>c</li>
            <li>d</li>
            <li>e</li>
            <li>f</li>
            <li>g</li>
            <li>h</li>
          </ul>
        </li>
        <li className={styles.rowScale}>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
          </ul>
        </li>
      </ul>

      {/* 以下はテスト用なので最終的に削除 */}
      <div className={styles.testinput}>
        <select name="column" className={styles.selectColumn}>
          <option value="">column</option>
          <option value="0">a</option>
          <option value="1">b</option>
          <option value="2">c</option>
          <option value="3">d</option>
          <option value="4">e</option>
          <option value="5">f</option>
          <option value="6">g</option>
          <option value="7">h</option>
        </select>
        <select name="row" className={styles.selectRow}>
          <option value="">row</option>
          <option value="0">1</option>
          <option value="1">2</option>
          <option value="2">3</option>
          <option value="3">4</option>
          <option value="4">5</option>
          <option value="5">6</option>
          <option value="6">7</option>
          <option value="7">8</option>
        </select>
        <select name="stone" className={styles.selectStone}>
          <option value="black">黒</option>
          <option value="white">白</option>
        </select>
        <button className={styles.changeButton}>反転</button>
      </div>

    </div>
  );
}
