# 都内ガールズバー求人

東京都内のガールズバー求人情報サイト。エリア・条件・信頼度で比較し、LINEで応募できる求人特化サイト。

## 技術スタック

| 項目 | 採用技術 |
|---|---|
| フレームワーク | Next.js 14 (App Router) |
| 言語 | TypeScript 5 |
| スタイル | Tailwind CSS 3 |
| 出力モード | Static Export (SSG) |
| 検索 | Fuse.js（クライアントサイド） |
| 状態管理 | Zustand（ローカルストレージ永続化） |
| ホスティング | Cloudflare Pages 対応 |

---

## セットアップ方法

### 前提条件

- Node.js 18.17 以上
- npm または yarn

### 手順

```bash
# リポジトリをクローン（またはZIPを展開）
cd tonai-girlsbar-kyujin

# 依存関係をインストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

---

## ローカル起動方法

```bash
npm run dev
```

---

## ビルド方法

```bash
npm run build
```

`out/` ディレクトリに静的ファイルが出力されます。

---

## ZIP出力方法

```bash
npm run zip
```

プロジェクト上位ディレクトリに `tonai-girlsbar-kyujin.zip` が生成されます（`node_modules/` と `.next/` は除外）。

手動で実行する場合:

```bash
cd ..
zip -r tonai-girlsbar-kyujin.zip tonai-girlsbar-kyujin \
  --exclude '*/node_modules/*' \
  --exclude '*/.next/*' \
  --exclude '*/out/*'
