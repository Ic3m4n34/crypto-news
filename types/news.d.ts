export interface News {
  id: string;
  title: string;
  summary: string;
  html_content: string;
  publish_timestamp: string;
  url: string;
  image_url: string;
  source: string;
  sentiment: null;
  datetime_added: string;
  tags: string[];
  language: 'english' | 'spanish' | 'german' | 'french' | 'italian' | 'portuguese' | 'russian';
  s3_image_url: string;
}
