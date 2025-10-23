// jest.config.js
module.exports = {

  reporters: [
    "default",         // Jestの標準出力を保持
    [ "jest-junit", { 
        // 2. レポート出力ファイル名
        outputDirectory: "test_results",
        outputName: "junit.xml",
        // 3. Jestの標準的なテストスイート名を無効にし、CIツールでより分かりやすくする
        suiteNameTemplate: "{title}", 
        // 4. テストスイート名にファイルパスを含める
        ancestorSeparator: " › ",
    } ]
    // => JUnit XML形式のレポートを出力
  ],

  // 常にカバレッジとレポートを生成
  collectCoverage: false, 
  
  // カバレッジレポートを保存するディレクトリ
  coverageDirectory: "test_results/coverage",
  
  // レポート形式の指定
  _coverageReporters_: [
    "text",     // ターミナルに簡潔な表を出力
    "html",     // 詳細なHTMLレポート（ブラウザで閲覧可能）
    "json-summary", // CIツールなどで利用しやすいJSON形式のサマリー
    "lcov"      // 多くのCIツールやサービスが利用する標準形式（HTMLレポートの元）
  ],
  coverageReporters: [
    "text", "html", "json-summary"
  ]
  
};