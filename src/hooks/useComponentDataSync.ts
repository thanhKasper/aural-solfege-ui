/**
 * Indicating whether the data provided from the outside and the internal state data is in sync
 */
const useComponentDataSync = <ExternalData, InternalData>(
  externalData: ExternalData,
  internalData: InternalData,
  isSync: (externalData: ExternalData, internalData: InternalData) => boolean,
) => {
  return isSync(externalData, internalData) ? true : false;
};

export default useComponentDataSync;
