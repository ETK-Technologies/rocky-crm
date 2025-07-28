/**
 * Custom hooks for API calls
 */

import { useState, useEffect, useCallback } from "react";

/**
 * Hook for making API calls with loading and error states
 */
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiCall(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiCall]
  );

  return {
    data,
    loading,
    error,
    execute,
  };
};

/**
 * Hook for making API calls on component mount
 */
export const useApiOnMount = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

/**
 * Hook for managing form submission with API calls
 */
export const useFormSubmit = (apiCall) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(
    async (data) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const result = await apiCall(data);
        setSuccess(true);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiCall]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    loading,
    error,
    success,
    submit,
    reset,
  };
};

/**
 * Hook for managing pagination with API calls
 */
export const usePagination = (apiCall, initialParams = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
    ...initialParams,
  });

  const fetchData = useCallback(
    async (newParams = {}) => {
      setLoading(true);
      setError(null);

      try {
        const updatedParams = { ...params, ...newParams };
        const result = await apiCall(updatedParams);
        setData(result);
        setParams(updatedParams);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiCall, params]
  );

  const nextPage = useCallback(() => {
    fetchData({ page: params.page + 1 });
  }, [fetchData, params.page]);

  const prevPage = useCallback(() => {
    if (params.page > 1) {
      fetchData({ page: params.page - 1 });
    }
  }, [fetchData, params.page]);

  const goToPage = useCallback(
    (page) => {
      fetchData({ page });
    },
    [fetchData]
  );

  const updateParams = useCallback(
    (newParams) => {
      fetchData({ ...newParams, page: 1 }); // Reset to first page when filters change
    },
    [fetchData]
  );

  return {
    data,
    loading,
    error,
    params,
    fetchData,
    nextPage,
    prevPage,
    goToPage,
    updateParams,
  };
};
