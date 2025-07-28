/**
 * Lead Service for Laravel CRM
 */

import { apiClient } from "../api/client";
import { API_CONFIG } from "../api/config";

export class LeadService {
  /**
   * Get all leads with optional filters
   */
  async getLeads(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `${API_CONFIG.endpoints.leads.list}${
        queryString ? `?${queryString}` : ""
      }`;
      return await apiClient.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get lead by ID
   */
  async getLead(id) {
    try {
      return await apiClient.get(API_CONFIG.endpoints.leads.show(id));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new lead
   */
  async createLead(leadData) {
    try {
      return await apiClient.post(API_CONFIG.endpoints.leads.create, leadData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update lead
   */
  async updateLead(id, leadData) {
    try {
      return await apiClient.put(
        API_CONFIG.endpoints.leads.update(id),
        leadData
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete lead
   */
  async deleteLead(id) {
    try {
      return await apiClient.delete(API_CONFIG.endpoints.leads.delete(id));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Convert lead to customer
   */
  async convertLead(id, conversionData) {
    try {
      return await apiClient.post(
        `${API_CONFIG.endpoints.leads.show(id)}/convert`,
        conversionData
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search leads
   */
  async searchLeads(query, params = {}) {
    try {
      const searchParams = { ...params, search: query };
      const queryString = new URLSearchParams(searchParams).toString();
      const endpoint = `${API_CONFIG.endpoints.leads.list}?${queryString}`;
      return await apiClient.get(endpoint);
    } catch (error) {
      throw error;
    }
  }
}

export const leadService = new LeadService();
