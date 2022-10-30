// https://developers.google.com/photos/library/guides/access-media-items
// https://developers.google.com/photos/library/reference/rest/v1/mediaItems/search
import { LocalMediaItem } from './types';

export function extractPropsInMediaItems(responseJson): LocalMediaItem[] {
  const mediaItems = responseJson.mediaItems;
  return mediaItems
    ? responseJson.mediaItems.map((mediaItem) => {
        const { id, productUrl, filename, description } = mediaItem;
        return { id, productUrl, filename, description };
      })
    : null;
}
