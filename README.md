# 🤝 recommendation-api

> **Project 6 of 10** · [30-Day Dev Roadmap](https://github.com/eswarr-dasi/dev-project-roadmap) · Jul 6, 2026
>
> A **GraphQL API** backed by **Neo4j AuraDB** that delivers personalized recommendations using
> content-based and collaborative filtering. Benchmarks four similarity algorithms.
>
> ---
>
> ## ✨ Features
>
> - **GraphQL API** — Flexible queries for recommendations, user profiles, item graphs
> - - **4 algorithms** — Cosine similarity, Pearson correlation, Jaccard index, matrix factorization
>   - - **Benchmark endpoint** — Compare algorithm performance (precision, recall, latency)
>     - - **Graph traversal** — Neo4j Cypher queries for k-hop neighbor exploration
>       - - **GraphQL subscriptions** — Real-time recommendation updates
>         - - **Seed data** — Realistic movie/book dataset for demo
>          
>           - ---
>
> ## 🛠️ Tech Stack
>
> | Layer | Technology |
> |-------|------------|
> | Runtime | Node.js 20 |
> | API | GraphQL (Apollo Server 4) |
> | Graph DB | Neo4j AuraDB |
> | Language | TypeScript |
> | Testing | Jest |
>
> ---
>
> ## 📊 GraphQL Schema
>
> ```graphql
> type Query {
>   recommendations(userId: ID!, algorithm: Algorithm!, limit: Int): [Item!]!
>   benchmarkAlgorithms(userId: ID!): [AlgorithmResult!]!
>   similarItems(itemId: ID!, limit: Int): [Item!]!
> }
>
> enum Algorithm {
>   COSINE
>   PEARSON
>   JACCARD
>   MATRIX_FACTORIZATION
> }
> ```
>
> ---
>
> ## 🚀 Getting Started
>
> ```bash
> git clone https://github.com/eswarr-dasi/recommendation-api.git
> cd recommendation-api
> npm install
> cp .env.example .env  # add Neo4j credentials
> npm run seed
> npm run dev
> ```
>
> GraphQL Playground: `http://localhost:4000/graphql`
>
> ---
>
> ## 🎯 Career Relevance
>
> Builds on my Neo4j project from my resume with a full GraphQL API layer and algorithm benchmarking.
> Graph DBs and AI-adjacent recommendations are high-signal for senior roles at personalization/fintech
> companies.
>
> ---
>
> ## 📅 Part of the 30-Day Dev Challenge
>
> See the full roadmap: [dev-project-roadmap](https://github.com/eswarr-dasi/dev-project-roadmap)
>
> *Built by [Eswarr Dasi](https://github.com/eswarr-dasi) · Jul 2026*
