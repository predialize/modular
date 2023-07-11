export default (() => {
  var routeList = [];
  var ApiMetadata;

  const getAll = () => ({ api: ApiMetadata, list: routeList });
  const getList = () => routeList;
  const getApiMetadata = () => ApiMetadata;

  const getByPath = (path) => routeList.find((t) => t.path === path);

  const getCurrent = (item) => {
    if (!item) return;

    if (typeof item === "string") return { path: item };

    return {
      path: item?.path,
      ...(item?.metadata || {}),
    };
  };

  const add = (currentRoute, parentRoute = null, options = {}) => {
    if (!currentRoute || currentRoute instanceof Function) return;

    const current = getCurrent(currentRoute);
    const parentNode = getByPath(parentRoute?.path || parentRoute);

    const { parent, api_metadata, ...parentMetadata } = parentNode || {};

    const fullPath = [
      parentMetadata?.full_path || [],
      current?.path || [],
    ].join("");

    if (!parentRoute && !ApiMetadata) {
      ApiMetadata = current;
    }

    if (!fullPath) return;

    const metadata = {
      full_path: fullPath,
      ...current,
      ...options,
      api_metadata: ApiMetadata,
      parent: parentNode ? parentMetadata : null,
    };

    routeList.push(metadata);

    return metadata;
  };

  return { getAll, getApiMetadata, getList, add };
})();
