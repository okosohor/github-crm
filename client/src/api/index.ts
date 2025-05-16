import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Project } from 'types/project';
import { Tokens } from 'types/tokens';

class ApiService {
  private apiUrl: string;
  private axiosInstance: any;

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL || ' ';
    this.axiosInstance = axios.create();

    this.setupInterceptors();
  }

  private getAxiosConfig(): AxiosRequestConfig {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken')
          ? `Bearer ${localStorage.getItem('accessToken')}`
          : '',
      },
    };
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: any) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newTokens = await this.refreshTokens();

            localStorage.setItem('accessToken', newTokens.data.accessToken);
            localStorage.setItem('refreshToken', newTokens.data.refreshToken);

            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${newTokens.data.accessToken}`;
            }

            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            window.dispatchEvent(new Event('removeTokens'));
            return Promise.reject(refreshError);
          }
        }

        if (error.response && error.response.status === 401 && originalRequest._retry) {
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          window.dispatchEvent(new Event('removeTokens'));
        }

        return Promise.reject(error);
      },
    );
  }

  public async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<Tokens>> {
    return this.axiosInstance.post(
      `${this.apiUrl}/auth/login`,
      { email, password },
      this.getAxiosConfig(),
    );
  }

  public async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<{ message: string }>> {
    return this.axiosInstance.post(
      `${this.apiUrl}/user/register`,
      { email, password },
      this.getAxiosConfig(),
    );
  }

  public async createOrUpdateProject(url: string): Promise<AxiosResponse<Project>> {
    return this.axiosInstance.post(
      `${this.apiUrl}/project/createOrUpdate`,
      { url },
      this.getAxiosConfig(),
    );
  }

  public async getAllProjects(): Promise<AxiosResponse<Project[]>> {
    return this.axiosInstance.get(`${this.apiUrl}/project/all`, this.getAxiosConfig());
  }

  public async refreshTokens(): Promise<AxiosResponse<Tokens>> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }

    return this.axiosInstance.post(
      `${this.apiUrl}/auth/refresh`,
      { refreshToken },
      this.getAxiosConfig(),
    );
  }

  public async deleteUserProject(projectId: number): Promise<AxiosResponse<number>> {
    return this.axiosInstance.delete(`${this.apiUrl}/userProject/delete/${projectId}`, {
      ...this.getAxiosConfig(),
      data: { projectId },
    });
  }
  public async deleteAllUserProjects(): Promise<AxiosResponse<number>> {
    return this.axiosInstance.delete(`${this.apiUrl}/userProject/delete`, {
      ...this.getAxiosConfig(),
    });
  }
}

const API = new ApiService();
export default API;
