export interface CommentResponse {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: CommendUser;
  created_at: Date;
  updated_at: Date;
  author_association: string;
  body: string;
  reactions: CommendReactions;
  performed_via_github_app: null;
}

export interface CommendReactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface CommendUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}
