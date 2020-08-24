export type AuthBase = {
  oauthToken: string;
  oauthTokenSecret: string;
  results: any;
};

export type AuthResult = {
  oauthAccessToken: string;
  oauthAccessTokenSecret: string;
  results: any;
};

export type EntityUrl = {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
};

export type TweetUser = {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  description: string;
  url: string;
  entities: Record<string, { urls: EntityUrl[] }>;
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  utc_offset: null;
  time_zone: null;
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: string;
  lang: string | null;
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  default_profile: boolean;
  default_profile_image: boolean;
  following: boolean;
  follow_request_sent: boolean;
  notifications: boolean;
  translator_type: "none";
};

type MediaSize = {
  w: number;
  h: number;
  resize: "crop" | "fit";
};

type Media = {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: "photo";
  sizes: {
    thumb: MediaSize;
    large: MediaSize;
    small: MediaSize;
    medium: MediaSize;
  };
};

export type Hashtag = {
  text: string;
  indices: number[];
};

export type Tweet = {
  created_at: string;
  id: number;
  id_str: string;
  text?: string;
  full_text?: string;
  truncated: boolean;
  entities: {
    hashtags: Hashtag[];
    symbols: string[];
    user_mentions: string[];
    urls: EntityUrl[];
    media?: Media[];
  };
  source: string;
  in_reply_to_status_id?: number;
  in_reply_to_status_id_str?: string;
  in_reply_to_user_id?: number;
  in_reply_to_user_id_str?: string;
  in_reply_to_screen_name?: string;
  user: TweetUser;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  is_quote_status: boolean;
  retweet_count: string;
  favorite_count: string;
  favorited: boolean;
  retweeted: boolean;
  lang: string;
};

export type Trends = {
  trends: Array<{
    name: string;
    url: string;
    promoted_content: null;
    query: string;
    tweet_volume: number;
  }>;
};

export type Profile = {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  profile_location: null;
  description: string;
  url: string;
  entities: Record<string, { urls: EntityUrl[] }>;
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  utc_offset: null;
  time_zone: null;
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: number;
  lang: null;
  status: Tweet;
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  default_profile: boolean;
  default_profile_image: boolean;
  following: boolean;
  follow_request_sent: boolean;
  notifications: boolean;
  translator_type: "none";
  suspended: boolean;
  needs_phone_verification: boolean;
};

export type UserSettings = {
  time_zone: {
    name: string;
    utc_offset: number;
    tzinfo_name: string;
  };
  protected: boolean;
  screen_name: string;
  always_use_https: boolean;
  use_cookie_personalization: boolean;
  sleep_time: { enabled: boolean; end_time: null; start_time: null };
  geo_enabled: boolean;
  language: string;
  discoverable_by_email: boolean;
  discoverable_by_mobile_phone: boolean;
  display_sensitive_media: boolean;
  allow_contributor_request: string;
  allow_dms_from: string;
  allow_dm_groups_from: string;
  translator_type: string;
  trend_location: [
    {
      name: string;
      countryCode: string;
      url: string;
      woeid: number;
      placeType: Object[];
      parentid: number;
      country: string;
    }
  ];
};

export type CreateTweetRequest = {
  status: string;
};
