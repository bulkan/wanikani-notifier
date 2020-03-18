export type Review = {
  available_at: string;
  subject_ids: number[];
};

export type Lesson = {
  available_at: string;
  subject_ids: number[];
};

export type Summary = {
  next_reviews_at: string | null;
  reviews: Review[];
  lessons: Lesson[];
};


export type SummaryResponse = {
  url: string;
  data_updated_at: string;
  data: Summary;
};