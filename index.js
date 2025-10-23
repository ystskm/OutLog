/**
 * OutLog クラスのインスタンス生成とエクスポートを管理する即時関数。
 * @param {function(): function(string): OutLog} mx - OutLog の実装を返すファクトリ関数。
 */
(mx=>{

  // Export Definition
  /**
   * Node.js 環境向けのエクスポート定義。
   * require('OutLog')() の形式でインスタンスを取得できるようにします。
   */
  if(typeof module != 'undefined' && module.exports) {
    module.exports = mx; // out = require('OutLog')()
    return;
  }
  /**
   * ブラウザ環境の AppSpace 名前空間への定義。
   * window.AppSpace.define('OutLog', OutLog); を実行し、fn.OutLog() の形式でインスタンスを取得できるようにします。
   */
  if(typeof window != 'undefined' && window.AppSpace) {
    window.AppSpace.define('OutLog', OutLog); // out = fn.OutLog()
    return;
  }
  /**
   * どの名前空間にも設定できなかった場合の警告。
   */
  console.warn('module OutLog cannot set any namespace');

})((()=>{

  // Implementation
  /**
   * ログレベル名とその数値マッピング。
   * 数値が小さいほど重要度が高い（より低いログレベル）。
   * @type {Object<string, number>}
   */
  const LogLevs = {
    Emergency: 0,
    Critical: 0,
    Fatal: 0,
    Alert: 1,
    Error: 1,
    Warning: 2,
    Notice: 3,
    Info: 3,
    Debug: 4,
    Trace: 5,
    Verbose: 5
  };
  /**
   * ログレベルの数値とそのタイプを示す1文字の対応。
   * 'f': fatal (0), 'e': error (1), 'w': warn (2), 'i': info (3), 'd': debug (4), 'v': verbose/trace (5)
   * @type {Object<number, string>}
   */
  const LogTyps = {
    0: 'f',
    1: 'e',
    2: 'w',
    3: 'i',
    4: 'd',
    5: 'v'
  };
  /**
   * LogLevs のキー（ログレベル名）の配列。
   * @type {string[]}
   */
  const LogLevs_keys = Object.keys(LogLevs);

  /**
   * ログ出力を行うクラス。
   */
  class OutLog {

    /**
     * OutLog の新しいインスタンスを作成します。
     * @param {string} [tag] - ログメッセージのプレフィックスとして使用されるタグ。
     */
    constructor(tag) {
      const out = this;
      /**
       * ログに付加するタグ。
       * @type {string|undefined}
       */
      out.LOG_TAG = tag;
      /**
       * 現在のログレベル（デフォルトは 3: Info）。
       * この値以下のレベルのログが出力されます。
       * @type {number}
       */
      out.LOG_LEV = 3;
    }

    /**
     * Fatal レベルのログを出力します (レベル 0)。
     * @param {*} msg - 出力するメッセージまたはオブジェクト。
     * @returns {Array<*>} - ログ出力に使用された引数の配列。
     */
    fatal(msg) {
      return this.f(msg, 'f');
    }
    /**
     * Error レベルのログを出力します (レベル 1)。
     * @param {*} msg - 出力するメッセージまたはオブジェクト。
     * @returns {Array<*>} - ログ出力に使用された引数の配列。
     */
    error(msg) {
      return this.e(msg, 'e');
    }
    /**
     * Warning レベルのログを出力します (レベル 2)。
     * @param {*} msg - 出力するメッセージまたはオブジェクト。
     * @returns {Array<*>} - ログ出力に使用された引数の配列。
     */
    warn(msg) {
      return this.w(msg, 'w');
    }
    /**
     * Info レベルのログを出力します (レベル 3)。
     * @param {*} msg - 出力するメッセージまたはオブジェクト。
     * @returns {Array<*>} - ログ出力に使用された引数の配列。
     */
    info(msg) {
      return this.i(msg, 'i');
    }
    /**
     * Debug レベルのログを出力します (レベル 4)。
     * @param {*} msg - 出力するメッセージまたはオブジェクト。
     * @returns {Array<*>} - ログ出力に使用された引数の配列。
     */
    debug(msg) {
      return this.d(msg, 'd');
    }
    /**
     * Trace/Verbose レベルのログを出力します (レベル 5)。
     * @param {*} msg - 出力するメッセージまたはオブジェクト。
     * @returns {Array<*>} - ログ出力に使用された引数の配列。
     */
    trace(msg) {
      return this.v(msg, 'v');
    }

    // 短縮形メソッド

    /**
     * Fatal レベルのログを出力します (短縮形 f)。
     * @param {*} msg - 出力するメッセージまたはオブジェクト。
     * @returns {Array<*>} - ログ出力に使用された引数の配列。
     */
    f(msg) {
      return this.Log(msg, 'f');
    }
    /**
     * Error レベルのログを出力します (短縮形 e)。
     * @param {*} msg - 出力するメッセージまたはオブジェクト。
     * @returns {Array<*>} - ログ出力に使用された引数の配列。
     */
    e(msg) {
      return this.Log(msg, 'e');
    }
    /**
     * Warning レベルのログを出力します (短縮形 w)。
     * @param {*} msg - 出力するメッセージまたはオブジェクト。
     * @returns {Array<*>} - ログ出力に使用された引数の配列。
     */
    w(msg) {
      return this.Log(msg, 'w');
    }
    /**
     * Info レベルのログを出力します (短縮形 i)。
     * @param {*} msg - 出力するメッセージまたはオブジェクト。
     * @returns {Array<*>} - ログ出力に使用された引数の配列。
     */
    i(msg) {
      return this.Log(msg, 'i');
    }
    /**
     * Debug レベルのログを出力します (短縮形 d)。
     * @param {*} msg - 出力するメッセージまたはオブジェクト。
     * @returns {Array<*>} - ログ出力に使用された引数の配列。
     */
    d(msg) {
      return this.Log(msg, 'd');
    }
    /**
     * Trace/Verbose レベルのログを出力します (短縮形 v)。
     * @param {*} msg - 出力するメッセージまたはオブジェクト。
     * @returns {Array<*>} - ログ出力に使用された引数の配列。
     */
    v(msg) {
      return this.Log(msg, 'v');
    }

    /**
     * 実際のログ出力処理を実行します。
     * 現在のログレベル (LOG_LEV) と指定されたログタイプ (typ) を比較し、出力するかどうかを決定します。
     * @param {*} msg - 出力するメッセージまたはオブジェクト。
     * @param {string} [typ='i'] - ログタイプを示す1文字の文字列 ('f', 'e', 'w', 'i', 'd', 'v' など)。
     * @returns {Array<*>} - ログ出力に使用された引数の配列。
     */
    Log(msg, typ = 'i') {
      const out = this;
      /** ログタイプの最初の1文字を小文字で取得 */
      const outType  = String(typ).toLocaleLowerCase().charAt(0);
      /** タイムスタンプとタグが付加された引数の配列を取得 */
      const outArgs = _getArgs(msg, out.LOG_TAG, outType);
      /** outArgs を空にする関数 */
      const empty = ()=>outArgs.splice(0);

      switch(outType) {
          case 'f':
            // Fatal はログレベルに関わらず常に出力。console.fatal があればそれを使う。
            console.fatal ? console.fatal(...outArgs): console.error ? console.error(...outArgs): console.log(...outArgs);
            break;
          case 'e':
            // Error (レベル 1)
            if(out.LOG_LEV >= 1) {
              console.error ? console.error(...outArgs): console.log(...outArgs);
            } else {
              empty();
            }
            break;
          case 'w':
            // Warning (レベル 2)
            if(out.LOG_LEV >= 2) {
              console.error ? console.error(...outArgs): console.log(...outArgs);
            } else {
              empty();
            }
            break;
          case 'i':
            // Info (レベル 3)
            if(out.LOG_LEV >= 3) {
              console.info ? console.info(...outArgs): console.log(...outArgs);
            } else {
              empty();
            }
            break;
          case 'd':
            // Debug (レベル 4)
            if(out.LOG_LEV >= 4) {
              console.debug ? console.debug(...outArgs): console.log(...outArgs);
            } else {
              empty();
            }
            break;
          case 'v':
            // Verbose/Trace (レベル 5)
            if(out.LOG_LEV >= 5) {
              console.trace ? console.trace(...outArgs): console.log(...outArgs);
            } else {
              empty();
            }
            break;
          default:
            // 不明なタイプは常に出力（デフォルトの console.log）
            console.log(...outArgs);
            
      }
      return outArgs;
    }
    /**
     * ログ出力レベルを設定します。
     * @param {string|number} v - ログレベルの指定。
     * - 数値: 0 (Fatal/Emergency) から 5 (Trace/Verbose) の範囲。
     * - 文字列: 'f', 'e', 'w', 'i', 'd', 'v' などの短縮形、または 'fatal', 'info', 'debug' などのレベル名。
     * - 文字列の長さ: 'vvv' のように、文字数をレベルとして解釈 (非推奨)。
     * @returns {number} - 設定されたログレベル (0〜5)。
     */
    setLev(v) {
      const out = this;
      /** 文字列から対応する数値レベルを検索 */
      const alt = _seekLev(v);
      /**
       * v の値の決定ロジック:
       * 1. v が文字列の場合: _seekLev(v) の結果があればそれを使用。なければ v の長さを使用。
       * 2. v が数値の場合: 整数にパース。NaN の場合はデフォルトの 3 (Info) を使用。
       */
      v = typeof v == 'string' ? alt == null ? v.length: alt: isNaN(parseInt(v)) ? 3: parseInt(v);
      /** 0から5の範囲に収めて設定 */
      return out.LOG_LEV = Math.min(5, Math.max(0, v));
    }
    /**
     * 現在のログ出力レベルを取得します。
     * @returns {number} - 現在のログレベル (0〜5)。
     */
    getLev() {
      const out = this;
      return out.LOG_LEV;
    }
    /**
     * 現在のログ出力レベルに対応する1文字のタイプを取得します。
     * @returns {string} - 現在のログレベルに対応するタイプ文字 ('f', 'e', 'w', 'i', 'd', 'v')。
     */
    getTyp() {
      const out = this;
      return LogTyps[out.LOG_LEV];
    }
  }

  /**
   * OutLog のインスタンスを生成するファクトリ関数を返します。
   * この関数を呼び出すことで、new を使わずに OutLog インスタンスを取得できます。
   * @param {string} [tag] - ログタグ。
   * @returns {OutLog} - 新しい OutLog のインスタンス。
   */
  return function(tag) {
    // この工夫により、function の呼び出しだけで速やかにインスタンスを取得できる。
    return new OutLog(tag);
  };

  /**
   * ログ出力のための引数配列を生成します。
   * タイムスタンプ、タグ、ログタイプを付加します。
   * @param {*} msg - ログメッセージまたはオブジェクト。
   * @param {string|undefined} tag - ログタグ。
   * @param {string} typ - ログタイプを示す1文字。
   * @returns {Array<*>} - ログ出力に使用する引数の配列。
   */
  function _getArgs(msg, tag, typ) {
    /** タイムスタンプとタグ、タイプを含むプレフィックス文字列 */
    return [ `${new Date().toISOString()} - (${tag})[${typ.toUpperCase()}]` ].concat(msg);
  }

  /**
   * 文字列から対応するログレベルの数値 (0〜5) を検索します。
   * @param {string|number} s - 検索するログレベル名または短縮形。
   * @returns {number} - 対応するログレベルの数値。見つからない場合はデフォルトの 3 (Info)。
   */
  function _seekLev(s) {
    /** 入力文字列を小文字に変換 */
    const v = String(s).toLowerCase();
    for(let i = 0; i < LogLevs_keys.length; i ++) {
      const n = LogLevs_keys[i];
      /** ログレベル名が入力文字列で始まっているかチェック */
      if(n.toLowerCase().startsWith(v)) {
        return LogLevs[n]; // => 数字指定となる。
      }
    }
    /** 見つからなければデフォルト値 */
    return 3;
  }

})());