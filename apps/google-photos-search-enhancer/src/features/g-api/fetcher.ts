// https://developers.google.com/photos/library/guides/access-media-items
// https://developers.google.com/photos/library/reference/rest/v1/mediaItems/search
import { setMediaItems, setTimeStamp, getTimeStamp } from '../client-storage';
import { sendPost } from '../request';
// import { LocalMediaItem } from './types';
import { MEDIA_ITEMS_SEARCH_API } from './constants';
import { extractPropsInMediaItems } from './processor';

/**
 * request for all media items and store the result in the IndexedDB
 * return the setted time stamp
 * Default: include archived items
 * @param accessToken
 * @returns
 */
export async function requestAllMediaItems(
  accessToken?: string,
  url = MEDIA_ITEMS_SEARCH_API
) {
  let nextToken;
  try {
    // fetch a page of data from Google API
    let onePageData = await requestAPageOfMediaItems(accessToken, null, url);
    // console.table('onePageData: ', onePageData);

    do {
      //store data from response
      const storedData = extractPropsInMediaItems(onePageData);
      if (storedData) {
        setMediaItems(storedData);
      }

      // use the nextPageToken to get the data in the next page
      nextToken = onePageData.nextPageToken;
      onePageData = await requestAPageOfMediaItems(accessToken, nextToken, url);
    } while (nextToken);
  } catch (err) {
    console.log(err.name + ': ' + err.message);
  }

  setTimeStamp();
  return getTimeStamp();
}

/**
 *
 * @param accessToken
 * @returns JSON
 */
export async function requestAPageOfMediaItems(
  accessToken,
  pageToken = '',
  url = MEDIA_ITEMS_SEARCH_API
): Promise<any> {
  const processedUrl = accessToken ? `${url}?access_token=${accessToken}` : url;

  const options = {
    filters: { includeArchivedMedia: true },
    pageSize: 100,
    pageToken: pageToken ? pageToken : null,
  };
  // console.log('options: ', options);

  const data = await sendPost(processedUrl, options);
  return data;
}