```

---

## Cloudflare Pages へのデプロイ方法

### 方法1: Cloudflare Pagesダッシュボードから

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. Pages → Create a project → Direct Upload
3. `npm run build` で生成した `out/` フォルダをドラッグ＆ドロップ

### 方法2: Git連携（推奨）

1. GitHubにリポジトリを作成してプッシュ
2. Cloudflare Pages → Create project → Connect to Git
3. ビルド設定:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Node.js version**: `18`

### 環境変数（本番設定）

| 変数名 | 説明 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | 本番サイトURL |
| `NEXT_PUBLIC_COUNTER_API_URL` | 訪問者カウンターAPI URL（後述） |

---

## データ更新方法

### 店舗データの更新

`src/data/shops/index.json` を直接編集します。

各レコードの構造:

```json
{
  "id": "001",
  "slug": "shop-name-area",
  "name": "店舗名",
  "area": "新宿",
  "station": "新宿駅",
  "category": "ガールズバー",
  "hourlyWageMin": 1200,
  "hourlyWageMax": 1800,
  "isExperienceOk": true,
  "isDailyPay": true,
  "isPrivateClothes": true,
  "isNoNorma": true,
  "hasEscort": null,
  "isStudentOk": true,
  "isDualWork": true,
  "isLastTrainOk": false,
  "isShortTimeOk": true,
  "hasUniform": null,
  "trustRank": "B",
  "verifiedAt": "2025-01-16",
  "sourceUrl": "https://..."
}
```

**信頼度ランクの基準:**
- `A`: 公式サイト + 公式SNS + 求人掲載元で情報が一致
- `B`: 公式サイトまたはSNS + 求人掲載元で確認
- `C`: 求人掲載元を中心に確認
- `D`: 情報不足・要再確認

**null の使い方:**
- `true` = 確認済みで該当する
- `false` = 確認済みで該当しない
- `null` = 未確認（UIに「要確認」と表示される）

---

## 店舗追加方法

### 1. index.json に1行追加

`src/data/shops/index.json` の配列に新しいオブジェクトを追加します。

### 2. 詳細ページ用JSONを追加（任意）

詳細情報がある場合は `src/data/shops/detail/[slug].json` を作成します。

```json
{
  "...": "index.jsonの全フィールドをコピー",
  "officialUrl": "https://...",
  "snsUrl": "https://twitter.com/...",
  "address": "新宿区（詳細は応募後）",
  "workHoursStart": "19:00",
  "workHoursEnd": "翌4:00",
  "backPay": null,
  "penalty": null,
  "shiftFlex": "高",
  "atmosphere": ["カジュアル系", "初心者向け"],
  "suitableFor": ["未経験で始めたい人"],
  "cautions": ["バック有無は要確認"],
  "description": "店舗説明文（独自要約）",
  "updatedAt": "2025-01-16"
}
```

### 3. meta.json を更新

`src/data/meta.json` の `totalShops`・`areaStats` を更新します。

### 4. ビルドして確認

```bash
npm run build
```

---

## 2000件規模データ生成方法

```bash
npx ts-node --project tsconfig.json scripts/generate-shops.ts
```

開発・テスト用のダミーデータを2000件規模で生成します（実データ投入前の確認用）。

> ⚠️ 本番では実在店舗のみを掲載してください。

---

## ブログ記事追加方法

### 1. JSONファイルを選択または新規作成

`src/data/blog/` 配下のJSONファイルに記事を追加します。

### 2. 記事フォーマット

```json
{
  "slug": "unique-slug",
  "title": "記事タイトル",
  "metaTitle": "SEO用メタタイトル（60文字以内推奨）",
  "metaDescription": "SEO用メタ説明（120文字以内推奨）",
  "publishedAt": "2025-01-16",
  "updatedAt": "2025-01-16",
  "category": "初心者向け",
  "tags": ["タグ1", "タグ2"],
  "intro": "導入文（ページトップと目次の前に表示）",
  "sections": [
    {
      "heading": "見出し",
      "body": "本文（改行は\\n\\n で段落区切り）"
    }
  ],
  "faq": [
    {
      "question": "質問文",
      "answer": "回答文"
    }
  ],
  "relatedAreas": ["shinjuku"],
  "relatedFeatures": ["experience-ok"]
}
```

### 3. lib/blog.ts に import を追加

`src/lib/blog.ts` で新しいJSONファイルをimportして `ALL_POSTS` 配列に追加します。

---

## LINEリンク差し替え方法

`src/lib/constants.ts` の以下の行を変更します:

```typescript
export const LINE_URL = "https://line.me/ti/p/YOUR_LINE_ID";
```

この1箇所を変更するだけで、全ページのLINEリンクが一括で切り替わります。

---

## 訪問者カウンターの本番接続方法

### ローカル動作

`localStorage` ベースの仮実装が動作します（リロードのたびにカウントアップ）。

### 本番接続手順

1. **Cloudflare Worker を作成**

```javascript
// worker.js
export default {
  async fetch(request, env) {
    const today = new Date().toISOString().slice(0, 10);
    
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST',
        }
      });
    }

    // KV からカウンター取得
    const totalKey = 'visitor:total';
    const todayKey = `visitor:${today}`;
    
    let total = parseInt(await env.KV.get(totalKey) ?? '0');
    let todayCount = parseInt(await env.KV.get(todayKey) ?? '0');
    
    total += 1;
    todayCount += 1;
    
    await env.KV.put(totalKey, String(total));
    await env.KV.put(todayKey, String(todayCount), { expirationTtl: 86400 });
    
    return new Response(JSON.stringify({ total, today: todayCount }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
};
```

2. **KV Namespace を作成・バインド**

```bash
wrangler kv:namespace create "KV"
```

3. **環境変数を設定**

Cloudflare Pages の Settings → Environment Variables:
```
NEXT_PUBLIC_COUNTER_API_URL = https://your-worker.your-subdomain.workers.dev
```

---

## ページ構成

| パス | 説明 |
|---|---|
| `/` | トップページ |
| `/shops` | 求人一覧（絞り込み・検索・比較） |
| `/shops/[slug]` | 店舗詳細ページ |
| `/shops/compare` | 店舗比較ページ（最大4店舗） |
| `/area/[slug]` | エリア別LP（15エリア自動生成） |
| `/feature/[slug]` | 条件別LP（10条件自動生成） |
| `/blog` | 初心者ガイド記事一覧 |
| `/blog/[slug]` | 記事詳細（20記事） |
| `/about` | このサイトについて |
| `/privacy` | プライバシーポリシー |
| `/terms` | 利用規約 |
| `/sitemap.xml` | サイトマップ（自動生成） |
| `/robots.txt` | robots.txt |

---

## 機能一覧

### 検索・絞り込み
- キーワード検索（Fuse.js）
- エリア絞り込み
- 条件絞り込み（10種類）
- ソート（新着順・確認日順・エリア順・時給帯順）
- ページネーション（20件/ページ）

### お気に入り・比較・履歴
- お気に入り登録（localStorage永続化）
- 店舗比較（最大4店舗、比較テーブル表示）
- 最近見た店舗（10件まで記録）

### SEO
- 各ページにメタタイトル・メタディスクリプション
- JSON-LD構造化データ（BreadcrumbList・Article・FAQPage・JobPosting）
- sitemap.xml 自動生成
- OGP設定

---

## 掲載基準・品質管理

- 実在店舗のみ掲載
- 情報確認日を必ず記載
- 未確認情報は `null`（UI上「要確認」表示）
- 推測・誇張・人物像の断定は行わない
- 他サイト文言の転載禁止（独自要約のみ）
- 信頼度ランク（A〜D）をUIに表示

---

## ライセンス

このコードは当サイト専用です。無断転載・再配布はお断りします。
