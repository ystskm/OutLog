OutLog
======

**ブラウザ**と**Node.js**環境で一貫したログ出力インターフェースを提供する汎用ログライブラリです。

ログレベルに基づいて出力を制御し、タイムスタンプとタグを自動で付加することで、デバッグと運用の効率を向上させます。

✨ 特徴 (Features)
---------------

*   **クロスプラットフォーム対応**: Node.js (\`module.exports\`) とブラウザ (\`window.AppSpace\` またはグローバルスコープ) の両方で利用可能。
*   **ログレベル制御**: 0 (Fatal/Emergency) から 5 (Trace/Verbose) までの細かなレベル設定により、必要最低限のログ出力に制御できます。
*   **一貫したフォーマット**: タイムスタンプ、ログタイプ、オプションのタグをプレフィックスとして自動付加します。
*   **便利なメソッド**: 各ログレベルに対応するメソッド (\`fatal\`, \`error\`, \`info\` など) および短縮形 (\`f\`, \`e\`, \`i\` など) を提供します。

🚀 インストールと利用方法 (Installation & Usage)
-------------------------------------

このモジュールは、直接ファイルをプロジェクトに組み込むことを想定しています。

### Node.jsでの利用

    // OutLogモジュールをインポート
    const OutLogFactory = require('./OutLog'); 
    
    // ファクトリ関数を呼び出してインスタンスを取得
    // 'SERVER' はオプションのタグです
    const log = OutLogFactory('SERVER'); 
    
    // ログ出力
    log.setLev(4); // ログレベルを Debug (4) に設定
    
    log.fatal('Server crashed!'); 
    // 出力例: 2025-10-22T14:07:39.123Z - (SERVER)[F] Server crashed!
    
    log.error('Database connection failed.');
    log.info('Application started successfully.');
    log.debug({ 
        user: 'Alice', 
        action: 'login' 
    }); // オブジェクトもそのまま出力

### ブラウザでの利用

\`window.AppSpace.define('OutLog', OutLog);\` が実行されることを前提としています。

    <script src="path/to/OutLog.js"></script>
    <script>
        // AppSpace 名前空間から OutLog インスタンスを取得
        // 'FRONTEND' はオプションのタグです
        const log = window.AppSpace.fn.OutLog('FRONTEND'); 
    
        log.setLev('w'); // ログレベルを Warning (w/2) に設定
    
        log.warn('A deprecated function was called.');
        log.info('This message will NOT be displayed.'); // 現在のレベル (2) 未満なのでスキップ
        log.v('Trace message.'); // Trace (5) もスキップ
    
        // 現在のレベルを取得
        console.log('Current Log Level:', log.getLev()); // 2
    </script>

📚 APIリファレンス (API Reference)
----------------------------

### \`OutLog(tag)\`

ファクトリ関数。新しい \`OutLog\` インスタンスを作成して返します。

パラメータ

型

説明

`tag`

`string` (オプション)

ログメッセージのプレフィックスとして付加するタグ。

### ログ出力メソッド (\`fatal\`, \`info\`, \`f\`, \`i\` など)

引数 `msg` について:

すべてのログ出力メソッド（例: `log.info(msg)`, `log.e(msg)`）は、単一の引数 `msg` を受け取ります。この引数には、出力したいメッセージまたはオブジェクトを渡します。

*   `string`: メッセージ文字列。
*   `Object`: オブジェクトや配列。環境によっては構造化された形式（JSONツリーなど）で出力されます。
*   `Array<*>`: 配列で渡された場合、要素が展開されて出力されます。

メソッド

レベル

引数

戻り値

説明

`fatal(msg)` / `f(msg)`

0 (Fatal)

`msg: *` - 出力するメッセージまたはオブジェクト。

`Array<*>` - ログ出力に使用された引数の配列。

緊急性の高いエラーログ。レベルに関わらず常に出力されます。

`error(msg)` / `e(msg)`

1 (Error)

`msg: *` - 出力するメッセージまたはオブジェクト。

`Array<*>` - ログ出力に使用された引数の配列。

エラーログ。アプリケーションの実行に問題がある場合に。

`warn(msg)` / `w(msg)`

2 (Warning)

`msg: *` - 出力するメッセージまたはオブジェクト。

`Array<*>` - ログ出力に使用された引数の配列。

警告ログ。潜在的な問題や非推奨の利用に。

`info(msg)` / `i(msg)`

3 (Info)

`msg: *` - 出力するメッセージまたはオブジェクト。

`Array<*>` - ログ出力に使用された引数の配列。

一般情報ログ。デフォルトのログレベルです。

`debug(msg)` / `d(msg)`

4 (Debug)

`msg: *` - 出力するメッセージまたはオブジェクト。

`Array<*>` - ログ出力に使用された引数の配列。

デバッグログ。開発時に役立つ詳細情報。

`trace(msg)` / `v(msg)`

5 (Trace)

`msg: *` - 出力するメッセージまたはオブジェクト。

`Array<*>` - ログ出力に使用された引数の配列。

最も詳細なログ。処理の追跡に。

### ログレベル設定 (\`setLev(v)\`)

引数 `v` (ログレベル) について:

ログレベルは、**数値**または**文字列**で設定できます。現在のレベル以下の重要度を持つログが出力されます。

*   `number`: `0` (Fatal) から `5` (Trace) の範囲で直接指定します。
*   `string`: 'f', 'e', 'w', 'i', 'd', 'v' などの短縮形、または 'fatal', 'info', 'debug' などのレベル名全体（またはそのプレフィックス）で指定します。

設定値 (数値)

設定値 (文字列)

ログレベル

説明

**0**

`fatal`, `f`

**Fatal/Emergency**

最も重要。0以下のログのみが出力（常にFatalが出力）。

**1**

`error`, `e`

**Error/Alert**

Error以上のログが出力。

**2**

`warn`, `w`

**Warning**

Warning以上のログが出力。

**3**

`info`, `i`

**Info/Notice**

Info以上のログが出力 (デフォルト)。

**4**

`debug`, `d`

**Debug**

Debug以上のログが出力。

**5**

`trace`, `v`

**Trace/Verbose**

最も詳細。すべてのログが出力。

#### 例:

    log.setLev(2);      // 数値で Warning レベルを設定
    log.setLev('error'); // 文字列で Error レベルを設定
    log.setLev('d');    // 短縮形 'd' で Debug レベルを設定