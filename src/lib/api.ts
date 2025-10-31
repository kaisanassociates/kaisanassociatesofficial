import { RegistrationData, ApiResponse } from './api-utils';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin 
  : 'http://localhost:8081';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async registerAttendee(data: any): Promise<ApiResponse<any>> {
    try {
      // Transform the detailed form data to match API expectations
      const transformedData = {
        name: data.fullName,
        email: data.email,
        phone: data.contactNumber,
        organization: data.business,
        ticketType: 'standard', // Default ticket type
        ...data
      };

      const response = await fetch(`${this.baseUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Registration API error:', error);
      return {
        success: false,
        error: 'Failed to submit registration. Please try again.'
      };
    }
  }

  async submitRegistration(data: Omit<RegistrationData, 'registrationDate' | 'paymentStatus'>): Promise<ApiResponse<RegistrationData>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Registration API error:', error);
      return {
        success: false,
        error: 'Failed to submit registration. Please try again.'
      };
    }
  }

  async getRegistrations(): Promise<ApiResponse<RegistrationData[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/registrations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get registrations API error:', error);
      return {
        success: false,
        error: 'Failed to fetch registrations.'
      };
    }
  }

  async checkTicketStatus(ticketId: string): Promise<ApiResponse<{ status: string; data?: any }>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ticket/${ticketId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ticket status API error:', error);
      return {
        success: false,
        error: 'Failed to check ticket status.'
      };
    }
  }
}

export const apiService = new ApiService();
export default apiService;
