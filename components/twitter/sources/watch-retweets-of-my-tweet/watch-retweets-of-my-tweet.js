const base = require("../common/tweets");

module.exports = {
  ...base,
  key: "twitter-watch-retweets-of-my-tweet",
  name: "Watch Retweets of My Tweet",
  description: "Emit an event when a specific Tweet from the authenticated user is retweeted",
  version: "0.0.1",
  props: {
    ...base.props,
    tweetId: {
      type: "string",
      label: "Tweet",
      description: "The Tweet to watch for retweets",
      options(context) {
        return this.tweetIdOptions(context);
      },
    },
  },
  methods: {
    ...base.methods,
    async getScreenName() {
      const { screen_name: screenName } = await this.twitter.verifyCredentials();
      return screenName;
    },
    generateMeta(tweet) {
      const baseMeta = base.methods.generateMeta.bind(this)(tweet);
      const { screen_name: screenName = "N/A" } = tweet.user;
      const summary = `Retweet by @${screenName}`;
      return {
        ...baseMeta,
        summary,
      };
    },
    retrieveTweets() {
      return this.twitter.getRetweets({
        id: this.tweetId,
        count: this.count,
        since_id: this.getSinceId(),
      });
    },
  },
};