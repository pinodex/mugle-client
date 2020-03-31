import notify from '@/utils/notify';

/**
 * Factory function to check if an error notification should be shown
 *
 * @param  {Array} options.excludes List of no notification condition
 * @return {Function} Function to be checked against axios interceptors
 */
export function makeShouldNotify({ excludes }) {
  return (requestUrl, responseStatus) => {
    if (!excludes) return true;

    const inList = excludes
      .some(({ match, status }) => new RegExp(match).test(requestUrl)
        && status === responseStatus);

    return !inList;
  };
}

export function makeNotifyErrorMiddleware(shouldNotify) {
  return [
    (response) => response,

    (error) => {
      const { response, config } = error;

      if (response && config && shouldNotify(config.url, response.status)) {
        const message = error.response.data.message || 'An error occurred';

        notify({
          message,
          type: 'is-danger',
          queue: false,
        });
      }

      return Promise.reject(error);
    },
  ];
}
