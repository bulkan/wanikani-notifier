// import path from "path";
// import notifier from "node-notifier";
import { parseISO, isPast } from "date-fns";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import axios from "axios";
// import cron from "node-cron";
import { Summary } from "./types";

const WK_API_KEY = process.env.WK_API_KEY;


// function getReviewCount(reviews) {
  
// }

function checkReviews() {
  const headers = {
    "Wanikani-Revision": "20170710",
    Authorization: `Bearer ${WK_API_KEY}`,
  };

  return axios
    .get("https://api.wanikani.com/v2/summary", { headers })
    .then(({ data }) => {

      const reviewSummary = data.data as Summary;

      const next_reviews_at = parseISO(reviewSummary.next_reviews_at);
      const isNow = isPast(next_reviews_at);
  
      if (isNow) {
        return "Review available now";
      }

      return `Next review in ${formatDistanceToNow(next_reviews_at)}`;
    })
    .then(when => console.log(when))
    .catch(err => console.error(err));
}

function main() {
  // notifier.notify({
  //   wait: false,
  //   contentImage: path.join(__dirname, "/assets/wk.jpg"),
  //   icon: path.join(__dirname, "/assets/wk.jpg"),
  //   title: "My notification",
  //   message: "Hello, there!",
  // });

  checkReviews();
  // cron.schedule("*/30 * * * * *", checkReviews);
}

if (require.main === module) {
  main();
}
