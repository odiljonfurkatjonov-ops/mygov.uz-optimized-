function termFrequency(tokens) {
  const counts = new Map();

  for (const token of tokens) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }

  const size = tokens.length || 1;
  const tf = new Map();

  for (const [token, count] of counts) {
    tf.set(token, count / size);
  }

  return tf;
}

export function buildTfIdfIndex(documents) {
  const docCount = documents.length || 1;
  const docFrequencies = new Map();
  const tfVectors = documents.map((tokens) => termFrequency(tokens));

  for (const vector of tfVectors) {
    for (const token of vector.keys()) {
      docFrequencies.set(token, (docFrequencies.get(token) ?? 0) + 1);
    }
  }

  const idf = new Map();

  for (const [token, frequency] of docFrequencies) {
    idf.set(token, Math.log((1 + docCount) / (1 + frequency)) + 1);
  }

  const vectors = tfVectors.map((tf) => {
    const weighted = new Map();

    for (const [token, score] of tf) {
      weighted.set(token, score * (idf.get(token) ?? 1));
    }

    return weighted;
  });

  return { vectors, idf };
}

export function createQueryVector(tokens, idf) {
  const tf = termFrequency(tokens);
  const vector = new Map();

  for (const [token, score] of tf) {
    vector.set(token, score * (idf.get(token) ?? 1));
  }

  return vector;
}

export function cosineSimilarity(left, right) {
  let dot = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (const value of left.values()) {
    leftMagnitude += value * value;
  }

  for (const value of right.values()) {
    rightMagnitude += value * value;
  }

  for (const [token, value] of left) {
    dot += value * (right.get(token) ?? 0);
  }

  if (!leftMagnitude || !rightMagnitude) {
    return 0;
  }

  return dot / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
}
