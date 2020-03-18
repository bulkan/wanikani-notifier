export type Review = {
  available_at: string;
  subject_ids: number[];
};

export type Summary = {
  next_reviews_at: string | null;
  reviews: Review;
};
