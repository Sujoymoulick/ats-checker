import { tokenizeText, extractNgrams } from './chunker.ts';

export interface VectorDocument {
  id: string;
  text: string;
  tokens: string[];
  bigrams: string[];
  tokenCounts: Map<string, number>;
  docLength: number;
}

export class HybridVectorIndex {
  private docs: VectorDocument[] = [];
  private idfMap: Map<string, number> = new Map();
  private avgDocLength: number = 0;
  private k1: number = 1.2;
  private b: number = 0.75;

  constructor(documents: Array<{ id: string; text: string }>) {
    this.buildIndex(documents);
  }

  private buildIndex(documents: Array<{ id: string; text: string }>): void {
    let totalTokens = 0;
    const docFrequency = new Map<string, number>();

    for (const doc of documents) {
      const tokens = tokenizeText(doc.text);
      const bigrams = extractNgrams(tokens, 2);
      const allTerms = [...tokens, ...bigrams];
      const tokenCounts = new Map<string, number>();

      for (const t of allTerms) {
        tokenCounts.set(t, (tokenCounts.get(t) || 0) + 1);
      }

      const uniqueTerms = new Set(allTerms);
      for (const t of uniqueTerms) {
        docFrequency.set(t, (docFrequency.get(t) || 0) + 1);
      }

      totalTokens += tokens.length;
      this.docs.push({
        id: doc.id,
        text: doc.text,
        tokens,
        bigrams,
        tokenCounts,
        docLength: tokens.length
      });
    }

    const N = this.docs.length || 1;
    this.avgDocLength = totalTokens / N;

    for (const [term, df] of docFrequency.entries()) {
      const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
      this.idfMap.set(term, Math.max(0.1, idf));
    }
  }

  public search(queryText: string, topK: number = 5): Array<{ id: string; score: number; cosineSim: number; bm25Score: number }> {
    const queryTokens = tokenizeText(queryText);
    const queryBigrams = extractNgrams(queryTokens, 2);
    const queryTerms = [...queryTokens, ...queryBigrams];

    const queryTermCounts = new Map<string, number>();
    for (const t of queryTerms) {
      queryTermCounts.set(t, (queryTermCounts.get(t) || 0) + 1);
    }

    // Compute Query Vector
    const queryVector = new Map<string, number>();
    let queryNorm = 0;
    for (const [term, qCount] of queryTermCounts.entries()) {
      const idf = this.idfMap.get(term) || 0.5;
      const weight = (1 + Math.log(qCount)) * idf;
      queryVector.set(term, weight);
      queryNorm += weight * weight;
    }
    queryNorm = Math.sqrt(queryNorm) || 1;

    const results: Array<{ id: string; score: number; cosineSim: number; bm25Score: number }> = [];

    for (const doc of this.docs) {
      // 1. Cosine Similarity
      let dotProduct = 0;
      let docNorm = 0;

      for (const [term, count] of doc.tokenCounts.entries()) {
        const idf = this.idfMap.get(term) || 0.5;
        const weight = (1 + Math.log(count)) * idf;
        docNorm += weight * weight;

        const qWeight = queryVector.get(term);
        if (qWeight) {
          dotProduct += weight * qWeight;
        }
      }
      docNorm = Math.sqrt(docNorm) || 1;
      const cosineSim = Math.max(0, Math.min(1, dotProduct / (queryNorm * docNorm)));

      // 2. BM25 Score
      let bm25 = 0;
      for (const term of queryTerms) {
        const tf = doc.tokenCounts.get(term) || 0;
        if (tf > 0) {
          const idf = this.idfMap.get(term) || 0.5;
          const numerator = tf * (this.k1 + 1);
          const denominator = tf + this.k1 * (1 - this.b + this.b * (doc.docLength / (this.avgDocLength || 1)));
          bm25 += idf * (numerator / denominator);
        }
      }

      // Hybrid combination (normalized to 0 - 100)
      const normalizedBm25 = Math.min(100, (bm25 / (queryTerms.length * 1.5 || 1)) * 100);
      const normalizedCosine = cosineSim * 100;
      const hybridScore = Math.round(0.55 * normalizedCosine + 0.45 * normalizedBm25);

      results.push({
        id: doc.id,
        score: hybridScore,
        cosineSim: Math.round(normalizedCosine),
        bm25Score: Math.round(normalizedBm25)
      });
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }
}
