/**
 * Customer Service for Laravel CRM
 */

import { apiClient } from "../api/client";
import { API_CONFIG } from "../api/config";

export class CustomerService {
  /**
   * Get all customers with optional filters
   */
  async getCustomers(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `${API_CONFIG.endpoints.customers.list}${
        queryString ? `?${queryString}` : ""
      }`;
      return await apiClient.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get customer by ID
   */
  async getCustomer(id) {
    try {
      return await apiClient.get(API_CONFIG.endpoints.customers.show(id));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new customer
   */
  async createCustomer(customerData) {
    try {
      return await apiClient.post(
        API_CONFIG.endpoints.customers.create,
        customerData
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update customer
   */
  async updateCustomer(id, customerData) {
    try {
      return await apiClient.put(
        API_CONFIG.endpoints.customers.update(id),
        customerData
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete customer
   */
  async deleteCustomer(id) {
    try {
      return await apiClient.delete(API_CONFIG.endpoints.customers.delete(id));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search customers
   */
  async searchCustomers(query, params = {}) {
    try {
      const searchParams = { ...params, search: query };
      const queryString = new URLSearchParams(searchParams).toString();
      const endpoint = `${API_CONFIG.endpoints.customers.list}?${queryString}`;
      return await apiClient.get(endpoint);
    } catch (error) {
      throw error;
    }
  }
}

export const customerService = new CustomerService();
