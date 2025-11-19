export interface Attendee {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  contactNumber: string;
  business: string;
  designation: string;
  dateOfBirth: string;
  sectors?: string[];
  experience?: string;
  achievements?: string;
  futurePlan?: string;
  linkedinProfile?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  website?: string;
  gstin?: string;
  pan?: string;
  referralCode?: string;
  qrCode: string;
  registrationDate: string;
  attended: boolean;
  checkInTime?: string;
  paymentStatus?: 'pending' | 'confirmed' | 'cancelled';
  ticketType?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  duplicate?: boolean;
}

const API_BASE_URL = window.location.origin;

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

  async registerVolunteer(data: any): Promise<ApiResponse<any>> {
    try {
      // Normalization similar to attendee mapping
      const normalized = {
        fullName: data.fullName,
        age: data.age ? Number(data.age) : undefined,
        gender: data.gender,
        whatsappNumber: data.whatsappNumber,
        place: data.place,
        organization: data.organization,
        isNilgiriStudent: data.isNilgiriStudent,
        previousExperience: data.previousExperience,
        skills: data.skills,
        contribution: data.contribution,
        preferredAreas: data.preferredAreas || [],
        preferredAreasOther: data.preferredAreasOther,
        availableOnDec20: data.availableOnDec20,
        availability: data.availability,
        availabilityTime: data.availabilityTime,
        motivation: data.motivation,
        agreesToConduct: data.agreesToConduct,
        signature: data.signature,
        date: data.date,
      };

      const response = await fetch(`${this.baseUrl}/api/volunteer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalized),
      });

      const result = await response.json();

      if (!response.ok) {
        // Return the error with proper structure, including duplicate flag
        return { 
          success: false, 
          error: result.error || `Volunteer registration failed (${response.status})`,
          duplicate: result.duplicate || false
        };
      }

      return result;
    } catch (error) {
      console.error('Volunteer registration API error:', error);
      return { success: false, error: 'Failed to submit volunteer registration.' };
    }
  }

  async submitRegistration(data: any): Promise<ApiResponse<Attendee>> {
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

  async getRegistrations(): Promise<ApiResponse<Attendee[]>> {
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

  // Contacts
  async getContacts(query?: string): Promise<ApiResponse<any[]>> {
    try {
      const url = new URL(`${this.baseUrl}/api/contacts`);
      if (query) url.searchParams.set('q', query);
      const response = await fetch(url.toString());
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Get contacts API error:', error);
      return { success: false, error: 'Failed to fetch contacts.' };
    }
  }

  async deleteContact(id: string): Promise<ApiResponse> {
    try {
      const url = new URL(`${this.baseUrl}/api/contacts`);
      url.searchParams.set('id', id);
      const response = await fetch(url.toString(), { method: 'DELETE' });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Delete contact API error:', error);
      return { success: false, error: 'Failed to delete contact.' };
    }
  }

  async submitContact(data: any): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Submit contact API error:', error);
      return { success: false, error: 'Failed to send message.' };
    }
  }

  // Courses
  async getCourses(): Promise<ApiResponse<any[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/courses`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Get courses API error:', error);
      return { success: false, error: 'Failed to fetch courses.' };
    }
  }

  async createCourse(data: any): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Create course API error:', error);
      return { success: false, error: 'Failed to create course.' };
    }
  }

  async updateCourse(id: string, data: any): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Update course API error:', error);
      return { success: false, error: 'Failed to update course.' };
    }
  }

  async deleteCourse(id: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/courses/${id}`, { method: 'DELETE' });
      return await response.json();
    } catch (error) {
      console.error('Delete course API error:', error);
      return { success: false, error: 'Failed to delete course.' };
    }
  }
}

export const apiService = new ApiService();
export default apiService;
