import { parseISO, isPast } from "date-fns";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import axios from "axios";
import cron from "node-cron";
import ora from "ora";
import { SummaryResponse } from "./types";
import { showNotification } from "./notifier";

const WK_API_KEY = process.env.WK_API_KEY;

const spinner = ora();

function getReviewCount(reviews) {
  return reviews.filter(review => isPast(parseISO(review.available_at)))
    .map(review => review.subject_ids.length )
    .reduce((a, b) => a + b);
}


let hasNotified = false;

function checkReviews() {
  const headers = {
    "Wanikani-Revision": "20170710",
    Authorization: `Bearer ${WK_API_KEY}`,
  };

  spinner.spinner = 'simpleDots';

  return axios
    .get("https://api.wanikani.com/v2/summary", { headers })
    .then(({ data }: { data: SummaryResponse }) => {
      const reviewSummary = data.data;

      const next_reviews_at = parseISO(reviewSummary.next_reviews_at);
      const isNow = isPast(next_reviews_at);

      if (isNow) {
        const reviewCount = getReviewCount(reviewSummary.reviews);
        const when = `${reviewCount} reviews available now`;

        if (!hasNotified) {
          hasNotified = true;
          showNotification(when);
        }

        return when;
      }

      hasNotified = false;
      return `Next review in ${formatDistanceToNow(next_reviews_at)}`;
    })
    .then(when => {
      spinner.spinner = 'dots';
      spinner.text = when;
    })
    .catch(err => console.error(err));
}

function main() {

  if(!WK_API_KEY) {
    console.error("WK_API_KEY not set");
    process.exit(1);
  }


  spinner.start();

  checkReviews()
    .then(() => cron.schedule("*/30 * * * * *", checkReviews));
}

if (require.main === module) {
  main();
}
