const neo4j = require('../config/neo4j');

const resolvers = {
    Query: {
          user: async (_, { id }) => {
                  const session = neo4j.session();
                  try {
                            const result = await session.run(
                                        'MATCH (u:User {id: $id}) RETURN u',
                                        { id }
                                      );
                            if (result.records.length === 0) return null;
                            return result.records[0].get('u').properties;
                          } finally {
                            await session.close();
                          }
                },

          recommendations: async (_, { userId, limit = 10 }) => {
                  const session = neo4j.session();
                  try {
                            const result = await session.run(
                                        `MATCH (u:User {id: $userId})-[:PURCHASED]->(p:Product)
                                         MATCH (p)<-[:PURCHASED]-(similar:User)-[:PURCHASED]->(rec:Product)
                                         WHERE NOT (u)-[:PURCHASED]->(rec)
                                         WITH rec, COUNT(*) AS score
                                         ORDER BY score DESC
                                         LIMIT $limit
                                         RETURN rec, score`,
                                        { userId, limit: neo4j.int(limit) }
                                      );
                            return result.records.map(r => ({
                                        ...r.get('rec').properties,
                                        score: r.get('score').toNumber(),
                                      }));
                          } finally {
                            await session.close();
                          }
                },

          trendingProducts: async (_, { days = 7, limit = 20 }) => {
                  const session = neo4j.session();
                  try {
                            const since = new Date();
                            since.setDate(since.getDate() - days);
                            const result = await session.run(
                                        `MATCH (p:Product)<-[r:PURCHASED]-()
                                         WHERE r.timestamp > $since
                                         WITH p, COUNT(r) AS purchases
                                         ORDER BY purchases DESC
                                         LIMIT $limit
                                         RETURN p, purchases`,
                                        { since: since.toISOString(), limit: neo4j.int(limit) }
                                      );
                            return result.records.map(r => r.get('p').properties);
                          } finally {
                            await session.close();
                          }
                },
        },

    Mutation: {
          recordPurchase: async (_, { userId, productId }) => {
                  const session = neo4j.session();
                  try {
                            await session.run(
                                        `MATCH (u:User {id: $userId}), (p:Product {id: $productId})
                                         CREATE (u)-[:PURCHASED {timestamp: $ts}]->(p)`,
                                        { userId, productId, ts: new Date().toISOString() }
                                      );
                            return true;
                          } finally {
                            await session.close();
                          }
                },
        },
  };

module.exports = resolvers;
