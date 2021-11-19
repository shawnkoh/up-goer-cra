interface ClassifyingData {
  data: number[];
  id: string;
}
interface PredictingData {
  id: string;
  prediction: Prediction;
  score?: number;
  mock: Mock;
}

enum Prediction {
  BAD = 0,
  GOOD = 1,
}

enum Mock {
  REAL = 0,
  MOCKED = 1,
}

export { Prediction };
export type { ClassifyingData, PredictingData };
